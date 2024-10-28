import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getToping = createAsyncThunk("toping/getToping", async () => {
    try {
        const response = await axios.get("http://localhost:3000/toping");
        return response.data;
    } catch (error) {
        console.log(" ~ getToping ~ error:", error);
    }
});