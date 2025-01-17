import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { dataBase } from "./database/data_base.js";
import { categoryRouter } from "./routes/category_routes.js";
import { userRoute } from "./routes/user_router.js";

//PACKAGES

//files

dotenv.config();
dataBase()
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies to be sent
  methods: "GET, POST, PUT, DELETE", // Allowed methods
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// user api end points
app.use('/api/user', userRoute)
//category
app.use('/api/category', categoryRouter)
// products api end points
// order api end points
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log('app listen on port:', PORT)
})