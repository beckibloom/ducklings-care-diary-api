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

  describe.only('GET /:teacher_id', () => {
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
});