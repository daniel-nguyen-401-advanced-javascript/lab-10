'use strict';

/// test all defined endpoints

/// post/signin

/// post/signup-body

/// post/signup-header

/// get/users

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);


describe('All Routes Work', () => {
  it('POST /signup // user signup works via request.body', async () => {

    expect(false).toBe(true);
  });

  it('POST /signin // user signin works', async () => {

    expect(false).toBe(true);
  });

  it('GET /users // shows all users', async () => {

    expect(false).toBe(true);
  });

});