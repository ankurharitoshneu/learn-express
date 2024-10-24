"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AllUsernames = ({ usernames }) => (<div>
    <h2>All Usernames:</h2>
    <ol>
      {usernames.map((username) => (<li key={username.id}>{username.username}</li>))}
    </ol>
  </div>);
exports.default = AllUsernames;
