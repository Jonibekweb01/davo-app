import { create } from "zustand";

type ActiveTab = "home" | "map" | "cart" | "checkout" | "catalog";

interface UiState {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
