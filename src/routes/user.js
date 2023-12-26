const express = require("express");
const {
  handleGetAllUsers,
  handleCreateNewUsers,
} = require("../controllers/userController");

const router = express.Router();

router.get("/get-all-users", handleGetAllUsers);

router.post("/create-user", handleCreateNewUsers);

module.exports = router;
