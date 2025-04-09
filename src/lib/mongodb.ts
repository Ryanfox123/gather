import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
