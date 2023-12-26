const User = require("../modals/userModal");
const userService = require("../services/userService");

async function handleGetAllUsers(req, res) {
  const result = await userService.getAllUsers();
  return res.status(200).json({message:"Data fetched successfully",result});
}


async function handleCreateNewUsers(req, res) {
  const body = req.body;
  // const userId = req.params.id

  if (!body.firstName) {
    return res.status(400).json({ message: "First name field is required" });
  } else if (!body.lastName) {
    return res.status(400).json({ message: "Last name field is required" });
  } else if (!body.age) {
    return res.status(400).json({ message: "Age field is required" });
  } else if (!body.mobileNumber) {
    return res.status(400).json({
      message: "Mobile number field is required",
    });
  } else if (!body.email) {
    return res.status(400).json({
      message: "Email field is required",
    });
  } else {
    try {
      const result = await userService.createNewUser({
        firstName: body.firstName,
        lastName: body.lastName,
        age: Number(body.age),
        mobileNumber: Number(body.mobileNumber),
        email: body.email,
      });
      if (result.success===false) {
        return res.status(409).json({ message: result.message });
      } else {
        return res
          .status(201)
          .json({ Message: "New user has been created successfully", result });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = {
  handleGetAllUsers,
  handleCreateNewUsers,
};
