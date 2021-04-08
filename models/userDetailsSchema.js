const mongoose = require('mongoose');
const userDetailsSchema = mongoose.Schema({
    address: String,
    zipCode: String,
    city: String
},{
    versionKey: false,
    timestamps: true
});
 
module.exports = mongoose.model('userDetails', userDetailsSchema);