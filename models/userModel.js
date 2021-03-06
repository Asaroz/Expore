import mongoose  from 'mongoose';
import {makeToken} from '../libs/token.js'
import {hash,compare} from '../libs/crypto.js'

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        minLength: 3, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        minLength: 3,
        unique: true, 
        required: true
    },
    imageIndex: {
        type: Number,
        required: true
    }
});

userSchema.statics.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
          return { message: "Email not registered", status: 400 };
    }
    const success = await compare(userData.password, user.password);
    if (!success) {
        return { message: "Please check your password and try again", status: 401 };
    }
    // Generate auth token
    const token = makeToken(user._id, userData.stayLogged);

    return { 
        message: `User ${user.email} successfully login`, 
        status: 200, 
        email: user.email, 
        userName: user.username, 
        imageIndex: user.imageIndex, 
        token: token 
    };
};

userSchema.statics.register = async (userData) => {
    try {
        userData.password = await hash(userData.password);
        const user = await User.create(userData);
        return { message: `User ${user.email} successfully created`, status: 201 };
    } catch (error) {
        if (error.message.indexOf("email") !== -1) {
            console.log(error.message);
            return { message: "Email already exists", status: 401 };
        } else if (error.message.indexOf("username") !== -1){
            return { message: "Username already exists", status: 401};
        } else {
            return { message: error.message, status: 500 };
        }
    }
};

userSchema.statics.updateUser = async (userData) => {
    try{
        const { userId, ...updateData } = userData;
        await User.findOneAndUpdate({_id:userId}, updateData)
        const newUser = await User.findOne({_id:userId})
        return {message: 'User was updated succesfully', status: 200 , newUser: newUser}
    } catch (error) {
        return { message: "Could not update", status: 400 };
    }
}

userSchema.statics.updatePassword = async (userData) => {
    const oldPw = userData.oldPw;
    const newPw = userData.newPw;
    const _id = userData.userId;
    try{
        const user = await User.findOne({ _id: _id});
        const success = await compare(oldPw, user.password);
        if (!success) {
            return { message: "Old password is not correct", status: 401 };
        }
        const password = await hash(newPw);
        await User.findByIdAndUpdate(_id,{password:password});
        return {message: 'Password was successfully updated', status: 200 };
    } catch (error){
        return { message: "Could not change the password", status: 400 };
    }
}



export const User = mongoose.model("users", userSchema);