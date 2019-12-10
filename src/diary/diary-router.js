const express = require('express');
const path = require('path');
const DiaryService = require('./diary-service');
const { requireAuth } = require('../middleware/jwt-auth');

const diaryRouter = express.Router();
const jsonBodyParser = express.json();

diaryRouter
  .route('/:student_id')
  .all(requireAuth)
  //get all entries for the specified student
  .get((req,res,next) => {
    DiaryService.getStudentDiary(req.app.get('db'), req.params.student_id)
      .then(entries => {
        res.status(200).json(entries.map(DiaryService.serializeEntry));
      })
      .catch(next);
  });

  module.exports = diaryRouter;