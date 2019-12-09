const xss = require('xss');

const StudentsService = {
  getStudentsByTeacherId(db, teacher_id) {
    return db
      .select('*')
      .from('students')
  },

  serializeStudent(student) {
    return {
      id: student.id,
      teacher_id: student.teacher_id,
      student_first: xss(student.student_first),
      student_last: xss(student.student_last),
      birth_date: xss(student.birth_date),
      parent_email: xss(student.parent_email),
    }
  }
}

module.exports = StudentsService;