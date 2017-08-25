var mongoose = require('mongoose');

// Require bluebird as promise because mongoose promises are deprecated
// this was in 8.3, last activity
var Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_cmnj54rs:ior3dvol42rtpbum9bntlq8q5g@ds159013.mlab.com:59013/heroku_cmnj54rs");
var db = mongoose.connection;

db.on("error", function (error) {
    console.log("database error: ", err);
	});

db.once("open", function () {
    console.log("Mongoose is connected to the Scrapper db");
	});


// export database
module.exports = db;