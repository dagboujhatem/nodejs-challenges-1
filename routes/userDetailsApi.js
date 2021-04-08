const express = require('express');
const router = express.Router();
const UserDetails = require('../models/userDetailsSchema')

router.get('/user-details', async (req, res)=>{
    const userDetails = await UserDetails.find();
    res.json(userDetails);
});

router.get('/user-details/:id', async (req, res) => {
    const foundUserDetails = await UserDetails.findById(req.params.id); 
    res.json(foundUserDetails);
});

router.post('/user-details', async (req, res) => {
    const createdUserDetails = await UserDetails.create(req.body);
    res.json(createdUserDetails);
});

router.put('/user-details/:id', async (req, res) => {
    const updatedUserDetails = await UserDetails.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedUserDetails);
});

router.delete('/user-details/:id', async (req, res) => {
    const deletedUserDetails = await UserDetails.findByIdAndDelete(req.params.id);
    res.json({message: 'User details deleted successfully.'});
});

module.exports = router;