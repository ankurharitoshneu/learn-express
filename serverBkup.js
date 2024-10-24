"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bkupEmitter_1 = __importDefault(require("./pubusb/bkupEmitter"));
const app = (0, express_1.default)();
const port = 8000;
const dataFile = './data/users.json';
const bkupFile = './data/bkup.json';
let users;
fs_1.default.readFile(path_1.default.resolve(__dirname, dataFile), (err, data) => {
    console.log('reading data file ... ');
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
app.use('/read/usernames', addMsgToRequest);
app.get('/read/usernames', (req, res) => {
    var _a;
    let usernames = (_a = req.users) === null || _a === void 0 ? void 0 : _a.map((user) => {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/write/adduser', addMsgToRequest);
app.post('/write/adduser', (req, res) => {
    let newuser = req.body;
    users.push(newuser);
    /**
     * Synchronous call to compute the size of the data file
     */
    const dataFileSize = fs_1.default.statSync(path_1.default.resolve(__dirname, dataFile)).size;
    if (dataFileSize > 1024) {
        bkupEmitter_1.default.emit('bkup', users, path_1.default.resolve(__dirname, bkupFile)); // emit bkup event when the file size is over 10 Kb
    }
    else {
        fs_1.default.writeFile(path_1.default.resolve(__dirname, dataFile), JSON.stringify(users), (err) => {
            if (err)
                console.log('Failed to write');
            else
                console.log('User Saved');
        });
    }
    res.send('done');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
