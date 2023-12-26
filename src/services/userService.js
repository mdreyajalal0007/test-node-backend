const { isMobileValid, isValidEmail } = require("../helpers/helper");
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

module.exports = {
  getAllUsers,
  createNewUser,
};
