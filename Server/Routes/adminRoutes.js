import express from 'express';
import { deleteUser, getAllUsers, dashboardStats } from '../Controllers/adminController.js';
import { isAuth, authorizedRoles } from '../Middlewares/isAuth.js';


const adminRouter = express.Router();

adminRouter.get('/get-all-users', isAuth, authorizedRoles('Admin'), getAllUsers);
adminRouter.delete('/delete-user/:id', isAuth, authorizedRoles('Admin'), deleteUser);
adminRouter.get('/fetch/dashboard-stats', isAuth, authorizedRoles('Admin'), dashboardStats);

export default adminRouter;