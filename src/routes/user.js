const express = require("express");
const {
  handleGetAllUsers,
  handleCreateNewUsers,
  handleGetUsers,
  handleUpdateUsers,handleLoginUser, handleUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/get-all-users", handleGetAllUsers);

router.post("/create-user", handleCreateNewUsers);

router.get("/get-users/:id", handleGetUsers);

router.get("/get-users", handleUser);

router.put("/update-user/:id", handleUpdateUsers);

router.post("/login", handleLoginUser);

module.exports = router;
