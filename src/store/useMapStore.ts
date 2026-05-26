import { create } from "zustand";

export interface Pharmacy {
  _id: string; // ✅ MongoDB formatiga o'tkazildi
  name: string;
  address: string;
  phone: string;
  workingHours: string;
  rating: number;
  medicinesCount: number;
  location?: {
    coordinates: [number, number]; // [lng, lat] formatda (MongoDB uchun)
  };
  lat?: number; // Qulaylik uchun eski lat/lng ham turaversin
  lng?: number;
}

interface MapState {
  userLocation: [number, number] | null;
  pharmacies: Pharmacy[];
  setPharmacies: (pharmacies: Pharmacy[]) => void; // ✅ Backenddan kelgan dorixonalarni saqlash uchun
  setUserLocation: (loc: [number, number]) => void;
  showRoute: boolean;
  selectedPharmacy: Pharmacy | null;
  setSelectedPharmacy: (pharmacy: Pharmacy | null) => void;
  setShowRoute: (show: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  userLocation: [41.311081, 69.240562],
  selectedPharmacy: null,
  pharmacies: [], // Bo'sh massiv, buni xarita sahifasida backenddan to'ldiramiz

  setPharmacies: (pharmacies) => set({ pharmacies }),
  showRoute: false,
  setShowRoute: (show) => set({ showRoute: show }),
  setUserLocation: (loc) => set({ userLocation: loc }),
  setSelectedPharmacy: (pharmacy) =>
    set({ selectedPharmacy: pharmacy, showRoute: false }),
}));
