import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Navbar from './../components/navbar';
import { useTipAmountStore } from "../stores/useTip_amountStore";
import { useEffect } from "react";
import { useMenuStore } from "../stores/useMenuStore";
import { useTableStore } from "../stores/useTableStore";
import { useOrderStore } from "../stores/useOrderStore";

export const DashboardLayout = () => {
  const { accessToken } = useAuthStore();

  const fetchTipAmount = useTipAmountStore((state) => state.fetchTipAmount);
  const fetchMenus = useMenuStore((state) => state.fetchMenus);
  const fetchTables = useTableStore((state) => state.fetchTables);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
    fetchTables();
    fetchMenus();
    fetchTipAmount();
  }, []);

  return accessToken ? (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="login" replace />
  );
};