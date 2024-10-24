"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ShowEmail = ({ searchEmail }) => (<div>
    <ul>
      {searchEmail.map((e) => (<li key={e.id}>{e.email ? e.email : 'N/A'}</li>))}
    </ul>
  </div>);
exports.default = ShowEmail;
