// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
  phonenumber :{
    type :Number
  },

  // New role field
  role: {
    type: String,
    trim:true,
    enum: ['Super Admin', 'Staff'],  // You can add more roles as needed
    default: 'Staff',
  },
  Permission :{
    type :String,
    
  }
});

module.exports = mongoose.model('Admin', adminSchema);
