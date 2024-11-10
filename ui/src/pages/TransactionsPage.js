import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";
import { CSVLink } from "react-csv";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const TransactionsTable = ({ walletId }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactionsCount, setTransactionsCount] = useState();

  useEffect(() => {
    let walletId = localStorage.getItem("walletId");
    const fetchTransactions = async () => {
      const response = await axios.get(
        `http://localhost:5000/transactions?walletId=${walletId}&skip=${
          page * rowsPerPage
        }&limit=${rowsPerPage}`
      );
      console.log(response);
      const transactions = response?.data?.transactions;
      const transactionsCount = response?.data?.totalCount;
      setTransactions(transactions);
      setTransactionsCount(transactionsCount);
    };
    fetchTransactions();
  }, [walletId, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headers = [
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Balance", key: "balance" },
    { label: "Description", key: "description" },
  ];

  return (
    <Grid container spacing={2} p={3} bgcolor={"#e3f2fd"}>
      <Grid item size={{ lg: 12, xl: 6 }}>
        <Typography variant="h7" sx={{ fontWeight: "bold" }}>
          Transactions List:
        </Typography>
      </Grid>
      <Grid item size={{ lg: 12, xl: 6 }}>
        <div className="csv-dnld-box">
          <Button variant="contained" size="small">
            <CSVLink
              data={transactions}
              headers={headers}
              filename="transactions.csv"
              style={{ textDecoration: "none", color: "white" }}
            >
              Export CSV
            </CSVLink>
          </Button>
        </div>
      </Grid>
      <Grid item size={{ lg: 12, xl: 12 }}>
        <div className="tranasaction-table-box">
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: "#42a5f5" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Date</TableCell>
                  <TableCell sx={{ color: "white" }}>Amount</TableCell>
                  <TableCell sx={{ color: "white" }}>Balance</TableCell>
                  <TableCell sx={{ color: "white" }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "white" }}>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.balance}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={transactionsCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ backgroundColor: "#42a5f5", color: "white" }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default TransactionsTable;
