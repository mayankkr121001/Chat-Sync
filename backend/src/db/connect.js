import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`);
        console.log(`\n MongoDB connected !! `);
    } catch (error) {
        console.log("MongoDB connection failed!", error);
    }

}

export default connectDB