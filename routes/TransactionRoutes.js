const express = require("express");
const router = express.Router();

const { getTransactions } = require("../controllers/TransactionsControllers");

router.get("/transactions", getTransactions);

module.exports = router;
