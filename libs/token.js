import jwt from 'jsonwebtoken';

export function makeToken (userId,stayLogged) {
    const expTime = stayLogged ? "7d":"1h";
    const token = jwt.sign(
        { _id: userId }, 
        process.env.SECRET, 
        { expiresIn: expTime}
    );
    return token;
}

export function checkToken (token) {
    try { 
        const payload = jwt.verify(token, process.env.SECRET);
        return { message: `Successfully authenticated`, success: true, userId: payload._id }
    } catch (error) {
        return { message: `Error verifying JWT ${error.message}`, success: false }
    }
}