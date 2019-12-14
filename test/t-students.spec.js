require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.set('db', db);

const userCredentials = {
  username: 'teacher@email.com',
  password: 'Password123!'
};

let authToken;

const authenticatedUser = request.agent(app);

describe(`Students Endpoint (as teacher)`, () => {

  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })

  context('Interacting with all students belonging to a teacher_id', () => {
    describe('GET /:teacher_id', () => {
      //should only interact with teacherId 12
      it('responds with 200 and all students associated with the teacher_id', () => {
        const teacherId = 12;
        const expectedStudents = helpers.makeExpectedStudents();

        return authenticatedUser
          .set('Authorization', `bearer ${authToken}`)
          .set('Content-Type', 'application/json')
          .get(`/api/students/${teacherId}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, expectedStudents)

      });
    });

    //POST request tests should ONLY interact with teacher_id 8 (newteacher@email.com)
    describe('POST /:teacher_id', () => {
      it('responds with 201 and the posted student', () => {
        const teacherId = 8;
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .post(`/api/students/${teacherId}`)
          .send({
            teacher_id: teacherId,
            student_first: "Test",
            student_last: "Student",
            birth_date: "01/13/1992",
            parent_email: "testparent@testparent.test"
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201)
      });
    });
  });

  context('Interacting with a single student', () => {
    const expectedStudent = {
      id: 21,
      teacher_id: 5,
      student_first: 'Charlie',
      student_last: 'Jarvis',
      birth_date: '11/19/2016',
      parent_email: 'newparent@email.com'
    }
    
    describe('GET /id/:student_id', () => {
      it('responds with 200 and the expected student', () => {
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .get(`/api/students/id/${expectedStudent.id}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, expectedStudent)
      });
    });
    describe('PUT /id/:student_id', () => {
      let studentId;
      //must only interact with teacher_id 8
      before((done) => {
        authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .get('/api/students/8')
          .then((response) => {
            studentId = response.body[0].id;
            done();
          });
      });

      it('responds with status 204 and student has been successfully modified', () => {
        const updatedStudent = {
          student_first: 'newName',
          student_last: 'testPut',
          birth_date: '00/00/0000',
          parent_email: 'newparent@testput.com'
        }

        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .put(`/api/students/id/${studentId}`)
          .send(updatedStudent)
          .expect(204)
      })
    });
    describe('DELETE /id/:student_id', () => {
      let studentIdToDelete;
      const expectedStudents = []

      //must only interact with teacher_id 8
      before((done) => {
        authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .get('/api/students/8')
          .then((response) => {
            studentIdToDelete = response.body[0].id;
            done();
          });
      });    
      
      it('responds with status 204 and student is no longer in database', () => {
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .delete(`/api/students/id/${studentIdToDelete}`)
          .expect(204)
          .then(() => {
            authenticatedUser
              .set('authorization', `bearer ${authToken}`)
              .get(`/api/students/8`)
              .expect(expectedStudents)
          })
      });
    });
  });
});