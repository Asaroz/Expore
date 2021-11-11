import { Item } from '../models/itemModel.js';

export async function getItems (req, res) {
    const item = await Item.getItems(req.body);
    res.status(item.status).json(item);
};

export async function createItem (req, res) {
    if(!req.body.title){
        res.status(400).json({ message: "Please provide a title for your Item" });
        return;
    }
    const item = await Item.createItem(req.body);
    res.status(item.status).json(item);
};
