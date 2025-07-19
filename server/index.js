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



// ===== CORS Options =====
const FrontendURL = process.env.FrontendURL
const corsOptions = {
  origin:"https://school-manage-system-mtcf.vercel.app" ,// replace with your frontend URL
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
const MONGO_URI = "mongodb://mongo:KJJadrwmUnnbUXELdzwMGQLOlcfOqGMs@shortline.proxy.rlwy.net:54105/studentdb"   //process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentdb';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// ===== Start the Server =====

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
