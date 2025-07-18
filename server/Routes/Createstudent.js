const express = require('express');
const router = express.Router();

// Controller Imports
const {Createstudent,Viewstudentsdetails,Editstudent,Deletestudent} = require('../Controller/Admin/Createstudent');
const verifyToken = require("../Middleware/Veryfytioken")

router.post("/create-student",verifyToken,Createstudent)
router.get("/view-student",verifyToken,Viewstudentsdetails)
router.get("/view-student",verifyToken,Viewstudentsdetails)
router.put("/edit-student/:id",verifyToken,Editstudent)
router.delete("/delete-student/:id",verifyToken,Deletestudent)

module.exports = router