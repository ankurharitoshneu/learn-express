"use strict";
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
exports.useUserManagement = void 0;
// useUserManagement.ts
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const useUserManagement = () => {
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
            console.log(response.data);
            setUsernames(response.data);
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
    return {
        usernames,
        formData,
        searchUsername,
        searchEmail,
        showUsernames,
        showAddUserForm,
        searchUserForm,
        showEmail,
        getAllUsernames,
        handleInputChange,
        handleClickNewUser,
        handleSearchForm,
        handleShowEmail,
        addUser,
        setSearchUsername
    };
};
exports.useUserManagement = useUserManagement;
