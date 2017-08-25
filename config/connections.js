var mongoose = require('mongoose');

// Require bluebird as promise because mongoose promises are deprecated
// this was in 8.3, last activity
var Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/scrapper");
var db = mongoose.connection;

db.on("error", function (error) {
    console.log("database error: ", err);
	});

db.once("open", function () {
    console.log("Mongoose is connected to the Scrapper db");
	});


// export database
module.exports = db;