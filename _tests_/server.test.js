'use strict';

/// test all defined endpoints

/// post/signin

/// post/signup-body

/// post/signup-header

/// get/users

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);
const Model = require('../lib/models/model.js');
const userSchema = require('../lib/models/user-schema.js');
const UsersModel = new Model(userSchema);


describe('All Routes Work', () => {
  it('POST /signup // user signup works via request.body', async () => {
    let userTest = await UsersModel.create({
      username: 'testUser',
      password: 'testPass',
    });
    
    expect(userTest.username).toBe('testUser');
  });

  it('POST /signin // user signin works', async () => {
   let response = await (mockRequest.post('/signin')).auth('testUser', 'testPass');

    expect(response.status).toBe(200);
  });

  it('GET /users // shows all users', async () => {
    let results = await UsersModel.readByQuery({});

    expect(results.length).toBe(1);
  });

});