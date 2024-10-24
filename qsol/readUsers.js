"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/usernames', (req, res) => {
    var _a;
    let usernames = (_a = req.users) === null || _a === void 0 ? void 0 : _a.map(function (user) {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});
router.get('/username/:name', (req, res) => {
    var _a;
    let name = req.params.name;
    let users_with_name = (_a = req.users) === null || _a === void 0 ? void 0 : _a.filter(function (user) {
        return user.username === name;
    });
    console.log(users_with_name);
    if ((users_with_name === null || users_with_name === void 0 ? void 0 : users_with_name.length) === 0) {
        res.send({
            error: { message: `${name} not found`, status: 404 }
        });
    }
    else {
        res.send(users_with_name);
    }
});
exports.default = router;
