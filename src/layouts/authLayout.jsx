import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const AuthLayout = () => {
  const { accessToken } = useAuthStore();

  return accessToken ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
