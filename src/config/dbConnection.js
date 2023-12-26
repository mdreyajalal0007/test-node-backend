const mongoose = require("mongoose");

async function connectMongoDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}


module.exports = {
  connectMongoDb,
};
