// DEPENDENCIES
const fs = require("fs");
var path = require("path");


module.exports = function(app) {
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    fs.readFile("db/db.json", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        let notesData = JSON.parse(data);
        console.log(notesData);
        
    // Api routes
        app.get("/api/notes", function (req, res) {
            res.json(notesData);
        });

    // POST `/api/notes` - Should receive a new note to save on the request body, 
    // add it to the `db.json` file, and then return the new note to the client.
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notesData.push(newNote);
            fs.writeFile("db/db.json", JSON.stringify(notesData, "\t"), function(error) {
                if (error) {
                    return console.log(error);
                }
                return true;
            });
            // return res.json(notesData)
        });

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
    // This means you'll need to find a way to give each note a unique `id` when it's saved. 
        app.get("/api/notes/:id", function (req, res) {
            // display json for the notes array indices of the provided id
            res.json(notesData[req.params.id]);
        });

    // In order to delete a note, you'll need to read all notes from the `db.json` file, 
    // remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
        app.delete("/api/notes/:id", function (req, res) {
            notesData.splice(req.params.id, 1);
            fs.writeFile("db/db.json", JSON.stringify(notesData, "\t"), function(error) {
                if (error) {
                    return console.log(error);
                }
                return true;
            });
        });

    // HTML routes    
        // Home page route
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        // Notes page route
        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        

    });
}
