import { Universe } from '../models/universeModel.js';




export async function getChildren (req, res) {

}


export async function createUniverse (req, res) {
    if(!req.body.name){
        res.status(400).send("Please provide a name for your Universe");
        return;
    }
    const universe = await Universe.createUniverse(req.body);
    res.status(universe.status).json(universe);
}