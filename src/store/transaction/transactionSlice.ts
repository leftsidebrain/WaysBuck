import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./thunk";

enum Status {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  CANCEL = "CANCEL",
  PROCESS = "PROCESS",
}

interface ITransaction {
  name: string;
  email: String;
  phone: String;
  postcode: String;
  address: String;
  total: Number;
  transaction_code?: String;
  receipt_url?: String;
  created_at: string;
  status: Status;
}

interface transactionsSate {
  transactions: ITransaction[];
}

const initialState: transactionsSate = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(getTransactions.rejected, (state) => {
      state.transactions = [];
    });
  },
});

export default transactionSlice.reducer;
