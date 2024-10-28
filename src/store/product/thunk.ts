import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getProduct ~ error:", error);
  }
});

export const getProductById = createAsyncThunk("product/productById", async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(" ~ getProductById ~ error:", error);
  }
});
