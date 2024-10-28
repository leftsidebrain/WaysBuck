import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getTransactions } from "../../store/transaction/thunk";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Transaction() {
  const { transactions } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [transactions]);

  const buttonAction = ({ status }: any) => {
    {
      if (status === "PENDING") {
        return (
          <Box sx={{ display: "flex" }}>
            <Button variant="contained" color="success">
              Aprove
            </Button>
            <Button variant="contained" color="success">
              Cancel
            </Button>
          </Box>
        );
      } else if (status == "SUCCSESS") {
        return <Icon icon="bx:bx-x-circle" color="error" />;
      } else if (status == "WAITINF") {
        return (
          <Icon
            icon="bx:bx-
          bx-check-circle"
            color="success"
            style={{ fontSize: "20px", cursor: "pointer" }}
          />
        );
      }
    }
  };

  return (
    <TableContainer component={Paper} style={{ width: "80%", justifySelf: "center" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#E5E5E5" }}>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell>Post Code</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.postcode}</TableCell>
              <TableCell>{row.total.toString()}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{buttonAction(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
