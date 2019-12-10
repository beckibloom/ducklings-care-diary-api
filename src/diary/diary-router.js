const express = require('express');
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
  })
  .post(jsonBodyParser, (req,res,next) => {
    const {student_id, date, comment} = req.body;
    const newEntry = {student_id, date, comment};

    for (const [key, value] of Object.entries(newEntry))
    if (value == null) {
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });
    };

    DiaryService.insertEntry(req.app.get('db'), newEntry)
      .then(entry => {
        res
          .status(201)
          .json(DiaryService.serializeEntry(entry));
      })
      .catch(next);
  });

diaryRouter
  .route('/:student_id/:entry_id')
  .all(requireAuth)
  .all(checkEntryExists)
  .get((req,res) => {
    res.status(200).json(DiaryService.serializeEntry(res.entry));
  })
  .delete((req,res,next) => {
    DiaryService.deleteEntry(req.app.get('db'), req.params.entry_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })

  async function checkEntryExists(req, res, next) {
    try {
      const entry = await DiaryService.getById(
        req.app.get('db'),
        req.params.entry_id
      );
  
      if (!entry) {
        return res.status(404).json({
          error: `Entry doesn't exist`
        })
      };
  
      res.entry = entry;
      next();
    } catch (error) {
      next(error);
    };
  };
  
module.exports = diaryRouter;