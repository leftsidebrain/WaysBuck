import { Box, Button, Container, Input } from "@mui/material";
import axios from "axios";
import { Controller } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useLoginHooks from "../hooks/login-hooks/useLoginHooks";
import { login } from "../store/auth/slice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Login() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { role, isLoggedIn } = useAppSelector((state) => state.auth);

  const { control, handleSubmit } = useLoginHooks();

  if (isLoggedIn && role === "USER") {
    return <Navigate to="/" />;
  } else if (role === "ADMIN") {
    return <Navigate to="/transaction" />;
  }

  const submit = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);

      const token = res.data;
      localStorage.setItem("token", token);

      const user = await axios.post(
        "http://localhost:3000/auth/checkAuth",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ submit ~ user:", user.data);

      // Jika autentikasi berhasil, dispatch login
      if (user.data) {
        dispatch(
          login({
            name: user.data.user.name,
            role: user.data.user.role,
            profile_pic: user.data.user.profile_pic,
            email: user.data.user.email,
          })
        );

        // Navigasi jika sudah login
        if (user.data.role === "USER") {
          nav("/"); // Navigasi ke halaman utama setelah login
        } else {
          nav("/transaction"); // Navigasi
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };
  return (
    <Container maxWidth="xs">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submit, onError)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Controller control={control} name="email" render={({ field }) => <Input type="email" placeholder="email" {...field} />} />
          <Controller control={control} name="password" render={({ field }) => <Input placeholder="password" type="password" {...field} />} />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>

      <p style={{ textAlign: "center" }}>
        Don't have an account? Click{" "}
        <Link style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to="/register">
          here
        </Link>
      </p>
    </Container>
  );
}
