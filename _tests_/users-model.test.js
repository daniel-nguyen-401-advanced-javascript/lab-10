'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);
const UserModel = require('../lib/models/products/products-model');

describe('User CRUD Tests', () => {
  it('create', async () => {

    expect(false).toBe(true);
  });

  it('read all', async () => {

    expect(false).toBe(true);
  });

  it('read by ID', async () => {

    expect(false).toBe(true);
  });

  it('update', async () => {


    expect(false).toBe(true);
  });

  it('delete', async () => {
    
    expect(false).toBe(true);
  });
});