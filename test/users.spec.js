require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');

function createId() {
  return Math.random().toString(36).substr(2, 9);
}

describe('Users Endpoints', () => {
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

  context('Given user is not authenticated', () => {
    describe(`POST /users`, () => {
      it(`creates a user, responding with 201`, () => {
        const username = createId();

        const testUser = {
          username: username,
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
  });

  context(`Given user is authenticated`, () => {
    describe(`GET /users/data`, () => {
      before((done) => {
        authenticatedUser
          .post('/api/auth/login')
          .send(userCredentials)
          .then((response) => {
            authToken = response.body.authToken;
            done();
          })
      })

      it(`responds with 200 and the user type and id`, () => {
        const expectedData = {
          type: 'teacher',
          id: 5
        }
        console.log(authToken);
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`) 
          .get(`/api/users/data`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, expectedData)
      });
    });
  });
});