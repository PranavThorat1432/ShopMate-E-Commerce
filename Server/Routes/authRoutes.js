import express from 'express';
import { forgotPassword, getUser, login, logout, register, resetPassword, updatePassword, updateProfile } from '../Controllers/authController.js';
import { isAuth } from '../Middlewares/isAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/getUser', isAuth, getUser);
authRouter.get('/logout', isAuth, logout);
authRouter.post('/password/forgot-password', forgotPassword);
authRouter.put('/password/reset/:token', resetPassword);
authRouter.put('/password/update', isAuth, updatePassword);
authRouter.put('/update-profile', isAuth, updateProfile);

export default authRouter;