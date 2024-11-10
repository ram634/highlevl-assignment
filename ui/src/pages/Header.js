import React from "react";
import { AppBar, Tabs, Tab, Box, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ onClikLogOut }) => {
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    localStorage.removeItem("walletId");
    onClikLogOut();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
              to="/wallet"
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
    </Box>
  );
};

export default Header;
