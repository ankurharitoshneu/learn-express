"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
var port = 8000;
var dataFile = '../data/users.json';
var users;
fs_1.default.readFile(path_1.default.resolve(__dirname, dataFile), function (err, data) {
    console.log('reading file ... ');
    if (err)
        throw err;
    users = JSON.parse(data.toString());
});
var addMsgToRequest = function (req, res, next) {
    if (users) {
        req.users = users;
        next();
    }
    else {
        return res.json({
            error: { message: 'users not found', status: 404 }
        });
    }
};
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use('/read/usernames', addMsgToRequest);
app.get('/read/usernames', function (req, res) {
    var _a;
    var usernames = (_a = req.users) === null || _a === void 0 ? void 0 : _a.map(function (user) {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});
app.use('/read/username', addMsgToRequest);
app.get('/read/username/:name', function (req, res) {
    var _a;
    var name = req.params.name;
    var users_with_name = (_a = req.users) === null || _a === void 0 ? void 0 : _a.filter(function (user) {
        return user.username === name;
    });
    console.log(users_with_name);
    if ((users_with_name === null || users_with_name === void 0 ? void 0 : users_with_name.length) === 0) {
        res.send({
            error: { message: "".concat(name, " not found"), status: 404 }
        });
    }
    else {
        res.send(users_with_name);
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/write/adduser', addMsgToRequest);
app.post('/write/adduser', function (req, res) {
    var newuser = req.body;
    users.push(newuser);
    fs_1.default.writeFile(path_1.default.resolve(__dirname, dataFile), JSON.stringify(users), function (err) {
        if (err)
            console.log('Failed to write');
        else
            console.log('User Saved');
    });
    res.send('done');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
