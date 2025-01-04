import express from "express";
import { adminUser } from "../admin/admin.js";
import { login, signupUser } from "../controllers/user_controller.js";

export const userRoute = express.Router();
userRoute.post('/signup', signupUser);
userRoute.post('/login', login);
userRoute.post('/admin', adminUser)