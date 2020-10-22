let notesDB = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
    
    app.get("/api/notes", function(req, res) {
        res.json(notesDB);
      });

    app.post("/api/notes", function(req, res) {
       
        let newNote = req.body;

        console.log(newNote);
      
        // We then add the json the user sent to the array notesDB
        notesDB.push(newNote);
      
        // We then display the JSON to the users
        res.json(newNote);
      });

  };
  
  
  