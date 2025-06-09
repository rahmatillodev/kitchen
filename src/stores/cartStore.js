// stores/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  selectedItems: [],
  editingOrder: null,
  peopleCount: "",
  tableNumber: '',

  addItem: (item) =>
    set((state) => {
      const existing = state.selectedItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          selectedItems: state.selectedItems.map((i) =>
            i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        };
      }
      return { selectedItems: [...state.selectedItems, { ...item, quantity: 1 }] };
    }),

  increaseQty: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems
        .map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearItems: () =>
    set({
      selectedItems: [],
      editingOrder: null,
      peopleCount: '',
      tableNumber: '',
    }),

  setEditingOrder: (order) =>
    set({
      selectedItems: order.items.map((item) => ({
        id: item.menu_id,
        name: item.menu_name,
        quantity: item.quantity,
        price: item.current_price,
      })),
      editingOrder: order,
      peopleCount: String(order.client_count),
      tableNumber: String(order.table),
    }),

  setPeopleCount: (value) => set({ peopleCount: value }),
  setTableNumber: (value) => set({ tableNumber: value }),
}));
