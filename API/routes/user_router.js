import express from "express";
import { adminUser } from "../admin/admin.js";
import { logOut, login, signupUser } from "../controllers/user_controller.js";

export const userRoute = express.Router();
// create new user
userRoute.post('/signup', signupUser);
//Login
userRoute.post('/login', login);
// logou
userRoute.post('/logout', logOut)
//create admin
userRoute.post('/admin', adminUser)