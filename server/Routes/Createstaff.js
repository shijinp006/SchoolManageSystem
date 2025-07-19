import express from 'express';
const router = express.Router();

// Controller Imports
import { Createstaff, Viewstaff, Editstaff, Deletestaff, ChangePermission, CancelPermission } from '../Controller/admin/createstaff.js';
import {verifyToken} from '../middleware/veryfytioken.js';



// Routes
router.post('/create-staff',verifyToken,Createstaff);
router.get("/view-staff",verifyToken,Viewstaff)
router.put("/edit-staff/:id",verifyToken,Editstaff)
router.delete("/delete-staff/:id",verifyToken,Deletestaff)
router.put("/change-permission/:id",verifyToken,ChangePermission)
router.put("/cancel-permission/:id",verifyToken,CancelPermission)

export default router;
