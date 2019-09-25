const Express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors');
const rp = require('request-promise');

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors()); // ! I just put this here for ease of use right now

const Leagues = {
    mlb: 'eed38457-db28-4658-ae4f-4d4d38e9e212.json',
    nba: '6c974274-4bfc-4af8-a9c4-8b926637ba74.json',
}
const dbData = '';

// On the get request from the front end, check to see if there is data in the DB. 
app.get('/data/:id', (req, res, next) => {
    if(dbData !== '') {
        // If there is data, check to see when it was last updated
        // If its less than 15 seconds ago, return it to the front end
        // If that was greater than 15 seconds ago, call the api
            // After calling the API and returning it to the front end, cache it in the DB

        // Store that info in the DB and then return the response to the front end

    } else {
        // If there is no data, call the api
        rp(`https://chumley.barstoolsports.com/dev/data/games/${Leagues[req.params.id]}`).then((body) => {
            res.json(JSON.parse(body));
        }).catch((err) => {
            console.log(err);
        })
    }
    
});

app.listen(3000, () => {
    console.log("Listening at :3000");
});