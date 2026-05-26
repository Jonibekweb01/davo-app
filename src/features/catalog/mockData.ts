import type { Medicine } from "../../store/useCartStore.ts";

export interface ExtendedMedicine extends Medicine {
  category: "Kardiologiya" | "Vitaminlar" | "Og'riq qoldiruvchi" | "Antibiotik";
  description: string;
}

export const MOCK_MEDICINES: ExtendedMedicine[] = [
  {
    id: "1",
    name: "Cardiomagnyl 75mg",
    price: 45000,
    pharmacyName: "Dorixona 07",
    distance: "650m",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
    stock: 14,
    category: "Kardiologiya",
    description:
      "Yurak-qon tomir kasalliklarini oldini olish uchun trombsitga qarshi vosita.",
  },
  {
    id: "2",
    name: "Vitamin C Ultra Boost",
    price: 25000,
    pharmacyName: "Dorixona Biodinamika 2",
    distance: "1.4km",
    image:
      "https://images.unsplash.com/photo-1616679911721-efe6eec18fcd?w=300&q=80",
    stock: 50,
    category: "Vitaminlar",
    description:
      "Imunitetni oshirish va organizmning umumiy tonusini tiklash uchun askorbin kislotasi.",
  },
  {
    id: "3",
    name: "Ibuprofen 400mg Max",
    price: 12000,
    pharmacyName: "Dorixona PHARZAM PHARM №9",
    distance: "300m",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&q=80",
    stock: 9,
    category: "Og'riq qoldiruvchi",
    description:
      "Kuchli og'riq qoldiruvchi, haroratni tushiruvchi va yallig'lanishga qarshi dori.",
  },
  {
    id: "4",
    name: "Amoxicillin 500mg",
    price: 38000,
    pharmacyName: "Dorixona Milla Med №3",
    distance: "2.8km",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80",
    stock: 22,
    category: "Antibiotik",
    description:
      "Keng spektrli bakteriyalarga qarshi ta'sir ko'rsatuvchi antibiotik vositasi.",
  },
];
