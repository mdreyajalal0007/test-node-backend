import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, // Email should be unique
    password: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const User = mongoose.model("User", userSchema);

export default User; // Export as default for ES Modules
