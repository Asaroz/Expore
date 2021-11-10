import express from 'express';
import tokenController from '../controllers/tokenController.js'
import {getItems,createItem } from '../controllers/itemController.js';

const itemRouter = express.Router();

//get Children Route:
itemRouter.get('/getItem', tokenController , getItems);
//create universe Route: 
itemRouter.post('/createItem', tokenController , createItem);


export default itemRouter;