import { generatePasswordHash } from "../helpers/helper.js";
import { UserService } from "../services/authService.js";

// Handle fetching all users
export async function handleGetAllUsers(req, res) {
  try {
    const result = await UserService.fetchAll();
    return res.status(200).json({ message: "Users fetched successfully", data: result.data });
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Handle creating a new user
export async function handleCreateNewUsers(req, res) {
  const { firstName, lastName, password, age, mobileNumber, email } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !password || !age || !mobileNumber || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await generatePasswordHash(password);
    const result = await UserService.create({
      firstName,
      lastName,
      age: Number(age),
      mobileNumber: Number(mobileNumber),
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully", data: result.data });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(400).json({ message: error.message });
  }
}

// Handle fetching a single user by ID
export async function handleGetUsers(req, res) {
  const userId = req.params.id;

  try {
    const result = await UserService.fetchById(userId);

    return res.status(200).json({ message: "User fetched successfully", data: result.data });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(404).json({ message: error.message });
  }
}

// Handle querying users based on parameters
export async function handleUser(req, res) {
  const { Id: queryId, mobileNumber } = req.query;

  try {
    const result = await UserService.getUsers(queryId, mobileNumber);
    return res.status(200).json({ message: "Users fetched successfully", data: result.data });
  } catch (error) {
    console.error("Error querying users:", error.message);
    return res.status(404).json({ message: error.message });
  }
}

// Handle updating a user
export async function handleUpdateUsers(req, res) {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const result = await UserService.update(userId, updateData);
    return res.status(200).json({ message: "User updated successfully", data: result.data });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(400).json({ message: error.message });
  }
}

// Handle user login
export async function handleLoginUser(req, res) {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await UserService.login({ email, password });
    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      data: result.data,
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    return res.status(400).json({ message: error.message });
  }
}
