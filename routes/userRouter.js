import express from 'express';
import {userLogin, userRegister} from '../controllers/userController.js';

const userRouter = express.Router();

// Login route:
userRouter.post('/login', userLogin);
// Register route:
userRouter.post('/register', userRegister);

export default userRouter;