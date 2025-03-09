import express from 'express';
import upload from '../middlewares/multerHandler.js';

import { UserCreate } from '../controllers/Employee/userCreate.Controller.js';
import { AdminCreate } from '../controllers/Admin/adminCreate.Controller.js';
import { CreateIssue } from '../controllers/Issue/issueCreate.Controller.js'; 
import { Login } from '../controllers/login.Controller.js';
import { GetAdminUsers } from '../controllers/Admin/getAdminUser.Controller.js';
import { GetIssueByAdmin } from '../controllers/Issue/getIssueByAdmin.Controller.js';
import { GetEmployee } from '../controllers/Employee/getEmployee.Controller.js';
import { DeleteEployee } from '../controllers/Employee/deleteEmployee.Controller.js';
import { DeleteAdmin } from '../controllers/Admin/deleteAdmin.Controller.js';
import { UpdateIssue } from '../controllers/Issue/updateIssue.Controller.js';

const router = express.Router();

router.post('/userCreate', upload.fields([{ name: "EmployeeImage", maxCount: 1 }]), UserCreate);
router.post('/adminCreate', upload.fields([{ name: "AdminImage", maxCount: 1 }]), AdminCreate);
router.post('/createIssue', upload.fields([{ name: "IssueImage", maxCount: 1}]), CreateIssue);
router.post('/login', Login);
router.get('/getAllUsersUnderAdmin', GetAdminUsers);
router.get('/getEmployee', GetEmployee);
router.get('/getIssueByAdmin', GetIssueByAdmin);
router.delete('/deleteEmployee', DeleteEployee);
router.delete('/deleteAdmin', DeleteAdmin);
router.patch('/updateIssue', UpdateIssue);

export default router;