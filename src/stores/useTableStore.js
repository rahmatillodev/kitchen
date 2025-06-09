import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { API_ENDPOINTS } from "../infrastructure/api";

export const useTableStore = create((set, get) => ({
  tables: [],
  loading: false,

  fetchTables: async () => {
    const { tables } = get();
    if (tables.length > 0) return;

    const token = useAuthStore.getState().accessToken;
    if (!token) throw new Error("Access token yo‘q");

    set({ loading: true });
    try {
      const res = await fetch(API_ENDPOINTS.tables, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("API xatolik berdi");

      const data = await res.json();
      set({ tables: data.data });
    } catch (err) {
      console.error("Stollarni olishda xatolik:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
