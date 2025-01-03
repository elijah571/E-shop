import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { dataBase } from "./database/data_base.js";

//PACKAGES

//files

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

dataBase();
app.listen(PORT, () => {
    console.log('app listening on port:', PORT)
})