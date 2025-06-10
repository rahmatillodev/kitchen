import { create } from "zustand";
import { API_ENDPOINTS } from "../infrastructure/api";
import { useAuthStore } from "./authStore";
import { toast } from 'react-toastify';

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  allOrders: [],

  fetchOrders: async () => {
    const token = useAuthStore.getState().accessToken;
    if (!token) return console.warn("Token topilmadi");

    set({ loading: true, error: null });

    try {
      const res = await fetch(API_ENDPOINTS.ordersGet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Buyurtmalarni olishda xatolik");

      const data = await res.json();
      set({ orders: data.data });
    } catch (err) {
      console.error("Xatolik (GET orders):", err);
      set({ error: err.message || "Xatolik yuz berdi" });
    } finally {
      set({ loading: false });
    }
  },
 
  fetchCompletedOrders: async (page = 1) => {
    console.log(page);
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.warn("Token topilmadi");
      return;
    }
    try {
      const res = await fetch(
      `https://kitchenapi.pythonanywhere.com/api/v1/orders/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Buyurtmalarni olishda xatolik");
      const data = await res.json();
      set({ allOrders: data });
    } catch (error) {
      console.error("Buyurtmalarni yuklashda xatolik:", error);
      set({ allOrders: { results: { success: false, message: "Tarmoqli xatolik" } } });
    }
  },  
  

  removeOrder: (id) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    }));
  },


}));


export const useOrderCreateStore = create((set)=> ({
  orders: [],
  error: null,
  createOrder: async (order) => {
    const token = useAuthStore.getState().accessToken;
    if (!token) return console.warn("Token yo'q");
    try {
      const res = await fetch(API_ENDPOINTS.ordersCreate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Buyurtma yuborishda xatolik");

      const result = await res.json();
      toast.success("Buyurtma muvaffaqiyatli yuborildi!");

      if (result.success) {
        set((state) => ({
          orders: [...state.orders, result.order_id],
        }));
        useOrderStore.getState().fetchOrders();
      } else {
        throw new Error(result.message || "Buyurtma yaratishda xatolik");
      }
    } catch (err) {
      console.error("Xatolik (POST order):", err);
      set({ error: err.message || "Xatolik yuz berdi" });
    }
  },
}))

export const useOrderUpdateStore = create(()=> ({
  updateOrder: async (orderId, updatedData) => {
    console.log(orderId, updatedData);
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      toast.error("Token topilmadi");
      return;
    }
  
    try {
      const res = await fetch(`${API_ENDPOINTS.udateOrder}${orderId}/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || "Yangilashda xatolik yuz berdi");
      }
  
      if (result.success) {
        toast.success("Buyurtma muvaffaqiyatli yangilandi");
        useOrderStore.getState().fetchOrders();
      } else {
        toast.error(result.message || "Yangilash bajarilmadi");
      }
    } catch (err) {
      console.error("Xatolik (UPDATE order):", err);
      toast.error(err.message || "Nomaʼlum xatolik yuz berdi");
    }
  },
}))