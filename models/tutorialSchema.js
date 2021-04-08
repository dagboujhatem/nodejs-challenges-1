const mongoose = require('mongoose');
const tutorialSchema = mongoose.Schema({
    title: String,
    description: String
},{
    versionKey: false,
    timestamps: true
});
 
module.exports = mongoose.model('tutorials', tutorialSchema);