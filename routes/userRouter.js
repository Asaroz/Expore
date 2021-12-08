import express from 'express';
import tokenController from "../controllers/tokenController.js";
import {userLogin, userRegister, updateUser, updatePassword} from '../controllers/userController.js';

const userRouter = express.Router();

// Login route:
userRouter.post('/login', userLogin);
// Register route:
userRouter.post('/register', userRegister);
// Change User route:
userRouter.patch('/updateUser', tokenController, updateUser);
// Change User password:
userRouter.patch('/updatePassword', tokenController, updatePassword);


export default userRouter;