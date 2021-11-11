import express from 'express';
import tokenController from '../controllers/tokenController.js'
import {getItems, createItems, deleteItems, moveItems } from '../controllers/itemController.js';

const itemRouter = express.Router();

//get Items Route:
itemRouter.get('/getItem', tokenController , getItems);
//create Item Route: 
itemRouter.post('/createItem', tokenController , createItems);
//remove Items Route:
itemRouter.post('/deleteItem',tokenController, deleteItems);
//move Items Route: 
itemRouter.post('/moveItem',tokenController, moveItems);


export default itemRouter;