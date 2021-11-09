import express from 'express';
import tokenController from '../controllers/tokenController.js'
import {getChildren,createItem } from '../controllers/itemController.js';

const itemRouter = express.Router();

//get Children Route:
itemRouter.get('/getChildren', tokenController , getChildren);
//create universe Route: 
itemRouter.post('/createItem', tokenController , createItem);


export default itemRouter;