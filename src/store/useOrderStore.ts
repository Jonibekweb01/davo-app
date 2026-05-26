import { create } from "zustand";

export type PaymentMethod = "cash" | "click" | "payme";
export type OrderStatus =
  | "idle"
  | "pending"
  | "processing"
  | "success"
  | "failed";

interface OrderState {
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  setPaymentMethod: (method: PaymentMethod) => void;
  setOrderStatus: (status: OrderStatus) => void;
  setCustomerInfo: (info: {
    name: string;
    phone: string;
    address: string;
  }) => void;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  paymentMethod: "cash",
  orderStatus: "idle",
  customerName: "",
  customerPhone: "",
  deliveryAddress: "",

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setOrderStatus: (status) => set({ orderStatus: status }),
  setCustomerInfo: (info) =>
    set({
      customerName: info.name,
      customerPhone: info.phone,
      deliveryAddress: info.address,
    }),
  resetOrder: () =>
    set({
      paymentMethod: "cash",
      orderStatus: "idle",
      customerName: "",
      customerPhone: "",
      deliveryAddress: "",
    }),
}));
