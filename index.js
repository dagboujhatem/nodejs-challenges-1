const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// first way (dotenv file config )
const dotenv = require('dotenv');
dotenv.config();
// second way (dotenv file config )
// require('dotenv').config()
const port = 3000;
// create an app 
const app = express();
// cors config 
app.use(cors());
// morgan 
app.use(morgan('dev'));
// body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// require schedule
const schedule= require('./schedule');

// import connection to database 
const connect = require('./database/connect');
// import routing 
const todoAPI = require('./routes/todoApi');
const userAPI = require('./routes/userApi');
const userDetailsAPI = require('./routes/userDetailsApi');
const tagsAPI = require('./routes/tagApi');
const tutorialAPI = require('./routes/tutorialApi');
const mailAPI = require('./routes/mailApi');

app.get('/', async (req, res) => {
  res.json({message: 'Hello World!'});
});

// use routing
app.use('/api/v1', todoAPI);
app.use('/api/v1', userAPI);
app.use('/api/v1', userDetailsAPI);
app.use('/api/v1', tagsAPI);
app.use('/api/v1', tutorialAPI);
app.use('/api/v1', mailAPI);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
