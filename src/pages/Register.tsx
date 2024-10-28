import { Box, Button, Container, Input } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useRegisterHooks, { IRgister } from "../hooks/register-hooks/useRegisterHooks";
import { Controller } from "react-hook-form";
import axios from "axios";
import { useAppSelector } from "../store/store";

export default function Register() {
  const nav = useNavigate();
  const { control, handleSubmit, reset } = useRegisterHooks();
  const auth = useAppSelector((state) => state.auth.isLoggedIn);

  if (auth) {
    return <Navigate to="/" />;
  }
  const submit = async (data: IRgister) => {
    const res = await axios.post("http://localhost:3000/auth/register", data);
    reset();
    if (res.data) {
      nav("/");
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };
  return (
    <Container maxWidth="xs">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(submit, onError)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Controller control={control} name="email" render={({ field }) => <Input placeholder="email" type="email" {...field} />} />
          <Controller control={control} name="name" render={({ field }) => <Input placeholder="name" {...field} />} />
          <Controller control={control} name="password" render={({ field }) => <Input placeholder="password" type="password" {...field} />} />

          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account? Click{" "}
        <Link style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to="/login">
          here
        </Link>
      </p>
    </Container>
  );
}
