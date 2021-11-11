import mongoose  from 'mongoose';



const itemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    _userId: { 
        type: String, 
        required: true 
    },
    description:{
        type: String
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


itemSchema.statics.createItems = async (userData) => {
    try {
        const item = await Item.create(userData);
        return { message: `Item ${item.name}, with the Id: ${item._id} successfully created`, status: 200 , _id: item._id };
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", status: 401 };
    }
};

itemSchema.statics.deleteItems = async (userData) => {
    try {
        const item = await Item.deleteMany(userData);
        return { 
            message:  `${item.deletedCount} Items found and deleted`, status: 200
        };
    } catch (error){
        console.log(error);
        return { message: "no Items found", status: 401 };
    }
};

itemSchema.statics.getItems = async (userData) => {
    try {
        const item = await Item.find(userData);
        return { 
            message:  `${item.length} Items found`,
            status: 200,
            Items: [...item]
        };
    } catch (error){
        console.log(error);
        return { message: "no Items found", status: 401 };
    }
};

itemSchema.statics.moveItems = async (userData) => {
    try {
        const {newparentId , ...searchData} = userData
        const item = await Item.updateMany(searchData,{parentId: newparentId});
        return { 
            message:  `${item.length} Items moved to`,
            status: 200
        };
    } catch (error){
        console.log(error);
        return { message: "Not able to move items", status: 401 };
    }  
};

export const Item = mongoose.model("Items", itemSchema);