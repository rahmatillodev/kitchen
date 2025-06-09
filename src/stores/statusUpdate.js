import { create } from 'zustand';
import { toast } from 'react-toastify';
import { useAuthStore } from './authStore';
import { API_ENDPOINTS } from '../infrastructure/api';

export const useOrderUpdateStore = create(() => ({
  updateStatus: async ({ id, status }) => {
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      toast.error("Token mavjud emas. Iltimos tizimga kiring.");
      return;
    }
  
    try {
      const res = await fetch(API_ENDPOINTS.ordersStatusUpdate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
  
      const contentType = res.headers.get("content-type");
  
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Xatolik (HTML response):", text);
        toast.error("Noto‘g‘ri javob (HTML) qaytdi. Balki endpoint noto‘g‘ri.");
        return;
      }
  
      const result = await res.json();
  
      if (!res.ok) {
        if (res.status === 409) {
          toast.error(result.message || "Buyurtma holatini o'zgartirib bo'lmaydi.");
        } else if (res.status === 400) {
          const errors = result.errors || {};
          const message = Object.entries(errors)
            .map(([key, value]) => `${key}: ${value.join(', ')}`)
            .join('; ');
          toast.error(message || "Xatolik yuz berdi.");
        } else {
          toast.error(result.message || "Server xatoligi.");
        }
        return;
      }
  
      // Muvaffaqiyatli holat
      toast.success(
        status === 'completed'
          ? `Buyurtma #${id} muvaffaqiyatli yakunlandi.`
          : `Buyurtma #${id} bekor qilindi.`
      );
  
      return result;
  
    } catch (err) {
      console.error("Xatolik (status update):", err);
      toast.error("Buyurtma holatini yangilashda xatolik yuz berdi.");
    }
  },
  
}));
