// src/stores/useMenuStore.ts
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { API_ENDPOINTS } from "../infrastructure/api";


export const useMenuStore = create((set, get) => ({
  menus: [],
  loading: false,
  error: null,

  fetchMenus: async (force = false) => {
    const { menus } = get();
    if (!force && menus.length > 0) return;

    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.warn("Access token yo‘q");
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await fetch(API_ENDPOINTS.menus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("API xatolik berdi");

      const data = await res.json();
      set({ menus: data.data });
    } catch (err) {
      console.error("Menyularni olishda xatolik:", err);
      set({ error: err.message || "Xatolik yuz berdi" });
    } finally {
      set({ loading: false });
    }
  },
}));
