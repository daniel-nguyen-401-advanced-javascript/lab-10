'use strict';

// Esoteric Resources
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const notFound = require('./middleware/404.js');

// Internal Resources
const authRouter = require('./routes/auth-router.js');

// Application-wide Middleware
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes


app.get('/', (req, res, next) => {
    res.send('Homepage');
});

app.use(authRouter);

// Error Handling
app.use('*', notFound);

// Exports
module.exports = {
    server: app,
    start: (port, mongodb_uri) => {
        app.listen(port, () => {
            console.log('Server is up and running on port', port);
        });

        // stuff to connect to MongoDB
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        };

        mongoose.connect(mongodb_uri, options);
    },
};