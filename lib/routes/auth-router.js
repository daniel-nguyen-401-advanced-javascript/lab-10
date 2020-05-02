'use strict';

// Esoteric Resources
const express = require('express');
const bcrypt = require('bcrypt');

// Internal Resources
const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');
const auth = require('../middleware/auth.js');

// Variables
const UsersModel = new Model(userSchema);
const router = express.Router();

// Route-wide Middleware

// Routes

/**
 * This route allows users to sign up
 * @route POST /signup
 * @param {object} { username: username, password: password}
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 201 - user data, token
 * @returns {Error}  401 - 'User already exists'
 */
router.post('/signup', auth, async (req, res, next) => {
    if (req.user.username && !req.user._id) {
        console.log('in the signup if');
        let user = await UsersModel.create({ ...req.user, ...req.body });
        let token = await user.generateToken();
        //let token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.status(201);
        res.send({ user, token });
        return;
    } else {
        next({ err: 401, msg: 'User already exists' });
    }
});

/**
 * This route allows users to sign in
 * @route POST /signin
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'youdidit'
 * @returns {Error}  401 - 'User not found'
 */
router.post('/signin', auth, async (req, res, next) => {
    if (req.user._id) {
        res.status(200);
        console.log(req.user);
        let token = req.user.generateToken();
        console.log('token', token);
        //let token = jwt.sign({ _id: req.user._id }, process.env.SECRET);
        // res.send({ user: req.user, token: token });
        res.send('youdidit');
        return;
    } else {
        next({ err: 401, msg: 'User not found' });
    }
});

/**
 * This route allows users to see hidden information
 * @route GET /hidden
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'Secret information that only logged in users can see'
 * @returns {Error}  401 - 'Not logged in / invalid token'
 */
router.get('/hidden', auth, async (req, res, next) => {
    if (req.user && req.user._id) {
        res.status(200);
        res.send('Secret information that only logged in users can see');
    } else {
        next({ err: 401, msg: 'Not logged in / invalid token' });
    }
});

/**
 * This route allows users to see all registered users
 * @route GET /users
 * @returns {object} 200 - Object of user data
 */
router.get('/users', async (req, res, next) => {
  let results = await UsersModel.readByQuery({});
  let count = results.length;
  res.send({count, results});
});

router.get('/users/:id', async (req, res, next) => {
  let results = await UsersModel.read(req.params.id);
  res.send(results);
})

router.delete('/users/:id', async (req, res, next) => {
  let results = await UsersModel.delete(req.params.id);
  res.send('Deleted ' + results);
})


// Exports
module.exports = router;