/* eslint-disable prettier/prettier */
// app.js

const express = require('express');
const cors = require('cors');
// Accessing the path module
const path = require("path");
const connectDB = require('./config/db');


// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 5001;




// Step 1:
app.use(express.static(path.resolve(__dirname, "./front-end/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./front-end/build", "index.html"));
});


app.listen(port, () => console.log(`Server running on port ${port}`));


// connectDB();
// if(process.env.NODE_ENV == 'production'){
//   app.use(express.static(__dirname+'/../client/build'));
//   app.get('*',(req,res) =>{
//     res.sendFile(__dirname+'/../client/build/index.html')
//   });
//   }else{
//     app.get('/', (req,res) => res,send('API running on port ${port}'))
//   }
