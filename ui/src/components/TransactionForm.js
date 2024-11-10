import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const TransactionForm = ({ onTransactionComplete }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [walletId, setWalletId] = useState(null);
  const [transactionnType, setTransactionType] = useState("CREDIT");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let transactionAmount = amount;
      if (transactionnType === "CREDIT") {
        transactionAmount = parseFloat(amount);
      } else {
        transactionAmount = -parseFloat(amount);
      }
      const response = await axios.post(
        `http://localhost:5000/transact/${walletId}`,
        {
          amount: transactionAmount,
          description,
        }
      );

      const data = response?.data;
      onTransactionComplete(data);
      toast.success("Transaction successful.Please check the wallet");
      clearForm();
    } catch (error) {
      toast.error(`Transaction failed. ${error?.response?.data?.message}`);
      clearForm();
    }
  };

  const clearForm = () => {
    setAmount("");
    setTransactionType("CREDIT");
    setDescription("");
  };

  const handleChangeType = (event, newAlignment) => {
    console.log(newAlignment);
    setTransactionType(newAlignment);
  };

  useEffect(() => {
    setWalletId(localStorage.getItem("walletId"));
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "white",
        padding: "2rem",
        width: "50%",
        borderRadius: "10px",
      }}
    >
      <span className="wallet-bal-head">Add a New Transaction</span>
      <TextField
        type="number"
        label="Transaction Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <TextField
        type="text"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <ToggleButtonGroup
        color="primary"
        value={transactionnType}
        exclusive
        onChange={handleChangeType}
        aria-label="Platform"
        size="small"
      >
        <ToggleButton value="CREDIT">CREDIT</ToggleButton>
        <ToggleButton value="DEBIT">DEBIT</ToggleButton>
      </ToggleButtonGroup>
      <Button variant="contained" color="primary" type="submit">
        Submit Transaction
      </Button>
      <Toaster position="top-right" reverseOrder={false} />
    </Box>
  );
};

export default TransactionForm;
