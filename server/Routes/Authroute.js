const express = require('express');
const router = express.Router();

// Import controllers
const { addAdmin } = require("../Controller/Admin/Addadmin");
const {login}  =require("../Controller/Admin/AdminAuth")
// const { loginAdmin } = require("../Controller/Admin/Loginadmin"); // assuming you will define this

// Routes
// router.post("/login", loginAdmin); // define this function in your controller
router.post("/addadmin", addAdmin);
router.post("/login", login);

module.exports = router;
