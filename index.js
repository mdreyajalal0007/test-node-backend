const express = require("express");
require("dotenv").config();
const userRouter = require("./src/routes/userRoutes");
const reviewRouter = require("./src/routes/reviewRoutes");
const { connectMongoDb } = require("./src/config/dbConnection");

const app = express();
app.use(express.json());

const port = parseInt(process.env.PORT_NUMBER, 10);

connectMongoDb(process.env.MONGODB_URL);
//router 
app.use("/api/users", userRouter); 
app.use("/api/review", reviewRouter);

app.listen(port, () => {
  console.log(`This application is listening on port number: ${port}`);
});
