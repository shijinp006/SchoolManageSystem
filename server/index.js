const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const session = require('express-session');


// ===== Load Environment Variables =====
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Addadmin = require("./Routes/authroute")
const Createstaff = require("./Routes/createstaff")
const Createstudent = require("./Routes/createstudent")

console.log(__dirname,"dir");


// ===== CORS Options =====
const FrontendURL = process.env.FrontendURL
const MONGO_URI = process.env.MONGO_URI
console.log(FrontendURL);

const corsOptions = {
  origin:process.env.FrontendURL ,// replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // allow cookies if needed
};

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // use true if you are using HTTPS
}));

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form submissions


app.use("/Admin",Addadmin)
app.use("/Admin",Createstaff)
app.use("/Admin",Createstudent)
// ===== MongoDB Connection =====


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ===== Start the Server =====

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
