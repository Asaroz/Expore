import { Item } from '../models/itemModel.js';


//recursive function that returns nothing but edits the descendants array by reference which is given into it
export async function getAllDescendants(parentId, descendants, userId) {
    const children = await Item.find({ parentId: parentId, userId: userId });
    //children.map returns an array of promises which need to be awaited
    const promises = children.map(child => {
        descendants.push(child._id);
        return getAllDescendants(child._id, descendants, userId);
     });
     //we make sure that every promise of children.map is done until we exit the function
     await Promise.all(promises);
};