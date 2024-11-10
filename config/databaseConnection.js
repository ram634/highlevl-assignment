const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log("Connected to database successfully");
      })
      .catch((error) => {
        console.log("Error while connecting to the database");
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
