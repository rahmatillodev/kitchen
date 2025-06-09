// src/stores/useTipAmountStore.ts
import { create } from "zustand";
import { API_ENDPOINTS } from "@/infrastructure/api";
import { useAuthStore } from "./authStore";


export const useTipAmountStore = create((set, get) => ({
  tipAmount: [],
  loading: false,
  error: null,

  fetchTipAmount: async (force = false) => {
    const { tipAmount } = get();
    if (!force && tipAmount.length > 0) return;

    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.warn("Access token yo‘q");
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await fetch(API_ENDPOINTS.amount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("API xatolik berdi");

      const data = await res.json();
      set({ tipAmount: data.data.price });
    } catch (err) {
      console.error("Tip olishda xatolik:", err);
      set({ error: err.message || "Xatolik yuz berdi" });
    } finally {
      set({ loading: false });
    }
  },
}));
