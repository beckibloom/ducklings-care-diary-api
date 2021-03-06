const express = require('express');
const StudentsService = require('./students-service');
const { requireAuth } = require('../middleware/jwt-auth');

const studentsRouter = express.Router();
const jsonBodyParser = express.json();

studentsRouter
  .route('/')
  .all(requireAuth)
  .get(requireAuth, jsonBodyParser, (req,res,next) => {
    const parent_email = req.user.username;
    StudentsService.getStudentByParent(req.app.get('db'), parent_email)
      .then(student => {
        if (!student) {
          res.status(200).json({id: 0});
        };
        res.status(200).json(student);
      });
  });

studentsRouter
  .route('/:teacher_id')
  .all(requireAuth)
  .get(jsonBodyParser, (req,res,next) => {
    const teacherId = req.params.teacher_id;
    StudentsService.getStudentsByTeacherId(req.app.get('db'), teacherId)
      .then(students => {
        console.log(students);
        res.status(200).json(students);
      })
    .catch(next);
  })
  .post(jsonBodyParser, (req,res,next) => {
    const { teacher_id, student_first, student_last, birth_date, parent_email } = req.body;
    const newStudent = { teacher_id, student_first, student_last, birth_date, parent_email };

    for (const [key, value] of Object.entries(newStudent))
    if (value == null) {
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });
    };

    StudentsService.insertStudent(
      req.app.get('db'), newStudent
    )
      .then(student => {
        res
          .status(201)
          .json(StudentsService.serializeStudent(student));
      })
      .catch(next);
  });

studentsRouter
  .route('/id/:student_id')
  .all(requireAuth)
  .all(checkStudentExists)
  .get((req,res) => {
    res.status(200).json(StudentsService.serializeStudent(res.student));
  })
  .put(jsonBodyParser, (req,res,next) => {
    const { student_first, student_last, birth_date, parent_email } = req.body;
    const studentToUpdate = { student_first, student_last, birth_date, parent_email };

    const numberOfValues = Object.values(studentToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: { message: `Request body must contain an student object value to update` }
      });
    };

    StudentsService.updateStudent(
      req.app.get('db'),
      req.params.student_id,
      studentToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete((req,res,next) => {
    StudentsService.deleteStudent(
      req.app.get('db'),
      req.params.student_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })

async function checkStudentExists(req, res, next) {
  try {
    const student = await StudentsService.getByStudentId(
      req.app.get('db'),
      req.params.student_id
    );

    if(!student) {
      return res.status(404).json({
        error: `Student doesn't exist`
      });
    };

    res.student = student;
    next();
  } catch (error) {
    next(error);
  };
};

module.exports = studentsRouter;