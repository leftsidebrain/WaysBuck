import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import authReducer from "./auth/slice";
import productsReducer from "./product/productSlice";
import topingReducer from "./toping/topingSlice";
import transactionReducer from "./transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    toping: topingReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
