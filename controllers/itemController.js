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
    if (!req.query._id) {
        res.status(400).json({ message: "Request doesn't have an Id" });
        return;
    }
    const item = await Item.deleteItems(req.body, req.query);
    res.status(item.status).json(item);
};

export async function moveItems (req, res) {
    const item = await Item.moveItems(req.body);
    res.status(item.status).json(item);
};

export async function getDescendants(req, res) {
    const item = await Item.getDescendants(req.body, req.query);
    res.status(item.status).json(item);
}

export async function updateDescription(req, res) {
    if (!req.body.description) {
        res.status(400).json({ message: "Please provide a valid description" });
        return;
    }
    if (!req.body._id) {
        res.status(400).json({ message: "Request doesn't have an Id" });
        return;
    }
    const item = await Item.updateDescription(req.body);
    res.status(item.status).json(item);
}



