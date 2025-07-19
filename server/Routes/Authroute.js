import express from 'express';
const router = express.Router();

// Import controllers
import { addAdmin } from '../Controller/Admin/addadmin.js';
import { login } from '../Controller/Admin/adminAuth.js';
import {verifyToken} from '../Middleware/Veryfytioken.js';


router.post("/addadmin",verifyToken, addAdmin);
router.post("/login", login);

export default router;
