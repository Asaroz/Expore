import { Item } from '../models/itemModel.js';

export async function getItems (req, res) {
    const item = await Item.getItems(req.body, req.query);
    res.status(item.status).json(item);
};

export async function createItems (req, res) {
    if(!req.body.title) {
        res.status(400).json({ message: "Please provide a title for your Item" });
        return;
    }
    const item = await Item.createItems(req.body);
    res.status(item.status).json(item);
};

export async function deleteItems (req, res) {
    const item = await Item.deleteItems(req.query.id);
    res.status(item.status).json(item);
};

export async function moveItems (req, res) {
    const item = await Item.moveItems(req.body);
    res.status(item.status).json(item);
};

export async function hasChildren (req , res) {
    const item = await Item.hasChildren(req.query.id);
    console.log(item);
    res.status(item.status).json(item);
};