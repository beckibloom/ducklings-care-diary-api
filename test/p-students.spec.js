require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.set('db', db);

const userCredentials = {
  username: 'newparent@email.com',
  password: 'Password123!'
};

let authToken;

const authenticatedUser = request.agent(app);

describe(`Students Endpoint (as parent)`, () => {

  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })

  context('Interacting with a single student', () => {
    const expectedStudent = {
      id: 21,
      teacher_id: 5,
      student_first: 'Charlie',
      student_last: 'Jarvis',
      birth_date: '11/19/2016',
      parent_email: 'newparent@email.com'
    }
    
    describe('GET /', () => {
      it('responds with 200 and gets expected student by parent email', () => {
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .get(`/api/students/`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, expectedStudent)
      });
    });
  });
});