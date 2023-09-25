const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const scrapeProducts = require("./scraper");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//middleware
app.use('/',scrapeProducts);

//server listening
server = app.listen(port, () => {
    console.log("Server is listening on 3000");
});

module.exports = server;
