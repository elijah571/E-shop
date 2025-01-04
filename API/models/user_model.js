import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        reruired: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema)