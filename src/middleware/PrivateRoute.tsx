import { getToken } from "../services/axios/AuthService";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const token = getToken() || localStorage.getItem("authtoken");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
