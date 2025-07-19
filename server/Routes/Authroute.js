import express from 'express';
const router = express.Router();

// Import controllers
import { addAdmin } from '../Controller/admin/addadmin.js';
import { login } from '../Controller/admin/adminAuth.js';
import {verifyToken} from '../middleware/veryfytioken.js';


router.post("/addadmin",verifyToken, addAdmin);
router.post("/login", login);

export default router;
