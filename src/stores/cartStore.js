// stores/cartStore.js

import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  selectedItems: [],
  editingOrder: null,
  peopleCount: '',
  tableNumber: '',

  addItem: (item) =>
    set((state) => {
      const existing = state.selectedItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          selectedItems: state.selectedItems.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { selectedItems: [...state.selectedItems, { ...item, qty: 1 }] };
    }),

  increaseQty: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0),
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
      selectedItems: order.items,
      editingOrder: order,
      peopleCount: order.peopleCount.toString(),
      tableNumber: order.tableNumber.toString(),
    }),

  setPeopleCount: (value) => set({ peopleCount: value }),
  setTableNumber: (value) => set({ tableNumber: value }),
}));
