const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbName = 'scoreboard';
const url = 'mongodb://localhost/' + dbName;

const state = {
    db: null
};

const connect = (cb) => {
    if(state.db) {
        cb();
    }
    else {
        mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            state.db = client.db(dbName);
            cb();
        });
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = { getDB, connect, getPrimaryKey };