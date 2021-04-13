const mongoose = require('mongoose');
const tagSchema = mongoose.Schema({
    title: String,
    description: String,
    tutorials: [{type: mongoose.Schema.Types.ObjectId, ref: 'tutorials'}]
},{
    versionKey: false,
    timestamps: true
});
 
module.exports = mongoose.model('tags', tagSchema);