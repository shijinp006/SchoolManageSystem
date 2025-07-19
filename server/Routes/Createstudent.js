import express from 'express';
const router = express.Router();

// Controller Imports
import { Createstudent, Viewstudentsdetails, Editstudent, Deletestudent } from '../Controller/Admin/Createstudent.js';
import {verifyToken} from '../Middleware/Veryfytioken.js';

router.post("/create-student",verifyToken,Createstudent)
router.get("/view-student",verifyToken,Viewstudentsdetails)
router.put("/edit-student/:id",verifyToken,Editstudent)
router.delete("/delete-student/:id",verifyToken,Deletestudent)

export default router;
