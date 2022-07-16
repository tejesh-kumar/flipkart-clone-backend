const express = require('express');
const createError = require('http-errors');

const app = express();
const PORT = process.env.PORT || 4000;

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
