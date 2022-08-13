const mongodb = require('mongodb');

const { MongoClient } = mongodb;
const { MONGODB_URI } = process.env;

// eslint-disable-next-line no-underscore-dangle
let _db;

// eslint-disable-next-line consistent-return
const initDb = (callback) => {
    if (_db) {
        console.log('database is already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(MONGODB_URI)
        .then((client) => {
            _db = client.db();
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
};

module.exports = { initDb, getDb };
