const router = require("express").Router()
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
const express = require("express");


router.get("/api/notes",(req,res)=>{
    res.sendFile(path.join(__dirname, "../db/db.json"))
})

router.post("/api/notes", (req, res) => {
    console.log(req.body);
    const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');
  
    // Read the existing data from the JSON file
    const db = JSON.parse(fs.readFileSync(dbFilePath));
  
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
  
    db.push(newNote);
  
    // Write the updated data back to the JSON file
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
  
    // Respond to the client with a success message or appropriate status code
    res.status(200).json({ message: 'Note added successfully' });
  });
  

module.exports = router