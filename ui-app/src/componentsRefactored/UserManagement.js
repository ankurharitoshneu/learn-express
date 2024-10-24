"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// UserManagement.tsx
const react_1 = __importDefault(require("react"));
const useUserManagement_1 = require("../hooks/useUserManagement");
const AllUsernames_1 = __importDefault(require("./AllUsernames"));
const AddUserForm_1 = __importDefault(require("./AddUserForm"));
const SearchUserEmail_1 = __importDefault(require("./SearchUserEmail"));
const ShowEmail_1 = __importDefault(require("./ShowEmail"));
const UserManagement = () => {
    const { usernames, formData, searchUsername, searchEmail, showUsernames, showAddUserForm, searchUserForm, showEmail, getAllUsernames, handleInputChange, handleClickNewUser, handleSearchForm, handleShowEmail, addUser, setSearchUsername } = (0, useUserManagement_1.useUserManagement)();
    return (<div>
      <h1>User Management</h1>
      <button onClick={getAllUsernames}>View All Usernames</button>
      <button onClick={handleClickNewUser}>Add New User</button>
      <button onClick={handleSearchForm}>Search User</button>
      {showUsernames && <AllUsernames_1.default usernames={usernames}/>}
      {showAddUserForm && <AddUserForm_1.default formData={formData} handleInputChange={handleInputChange} addUser={addUser}/>}
      {searchUserForm && <SearchUserEmail_1.default searchUsername={searchUsername} setSearchUsername={setSearchUsername} handleShowEmail={handleShowEmail}/>}
      {showEmail && <ShowEmail_1.default searchEmail={searchEmail}/>}
    </div>);
};
exports.default = UserManagement;
