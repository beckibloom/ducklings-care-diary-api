require('dotenv').config();
const app = require('../src/app');
const supertest = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');

describe('Users Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  })

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  context('Given user is not authenticated', () => {
    describe(`POST /users`, () => {
      it(`creates a user, responding with 201`, () => {
        const testUser = {
          username: 'TestUser@email.com',
          password: 'MyP@ssw0rd',
          type: 'parent'
        };

        return supertest(app)
          .post(`/api/users/`)
          .send(testUser)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201)
        });
    });
  })
});