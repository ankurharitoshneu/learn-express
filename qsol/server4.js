"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const readUsers_1 = __importDefault(require("./readUsers"));
const writeUsers_1 = __importDefault(require("./writeUsers"));
const app = (0, express_1.default)();
const port = 8000;
const dataFile = '../data/users.json';
let users;
fs_1.default.readFile(path_1.default.resolve(__dirname, dataFile), (err, data) => {
    console.log('reading file ... ');
    if (err)
        throw err;
    users = JSON.parse(data.toString());
});
const addMsgToRequest = (req, res, next) => {
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
app.use(addMsgToRequest);
app.use('/read', readUsers_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/write', writeUsers_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
