const xss = require('xss');

const DiaryService = {
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

  

};

module.exports = DiaryService;