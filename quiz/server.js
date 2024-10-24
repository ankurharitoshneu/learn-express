"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var express = require("express");
var cors = require("cors");
var app = express();
var port = 8000;
var dataFile = '../data/users.json';
var users;
// Read the users data from the JSON file
fs.readFile(path.resolve(__dirname, dataFile), function (err, data) {
    console.log('reading file ... ');
    if (err)
        throw err;
    users = JSON.parse(data.toString());
});
// Middleware to add users to the request object
var addMsgToRequest = function (req, res, next) {
    var userReq = { req: req };
    if (users) {
        userReq.users = users;
        req.userReq = userReq;
        next();
    }
    else {
        return res.status(404).json({
            error: { message: 'users not found', status: 404 }
        });
    }
};
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Endpoint to read all usernames
app.use('/read/usernames', addMsgToRequest);
app.get('/read/usernames', function (req, res) {
    var _a;
    var userReq = req.userReq;
    var usernames = (_a = userReq.users) === null || _a === void 0 ? void 0 : _a.map(function (user) {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});
// Endpoint to add a new user
app.use('/write/adduser', addMsgToRequest);
app.post('/write/adduser', function (req, res) {
    var userReq = req.userReq;
    var newuser = req.body;
    if (userReq.users) {
        userReq.users.push(newuser);
        fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(userReq.users), function (err) {
            if (err)
                console.log('Failed to write');
            else
                console.log('User Saved');
        });
        res.send('done');
    }
    else {
        res.status(500).send('Users array is undefined');
    }
});
// New endpoint to search for a user by username
app.use('/read/username', addMsgToRequest);
app.get('/read/username/:name', function (req, res) {
    var _a;
    var userReq = req.userReq;
    var username = req.params.name;
    // Find the user by username
    var user = (_a = userReq.users) === null || _a === void 0 ? void 0 : _a.find(function (user) { return user.username === username; });
    // Return the user's email if found, otherwise return a 404 error
    if (user) {
        res.json({ email: user.email });
    }
    else {
        res.status(404).json({ error: { message: 'User not found', status: 404 } });
    }
});
// Start the server
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
