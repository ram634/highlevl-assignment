const express = require("express");
const WalletSchema = require("../models/WalletSchema");
const TransactionSchema = require("../models/TransactionSchema");

const getTransactions = async (req, res) => {
  try {
    const { walletId, skip = 0, limit = 10 } = req.query;
    const transactions = await TransactionSchema.find({ walletId })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ date: -1 });

    let totalCount = await TransactionSchema.countDocuments({ walletId });

    res.status(200).json({ transactions, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while feching transactions list" });
  }
};

module.exports = { getTransactions };
