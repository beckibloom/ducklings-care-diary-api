function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      diary,
      students,
      users
      RESTART IDENTITY CASCADE`
  )
};

function makeExpectedStudents() {
  return [
    {
      "id": 17,
      "teacher_id": 5,
      "student_first": "Bobby",
      "student_last": "Fremont",
      "birth_date": "07/30/2017",
      "parent_email": "gfremont@email.com"
    },
    {
      "id": 18,
      "teacher_id": 5,
      "student_first": "Nathaniel",
      "student_last": "Glenwood",
      "birth_date": "03/05/2016",
      "parent_email": "kglenwood@email.com"
    },
    {
      "id": 19,
      "teacher_id": 5,
      "student_first": "Katherine",
      "student_last": "Halsted",
      "birth_date": "05/06/2017",
      "parent_email": "parent@email.com"
    },
    {
      "id": 20,
      "teacher_id": 5,
      "student_first": "Audrey",
      "student_last": "Irving",
      "birth_date": "05/06/2017",
      "parent_email": "parent@email.com"
    },
    {
      "id": 21,
      "teacher_id": 5,
      "student_first": "Charlie",
      "student_last": "Jarvis",
      "birth_date": "11/19/2016",
      "parent_email": "newparent@email.com"
    },
    {
      "id": 22,
      "teacher_id": 5,
      "student_first": "Johnny",
      "student_last": "Lakewood",
      "birth_date": "08/24/2016",
      "parent_email": "helloparent@email.com"
    },
    {
      "id": 26,
      "teacher_id": 5,
      "student_first": "Test",
      "student_last": "Student",
      "birth_date": "01/13/1992",
      "parent_email": "testparent@testparent.test"
    },
    {
      "id": 15,
      "teacher_id": 5,
      "student_first": "Lancelot",
      "student_last": "Damen",
      "birth_date": "12/28/1989",
      "parent_email": "superdad@email.com"
    },
    {
      "id": 12,
      "teacher_id": 5,
      "student_first": "newName",
      "student_last": "testPut",
      "birth_date": "00/00/0000",
      "parent_email": "newparent@testput.com"
    },
    {
      "id": 14,
      "teacher_id": 5,
      "student_first": "newName",
      "student_last": "testPut",
      "birth_date": "00/00/0000",
      "parent_email": "newparent@testput.com"
    }
  ]
};

module.exports = {
  cleanTables,
  makeExpectedStudents,
};