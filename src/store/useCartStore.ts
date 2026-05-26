import { create } from "zustand";

export interface Medicine {
  _id: string; // ✅ MongoDB unikal ID formatiga o'tkazildi
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  description?: string;
  pharmacy?: {
    // Backenddan to'liq obyekt yuklanib kelishi uchun optimallashdi
    _id: string;
    name: string;
    address: string;
  };
}

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (medicine) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.medicine._id === medicine._id, // ✅ _id ga o'zgartirildi
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        const currentItem = newItems[existingIndex];

        if (currentItem.quantity < currentItem.medicine.stock) {
          currentItem.quantity += 1;
        }
        return { items: newItems };
      }

      return { items: [...state.items, { medicine, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.medicine._id !== id), // ✅ _id ga o'zgartirildi
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.medicine._id === id // ✅ _id ga o'zgartirildi
          ? {
              ...item,
              quantity: Math.min(Math.max(1, quantity), item.medicine.stock),
            }
          : item,
      ),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.medicine.price * item.quantity,
      0,
    ),
}));
