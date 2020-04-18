'use strict';

// Esoteric Resources
const express = require('express');
const bcrypt = require('bcrypt');

// Internal Resources
const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');

// Variables
const UsersModel = new Model(userSchema);
const router = express.Router();

// Route-wide Middleware

const base64Decoder = (encodedString) => {
    let data = {
        username: '',
        password: '',
    };

    // base64(username + ':' + password)

    let decodedString = Buffer.from(encodedString, 'base64').toString();
    let dataPieces = decodedString.split(':');

    data.username = dataPieces[0];
    data.password = dataPieces[1];

    return data;
};

// Routes
router.post('/signup-body', async (req, res, next) => {
    // create a user from data in req.body
    let user = await UsersModel.create(req.body);
    res.status(201);
    res.send(user);
});

router.post('/signup-headers', async (req, res, next) => {
    // create a user from data in req.headers.authorization
    let basicAuth = req.headers.authorization.split(' ');

    if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
        let userData = base64Decoder(basicAuth[1]);
        let user = await UsersModel.create({ ...userData, ...req.body });
        res.send(user);
    }

    res.end();
});

router.post('/signin', async (req, res, next) => {
    // get user data from encoded Basic Auth
    let basicAuth = req.headers.authorization.split(' ');

    if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
        let userData = base64Decoder(basicAuth[1]);

        let possibleUsers = await UsersModel.readByQuery({
            username: userData.username,
        });

        for (let i = 0; i < possibleUsers.length; i++) {
            let isSame = await bcrypt.compare(
                userData.password,
                possibleUsers[i].password,
            );

            if (isSame) {
                req.user = possibleUsers[i];
                break;
            }
        }

        if (req.user) {
            res.status(200);
            res.send('found!');
        } else {
            next({ status: 401, message: 'Unauthorized' });
        }
    }

    res.end();
});

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

// Error Handling

// Exports
module.exports = router;