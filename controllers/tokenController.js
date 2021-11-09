import {checkToken} from '../libs/token.js';


export default function tokenCheck(req,res,next){
    const tokenRaw = req.headers.authorization;
    if(!tokenRaw){
        return res.status(401).send("Invalid Token.");
    };
    const tokenToCheck = tokenRaw.split(" ")[1];
    if(!tokenToCheck){
        return res.status(401).send("Invalid Token.");
    };

    const check = checkToken(tokenToCheck);
    req.body._userID = check.userId;
    next();
}