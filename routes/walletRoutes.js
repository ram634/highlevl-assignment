const express = require("express");
const router = express.Router();

const {
  createWallet,
  transactWallet,
  getWallet,
} = require("../controllers/WalletControllers");

router.post("/setup", createWallet);
router.post("/transact/:walletId", transactWallet);
router.get("/wallet/:walletId", getWallet);

module.exports = router;
