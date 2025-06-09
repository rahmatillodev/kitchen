import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    (set) => ({
      refreshToken: null,
      accessToken: null,
      login: async (username, password) => {
        const res = await fetch('https://kitchenapi.pythonanywhere.com/api/v1/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
      
        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        console.log(data);
      
        set({ 
          refreshToken: data.refresh, 
          accessToken: data.access, 
        });
      },      
    }),
    {
      name: 'auth-storage',
    }
  )
);
