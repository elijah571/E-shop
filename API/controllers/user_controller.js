import bcryptjs from "bcryptjs";
import { User } from "../models/user_model.js";
import { generate_token } from "../utils/generate_token_and_cookies.js";

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
            user: { id: user._id }, // Only return minimal user data
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
};

// Log out
export const logOut = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "An error occurred during logout" });
    }
};

// Get all Users
export const allUsers = async (req, res) => {
    try {
        // Fetching all users from the database
        const users = await User.find({}); 

        // If no users are found, return an appropriate message
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        // Return users data with a success status
        return res.status(200).json(users);
    } catch (error) {
        // Improved error logging with the error message
        console.error("Error fetching users:", error.message);
        return res.status(500).json({ message: "An error occurred while fetching users" });
    }
};
//Get User Profile
export const userProfile = async (req, res) => {
   
        const user = await User.findById(req.user._id);
        if (user) {
            res.status(200).json(user);
        } else{
            res.status(404).json({message: "User not found"});
        }
    
}
// Update User Account
export const updateUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;
         if (req.body.password) {
            
           user.password = req.body.password
         }
         
    const userUpdate = await user.save();
    res.status(200).json(userUpdate);
    } else {
        return res.status(404).json({message: "User not found"})
    }
}
//Delete user by admin
export const removeUser = async (req, res) => {
    const user = await User.findById(req.params.id);  
        if (user) {
        if (user.isAdmin) {
            res.status(400).json({
                message: "Admin cannot be removed"
            });
        } else {
            await User.deleteOne({ _id: user._id });
            res.status(200).json({ message: 'User removed successfully' });
        }
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
};
//Get a User
export const getAuser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user)
    } else { 
        res.status(404).json({message: "User not found"});
    }
}

// Update a user by admin
export const updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            // Update user fields
            user.userName = req.body.userName || user.userName;
            user.email = req.body.email || user.email;

            // Hash the password if it's being updated
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            // Save updated user
            const userUpdate = await user.save();
            res.status(200).json(userUpdate);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};
