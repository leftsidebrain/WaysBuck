import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function PrivateRutes() {
  const auth = useAppSelector((state) => state.auth.isLoggedIn);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
