import axios from "axios";

// Backend ishlayotgan asosiy manzilni bog'laymiz
const API = axios.create({
  baseURL: "https://davo-backend.onrender.com/api/v1",
  timeout: 10000, // Agar backend 10 soniya javob bermasa, so'rovni to'xtatadi
});

// Dorilarni backenddan olib keluvchi funksiyalar
export const medicineService = {
  // Hamma dorilarni olish (agar qidiruv bo'lsa query uzatiladi)
  getMedicines: async (searchQuery?: string) => {
    const response = await API.get("/medicines", {
      params: { search: searchQuery },
    });
    return response.data; // Backenddan qaytgan JSON ma'lumot
  },
};
export const pharmacyService = {
  getPharmacies: async () => {
    const response = await API.get("/pharmacies");
    return response.data;
  },
};
