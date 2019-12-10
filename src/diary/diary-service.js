const xss = require('xss');

const DiaryService = {
  getAllDiaries(db) {
    return db
      .from('diary')
      .select('*')
  },

  getStudentDiary(db, student_id) {
    return db
      .from('diary')
      .select('*')
      .where({student_id})
  },

  serializeEntry(entry) {
    return {
      id: entry.id,
      student_id: entry.student_id,
      date: entry.date,
      comment: xss(entry.comment)
    };
  },

  getById(db, id) {
    return DiaryService.getAllDiaries(db)
      .where('id', id)
      .first();
  },

  insertEntry(db, entry) {
    return db
      .insert(entry)
      .into('diary')
      .returning('*')
      .then(([entry]) => entry)
      .then(entry =>
        DiaryService.getById(db, entry.id)
      );
  },

};

module.exports = DiaryService;