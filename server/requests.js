const collection = 'games';

const getGameData = (db, cb) => {
    db.getDB().collection(collection).find({}).toArray((err, responseData) => {
        if (err) console.log(err);
        cb(responseData);
    });
}

const inputGameData = (db, apiRes, cb) => {
    const newStamp = new Date();
    db.getDB().collection(collection).insertOne({ 
        timeStamp: newStamp,
        data: apiRes
    }, (err, result) => {
        if (err) console.log(err);
        cb(apiRes);
    });
}

const updateGameData = (db, id, params, cb) => {
    const newStamp = new Date();
    db.getDB().collection(collection)
        .findOneAndUpdate({
            _id: id
        }, {
            $set: {
                timeStamp: newStamp,
                data: params 
            }
        }, (err, result) => {
            if (err) console.log(err);
            cb(result, params);
        });
}

module.exports = { getGameData, inputGameData, updateGameData };