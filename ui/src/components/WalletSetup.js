import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const WalletSetup = ({ handleWalletSetup }) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/setup", {
        name,
        balance: parseFloat(balance) || 0,
      });
      console.log(response);
      const data = response?.data;
      localStorage.setItem("walletId", data.id);
      handleWalletSetup(data.id);
      navigate("/wallet");
      toast.success("Congratulations,Wallet created successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Error while creating account. Please try again.");
    }
  };

  return (
    <Grid
      item
      size={{ lg: 12, xl: 12 }}
      className="wallet-login-page-container"
    >
      <span className="wallet-heading">
        Set up your wallet in seconds and manage your money easily!
      </span>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          padding: "2rem",
          width: "30%",
          marginTop: "5vh",
          borderRadius: "5px",
        }}
      >
        <TextField
          type="text"
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          type="number"
          label="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          <ArrowForwardIcon />
          Initialize Wallet
        </Button>
      </Box>
      <Toaster position="top-right" reverseOrder={false} />
    </Grid>
  );
};

export default WalletSetup;
