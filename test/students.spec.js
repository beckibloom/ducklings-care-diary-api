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

describe(`Students Endpoint`, () => {

  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })

  describe('GET /:teacher_id', () => {
    it('responds with 200 and all students associated with the teacher_id', () => {
      const teacherId = 5;
      const expectedStudents = helpers.makeExpectedStudents();

      return authenticatedUser
        .set('Authorization', `bearer ${authToken}`)
        .set('Content-Type', 'application/json')
        .get(`/api/students/${teacherId}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, expectedStudents)

    });
  });

  //POST request tests should ONLY interact with teacher_id 5 (teacher@email.com)
  describe('POST /:teacher_id', () => {
    it('responds with 201 and the posted student', () => {
      const teacherId = 5;
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
  })
});