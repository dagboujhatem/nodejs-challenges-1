const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database001', {useNewUrlParser: true, useUnifiedTopology: true})
.then((success) => {
    console.log("=> Successfully connection to database")
}).catch((error) => {
     console.log("=> Connect with error") 
});