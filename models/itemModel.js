import mongoose  from 'mongoose';
import { getAllDescendants } from '../libs/itemFunctions.js';
import dotenv from 'dotenv';

const itemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        minLength: 2,
        maxLength: 60
    },
    universeId:{
        type:String
    },
    userId: { 
        type: String, 
        required: true 
    },
    description:{
        type: String,
        maxLength: 9000, /* 3 pages */
    },
    imgPath:{
        type: String
    },
    parentId:{ 
        type: String
    },
    referenceId:{
        type: [String]
    },
    isRoot:{
        type: Boolean,
        default: false
    },
});

itemSchema.statics.getItems = async (userData, queryData) => {
    try {
        // user data comes from token, query data come from GET request
        const item = await Item.find({ ...userData, ...queryData});
        return { 
            message:  `${item.length} items found`,
            status: 200,
            items: [...item]
        };
    } catch (error){
        console.log(error);
        return { message: "no items found", status: 400 };
    }
};

itemSchema.statics.createItems = async (userData) => {
    try {
        const item = await Item.create(userData);
        if (!item.universeId){
            await Item.findByIdAndUpdate(item._id,{universeId: item._id});
        }
        return { message: `Item ${item.title}, with the Id: ${item._id} successfully created`, status: 201 , _id: item._id };
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", status: 400 };
    }
};



//userData needs to have a new Property called newParentId 
itemSchema.statics.moveItems = async (userData) => {
    try {
        // we deconstruct the userData which is "req.body" into the newParentId and searchData.
        // searchData now includes only properties that are part of the item Schema
        const { newParentId, ...searchData } = userData
        const item = await Item.updateMany(searchData, {parentId: newParentId});
        return { 
            message: `${item.length} items moved to ${newParentId}`,
            status: 200
        };
    } catch (error) {
        console.log(error);
        return { message: "Not able to move items" , status: 400 };
    }  
};

//parentData only needs to contain the parentID
itemSchema.statics.getDescendants = async (userData, parentData) => {
    //this array will be given into the imported function getAllDescendants
    //where it will be edited by reference
    let descendants = [];
    let allItems = [];
    let validParents = [];
    try{
        await getAllDescendants(parentData._id, descendants, userData.userId);
        const children = await Item.find({parentId:parentData._id});

        const universe = await Item.find({universeId: parentData.universeId});
        const promises =universe.map((universe)=>{
            allItems.push(universe._id.toString())
        });
        await Promise.all(promises);
        const validParents = allItems.filter((item) => descendants.indexOf(item) === -1);
        validParents.splice(validParents.indexOf(parentData._id),1);
        const finalValidParents = []
        const parentPromises = validParents.map(async (parent)=>{
            const valid = await Item.findById({_id:parent});
            finalValidParents.push({_id:parent, title:valid.title});
        })
        await Promise.all(parentPromises);
        return{
            message: `${descendants.length} descendants found.`, 
            status: 200,
            descendants: descendants,
            validParents: finalValidParents,
            children: children 
        };
    } catch (error) {
        console.log(error);
        return {message:"Something whent wrong" , status: 400};
    };
};

itemSchema.statics.deleteItems = async (userData, queryData)=> {
    let descendants = [];
    let count = 1;
    try{
        await getAllDescendants(queryData._id, descendants, userData.userId);
        const promises = descendants.map(async (descendant)=>{
            count++;
            return await Item.findByIdAndDelete(descendant);
        })
        await Item.findOneAndDelete({_id:queryData._id, userId:userData.userId})
        await Promise.all(promises);
        return{
            message: `${count} items where deleted`, 
            status: 200,
        };
    } catch (error) {
        console.log(error);
        return { message:"Something whent wrong" , status: 400 };
    };


}

dotenv.config();
console.log('env', process.env.DB_ITEM_COLLECTION);

export const Item = mongoose.model(process.env.DB_ITEM_COLLECTION, itemSchema);




// itemSchema.statics.hasChildren = async (queryData) => {
//     console.log('data', queryData._id);
//     try {
//         const children = await Item.find({parentId: queryData._id});
//         return {
//             message: `${children.length} items found.`, 
//             status: 200,
//             children: children.length
//         }
//     } catch (error) {
//         console.log(error);
//         return { message:"Something went wrong" , status: 401 };
//     }
// };