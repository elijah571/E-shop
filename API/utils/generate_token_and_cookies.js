import jwt from "jsonwebtoken";

export const generate_token = async (res, id) => {
    const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60d'
    });

    // Set cookies
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'strict',
        maxAge: 60 * 24 * 60 * 60 * 1000  
    });
    return;
};