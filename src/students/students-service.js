const xss = require('xss');

const StudentsService = {
  getStudentsByTeacherId(db, teacher_id) {
    return db
      .select('*')
      .where({teacher_id})
      .from('students');
  },

  getStudentByParent(db, parent_email) {
    return db
      .select('*')
      .where({parent_email})
      .from('students')
      .first();
  },

  serializeStudent(student) {
    return {
      id: student.id,
      teacher_id: student.teacher_id,
      student_first: xss(student.student_first),
      student_last: xss(student.student_last),
      birth_date: xss(student.birth_date),
      parent_email: xss(student.parent_email),
    };
  },

  insertStudent(db, newStudent) {
    return db
      .insert(newStudent)
      .into('students')
      .returning('*')
      .then(([student]) => student)
      .then(student => 
        StudentsService.getByStudentId(db, student.id)
      );
  },

  getByStudentId(db, student_id) {
    return db
      .from('students')
      .select('*')
      .where('id', student_id)
      .first();
  },

  updateStudent(db, student_id, updatedFields) {
    return db('students')
      .where('id', student_id)
      .update(updatedFields);
  },

  deleteStudent(db, student_id) {
    return db('students')
      .where('id', student_id)
      .delete();
  }
};

module.exports = StudentsService;