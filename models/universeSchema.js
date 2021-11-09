import mongoose  from 'mongoose';
import { checkToken } from '../libs/token';


const universeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    description:{
        type: String
    },
    imgPath:{
        type: String
    }
});

universeSchema.statics.getChildren = async (userData) => {
    const children = await User.find({ email: userData.email });
    
    return {};
};

universeSchema.statics.createUniverse = async (userData) => {
    try {
        const universe = await Universe.create(userData);
        return { message: `Universe ${universe.name} successfully created`, status: 201 };
    } catch (error) {
        return { message: "Something went wrong", status: 401 };
    }
}



export const Universe = mongoose.model("universes", universeSchema);