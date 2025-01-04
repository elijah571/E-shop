import bcryptjs from "bcryptjs";
import { User } from "../models/user_model.js";
import { generate_token } from "../utils/generate_token_and_cookies.js";

// Create new user account
export const signupUser = async (req, res) => {
    const { userName, email, password } = req.body;
    
    try {
        // Check if all required fields are filled
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All input fields must be filled"
            });
        }

        // Check if user with the same email already exists
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(422).json({
                message: "User with this Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        // Save new user to the database
        await newUser.save();

        // Generate token and set cookie
        await generate_token(res, newUser._id);

    

        res.status(201).json({
            message: "User created successfully",
            newUser
        });
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};
//Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: "All input fields must be filled" });
        }

        // Check if email exists
        const userEmail = await User.findOne({ email });
        if (!userEmail) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        // Validate password
        const isPasswordValid = await bcryptjs.compare(password, userEmail.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token and set cookie
        generate_token(res, userEmail._id);

        // Send success response
        res.status(200).json({ message: "Login successful", user: userEmail });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};
