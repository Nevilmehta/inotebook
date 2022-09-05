const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes= require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes: GET "/api/notes/createuser". No login required

router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



//ROUTE 2: Add a new note: POST "/api/notes/addnote". No login required

router.post('/addnotes', fetchuser,[
    body('title','Enter a valid title').isLength({min : 3}),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 }),
],async(req, res)=>{

    const {title, description, tag}= req.body;
    //errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const notes= new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



//ROUTE 3: Update an existing note: PUT "/api/notes/updatenote". No login required
router.put('/updatenotes/:id', fetchuser,async(req, res)=>{
    const {title, description, tag} = req.body;

    try {
        //create a new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated and update it 
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }   
})




//ROUTE 4: Delete an existing note: DELETE "/api/notes/deletenote". No login required
router.delete('/deletenotes/:id', fetchuser,async(req, res)=>{

    try {
        //find the note to be deleted and delete it 
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        //allow deletion if user only owns this notes
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})
module.exports = router