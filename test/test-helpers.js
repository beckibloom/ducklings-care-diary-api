function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      diary,
      students,
      users
      RESTART IDENTITY CASCADE`
  )
};

function makeExpectedStudents(teacher_id) {
  return [
    {
      "id": 12,
      "teacher_id": 5,
      "student_first": "Lily",
      "student_last": "Altgeld",
      "birth_date": `12/03/2017`,
      "parent_email": "parent1@email.com",
    },
    {
      "id": 13,
      "teacher_id": 5,
      "student_first": "Molly",
      "student_last": "Blackhawk",
      "birth_date": "08/29/2017",
      "parent_email": "parent2@email.com",
    },
    {
      "id": 14,
      "teacher_id": 5,
      "student_first": "Charlotte",
      "student_last": "Cornelia",
      "birth_date": "11/19/2016",
      "parent_email": "supermom@email.com",
    },
    {
      "id": 15,
      "teacher_id": 5,
      "student_first": "Lance",
      "student_last": "Dayton",
      "birth_date": "01/13/2017",
      "parent_email": "dad@email.com",
    },
    {
      "id": 16,
      "teacher_id": 5,
      "student_first": "Alisa",
      "student_last": "Eastman",
      "birth_date": "09/03/2017",
      "parent_email": "shirley@email.com",
    },
    {
      "id": 17,
      "teacher_id": 5,
      "student_first": "Bobby",
      "student_last": "Fremont",
      "birth_date": "07/30/2017",
      "parent_email": "gfremont@email.com",
    },
    {
      "id": 18,
      "teacher_id": 5,
      "student_first": "Nathaniel",
      "student_last": "Glenwood",
      "birth_date": "03/05/2016",
      "parent_email": "kglenwood@email.com",
    },
    {
      "id": 19,
      "teacher_id": 5,
      "student_first": "Katherine",
      "student_last": "Halsted",
      "birth_date": "05/06/2017",
      "parent_email": "parent@email.com",
    },
    {
      "id": 20,
      "teacher_id": 5,
      "student_first": "Audrey",
      "student_last": "Irving",
      "birth_date": "05/06/2017",
      "parent_email": "parent@email.com",
    },
    {
      "id": 21,
      "teacher_id": 5,
      "student_first": "Charlie",
      "student_last": "Jarvis",
      "birth_date": "11/19/2016",
      "parent_email": "newparent@email.com",
    },
    {
      "id": 22,
      "teacher_id": 5,
      "student_first": "Johnny",
      "student_last": "Lakewood",
      "birth_date": "08/24/2016",
      "parent_email": "helloparent@email.com",
    },
  ];
};

module.exports = {
  cleanTables,
  makeExpectedStudents,
};