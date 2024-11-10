import React, { useEffect, useState } from "react";
import WalletSetup from "../components/WalletSetup";
import Grid from "@mui/material/Grid2";
import "../styles/WalletApp.css";

const WalletSignUpPage = () => {
  let [walletId, setWalletId] = useState("");

  useEffect(() => {
    let walletId = localStorage.getItem("walletId");
    if (walletId) {
      setWalletId(walletId);
    }
  }, []);
  const setWalletDaetails = (data) => {
    setWalletId(data);
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
      <WalletSetup onWalletInitialized={(data) => setWalletDaetails(data)} />
    </Grid>
  );
};

export default WalletSignUpPage;
