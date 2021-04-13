const mongoose = require('mongoose');
const tutorialSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'tags'}]
},{
    versionKey: false,
    timestamps: true
});
 
module.exports = mongoose.model('tutorials', tutorialSchema);