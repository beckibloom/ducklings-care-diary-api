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

describe('Diary Endpoint', () => {

  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })

  //GET /:student_id only test with student_id 12
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

  //POST /:student_id only test with student_id 17
  describe('POST /:student_id', () => {
    it('responds with 201 and the diary entry added', () => {
      return authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .post('/api/diary/17')
        .send({
          student_id: 17,
          date: new Date(),
          comment: "This is a test note for Bobby."
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
    });
  });

  describe('PUT /:student_id/:entry_id', () => {
    let entry_id;

    before((done) => {
      authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .get('/api/diary/17')
        .then((response) => {
          entry_id = response.body[0].id;
          done();
        })
    })

    it('responds with 204', () => {
      const updatedEntry = {
        comment: "Let's test this endpoint and update the comment for this entry."
      };

      return authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .put(`/api/diary/17/${entry_id}`)
        .send(updatedEntry)
        .expect(204)
    });
  });

  describe('DELETE /:student_id/:entry_id', () => {
    let entry_id;

    before((done) => {
      authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .get('/api/diary/17')
        .then((response) => {
          entry_id = response.body[0].id;
          done();
        })
    })

    it('responds with status 204 and activity is no longer in database', () => {
      return authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .delete(`/api/diary/17/${entry_id}`)
        .expect(204)
    });
  });
});