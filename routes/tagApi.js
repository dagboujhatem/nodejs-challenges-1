const express = require('express');
const router = express.Router();
const Tag = require('../models/tagSchema')

router.get('/tags', async (req, res)=>{
    const Tags = await Tag.find();
    res.json(Tags);
});

router.get('/tags/:id', async (req, res) => {
    const foundTag = await Tag.findById(req.params.id); 
    res.json(foundTag);
});

router.post('/tags', async (req, res) => {
    const createdTag = await Tag.create(req.body);
    res.json(createdTag);
});

router.put('/tags/:id', async (req, res) => {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedTag);
});

router.delete('/tags/:id', async (req, res) => {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    res.json({message: 'Tag deleted successfully.'});
});

module.exports = router;