import mongoose  from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        minLength: 2,
        maxLength: 60
    },
    _userId: { 
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

itemSchema.statics.createItems = async (userData) => {
    try {
        const item = await Item.create(userData);
        return { message: `Item ${item.title}, with the Id: ${item._id} successfully created`, status: 200 , _id: item._id };
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", status: 401 };
    }
};

itemSchema.statics.deleteItems = async (id) => {
    try {
        const item = await Item.deleteMany({ _id: id });
        if (item.deletedCount === 1) {
            return { 
                message: `${item.deletedCount} item found and deleted`, status: 200
            };
        } else {
            return { 
                message: `${item.deletedCount} items found and deleted`, status: 200
            };
        }
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
            items: [...item]
        };
    } catch (error){
        console.log(error);
        return { message: "no Items found", status: 401 };
    }
};

itemSchema.statics.moveItems = async (userData) => {
    try {
        const { newparentId, ...searchData } = userData
        const item = await Item.updateMany(searchData, {parentId: newparentId});
        return { 
            message: `${item.length} items moved to`,
            status: 200
        };
    } catch (error) {
        console.log(error);
        return { message: "Not able to move items" , status: 401 };
    }  
};

itemSchema.statics.hasChildren = async (id) => {
    console.log('data', id);
    try {
        const children = await Item.find({parentId: id});
        return{
            message: `${children.length} items found.`, 
            status: 200,
            children: children.length
        }
    } catch (error) {
        console.log(error);
        return { message:"Something went wrong" , status: 401 };
    }
    
};

export const Item = mongoose.model("Items", itemSchema);