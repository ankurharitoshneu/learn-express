import { Request } from 'express';

// Define the User interface
interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

// Extend the Express Request interface to include users
interface UserRequest extends Request {
    users?: User[];  // Array of users, if available
    user?: User;     // A single user, if needed
}

export { User, UserRequest };
