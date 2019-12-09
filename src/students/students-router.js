const express = require('express');
const StudentsService = require('./students-service');
const { requireAuth } = require('../middleware/jwt-auth');

const studentsRouter = express.Router();
const jsonBodyParser = express.json();

studentsRouter
  .route('/:teacher_id')
  .all(requireAuth)
  // GET all students assigned to the specified teacher ('/:teacher_id')
  .get(jsonBodyParser, (req,res,next) => {
    const teacherId = parseInt(req.params.teacher_id);
    console.log({teacherId});
    StudentsService.getStudentsByTeacherId(req.app.get('db'), req.params.teacher_id)
      .then(students => {
        res.status(200).json(students);
      })
    .catch(next);
  })
  // POST a new student assigned to the specified teacher ('/:teacher_id')
  .post(jsonBodyParser, (req,res,next) => {
    const { teacher_id, student_first, student_last, birth_date, parent_email } = req.body;
    const newStudent = { teacher_id, student_first, student_last, birth_date, parent_email }

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
  .route('/:teacher_id/:student_id')
  .all(requireAuth)
  .all(checkStudentExists)
  // GET profile data for specified student ('/:teacher_id/:student_id')
  .get((req,res) => {
    res.status(200).json(StudentsService.serializeStudent(res.student));
  })
  // PUT (update) profile for one specific student ('/:teacher_id/:student_id')
  .put()
  // DELETE one specific student ('/:teacher_id/:student_id')
  .delete()

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