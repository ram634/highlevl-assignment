const express = require("express");
const { v4: uuidv4 } = require("uuid");
const WalletSchema = require("../models/WalletSchema");
const TransactionSchema = require("../models/TransactionSchema");
const { default: mongoose } = require("mongoose");

const createWallet = async (req, res) => {
  try {
    const { name, balance } = req.body;

    //Parmaters vallidation
    if (!name || !balance) throw new Error("Name and balance are required");

    // Validate the balance precision
    if (!/^\d+(\.\d{1,4})?$/.test(balance.toString())) {
      return res.status(400).json({ message: "Balance must have up to 4 decimal points" });
    }

    //Check wallet with the same name exists are not
    const walletDetails = await WalletSchema.find({ name });
    console.log(walletDetails);
    if (walletDetails.length) throw new Error("User already exists");

    //Create walletId for the new User
    const walletId = uuidv4();
    let createWallet = new WalletSchema({ name, balance, walletId });
    await createWallet.save();

    //CReate transaction
    const transactionId = uuidv4();
    const createTransaction = new TransactionSchema({
      walletId,
      transactionId,
      amount: balance,
      balance,
      description: "Initial balance",
      type: "CREDIT",
    });
    await createTransaction.save();

    res
      .status(200)
      .json({ id: walletId, balance, name, date: createWallet.date });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating wallet" });
  }
};

const transactWallet = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;
    let transactionType = amount > 0 ? "CREDIT" : "DEBIT";

    if (!amount || !description)
      return res
        .status(500)
        .json({ message: "Amount and description are required" });

    //check wallet Details with provided wallet
    const wallet = await WalletSchema.findOne({ walletId }).session(session);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    console.log(wallet);

    // Check funds exist in the wallet for withdrawal (if debit)
    let newBalance = wallet.balance + amount;
    if (newBalance < 0)
      return res.status(400).json({ message: "Insufficient balance" });

    // Update the wallet with new balance using `save()` to trigger versioning
    wallet.balance = newBalance;
    await wallet.save({ session });

    // If the version has changed, a conflict occurred
    // if (!updatedWallet) {
    //   await session.abortTransaction();
    //   return res.status(409).json({ message: "Conflict detected, try again" });
    // }

    // Create a new transaction record
    const transaction = new TransactionSchema({
      walletId,
      transactionId: uuidv4(),
      amount,
      balance: newBalance,
      description,
      type: transactionType,
    });
    await transaction.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ balance: newBalance, transactionId: transaction.transactionId });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Error while making transaction" });
  }
};

const getWallet = async (req, res) => {
  try {
    const { walletId } = req.params;
    const wallet = await WalletSchema.findOne({ walletId });
    if (!wallet) throw new Error("Wallet not found");

    res.status(200).json({
      id: wallet.walletId,
      balance: wallet.balance,
      name: wallet.name,
      date: wallet.date,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while fetching wallet details" });
  }
};

module.exports = { createWallet, transactWallet, getWallet };
