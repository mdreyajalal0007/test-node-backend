const express = require("express");
const {
  handleGetAllUsers,
  handleCreateNewUsers,
  handleGetUsers,
  handleUpdateUsers,handleLoginUser, handleUser
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/get-all-users", handleGetAllUsers);

userRouter.post("/create-user", handleCreateNewUsers);

userRouter.get("/get-users/:id", handleGetUsers);

userRouter.get("/get-users", handleUser);

userRouter.put("/update-user/:id", handleUpdateUsers);

userRouter.post("/login", handleLoginUser);

module.exports = userRouter;
