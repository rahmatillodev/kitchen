import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { API_ENDPOINTS } from "../infrastructure/api";


export const useCategoriesStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async (force = false) => {
    const { categories } = get();
    if (!force && categories.length > 0) return;

    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.warn("Access token yo‘q");
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await fetch(API_ENDPOINTS.categories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("API xatolik berdi");

      const data = await res.json();
      set({ categories: data.data });
      console.log(data);
    } catch (err) {
      console.error("Menyularni olishda xatolik:", err);
      set({ error: err.message || "Xatolik yuz berdi" });
    } finally {
      set({ loading: false });
    }
  },
}));
