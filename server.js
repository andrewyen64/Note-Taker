// Dependencies
const express = require("express");
// var path = require("path");
// const fs = require("fs");

// Sets up the Express App
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 3001;

// Sets up the Express app to Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTER: Links server.js to the html/api route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



// LISTENER: Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
