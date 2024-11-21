const { generatePasswordHash } = require("../helpers/helper");
const User = require("../modals/userModal");
const userService = require("../services/userService");

async function handleGetAllUsers(req, res) {
  const result = await userService.getAllUsers();
  return res.status(200).json({ message: "Data fetched successfully", result });
}

async function handleCreateNewUsers(req, res) {
  const body = req.body;

  if (!body.firstName) {
    return res.status(400).json({ message: "First name field is required" });
  } else if (!body.lastName) {
    return res.status(400).json({ message: "Last name field is required" });
  } else if (!body.password) {
    return res.status(400).json({ message: "Password field is required" });
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
        password: await generatePasswordHash(body.password),
      });
      if (result.success === false) {
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

async function handleGetUsers(req, res) {
  const params = req.params.id;
  const result = await userService.getUsersData(params);
  //------------------
  if (result.success === false) {
    return res.status(200).json({ message: result.message });
  } else
    return res
      .status(200)
      .json({ message: "Data fetched successfully", result });
}

async function handleUser(req, res) {
  const query = req.query.Id;
  const mobileNumber = req.query.mobileNumber
  const result = await userService.getUsers(query,mobileNumber);
  if (result.success === false) {
    return res.status(409).json({ message: result.message });
  } else
    return res
      .status(200)
      .json({ message: "Query data fetched successfully", result });
  
}

async function handleUpdateUsers(req, res) {
  const userId = req.params.id;
  const bodyData = req.body;

  const result = await userService.updateUser(userId, bodyData);

  if (!result.success) {
    return res.status(409).json({ message: result.message });
  }

  return res.status(200).json(result);
}

async function handleLoginUser(req, res) {
  const body = req.body;

  if (!body.email) {
    return res.status(400).json({ message: "Email field is required" });
  } else if (!body.password) {
    return res.status(400).json({ message: "Password field is required" });
  }
  const result = await userService.loginUser(body);

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }

  const data = result;
  return res.status(200).json({ data /* other data */ });
}



module.exports = {
  handleGetAllUsers,
  handleCreateNewUsers,
  handleGetUsers,
  handleUpdateUsers,
  handleLoginUser,
  handleUser
};
