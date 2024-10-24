"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
// Middleware to add users to the request object
var addMsgToRequest = function (req, res, next) {
    // Assume 'users' is loaded from an external file or database
    var users = req.app.get('users');
    if (users) {
        req.users = users;
        next();
    }
    else {
        res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }
};
// Route to read all usernames
router.get('/usernames', addMsgToRequest, function (req, res) {
    var _a;
    var usernames = (_a = req.users) === null || _a === void 0 ? void 0 : _a.map(function (user) { return ({ id: user.id, username: user.username }); });
    res.send(usernames);
});
// Route to read a specific user by username
router.get('/username/:name', addMsgToRequest, function (req, res) {
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
exports.default = router;
