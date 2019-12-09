require('dotenv').config();
const app = require('../src/app');
const supertest = require('supertest');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})

app.set('db', db);

const userCredentials = {
  username: "teacher@email.com",
  password: "Password123!",
  type: "teacher"
};

describe('Auth Endpoint', () => {
  describe(`POST /login`, () => {
    it('responds with 200 and authToken', () => {
      return supertest(app)
        .post(`/api/auth/login`)
        .send(userCredentials)
        .expect(200)
    });
  });
});