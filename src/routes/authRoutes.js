import express from "express";
import {
  handleGetAllUsers,
  handleCreateNewUsers,
  handleGetUsers,
  handleUpdateUsers,
  handleLoginUser,
  handleUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../helpers/helper.js";

const authRouter = express.Router();

authRouter.get("/get-all-users", authenticateToken, handleGetAllUsers);
authRouter.post("/create-user", handleCreateNewUsers);
authRouter.get("/get-users/:id", handleGetUsers);
authRouter.get("/get-users", handleUser);
authRouter.put("/update-user/:id", handleUpdateUsers);
authRouter.post("/login", handleLoginUser);

export default authRouter;
