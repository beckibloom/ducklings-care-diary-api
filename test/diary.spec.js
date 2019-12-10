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
  username: 'newteacher@email.com',
  password: 'Password123!'
};

let authToken;

const authenticatedUser = request.agent(app);

describe.only('Diary Endpoint', () => {

  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })

  //GET /:student_id only tested with student_id 12
  describe('GET /:student_id', () => {
    it('responds with 200 and diary entries for given student_id', () => {
      const expectedEntries = helpers.makeExpectedEntries();
      return authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .get('/api/diary/12')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, expectedEntries)
    });
  });

});