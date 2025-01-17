import express from "express";
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategory } from "../controllers/category_controller.js";
import { auth, authAdmin } from "./../middleware/authentification.js";

export const categoryRouter = express.Router();

// Route to create a category with authentication and admin check
categoryRouter.post('/create', auth, authAdmin, createCategory);
//Route to get all categories
categoryRouter.get('/', auth, authAdmin, getAllCategories)
//Route to get Category by id
categoryRouter.get('/:id', auth, authAdmin, getCategoryById)
//Route to update Category by id
categoryRouter.put('/:id', auth, authAdmin, updateCategory)
//Route to  Delete Category by Id
categoryRouter.delete('/:id', auth, authAdmin, deleteCategoryById)