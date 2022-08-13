const express = require('express');
const createError = require('http-errors');

require('dotenv').config();

const { PORT } = process.env;

const db = require('./db');

const app = express();

app.use(express.json());

app.use('/', (req, res) => res.send('Flipkart Clone'));

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

// eslint-disable-next-line no-unused-vars
db.initDb((err, _db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    }
});
