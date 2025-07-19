import express from 'express';
const router = express.Router();

// Import controllers
import { addAdmin } from '../Controller/Admin/Addadmin.js';
import { login } from '../Controller/Admin/AdminAuth.js';
import {verifyToken} from '../Middleware/Veryfytioken.js';


router.post("/addadmin",verifyToken, addAdmin);
router.post("/login", login);

export default router;
