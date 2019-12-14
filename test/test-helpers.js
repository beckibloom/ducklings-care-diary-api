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
      "id": 42,
      "teacher_id": 12,
      "student_first": "Student",
      "student_last": "One",
      "birth_date": "01/01/2001",
      "parent_email": "parent@email.com"
    },
    {
      "id": 43,
      "teacher_id": 12,
      "student_first": "Student",
      "student_last": "Two",
      "birth_date": "02/02/2002",
      "parent_email": "parent2@email.com"
    },
    {
      "id": 44,
      "teacher_id": 12,
      "student_first": "Student",
      "student_last": "Three",
      "birth_date": "03/03/2003",
      "parent_email": "parent3@email.com"
    }
  ]
};

function makeExpectedEntries() {
  return [
    {
      "id": 9,
      "student_id": 12,
      "date": "2019-11-25T06:00:00.000Z",
      "comment": "Lily had fun building with blocks today!"
    },
    {
      "id": 10,
      "student_id": 12,
      "date": "2019-11-26T06:00:00.000Z",
      "comment": "Lily had a hard time today in dance class and cried for most of the session."
    },
    {
      "id": 11,
      "student_id": 12,
      "date": "2019-12-02T06:00:00.000Z",
      "comment": "Lily made a new friend today - she and Charles had fun playing dress up together."
    },
    {
      "id": 12,
      "student_id": 12,
      "date": "2019-12-03T06:00:00.000Z",
      "comment": "After drop off Lily was upset so she spent some time cuddling her teddy bear to help her feel better."
    }
  ]
};

module.exports = {
  cleanTables,
  makeExpectedStudents,
  makeExpectedEntries,
};