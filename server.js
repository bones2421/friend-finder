// sett up dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// tells node we have an express app
var app = express();

// create a port for localhost(using postman)
var PORT = process.env.PORT || 8080;

// express middleware for serving static files 
app.use(express.static("app/public"));

// set up body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text({type: "text/html"}));
app.use(bodyParser.json({type: "application/*+json" }));
app.use(bodyParser.raw({type: "application/vnd.custom-type"}));


// all routes - where data is pulled from
require("./app/routing/apiroutes.js")(app);

// html routes
require("./app/routing/htmlroutes.js")(app);
// set up listener
app.listen(PORT, function(){
    console.log("app listen on port: ", PORT);
});