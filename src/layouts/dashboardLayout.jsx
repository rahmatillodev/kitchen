import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Navbar from './../components/navbar';

export const DashboardLayout = () => {
  const { user } = useAuthStore();
  return user ?(
    <div>
        <Navbar/>
      <div>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="login" replace/>
  )
};