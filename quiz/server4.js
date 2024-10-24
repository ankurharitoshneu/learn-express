"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var express_1 = require("express");
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
    if (users) {
        req.users = users;
        next();
    }
    else {
        return res.status(404).json({
            error: { message: 'users not found', status: 404 }
        });
    }
};
// Define the /read router
var readRouter = (0, express_1.Router)();
// Route to read all usernames
readRouter.get('/usernames', addMsgToRequest, function (req, res) {
    var _a;
    var usernames = (_a = req.users) === null || _a === void 0 ? void 0 : _a.map(function (user) {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});
// Route to read a specific user by username
readRouter.get('/username/:name', addMsgToRequest, function (req, res) {
    var _a;
    var username = req.params.name;
    var user = (_a = req.users) === null || _a === void 0 ? void 0 : _a.find(function (user) { return user.username === username; });
    if (user) {
        res.json({ email: user.email });
    }
    else {
        res.status(404).json({ error: { message: 'User not found', status: 404 } });
    }
});
// Define the /write router
var writeRouter = (0, express_1.Router)();
// Route to add a new user
writeRouter.post('/adduser', addMsgToRequest, function (req, res) {
    var newuser = req.body;
    if (req.users) {
        req.users.push(newuser);
        fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(req.users), function (err) {
            if (err)
                console.log('Failed to write');
            else
                console.log('User Saved');
        });
        res.send('User added successfully');
    }
    else {
        res.status(500).send('Users array is undefined');
    }
});
// Apply middleware and use routers
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use the /read and /write routers
app.use('/read', readRouter);
app.use('/write', writeRouter);
// Start the server
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
