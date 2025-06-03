import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  selectedItems: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.selectedItems.find((p) => p.id === product.id);
      if (existing) {
        return {
          selectedItems: state.selectedItems.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      }
      return {
        selectedItems: [...state.selectedItems, { ...product, qty: 1 }],
      };
    }),
  clearItems: () => set({ selectedItems: [] }),

  increaseQty: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0),
    })),
}));
