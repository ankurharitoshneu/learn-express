"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const UserManagement = () => {
    const [usernames, setUsernames] = (0, react_1.useState)([]);
    const [showUsernames, setShowUsernames] = (0, react_1.useState)(false);
    const [showAddUserForm, setShowAddUserForm] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        id: ''
    });
    const [searchUserForm, setSearchUserForm] = (0, react_1.useState)(false);
    const [searchUsername, setSearchUsername] = (0, react_1.useState)('');
    const [searchEmail, setSearchEmail] = (0, react_1.useState)([]);
    const [showEmail, setShowEmail] = (0, react_1.useState)(false);
    const getAllUsernames = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('http://localhost:8000/read/usernames');
            const data = response.data;
            setUsernames(data);
            setShowUsernames(true);
            setShowAddUserForm(false);
            setSearchUserForm(false);
            setShowEmail(false);
        }
        catch (error) {
            console.error('Error fetching usernames:', error);
        }
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleClickNewUser = () => {
        setShowAddUserForm(true);
        setShowUsernames(false);
        setSearchUserForm(false);
        setShowEmail(false);
    };
    const handleSearchForm = () => {
        setSearchUserForm(true);
        setShowAddUserForm(false);
        setShowUsernames(false);
        setShowEmail(false);
    };
    const handleShowEmail = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://localhost:8000/read/username/${searchUsername}`);
            const data = response.data;
            if (data.length > 0) {
                setSearchEmail(data);
            }
            else {
                setSearchEmail([{ id: 'error', email: 'Not Found' }]);
            }
            setShowEmail(true);
            setSearchUserForm(false);
            setShowAddUserForm(false);
        }
        catch (error) {
            console.error('Error fetching email of username', error);
        }
    });
    const addUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('http://localhost:8000/write/adduser', formData);
            const data = response.data;
            if (data.error) {
                alert(data.error.message);
            }
            else {
                alert('User added successfully!');
            }
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                id: ''
            });
        }
        catch (error) {
            console.error('Error adding user:', error);
        }
    });
    return (<div>
      <h1>User Management</h1>
      <button onClick={getAllUsernames}>View All Usernames</button>
      <button onClick={handleClickNewUser}>Add New User</button>
      <button onClick={handleSearchForm}>Search User</button>

      {showUsernames && (<div>
          <h2>All Usernames:</h2>
          <ol>
            {usernames.map((username) => (<li key={username.id}>
                {username.username}
              </li>))}
          </ol>
        </div>)}

      {showAddUserForm && (<div>
          <h2>Add New User:</h2>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange}/>
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange}/>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange}/>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange}/>
          <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange}/>
          <button onClick={addUser}>Submit New User</button>
        </div>)}

      {searchUserForm && (<div>
          <h2>Search for User's Email:</h2>
          <input type="text" name="srchUsername" placeholder="username" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)}/>
          <button onClick={handleShowEmail}>Show Email</button>
        </div>)}

      {showEmail && (<div>
          <ul>
            {searchEmail.map((e) => (<li key={e.id}>
                {e.email ? e.email : 'N/A'}
              </li>))}
          </ul>
        </div>)}
    </div>);
};
exports.default = UserManagement;
