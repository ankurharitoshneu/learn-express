import { Request, Response, NextFunction } from 'express';
import express = require('express');
import { User, UserRequest } from './types';

const router = express.Router();

// Middleware to add users to the request object
const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
    // Assume 'users' is loaded from an external file or database
    const users: User[] = req.app.get('users');
    if (users) {
        req.users = users;
        next();
    } else {
        res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }
};

// Route to read all usernames
router.get('/usernames', addMsgToRequest, (req: UserRequest, res: Response) => {
    const usernames = req.users?.map(user => ({ id: user.id, username: user.username }));
    res.send(usernames);
});

// Route to read a specific user by username
router.get('/username/:name', addMsgToRequest, (req: UserRequest, res: Response) => {
    const username = req.params.name;
    const user = req.users?.find(user => user.username === username);

    if (user) {
        res.json({ email: user.email });
    } else {
        res.status(404).json({ error: { message: 'User not found', status: 404 } });
    }
});

export default router;
