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

router.get('/public', (req, res, next) => {
    res.send('this is a public route');
});

router.get('/private', auth, (req, res, next) => {
    // req.user set and req.user._id present

    if (req.user && req.user._id)
        res.send('this is a private route only for logged in users');
    else next({ err: 401, msg: 'You must be logged in to see this route' });
});

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

router.get('/read', auth, (req, res, next) => {
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

module.exports = router;