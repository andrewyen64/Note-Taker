// DEPENDENCIES
const fs = require("fs");
var path = require("path");


module.exports = function(app) {
    // Reads the 'db.json' file and returns all saved notes as JSON.
    fs.readFile("db/db.json", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        let notesData = JSON.parse(data);
        console.log("Current List of All Notes: ", notesData);
        
    // Api routes
        app.get("/api/notes", function (req, res) {
            res.json(notesData);
        });

        // Receives new note to save on the request body, 
        // adds it to the 'db.json' file, and then returns the new note to the client.
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notesData.push(newNote);
            fs.writeFile("db/db.json", JSON.stringify(notesData), function(error) {
                if (error) {
                    return console.log(error);
                }
                return true;
            });
            console.log("============================================================");
            console.log("Posted newNote to api/notes: ", newNote)
            console.log("============================================================");
            console.log("Updated List of All Notes: ", 
            notesData);
        });

        // Receives a query parameter containing the id of a note to delete. 
        // This means you'll need to find a way to give each note a unique `id` when it's saved. 
        app.get("/api/notes/:id", function (req, res) {
            res.json(notesData[req.params.id]);
        });

        // Finds note with specific id and removes that note from the notesData array,
        // then rewrites the notes to the 'db.json' file.
        app.delete("/api/notes/:id", function (req, res) {
            notesData.splice(req.params.id, 1);
            fs.writeFile("db/db.json", JSON.stringify(notesData), function(error) {
                if (error) {
                    return console.log(error);
                }
                return true;
            });
            console.log("============================================================");
            console.log("Deleted selected note from api/notes")
            console.log("============================================================");
            console.log("Updated List of All Notes: ", 
            notesData);
        });

    // HTML routes            
        // Notes page route
        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        // Home page route
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

    });
}
