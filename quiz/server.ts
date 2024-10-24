import fs = require('fs');
import path = require('path');
import { Express, Request, Response, NextFunction } from 'express';
import express = require('express');
import cors = require('cors');
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';
import { User } from './types';

interface UserRequest {
  users?: User[];
  req: Request;
}

const app: Express = express();
const port: number = 8000;

const dataFile = '../data/users.json';

let users: User[];

// Read the users data from the JSON file
fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
  console.log('reading file ... ');
  if (err) throw err;
  users = JSON.parse(data.toString());
  app.set('users', users);
});

// Middleware to add users to the request object
const addMsgToRequest = (req: Request, res: Response, next: NextFunction) => {
  const userReq: UserRequest = { req };
  if (users) {
    userReq.users = users;
    (req as any).userReq = userReq;
    next();
  } else {
    return res.status(404).json({
      error: { message: 'users not found', status: 404 }
    });
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the /read router for user reading services
app.use('/read', readUsersRouter);
// Use the /write router for user writing services
app.use('/write', writeUsersRouter);

// Endpoint to read all usernames
app.use('/read/usernames', addMsgToRequest);
app.get('/read/usernames', (req: Request, res: Response) => {
  const userReq = (req as any).userReq as UserRequest;
  let usernames = userReq.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

// Endpoint to add a new user
app.use('/write/adduser', addMsgToRequest);
app.post('/write/adduser', (req: Request, res: Response) => {
  const userReq = (req as any).userReq as UserRequest;
  let newuser = req.body as User;

  if (userReq.users) {
    userReq.users.push(newuser);
    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(userReq.users), (err) => {
      if (err) console.log('Failed to write');
      else console.log('User Saved');
    });
    res.send('done');
  } else {
    res.status(500).send('Users array is undefined');
  }
});

// New endpoint to search for a user by username
app.use('/read/username', addMsgToRequest);
app.get('/read/username/:name', (req: Request, res: Response) => {
  const userReq = (req as any).userReq as UserRequest;
  const username = req.params.name;

  // Find the user by username
  const user = userReq.users?.find((user) => user.username === username);

  // Return the user's email if found, otherwise return a 404 error
  if (user) {
    res.json({ email: user.email });
  } else {
    res.status(404).json({ error: { message: 'User not found', status: 404 } });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
