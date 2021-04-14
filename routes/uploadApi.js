const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// create the storage
const myStorage = multer.diskStorage({
    destination:  (req, file, cb)=> {
        const folder = path.resolve('./uploads');
        // console.log(folder);
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        // console.log(extension);
        const newFileName =  Date.now() + extension;
        // console.log(newFileName);
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
const upload = multer({ storage: myStorage, fileFilter: myFileFilter, limits: {fileSize: 1024*20} });

router.post('/uploadImage', upload.single('img'), async(req,res)=>{
    res.json({message: 'image uploaded successfully!'});
});

module.exports = router;