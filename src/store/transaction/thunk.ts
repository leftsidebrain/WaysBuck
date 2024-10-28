import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactions = createAsyncThunk("transaction", async () => {
  try {
    const res = await axios.get("http://localhost:3000/transactions");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
