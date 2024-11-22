import mongoose from "mongoose";

export async function connectMongoDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Database connection stabilized successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
