const Express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors');
const request = require('request');
const path = require('path');
const db = require('./db');
const reqs = require('./requests');

const app = Express();
app.use(BodyParser.json());

const assert = require('assert');

app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors()); // ! I just put this here for ease of use right now
const port = '3000';

const Leagues = {
    mlb: 'eed38457-db28-4658-ae4f-4d4d38e9e212.json',
    nba: '6c974274-4bfc-4af8-a9c4-8b926637ba74.json',
}
function getGameDataFromAPI(leagueName) {
    return new Promise((resolve, reject) => {
        request(`https://chumley.barstoolsports.com/dev/data/games/${leagueName}`, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        });
    })
}

app.get('/data/:id', (req, res) => {
    // On the get request from the front end, check to see if there is data in the DB. 
    const now = new Date();
    reqs.getGameData(db, (gameDataResponse) => {
        let oldTime;
        let difference;
        if((gameDataResponse.length > 0)) {
            oldTime = new Date(gameDataResponse[0].timeStamp);
            difference = ((now.getTime() - oldTime.getTime()) / 1000);
        }
        // Check to see if any data is in the Database
        const index = gameDataResponse.findIndex((i) => {
            return i.data.league.toLowerCase() === req.params.id;
        });

        // if data is missing
        if (index === -1) {
            // Input the data into DB
            getGameDataFromAPI(Leagues[req.params.id]).then((data) => {
                reqs.inputGameData(db, data, (newGameDataResponse) => {
                    res.json(newGameDataResponse);
                    return;
                })
            })
        // If data is older than 15 seconds
        } else if (difference > 15) {
            // Get data from API again
            getGameDataFromAPI(Leagues[req.params.id]).then((data) => {
                // And update the id with new info
                reqs.updateGameData(db, gameDataResponse[0]._id, data, (updatedGameDataResponse, newData) => {
                    res.json(newData);
                    return;
                })
            })
        } else {
            res.json(gameDataResponse[index].data);
            return;
        }
    })
});


db.connect((err) => {
    if (err) {
        process.exit(1);
        throw err;
    };
    console.log('We got data in this base');
    app.listen(port, () => {
        console.log(`Free Tacos at port: ${port}`);
    });
})