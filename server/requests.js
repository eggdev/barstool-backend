const collection = 'games';

const getGameData = (db, cb) => {
    db.getDB().collection(collection).find({}).toArray((err, docs) => {
        if (err) console.log(err);
        cb(docs);
    });
}

const inputGameData = (db, apiRes, cb) => {
    const newStamp = Date.now();
    db.getDB().collection(collection).insertOne({ 
        timeStamp: newStamp,
        data: apiRes
    }, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        cb(apiRes);
    });
}

const updateGameData = (db, params, cb) => {
    const newStamp = Date.now();
    db.getDB().collection(collection)
        .findOneAndUpdate({
            data: params.league
        }, {
            $set: {
                timeStamp: newStamp,
                data: params 
            }
        }, {
            returnOriginal: false
        }, (err, result) => {
            if (err) console.log(err);
            cb(result, params);
        });
}

module.exports = { getGameData, inputGameData, updateGameData };