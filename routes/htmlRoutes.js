// DEPENDENCIES
var path = require("path");

// HTML ROUTES

module.exports = function(app) {

    // Home Page route
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // Notes Page route
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    // Default route if no matching route is found
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};