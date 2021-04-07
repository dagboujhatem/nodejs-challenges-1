const express = require('express');
const router = express.Router();
// require user schema
const User = require('../models/userSchema')

// 1. get all users
router.get('/users', async (req, res)=>{
    const users = await User.find();
    res.json(users);
});

// 2. get user by id
router.get('/users/:id', async (req, res) => {
    const foundUser = await User.findById(req.params.id); 
    res.json(foundUser);
});

// 3. add user
router.post('/users', async (req, res) => {
    const createdUser = await User.create(req.body);
    res.json(createdUser);
});

// 4. update user by id
router.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedUser);
});

// 5. delete user by id
router.delete('/users/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User deleted successfully.'});
});

/** =====================================================================
 *              Filter REST APIs (Advanced level)
 *  =====================================================================
*   $gt ==>  Greeter than 
*   $lt ==> Lower than 
*   $gte ==>  Greeter than or equal
*   $lte ==> Lower than or equal
 */

 // Get all Users => supérieur à age
router.get('/users/age-gt/:age', async (req, res)=>{
    const users = await User.find({ age: { $gt: req.params.age}});
    res.json(users);
});

// Get all Users => inférieur à age
router.get('/users/age-lt/:age', async (req, res)=>{
    const users = await User.find({ age: { $lt: req.params.age}});
    res.json(users);
});

 // Get all Users => supérieur ou égal à age
 router.get('/users/age-gte/:age', async (req, res)=>{
    const users = await User.find({ age: { $gte: req.params.age}});
    res.json(users);
});

// Get all Users => inférieur ou égal à age
router.get('/users/age-lte/:age', async (req, res)=>{
    const users = await User.find({ age: { $lte: req.params.age}});
    res.json(users);
});

// Get all Users ( entre les age1 et age2 c'est à dire > age1 et < age2)
router.get('/users/age-entre/:age1/:age2', async (req, res)=>{
    const users = await User.find({ age: { $gt: req.params.age1, $lt: req.params.age2}});
    res.json(users);
});

// Get all Users (by firstName && inférieur ou égal à age)
router.get('/users/filterByFirstNameAndAge/:firstName/:age', async (req, res)=>{
    const users = await User.find({$and:[{ age: { $lte: req.params.age}},{firstName: req.params.firstName}]});
    res.json(users);
});

// Get all users (firstName or lastName is equal to name)
router.get('/users/filterByFirstNameOrLastName/:name', async (req, res)=>{
    const users = await User.find({$or: [{firstName: req.params.name}, {lastName: req.params.name}]});
    res.json(users);
});

// Get One User by email
router.get('/users/findByEmail/:email', async (req, res)=>{
    const user = await User.findOne({email: req.params.email});
    res.json(user);
});

module.exports = router;