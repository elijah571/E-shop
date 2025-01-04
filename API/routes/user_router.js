import express from "express";
import { adminUser } from "../admin/admin.js";
import { signupUser } from "../controllers/user_controller.js";

export const userRoute = express.Router();
userRoute.post('/signup', signupUser);
userRoute.post('/admin', adminUser)