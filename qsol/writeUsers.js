"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const writeFile = '../data/users.json';
router.post('/adduser', (req, res) => {
    var _a;
    let newuser = req.body;
    (_a = req.users) === null || _a === void 0 ? void 0 : _a.push(newuser);
    fs_1.default.writeFile(path_1.default.resolve(__dirname, writeFile), JSON.stringify(req.users), (err) => {
        if (err)
            console.log('Failed to write');
        else
            console.log('User Saved');
    });
    res.send('done');
});
exports.default = router;
