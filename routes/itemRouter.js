import express from "express";
import tokenController from "../controllers/tokenController.js";
import {
    getItems,
    createItems,
    deleteItems,
    moveItems,
    getDescendants,
    updateDescription
} from "../controllers/itemController.js";

const itemRouter = express.Router();

//get items route:
itemRouter.get("/getItem", tokenController, getItems);
//create item route:
itemRouter.post("/createItem", tokenController, createItems);
//remove items route:
itemRouter.delete("/deleteItems", tokenController, deleteItems);
//move items route:
itemRouter.put("/moveItems", tokenController, moveItems);
//get all children route:
itemRouter.get("/getDescendants", tokenController, getDescendants);
//update description route:
itemRouter.patch("/updateDescription", tokenController, updateDescription);

export default itemRouter;
