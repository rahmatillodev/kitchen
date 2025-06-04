import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const AuthLayout = () => {
  const { user } = useAuthStore();

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
