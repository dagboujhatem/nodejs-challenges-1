const express = require('express');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userSchema');

// create the storage
const myStorage = multer.diskStorage({
    destination:  (req, file, cb)=> {
        const folder = path.resolve('./uploads');
        // console.log(folder);
        cb(null, folder)
    },
    filename: async(req, file, cb) => {
        const extension = path.extname(file.originalname);
        // console.log(extension);
        const newFileName =  Date.now() + extension;
        // console.log(newFileName);

        // update the current user photo
        await User.findByIdAndUpdate(req.params.id,{photo : newFileName},{new: true})
        cb(null, newFileName);
    }
});

// File filter 
const myFileFilter =  (req, file, cb) => {
    const allowedFileExtentions = ['.jpg', '.jpeg', '.png', '.git'];
    const extension = path.extname(file.originalname);
    cb(null, allowedFileExtentions.includes(extension))
    // console.log(allowedFileExtentions.includes(extension));
    // if(allowedFileExtentions.includes(extension))
    // {
    //     cb(null, true)
    // }
    // else{
    //     cb(null, false)
    // }
}
// create the multer middleware 
const upload = multer({ storage: myStorage, fileFilter: myFileFilter, limits: {fileSize: 1024*1024*20} });

router.post('/uploadImage/:id', [passport.authenticate('bearer', { session: false }), upload.single('img')], async(req,res)=>{
    res.json({message: 'image uploaded successfully!'});
});

// uploads mutiple 
router.post('/uploadImageMultiple', [passport.authenticate('bearer', { session: false }),upload.array('img', 3)], async(req,res)=>{
    res.json({message: 'image uploaded successfully!'});
});

module.exports = router;