import {checkToken} from '../libs/token.js';


export default function tokenCheck(req,res,next){
    const tokenRaw = req.headers.authorization;
    if(!tokenRaw){
        return res.status(401).json("Invalid Token. 1");
    };
    const tokenToCheck = tokenRaw.split(" ")[1];
    if(!tokenToCheck){
        return res.status(401).json("Invalid Token. 2");
    };

    const check = checkToken(tokenToCheck);
    if(!check.success){
        return res.status(401).json("Invalid Token. 3");
    }
    req.body.userId = check.userId;
    next();
}