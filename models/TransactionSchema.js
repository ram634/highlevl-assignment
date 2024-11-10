const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    walletId: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
  },
  {
    optimisticConcurrency: true, // Enables optimistic concurrency control
  }
);

module.exports = mongoose.model("transaction", TransactionSchema);
