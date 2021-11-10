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
    childId:{
        type: [String]
    },
    referenceId:{
        type: [String]
    },
    isRoot:{
        type: Boolean,
        default: false
    },
});

itemSchema.statics.getItems = async (userData) => {
    try {
        console.log(userData)
        const item = await Item.find(userData);
        return { 
            message:  `${item.length} Items found`,
            status: 201,
            Items: [...item]
        };
    } catch (error){
        console.log(error);
        return { message: "no Items found", status: 401 };
    }
    
};

itemSchema.statics.createItem = async (userData) => {
    try {
        const item = await Item.create(userData);
        return { message: `Item ${item.title} successfully created`, status: 201 };
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", status: 401 };
    }
}



export const Item = mongoose.model("Items", itemSchema);