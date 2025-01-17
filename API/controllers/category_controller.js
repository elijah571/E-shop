import { Category } from "../models/category.js";

// Create category
export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new  Category({ name });
        await category.save();

        res.status(201).json(category); // 201 for resource creation success
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 for server error
    }
};
//Get all Categories
export const getAllCategories = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Update Category
export const updateCategory = async (req, res) => {
    const { name } = req.body;
    
    try {
        // Find and update the category
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            { name },      
            { new: true, runValidators: true } 
        );

        // Check if the category was found
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Return the updated category
        res.status(200).json(category);
    } catch (error) {
        // Handle errors and return a server error response
        res.status(500).json({ message: error.message });
    }
};
// Get Category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Delete by Id
export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json( {message: "Category successfully Deleted"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}