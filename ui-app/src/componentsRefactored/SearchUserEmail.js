"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchUserEmail = ({ searchUsername, setSearchUsername, handleShowEmail }) => (<div>
    <h2>Search for User's Email:</h2>
    <input type="text" name="srchUsername" placeholder="username" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)}/>
    <button onClick={handleShowEmail}>Show Email</button>
  </div>);
exports.default = SearchUserEmail;
