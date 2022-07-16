const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

const app = express();

app.use(express.json());

app.use('/', (req, res) => res.send('Flipkart Clone'));

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.log(err);
    });

app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
