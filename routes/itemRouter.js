import express from 'express';
import tokenController from '../controllers/tokenController.js'
import {getItems, createItems, deleteItems, moveItems , hasChildren, getDescendants} from '../controllers/itemController.js';

const itemRouter = express.Router();

//get Items Route:
itemRouter.get('/getItem', tokenController , getItems);
//create Item Route: 
itemRouter.post('/createItem', tokenController , createItems);
//remove Items Route:
itemRouter.delete('/deleteItems',tokenController, deleteItems);
//move Items Route: 
itemRouter.put('/moveItem',tokenController, moveItems);
//check Children Route:
itemRouter.get('/hasChildren', tokenController, hasChildren)
//get all Children Route:
itemRouter.get('/getDescendants',tokenController, getDescendants)



export default itemRouter;