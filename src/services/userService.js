const {
  isMobileValid,
  isValidEmail,
  generatePasswordHash,
  generateLoginToken,
  comparePasswords,
} = require("../helpers/helper");
const User = require("../modals/userModal");

async function getAllUsers() {
  return await User.find({});
}

async function createNewUser(userData) {
  if (!isMobileValid(userData.mobileNumber)) {
    return { success: false, message: "Invalid mobile number" };
  }

  if (!isValidEmail(userData.email)) {
    return { success: false, message: "Please enter valid email id " };
  }

  const findDuplicateData = await User.find({ email: userData.email });

  if (findDuplicateData && findDuplicateData.length) {
    return { success: false, message: "Email id already exists" };
  } else {
    return User.create(userData);
  }
}

async function getUsersData(paramsData) {
  const result = await User.find({ _id: paramsData });
  if (result && result.length) {
    return result;
  } else {
    return { success: false, message: "No data found" };
  }
}

async function getUsers(queryData,MobileNumber) {

  const getAllUsersData = await User.find({});

  if (!queryData && !MobileNumber) {
    return getAllUsersData;
  }

  const result = await User.find({ _id: queryData, mobileNumber:MobileNumber  });
  if (queryData && result && result.length) {
    return result;
  } else {
    return { success: false, message: "No data found" };
  }
}

async function updateUser(userId, data) {

  const existingUser = await User.findOne({
    email: data.email,
    _id: { $ne: userId },
  });

  if (existingUser) {
    return { success: false, message: "Email already exists" };
  }

  const result = await User.findByIdAndUpdate(userId, data, { new: true });

  if (result) {
    return { success: true, message: "User updated successfully", result };
  } else {
    return { success: false, message: "No data found" };
  }
}

async function loginUser(data) {
  try {
    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      return { success: false, message: "User not registered" };
    }
    const isPasswordValid = await comparePasswords(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = await generateLoginToken(user);

    return { success: true, user, token };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Error during login" };
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUsersData,
  updateUser,
  loginUser,
  getUsers,
};
