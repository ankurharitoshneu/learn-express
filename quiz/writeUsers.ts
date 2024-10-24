import { Request, Response, NextFunction } from 'express';
import fs = require('fs');
import path = require('path');
import express = require('express');
import { User, UserRequest } from './types';

const router = express.Router();
const dataFile = '../data/users.json';

// Middleware to add users to the request object
const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
    const users: User[] = req.app.get('users');
    if (users) {
        req.users = users;
        next();
    } else {
        res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }
};

// Route to add a new user
router.post('/adduser', addMsgToRequest, (req: UserRequest, res: Response) => {
    const newuser = req.body as User;

    if (req.users) {
        req.users.push(newuser);
        fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(req.users), (err) => {
            if (err) {
                console.log('Failed to write');
                res.status(500).send('Failed to save user');
            } else {
                console.log('User Saved');
                res.send('User added successfully');
            }
        });
    } else {
        res.status(500).send('Users array is undefined');
    }
});

export default router;