// app/stores/useOrderStore.js
import { create } from 'zustand';
import { Order } from '../../core/entities/Order';
import { MockOrderRepository } from '../../infrastructure/mock/mockOrderRepository';

const orderRepository = new MockOrderRepository();

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  
  // Actions
  createOrder: async (items) => {
    try {
      set({ loading: true });
      const newOrder = new Order(
        crypto.randomUUID(),
        items.map(item => new OrderItem(item.productId, item.quantity, item.price)),
        'pending'
      );
      await orderRepository.save(newOrder);
      set(state => ({ orders: [...state.orders, newOrder], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOrders: async () => {
    try {
      set({ loading: true });
      const orders = await orderRepository.getAll();
      set({ orders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));