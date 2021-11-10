import express from 'express';
import tokenController from '../controllers/tokenController.js'
import {getItems, createItem, deleteItem } from '../controllers/itemController.js';

const itemRouter = express.Router();

//get Items Route:
itemRouter.get('/getItem', tokenController , getItems);
//create Item Route: 
itemRouter.post('/createItem', tokenController , createItem);
//remove Items Route:
itemRouter.post('/deleteItem',tokenController, deleteItem)

export default itemRouter;