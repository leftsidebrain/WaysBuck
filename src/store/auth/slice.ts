import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  name: string;
  profile_pic: string;
  role: string;
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  name: "",
  profile_pic: "",
  role: "",
  email: "",
};

interface LoginPayload {
  name: string;
  profile_pic: string;
  role: string;
  email: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.profile_pic = action.payload?.profile_pic ?? "";
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.profile_pic = "";
      state.role = "";
      state.email = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
