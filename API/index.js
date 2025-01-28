import categoryRoutes from "./routes/categoryRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// packages

// Utiles

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/API/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
