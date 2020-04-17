'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);
const Model = require('../lib/models/model.js');
const userSchema = require('../lib/models/user-schema.js');
const UsersModel = new Model(userSchema);


beforeAll(async () => {
  await UsersModel.create({
    username: 'testUser1',
    password: 'testPass1',
    fname: 'Alpha',
    lname: 'Bet',
  });

  await UsersModel.create({
    username: 'testUser2',
    password: 'testPass2',
    fname: 'Beta',
    lname: 'Fish',
  });
});

describe('User CRUD Tests', () => {
  it('can create a new user', async () => {
    let response = await UsersModel.create({
      username: 'testcreate',
      password: 'createpass',
    });

    expect(response).toBeTruthy();
    expect(response.username).toBe('testcreate');
  });

  it('can read all users', async () => {
    let results = await UsersModel.readByQuery({});

    expect(results.length).toBe(3);
  });

  it('can delete a newly created user', async () => {
    let newUser = await UsersModel.create({
      username: 'deleteme',
      password: 'medelete',
    });

    let deletedResult = await UsersModel.delete(newUser._id);
    
    expect(deletedResult).toBe(newUser._id);
  });

  it('can delete an existing user', async () => {
    let records = await UsersModel.readByQuery({ username: 'testUser1'});
    expect(records.length).toBe(1);
    let testId = records[0]._id;
    let deletedResult = await UsersModel.delete(testId);
    expect(deletedResult).toBe(testId);
  });
});