// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var hbs = require('express-handlebars');

// Require the routes and use them
var routes = require('./routes/routes');

// Initialize Express
var app = express();

// set the port
var port = process.env.PORT || 3000;

// set up the HBS view engine
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs', partialsDir: [__dirname + '/views/partials']}));
app.set('view engine', 'hbs');

// Use morgan for debug logging
//app.use(logger("dev"));

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// set the public static directory
app.use(express.static('public'));

// bring in the routes
app.use('/', routes);

// Start up the express server
// Listen on port 3000
app.listen(port, function() {
	console.log("Scrapper app running on port:", port);
});