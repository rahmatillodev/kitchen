import { create } from "zustand";
import { mockUsers } from "../infrastructure/mock/mockData";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  login: ({ name, password }) => {
    const normalizedName = name.toLowerCase();
    const normalizedPassword = password.toLowerCase();

    const matchedUser = mockUsers.find(
      (u) =>
        u.name.toLowerCase() === normalizedName &&
        u.password.toLowerCase() === normalizedPassword
    );

    if (matchedUser) {
      const user = { name: matchedUser.name }; // or other user info
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      return true;
    }

    return false;
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
