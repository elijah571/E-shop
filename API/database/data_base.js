import mongoose from "mongoose";

export const dataBase = async () => {
    try {
        const connectDb = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected: ${connectDb.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
