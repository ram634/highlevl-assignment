const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const databaseConnection = require("./config/databaseConnection");

const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");

const app = express();
dotenv.config();
databaseConnection();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes

app.use("", walletRoutes);
app.use("", transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log("Backend server running at port", process.env.PORT);
});
