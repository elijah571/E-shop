import express from "express";
import { adminUser } from "../admin/admin.js";
import { allUsers, getAuser, logOut, login, removeUser, signupUser, updateUser, updateUserById, userProfile } from "../controllers/user_controller.js";
import { auth, authAdmin } from "../middleware/authentification.js";

export const userRoute = express.Router();
// create new user
userRoute.post('/signup', signupUser);
//Login
userRoute.post('/login', login);
// logou
userRoute.post('/logout', logOut)
//create admin
userRoute.post('/admin', adminUser);

// User profile
userRoute.get('/profile', auth, userProfile);
//update user Profile
userRoute.put('/profile', auth, updateUser);

//remove user

userRoute.delete('/profile/:id', auth, authAdmin, removeUser); 
//Get a user as admin
userRoute.get('/profile/:id', auth, authAdmin, getAuser); 
userRoute.put('/profile/:id', auth, authAdmin, updateUserById )
//get all users as admin
userRoute.get('/allusers', auth, authAdmin, allUsers); 