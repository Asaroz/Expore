import { User } from '../models/userModel.js';

// Login route:
export async function userLogin (req, res) {
    if (!req.body.email) {
        res.status(400).send("Please provide an email.");
        return;
    }
    if (!req.body.password) {
        res.status(400).send("Please provide a password.");
        return;
    }
    const user = await User.login(req.body);
    res.status(user.status).json(user);
}

// Register route:
export async function userRegister (req, res) {
    if (!req.body.email) {
        res.status(400).send("Please provide an email.");
        return;
    }
    if (!req.body.password) {
        res.status(400).send("Please provide a password.");
        return;
    }
    const user = await User.register(req.body);
    res.status(user.status).send(user.message);
}