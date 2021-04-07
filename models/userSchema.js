const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number
},{
    versionKey: false,
    timestamps: true
});
 
module.exports = mongoose.model('users', userSchema);