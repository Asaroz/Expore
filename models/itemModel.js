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
    const children = await User.find({ email: userData.email });
    
    return {};
};

itemSchema.statics.createItem = async (userData) => {
    try {
        const item = await Item.create(userData);
        return { message: `Item ${item.name} successfully created`, status: 201 };
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", status: 401 };
    }
}



export const Item = mongoose.model("Items", itemSchema);