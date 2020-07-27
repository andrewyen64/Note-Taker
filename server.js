// Dependencies
const express = require("express");

// Sets up the Express App
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 3001;

// Sets up the Express app to Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Express looks up the files relative to the static directory, so that css/js files will run properly.
app.use(express.static(__dirname));

// ROUTER: Links server.js to the html/api route files
require("./routes/apiAndHTMLRoutes")(app);


// LISTENER: Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
