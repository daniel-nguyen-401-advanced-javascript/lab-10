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
    
    //expect status
    //expect(response.status).toBe(201)
    //expect(response.body._id).toBeDefined()
    //expect(response.body.password).toBeDefined()
    //expect(response.body.password).not.toBe('testPass)
    //expect pw that doesnt match input pass
    //expect new id
    //use mockRequest.post('/signup').send({}) instead of await UsersMode.create({})
    expect(userTest.username).toBe('testUser');
  });

  it('POST /signin // user signin works', async () => {
   let response = await (mockRequest.post('/signin')).auth('testUser', 'testPass');



    //check the response for correct status
    //check user record of who was signed in
    //expect(response.body.username).toBe('testUser')
    //change the res.send('found') to be res.send(req.user)
    //easier to check response that way
    expect(response.status).toBe(200);
  });

  it('GET /users // shows all users', async () => {
    let results = await UsersModel.readByQuery({});

    expect(results.length).toBe(1);
  });

});