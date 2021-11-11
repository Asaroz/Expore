import { Item } from '../models/itemModel.js';




export async function getItems (req, res) {
    const item = await Item.getItems(req.body);
    res.status(item.status).json(item);
};


export async function createItems (req, res) {
    if(!req.body.name){
        res.status(400).json("Please provide a name for your Item");
        return;
    }
    const item = await Item.createItems(req.body);
    res.status(item.status).json(item);
};


export async function deleteItems (req, res){
    const item = await Item.deleteItems(req.body);
    res.status(item.status).json(item);
};

export async function moveItems (req, res){
    const item = await Item.moveItems(req.body);
    res.status(item.status).json(item);
};