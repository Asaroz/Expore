import { User } from '../models/userModel.js';

// Login route:
export async function userLogin (req, res) {
    if (!req.body.email) {
        res.status(400).json({ message: "Please provide an email." });
        return;
    }
    if (!req.body.password) {
        res.status(400).json({ message: "Please provide a password." });
        return;
    }
    const user = await User.login(req.body);
    res.status(user.status).json(user);
}

// Register route:
export async function userRegister (req, res) {
    if (!req.body.email) {
        res.status(400).json({ message: "Please provide an Email." });
        return;
    }
    if (!req.body.password) {
        res.status(400).json({ message: "Please provide a Password." });
        return;
    }
    if (!req.body.username) {
        res.status(400).json({ message: "Please provide a Username." });
        return;
    }
    const user = await User.register(req.body);
    res.status(user.status).json(user);
}

export  async function updateUser(req, res) {
    const user = await User.updateUser(req.body);
    res.status(user.status).json(user);
}

export async function updatePassword(req, res) {
    const user = await User.updatePassword(req.body);
    res.status(user.status).json(user)
}