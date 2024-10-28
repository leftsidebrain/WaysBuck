import { createSlice } from "@reduxjs/toolkit";
import { getToping } from "./topingThunk";

interface IToping {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface topingState {
  toping: IToping[];
}

const initialState: topingState = {
  toping: [],
};

export const topingSlice = createSlice({
  name: "toping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToping.fulfilled, (state, action) => {
      state.toping = action.payload;
    });
    builder.addCase(getToping.rejected, (state) => {
      state.toping = [];
    });
  },
});

export default topingSlice.reducer;
