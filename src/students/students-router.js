const express = require('express');
// const path = require('path');
const StudentsService = require('./students-service');
const { requireAuth } = require('../middleware/jwt-auth');

const studentsRouter = express.Router();
// const jsonBodyParser = express.json();

studentsRouter
  .route('/:teacher_id')
  // GET all students assigned to the specified teacher ('/:teacher_id')
  .get(requireAuth, (req,res,next) => {
    StudentsService.getStudentsByTeacherId(req.app.get('db'), req.params.teacher_id)
      .then(students => {
        res.status(200).json(students.map(StudentsService.serializeStudent));
      })
    .catch(next);
  })
// POST a new student assigned to the specified teacher ('/:teacher_id')

// GET profile data for specified student ('/:teacher_id/:student_id')

// PUT (update) profile for one specific student ('/:teacher_id/:student_id')

// DELETE one specific student ('/:teacher_id/:student_id')

module.exports = studentsRouter;