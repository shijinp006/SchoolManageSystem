const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ===== Load Environment Variables =====
dotenv.config();

const app = express();


const Addadmin = require("../server/Routes/authroute")
const Createstaff = require("../server/Routes/createstaff")
const Createstudent = require("../server/Routes/createstudent")
// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });


// ===== CORS Options =====
const FrontendURL = process.env.FrontendURL
const MONGO_URI = process.env.MONGO_URI
console.log(FrontendURL);

const corsOptions = {
  origin:process.env.FrontendURL ,// replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // allow cookies if needed
};

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
