/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
/* eslint-disable prettier/prettier */
// app.js

const express = require('express');
const cors = require('cors');
// const path = require("path");
const connectDB = require('./config/db');


// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
// connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 5001;




// // Step 1:
// app.use(express.static(path.resolve(__dirname, "./front-end/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./front-end/build", "index.html"));
// });


connectDB();
if (process.env.NODE_ENV === 'production') {
  // serve front-end client from build folder
  app.use(express.static(__dirname+'/front-end/build'));
  app.get('*', (req, res) =>{
    res.sendFile(__dirname+'/front-end/build/index.html')
  });
  
} else {
  app.get('/', (req, res) => res.send(`API running on port ${port}`));
}

app.listen(port, () => console.log(`Server running on port ${port}`));