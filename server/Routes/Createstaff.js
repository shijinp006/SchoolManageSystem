const express = require('express');
const router = express.Router();

// Controller Imports
const { Createstaff,Viewstaff,Editstaff,Deletestaff } = require('../Controller/Admin/Createstaff');
const verifyToken = require("../Middleware/Veryfytioken")

// Routes
router.post('/create-staff',verifyToken,Createstaff);
router.get("/view-staff",verifyToken,Viewstaff)
router.put("/edit-staff/:id",verifyToken,Editstaff)
router.delete("/delete-staff/:id",verifyToken,Deletestaff)

module.exports = router;
