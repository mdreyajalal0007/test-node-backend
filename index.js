import express from "express";
import dotenv from "dotenv";
import { connectMongoDb } from "./src/config/dbConnection.js";
import router from "./src/routes/index.js"; // Use the correct path and .js extension

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

const port = parseInt(process.env.PORT_NUMBER, 10);

connectMongoDb(process.env.MONGODB_URL);

app.listen(port, () => {
  console.log(`This application is listening on port number: ${port}`);
});
