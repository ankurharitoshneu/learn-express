"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var express = require("express");
var router = express.Router();
var dataFile = '../data/users.json';
// Middleware to add users to the request object
var addMsgToRequest = function (req, res, next) {
    var users = req.app.get('users');
    if (users) {
        req.users = users;
        next();
    }
    else {
        res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }
};
// Route to add a new user
router.post('/adduser', addMsgToRequest, function (req, res) {
    var newuser = req.body;
    if (req.users) {
        req.users.push(newuser);
        fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(req.users), function (err) {
            if (err) {
                console.log('Failed to write');
                res.status(500).send('Failed to save user');
            }
            else {
                console.log('User Saved');
                res.send('User added successfully');
            }
        });
    }
    else {
        res.status(500).send('Users array is undefined');
    }
});
exports.default = router;
