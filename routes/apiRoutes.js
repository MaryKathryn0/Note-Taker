let notesDB = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');
//so we read and write files
const fs = require("fs");
const util = require("util");
const { receiveMessageOnPort } = require("worker_threads");
// adding a promise to the write file function - to be used async
const writeFileAsync = util.promisify(fs.writeFile);


module.exports = function(app) {
    
    app.get("/api/notes", function(req, res) {
        res.json(notesDB);
      });

    app.post("/api/notes", function(req, res) {
       
        let newNote = req.body;
        //generates id for me & will push with an id.
        let id = uuidv4()
        newNote.id = id 

        console.log(newNote);
      
        // We then add the json the user sent to the array notesDB
        notesDB.push(newNote);
        //rewrite file and stringify so note stays there
        writeFileAsync("./db/db.json", JSON.stringify(notesDB)).then(function(){
            res.json(newNote);
        }).catch(function(error){
            console.log(error);
        })
      
       
      });
      // this is to isolate the note being deleted by id
      app.delete("/api/notes/:id", function(req, res) {
        //res.json(notesDB);
        //variable to keep all the notes not being deleted
        let remainingNotes = notesDB.filter(note => note.id !== req.params.id)
        notesDB = remainingNotes 
        //rewrite the file, but there is no new note, so returning left over notes
        writeFileAsync("./db/db.json", JSON.stringify(notesDB)).then(function(){
            res.json(notesDB);
        }).catch(function(error){
            console.log(error);
        })
      });

  };
  
  
  