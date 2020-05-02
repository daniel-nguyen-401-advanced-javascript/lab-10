'use strict';

// Esoteric Resources
const express = require('express');

// Internal Resources
const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');
const auth = require('../middleware/auth.js');
const roles = require('../../docs/roles.json');

// Variables
const UsersModel = new Model(userSchema);
const router = express.Router();


/**
 * This route allows users to see public information
 * @route GET /public
 * @returns {object} 200 - 'this is a public route'
 */
router.get('/public', (req, res, next) => {
    res.send('this is a public route');
});

/**
 * This route allows users to see private information
 * @route GET /private
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'this is a private route only for logged in users'
 * @returns {Error}  401 - 'You must be logged in to see this route'
 */
router.get('/private', auth, (req, res, next) => {
    // req.user set and req.user._id present

    if (req.user && req.user._id)
        res.send('this is a private route only for logged in users');
    else next({ err: 401, msg: 'You must be logged in to see this route' });
});

/**
 * This route checks for superuser role
 * @route GET /private
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You have the superuser capability and can see this content'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.get('/superuser', auth, (req, res, next) => {
    // check if req.user has role.capabilities where "superuser" is included in that list
    if (req.user && req.user._id) {
        if (req.user.hasCapability('superuser')) {
            res.send(
                'You have the superuser capability and can see this content',
            );
            return;
        }
    }

    next({ err: 403, msg: 'Access not allowed' });
});

/**
 * This route checks to see if user has Update privilege
 * @route GET /update
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You have the update capability and can see this content'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.get('/update', auth, (req, res, next) => {
    if (req.user && req.user._id) {
        if (
            req.user.hasCapability('update') ||
            req.user.hasCapability('superuser')
        ) {
            res.send('You have the update capability and can see this content');
            return;
        }
    }

    next({ err: 403, msg: 'Access not allowed' });
});

/**
 * This route checks to see if user has Read privilege
 * @route GET /readonly
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You have the read capability and can see this content'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.get('/readonly', auth, (req, res, next) => {
    if (req.user && req.user._id) {
        if (
            req.user.hasCapability('read') ||
            req.user.hasCapability('superuser')
        ) {
            res.send('You have the read capability and can see this content');
            return;
        }
    }

    next({ err: 403, msg: 'Access not allowed' });
});

/**
 * This route checks to see if user has Create privilege
 * @route POST /create
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You have the create capability and can see this content'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.post('/create', auth, (req, res, next) => {
  if (req.user && req.user._id) {
      if (
          req.user.hasCapability('create') ||
          req.user.hasCapability('superuser')
      ) {
          res.send('You have the create capability and can see this content');
          return;
      }
  }

  next({ err: 403, msg: 'Access not allowed' });
});

/**
 * This route checks to see if user has Update privilege
 * @route Put /update
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You have the update capability and can see this content'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.put('/update', auth, (req, res, next) => {
  if (req.user && req.user._id) {
      if (
          req.user.hasCapability('update') ||
          req.user.hasCapability('superuser')
      ) {
          res.send('You have the update capability and can see this content');
          return;
      }
  }

  next({ err: 403, msg: 'Access not allowed' });
});

/**
 * This route checks to see if user has Delete privilege
 * @route DELETE /delete
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You have the delete capability and can see this content'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.delete('/delete', auth, (req, res, next) => {
  if (req.user && req.user._id) {
      if (
          req.user.hasCapability('delete') ||
          req.user.hasCapability('superuser')
      ) {
          res.send('You have the delete capability and can see this content');
          return;
      }
  }

  next({ err: 403, msg: 'Access not allowed' });
});

/**
 * This route checks to see if user has Superuser role
 * @route GET /everything
 * @param {string} 'Bearer tokenstring'
 * @param {string} 'Basic base64encodedstring'
 * @returns {object} 200 - 'You are the super user my dude!'
 * @returns {Error}  403 - 'Access not allowed'
 */
router.get('/everything', auth, (req, res, next) => {
  if (req.user && req.user._id) {
      if (
          req.user.hasCapability('superuser')
      ) {
          res.send('You are the super user my dude!');
          return;
      }
  }

  next({ err: 403, msg: 'Access not allowed' });
});

module.exports = router;