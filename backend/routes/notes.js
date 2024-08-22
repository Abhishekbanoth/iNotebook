const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes'); // Adjust the path as necessary
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


//ROUTE 1 :GET all the notes using GET:"/api/notes/getuser" login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const note = await Notes.find({ user: req.user.id });
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//ROUTE 2 :Add a new notes using POST:"/api/notes/addnotes"    Login required
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // // Check if the note already exists
        // let note = await Notes.findOne({ title });
        // if (Notes) {
        //     return res.status(400).json({ errors: 'Note already exists' });
        // }
        //create a new note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//ROUTE 3 :UPDATE an existing notes using PUT:"/api/notes/updatenotes"    Login required
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create new note Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let notes = await Notes.findById(req.params.id)
        if (!notes) {
            return res.status(404).send("Not Found")
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(4011).send("Not Allowed");
        }
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ notes })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//ROUTE 4 :DELETE an existing notes using DELETE:"/api/notes/deletenotes"    Login required
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {        
        //Find the note to be deleted and delete it
        let notes = await Notes.findById(req.params.id)
        if (!notes) {
            return res.status(404).send("Not Found")
        }
        // Allow deletion only if user owns this note
        if (notes.user.toString() !== req.user.id) {
            return res.status(4011).send("Not Allowed");
        }
        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Succes":"Note has been deleted",notes:notes })
    }
    catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
}
})

module.exports = router

