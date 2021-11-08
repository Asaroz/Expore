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
    const token = makeToken(user._id,userData.stayLogged);

    return { message: `User ${user.email} successfully login`, status: 200, email: user.email, token: token };
};

userSchema.statics.register = async (userData) => {
    try {
        userData.password = await hash(userData.password);
        const user = await User.create(userData);
        return { message: `User ${user.email} successfully created`, status: 201 };
    } catch (error) {
        if (error.message.indexOf("email") !== -1) {
            return { message: "Email already exists", status: 401 };
        } else {
            return { message: error.message, status: 500 };
        }
    }
};

export const User = mongoose.model("users", userSchema);