import { Item } from '../models/itemModel.js';

export async function getItems(req, res) {
    const item = await Item.getItems(req.body, req.query);
    res.status(item.status).json(item);
};

export async function createItems(req, res) {
    if(!req.body.title) {
        res.status(400).json({ message: "Please provide a title for your Item" });
        return;
    }
    const item = await Item.createItems(req.body);
    res.status(item.status).json(item);
};

export async function deleteItems(req, res) {
    const item = await Item.deleteItems(req.body, req.query);
    res.status(item.status).json(item);
};

export async function moveItems (req, res) {
    const item = await Item.moveItems(req.body);
    res.status(item.status).json(item);
};

export async function hasChildren(req, res){
    const item = await Item.hasChildren(req.body);
    res.status(item.status).json(item);
};

export async function getDescendants(req, res) {
    const item = await Item.getDescendants(req.body, req.query);
    res.status(item.status).json(item);
}

export async function deleteDescendants(req , res){
    const item = await Item.deleteDescendants(req.body, req.query);
    res.status(item.status).json(item);
}