import express from 'express';
import tokenController from './tokenController.js'
import {getChildren,createUniverse } from '../controllers/universeController.js';

const universeRouter = express.Router();

//get Children Route:
userRouter.get('/getChildren', tokenController , getChildren);
//create universe Route:
userRouter.get('/createUniverse', tokenController , createUniverse);


export default universeRouter;