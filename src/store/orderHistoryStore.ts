"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OrderHistoryItem {
  id: string;
  date: string;
  items: Array<{ slug: string; name: string; price: number; quantity: number }>;
  totalAmount: number;
  location: string;
}

interface OrderHistoryState {
  orders: OrderHistoryItem[];
  addOrder: (order: Omit<OrderHistoryItem, "id" | "date">) => void;
  clearHistory: () => void;
}

export const useOrderHistoryStore = create<OrderHistoryState>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [
            {
              ...order,
              id: `order-${Date.now()}`,
              date: new Date().toISOString(),
            },
            ...state.orders,
          ],
        }));
      },

      clearHistory: () => set({ orders: [] }),
    }),
    {
      name: "spice-garden-orders",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
