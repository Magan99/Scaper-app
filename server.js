var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

//Initialize app 
var app = express();

// Require routes
var routes = require("./routes");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Have every request go through route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);




// Start our server so that it can begin listening to client requests.
app.listen(process.env.PORT || 3000, function(){
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });