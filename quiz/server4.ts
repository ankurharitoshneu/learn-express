import fs = require('fs');
import path = require('path');
import { Express, Request, Response, NextFunction, Router } from 'express';
import express = require('express');
import cors = require('cors');
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';
import { User, UserRequest } from './types';

const app: Express = express();
const port: number = 8000;
const dataFile = '../data/users.json';

let users: User[];

// Read the users data from the JSON file
fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
  console.log('reading file ... ');
  if (err) throw err;
  users = JSON.parse(data.toString());
});

// Middleware to add users to the request object
const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (users) {
    req.users = users;
    next();
  } else {
    return res.status(404).json({
      error: { message: 'users not found', status: 404 }
    });
  }
};

// Define the /read router
const readRouter: Router = Router();

// Route to read all usernames
readRouter.get('/usernames', addMsgToRequest, (req: UserRequest, res: Response) => {
  const usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

// Route to read a specific user by username
readRouter.get('/username/:name', addMsgToRequest, (req: UserRequest, res: Response) => {
  const username = req.params.name;
  const user = req.users?.find((user) => user.username === username);

  if (user) {
    res.json({ email: user.email });
  } else {
    res.status(404).json({ error: { message: 'User not found', status: 404 } });
  }
});

// Define the /write router
const writeRouter: Router = Router();

// Route to add a new user
writeRouter.post('/adduser', addMsgToRequest, (req: UserRequest, res: Response) => {
  const newuser = req.body as User;

  if (req.users) {
    req.users.push(newuser);
    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(req.users), (err) => {
      if (err) console.log('Failed to write');
      else console.log('User Saved');
    });
    res.send('User added successfully');
  } else {
    res.status(500).send('Users array is undefined');
  }
});

// Apply middleware and use routers
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the /read router for user reading services
app.use('/read', readUsersRouter);
// Use the /write router for user writing services
app.use('/write', writeUsersRouter);

// Use the /read and /write routers
app.use('/read', readRouter);
app.use('/write', writeRouter);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
