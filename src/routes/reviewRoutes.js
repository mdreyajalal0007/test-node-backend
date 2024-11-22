import express from "express";

const reviewRouter = express.Router();

reviewRouter.get("/", (req, res) => {
  res.send("Review Router Working!");
});

export default reviewRouter;
