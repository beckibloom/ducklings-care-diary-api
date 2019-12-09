const xss = require('xss');

const StudentsService = {
  getStudentsByTeacher(db, teacher_id) {
    return db
      .from('students')
      .select(
        'id',
        'teacher_id',
        'student_first',
        'student_last',
        'birth_date',
        'parent_email'
      )
      .where('teacher_id', teacher_id);
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