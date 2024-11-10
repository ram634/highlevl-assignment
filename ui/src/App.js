import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { AppBar, Tabs, Tab, Box, Button } from "@mui/material";
import WalletPage from "./pages/WalletPage";
import TransactionsPage from "./pages/TransactionsPage";
import WalletSetup from "./components/WalletSetup";
import Header from "./pages/Header";

function App() {
  const [walletId, setWalletId] = useState("");
  useEffect(() => {
    let walletId = localStorage.getItem("walletId");
    setWalletId(walletId);
  }, []);
  const handleLogoutButton = () => {
    setWalletId(null);
  };

  const handleWalletSetup = (walletId) => {
    setWalletId(walletId);
  };

  return (
    <div>
      <Router>
        {/* <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "#1a237e" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tabs value={false}>
                <Tab
                  label="Wallet"
                  style={{ color: "white" }}
                  component={Link}
                  to="/"
                />
                <Tab
                  label="Transactions"
                  style={{ color: "white" }}
                  component={Link}
                  to="/transactions"
                />
              </Tabs>
              <Button
                size="small"
                variant="contained"
                className="logout-btn"
                style={{ color: "white", marginRight: "3vh" }}
                onClick={handleLogoutButton}
              >
                log out
              </Button>
            </div>
          </AppBar>
        </Box> */}
        {walletId && <Header onClikLogOut={handleLogoutButton} />}

        <Routes>
          {!walletId && <Route path="*" element={<Navigate to="/sign" />} />}
          <Route
            path="/sign"
            element={<WalletSetup handleWalletSetup={handleWalletSetup} />}
          />
          <Route path="/wallet" element={<WalletPage />} />
          <Route
            path="/transactions"
            element={<TransactionsPage walletId={walletId} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
