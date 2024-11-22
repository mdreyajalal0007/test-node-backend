import { isMobileValid, isValidEmail, generatePasswordHash, comparePasswords, generateLoginToken } from "../helpers/helper.js";
import User from "../modals/authModal.js";

export class UserService {
  // Create a new user
  static async create(params) {
    try {
      if (!isMobileValid(params.mobileNumber)) {
        throw new Error("Invalid mobile number");
      }

      if (!isValidEmail(params.email)) {
        throw new Error("Please enter a valid email ID");
      }

      const duplicateUser = await User.findOne({ email: params.email });
      if (duplicateUser) {
        throw new Error("Email ID already exists");
      }

      const newUser = await User.create({
        ...params,
        password: await generatePasswordHash(params.password),
      });

      return { success: true, data: newUser };
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Fetch all users
  static async fetchAll() {
    try {
      const users = await User.find({});
      return { success: true, data: users };
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw new Error("Error fetching users");
    }
  }

  // Fetch a user by ID
  static async fetchById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return { success: true, data: user };
    } catch (error) {
      console.error("Error fetching user by ID:", error.message);
      throw new Error("Error fetching user by ID");
    }
  }

  // Update a user
  static async update(userId, params) {
    try {
      const duplicateUser = await User.findOne({
        email: params.email,
        _id: { $ne: userId },
      });

      if (duplicateUser) {
        throw new Error("Email already exists");
      }

      const updatedUser = await User.findByIdAndUpdate(userId, params, { new: true });
      if (!updatedUser) {
        throw new Error("User not found");
      }

      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw new Error("Error updating user");
    }
  }

  // Delete a user (soft delete by setting `isDeleted` to true)
  static async delete(userId) {
    try {
      const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return { success: true, data: deletedUser };
    } catch (error) {
      console.error("Error deleting user:", error.message);
      throw new Error("Error deleting user");
    }
  }

  // Login a user
  static async login(credentials) {
    try {
      const user = await User.findOne({ email: credentials.email });
      if (!user) {
        throw new Error("User not registered");
      }

      const isPasswordValid = await comparePasswords(credentials.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = await generateLoginToken(user);
      return { success: true, token, data: user };
    } catch (error) {
      console.error("Error logging in user:", error.message);
      throw new Error("Error logging in user");
    }
  }
}
