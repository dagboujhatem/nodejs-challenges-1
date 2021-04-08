const express = require('express');
const router = express.Router();
const Tutorial = require('../models/tutorialSchema')

router.get('/tutorials', async (req, res)=>{
    const tutorials = await Tutorial.find();
    res.json(tutorials);
});

router.get('/tutorials/:id', async (req, res) => {
    const foundTutorial = await Tutorial.findById(req.params.id); 
    res.json(foundTutorial);
});

router.post('/tutorials', async (req, res) => {
    const createdTutorial = await Tutorial.create(req.body);
    res.json(createdTutorial);
});

router.put('/tutorials/:id', async (req, res) => {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedTutorial);
});

router.delete('/tutorials/:id', async (req, res) => {
    const deletedTutorial = await Tutorial.findByIdAndDelete(req.params.id);
    res.json({message: 'Tutorial deleted successfully.'});
});

module.exports = router;