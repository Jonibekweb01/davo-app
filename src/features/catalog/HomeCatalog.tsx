import React, { useState, useMemo, useEffect } from "react"; // useEffect to'g'ri bitta joyga yig'ildi
import { useCartStore } from "../../store/useCartStore";
import { medicineService } from "../../services/api";
import axios from "axios";

export const HomeCatalog: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Hammasi");

  // Backend ma'lumotlari uchun statelar
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // API orqali ma'lumotlarni yuklash
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // Backend url manzilingiz (Port: 5000)
        const response = await axios.get(
          "http://localhost:5000/api/v1/medicines",
        );

        // Agar backend response strukturasi { data: { medicines: [...] } } bo'lsa:
        if (response.data?.data?.medicines) {
          setMedicines(response.data.data.medicines);
        } else {
          setMedicines(response.data); // Oddiy array ko'rinishida kelsa
        }
      } catch (error) {
        console.error("Dorilarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const categoriesConfig = [
    {
      name: "Hammasi",
      icon: "auto_awesome",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-600",
    },
    {
      name: "Tabletka",
      icon: "pill",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      name: "Krem",
      icon: "clean_hands",
      bgColor: "bg-teal-500/10",
      textColor: "text-teal-600",
    },
    {
      name: "Vitamin",
      icon: "ecg_heart",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-600",
    },
    {
      name: "Jihozlar",
      icon: "stethoscope",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600",
    },
  ];

  // Filtr mexanizmi (MongoDB _id ga moslashtirildi)
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesSearch = med.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Hammasi" || med.category === selectedCategory; // Senda dori modelida qanday nomlanganiga qara
      return matchesSearch && matchesCategory;
    });
  }, [medicines, searchQuery, selectedCategory]);

  // Agar backenddan ma'lumot hali kelmagan bo'lsa Chiroyli Loader chiqadi
  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Dorilar yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-5 space-y-6 text-[#0D1B3E]">
      {/* ══ 1. QIDIRUV ══════════════════════════════════════════════ */}
      <div className="relative w-full group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A84C] transition-colors select-none text-[20px]">
          search
        </span>
        <input
          type="text"
          placeholder="Dori yoki kasallik qidiring..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl bg-white border border-gray-200 py-3.5 pl-12 pr-10 text-[#0D1B3E] font-medium placeholder-gray-400 outline-none focus:border-[#C9A84C]/60 focus:ring-2 focus:ring-[#C9A84C]/15 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] select-none">
              close
            </span>
          </button>
        )}
      </div>

      {/* ══ 2. KATEGORIYALAR ════════════════════════════════════════ */}
      <div className="space-y-3">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">
          Kategoriyalar
        </h2>

        {/* MOBIL: gorizontal scroll (< md) */}
        <div
          className="flex gap-2.5 overflow-x-auto pb-1 md:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categoriesConfig.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={{ minWidth: "88px", flexShrink: 0 }}
                className={`
                  h-[84px] rounded-2xl flex flex-col items-center justify-center gap-1.5
                  font-extrabold text-xs tracking-wide border
                  transition-all duration-200 active:scale-95 cursor-pointer select-none
                  ${
                    isSelected
                      ? "bg-[#C9A84C] text-white border-[#C9A84C] shadow-md"
                      : "bg-white text-gray-500 border-gray-100 shadow-sm"
                  }
                `}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center
                  ${isSelected ? "bg-white/20 text-white" : `${cat.bgColor} ${cat.textColor}`}`}
                >
                  <span className="material-symbols-outlined text-[20px] select-none">
                    {cat.icon}
                  </span>
                </div>
                <span className="leading-none">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* DESKTOP: 5 ustunli grid (md+) */}
        <div className="hidden md:grid md:grid-cols-5 gap-3">
          {categoriesConfig.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`
                  h-24 rounded-2xl flex flex-col items-center justify-center gap-2
                  font-extrabold text-xs tracking-wide border
                  transition-all duration-200 active:scale-95 cursor-pointer select-none
                  ${
                    isSelected
                      ? "bg-[#C9A84C] text-white border-[#C9A84C] shadow-lg shadow-[#C9A84C]/20 scale-[1.02]"
                      : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-[#0D1B3E] shadow-sm"
                  }
                `}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                  ${isSelected ? "bg-white/20 text-white" : `${cat.bgColor} ${cat.textColor}`}`}
                >
                  <span className="material-symbols-outlined text-[22px] select-none">
                    {cat.icon}
                  </span>
                </div>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ 3. MAHSULOTLAR ══════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black tracking-wide text-[#0D1B3E]">
            Tez sotiladiganlar
          </h3>
          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
            {filteredMedicines.length} ta dori
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {filteredMedicines.map((med) => {
            // Solishtirishni faqat _id orqali sodda va qat'iy qilamiz
            const cartItem = cartItems.find(
              (item) => item.medicine._id === med._id,
            );

            const isAdded = !!cartItem;
            const isFull = cartItem ? cartItem.quantity >= med.stock : false;

            return (
              <div
                key={med._id} // MongoDB unikal _id kaliti qo'yildi
                className="group flex flex-col overflow-hidden rounded-[20px] bg-white border border-gray-100 p-3 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* Rasm */}
                <div className="relative flex h-28 sm:h-36 md:h-40 w-full flex-shrink-0 items-center justify-center rounded-xl bg-[#EEF0F8] overflow-hidden">
                  {med.image && !med.image.includes("undefined") ? (
                    <img
                      src={med.image}
                      alt={med.name}
                      className="h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                        const placeholder = document.getElementById(
                          `fallback-${med._id}`,
                        );
                        if (placeholder) placeholder.classList.remove("hidden");
                      }}
                    />
                  ) : null}

                  <div
                    id={`fallback-${med._id}`}
                    className={`absolute inset-0 flex items-center justify-center text-gray-300 ${
                      med.image && !med.image.includes("undefined")
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-[40px] select-none">
                      pill
                    </span>
                  </div>

                  {/* Savattagi dona */}
                  {isAdded && (
                    <span className="absolute top-1.5 left-1.5 bg-[#0D1B3E] text-[#C9A84C] text-[10px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
                      {cartItem!.quantity}
                    </span>
                  )}

                  {/* Kam qoldi */}
                  {med.stock > 0 && med.stock <= 10 && (
                    <span className="absolute top-1.5 right-1.5 bg-red-50 text-red-400 border border-red-100 text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">
                      {med.stock} ta
                    </span>
                  )}
                </div>

                {/* Kontent */}
                <div className="flex flex-col flex-1 mt-2.5">
                  <h4 className="text-[12px] sm:text-sm font-extrabold text-[#0D1B3E] leading-snug line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
                    {med.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 truncate mt-0.5">
                    {/* Senior backenddan dorixona populate bo'lib keladi (med.pharmacy.name) */}
                    {med.pharmacy?.name || "Markaziy Dorixona"}
                  </p>
                </div>

                {/* Narx + Savat */}
                <div className="mt-auto pt-2.5 border-t border-gray-50 flex items-center justify-between gap-1 mt-3">
                  <span className="text-[12px] sm:text-[13px] font-black tracking-tight text-[#0D1B3E] whitespace-nowrap leading-none">
                    {med.price.toLocaleString()}
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 ml-0.5">
                      so'm
                    </span>
                  </span>

                  <button
                    onClick={() => addToCart(med)}
                    disabled={isFull}
                    aria-label={
                      isAdded ? "Savatga qo'shildi" : "Savatga qo'shish"
                    }
                    className={`
                      flex-shrink-0 flex h-8 sm:h-9 px-2 sm:px-3 items-center justify-center gap-1
                      rounded-xl text-xs font-bold
                      transition-all active:scale-95 cursor-pointer select-none
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${
                        isAdded
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-[#0D1B3E] text-white hover:bg-[#152754]"
                      }
                    `}
                  >
                    {isAdded ? (
                      <span className="material-symbols-outlined text-[15px] select-none">
                        check
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[15px] select-none">
                          shopping_cart
                        </span>
                        <span className="hidden sm:inline text-[11px]">
                          Savat
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ Empty State ═════════════════════════════════════════════ */}
      {filteredMedicines.length === 0 && (
        <div className="text-center py-16 text-gray-400 font-bold bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[36px] text-gray-300 mb-1 select-none">
            inventory_2
          </span>
          <span className="text-sm">Hech qanday dori topilmadi.</span>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Hammasi");
            }}
            className="text-xs font-bold text-[#C9A84C] hover:underline underline-offset-2 mt-1"
          >
            Filterni tozalash
          </button>
        </div>
      )}
    </div>
  );
};
