const express = require('express');
const router = express.Router();

// Import controllers
const { addAdmin } = require("../Controller/Admin/addadmin");
const {login}  =require("../Controller/Admin/adminAuth")
const verifyToken = require("../Middleware/veryfytioken") 

router.post("/addadmin",verifyToken, addAdmin);
router.post("/login", login);

module.exports = router;
