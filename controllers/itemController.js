import { Item } from '../models/itemModel.js';




export async function getChildren (req, res) {

}


export async function createItem (req, res) {
    if(!req.body.name){
        res.status(400).json("Please provide a name for your Item");
        return;
    }
    const item = await Item.createItem(req.body);
    res.status(item.status).json(item);
}
