const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    walletId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, min: 0, max: 9999999.9999 },
    date: { type: Date, default: Date.now },
  },
  {
    optimisticConcurrency: true, // Enables optimistic concurrency control
  }
);

module.exports = mongoose.model("wallet", WalletSchema);
