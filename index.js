// const express = require('express');
// const app = express();
// const cors = require("cors");
// const port = 5000;
// require('dotenv').config();
// console.log('Environment Variables Loaded:', process.env.MONGODB_URI);

// const dbConnection = require("./config/dbConnection");
// const router = require("./router/router");

// app.use(cors());
// app.use(express.json());

// dbConnection();

// app.use(router);

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// index.js
const express = require("express");
const cors = require("cors");
// const passport = require("passport");
// const passportSetup =require("./passport")
const session = require("express-session");
const router = require("./router/router");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Session setup 
app.use( 
  session({
    secret: process.env.JWT_SECRET, // Ensure this is set in your .env file
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup (if you're using passport for other auth strategies)
// app.use(passport.initialize());
// app.use(passport.session());

// Use routes
app.use(router);

// Database connection
const dbConnection = require("./config/dbConnection"); 
dbConnection();

// Start the server 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
  