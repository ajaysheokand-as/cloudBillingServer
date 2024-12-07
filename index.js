const express = require("express");
const cors = require("cors");
// const passport = require("passport");
// const passportSetup =require("./passport")
const session = require("express-session");
const router = require("./router/router");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const allowedOrigins = ['https://cloudrasoi.com','https://www.cloudrasoi.com', 'http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow requests with no origin (like mobile apps or Postman)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If using cookies or authorization headers
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Middleware setup
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

app.get('/',(req, res)=>{
  res.send(`Server is running on ${port}`)
})

// Start the server 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
  