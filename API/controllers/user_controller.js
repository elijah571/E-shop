import bcryptjs from "bcryptjs";
import { User } from "../models/user_model.js";
import { generate_token } from "../utils/generate_token_and_cookies.js";

// Create new user account
// Create new user account
export const signupUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All input fields must be filled" });
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(422).json({ message: "User with this Email already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();

        // Generate token and set cookie
        await generate_token(res, newUser._id);

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
};
// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All input fields must be filled" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token and set cookie
        await generate_token(res, user._id);

        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
};
//log out
export const logOut = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
        });

        return res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "An error occurred during logout" });
    }
};
