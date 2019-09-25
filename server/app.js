const Express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/foreplay-gods-are-cool', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
    console.log("Listening at :3000");
});