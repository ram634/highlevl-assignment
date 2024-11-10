import React, { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  MenuList,
  ListItemText,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "../styles/WalletApp.css";
import axios from "axios";
import TransactionForm from "../components/TransactionForm";
import toast, { Toaster } from "react-hot-toast";

const WalletPage = () => {
  let [wallet, setWallet] = useState(null);
  let [transactions, setTansactions] = useState([]);
  let [walletId, setWalletId] = useState("");

  useEffect(() => {
    let walletId = localStorage.getItem("walletId");
    if (walletId) {
      fetchWalletDetails(walletId);
      fetchLastTransaction(walletId);
      setWalletId(walletId);
    }
  }, []);

  const fetchWalletDetails = async (walletId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/wallet/${walletId}`
      );
      if (response?.statusText === "OK") {
        setWallet(response?.data);
      }
    } catch (error) {
      console.log("Error while fetching data");
      toast.error(`Error while fetching wallet details. `);
    }
  };

  const fetchLastTransaction = async (walletId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions?walletId=${walletId}&skip=${0}&limit=${5}`
      );
      console.log(response);
      setTansactions(response?.data?.transactions);
    } catch (error) {
      console.log(error);
      toast.error(`Error while fetching data.`);
    }
  };

  const setWalletDaetails = (data) => {
    setWallet(data);
    fetchWalletDetails(walletId);
    fetchLastTransaction(walletId);
  };
  return (
    <Grid container className="wallet-app-main-container">
      <Toaster position="top-right" reverseOrder={false} />
      <Grid item size={{ lg: 6, xl: 4 }} bgcolor={"#0d47a1"} p={2}>
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
            <span className="wallet-wlcm-msg">
              Welcome back, {wallet?.name}! Here’s your current balance
            </span>
          </Grid>
          <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
            <Grid container bgcolor={"white"} p={2}>
              <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                <span className="wallet-bal-head">Wallet Balance</span>
              </Grid>
              <Grid item size={{ xs: 12, md: 12, lg: 12, xl: 12 }} mt={1}>
                <div style={{ padding: "1rem", backgroundColor: "#e1f5fe" }}>
                  <span
                    className="wallet-bal"
                    style={{ color: wallet?.balance > 0 ? "green" : "red" }}
                  >
                    {wallet?.balance > 0 ? "+" : "-"}{" "}
                    {wallet?.balance.toFixed(4)}
                  </span>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            size={{ xs: 12, md: 12, lg: 12, xl: 12 }}
            bgcolor={"white"}
            p={2}
          >
            <Typography variant="h7" sx={{ fontWeight: "bold" }}>
              Latest Transactions :
            </Typography>
            <div className="transaction-list">
              <MenuList>
                {transactions.map((doc, index) => (
                  <MenuItem key={index}>
                    <ListItemText sx={{ width: "30%" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        color={doc?.type === "CREDIT" ? "success" : "error"}
                      >
                        {doc?.type}
                      </Button>
                    </ListItemText>
                    <ListItemText sx={{ width: "35%" }}>
                      <Typography variant="subtitle1" color="text.primary">
                        Rs {doc.amount.toFixed(4)}
                      </Typography>
                    </ListItemText>
                    <ListItemText sx={{ width: "35%" }}>
                      {doc?.description}
                    </ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item size={{ xs: 12, md: 12, lg: 6, xl: 8 }} p={2}>
        <div className="transaction-container">
          <TransactionForm
            walletId={walletId}
            onTransactionComplete={setWalletDaetails}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default WalletPage;
