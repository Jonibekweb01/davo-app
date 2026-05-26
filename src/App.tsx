import { useUiStore } from "./store/useUiStore";
import { useCartStore } from "./store/useCartStore";
import { HomeCatalog } from "./features/catalog/HomeCatalog";
import { CartView } from "./features/checkout/CartView";
import { MapView } from "./features/map/MapView";
import { CheckoutView } from "./features/checkout/CheckoutView";
import {
  Grid,
  LayoutGrid,
  Map,
  MapPin,
  Pill,
  ShoppingCart,
  User,
} from "lucide-react"; // User ikonkasini qo'shdik (dizayndagi Profil uchun)

export default function App() {
  const { activeTab, setActiveTab } = useUiStore();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    // Dizaynga mos umumiy fon (Och kulrang-ko'k fon)
    <div className="min-h-screen bg-[#F4F6FA] text-[#0D1B3E] pb-28 md:pb-8 select-none font-sans">
      {/* Header - Dizayndagi premium To'q Ko'k (Navy) uslubida */}
      <header
        style={{ zIndex: 9999 }}
        className="sticky top-0 z-50 bg-[#0D1B3E]/95 backdrop-blur-md text-white px-4 py-3.5 md:px-8 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* LOGO QISMI: Tibbiy dori belgisi (Pill) bilan boyitildi */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0D1B3E] transition-all duration-300 shadow-inner">
              <Pill
                size={20}
                className="transform group-hover:rotate-45 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black tracking-wider bg-gradient-to-r from-white via-gray-100 to-[#C9A84C] bg-clip-text text-transparent">
                DAVO
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide -mt-0.5">
                Online Dorixona
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATSIYA: Ikonkalar qo'shildi va aktiv holat silliq chizildi */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
            {/* Katalog (Home) */}
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold tracking-wide transition-all duration-200 cursor-pointer outline-none relative select-none ${
                activeTab === "home"
                  ? "bg-[#C9A84C] text-[#0D1B3E] shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutGrid size={14} />
              <span>Katalog</span>
            </button>

            {/* Yaqin Dorixonalar (Map) */}
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold tracking-wide transition-all duration-200 cursor-pointer outline-none relative select-none ${
                activeTab === "map"
                  ? "bg-[#C9A84C] text-[#0D1B3E] shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <MapPin size={14} />
              <span>Yaqin Dorixonalar</span>
            </button>

            {/* Savatcha (Cart) */}
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold tracking-wide transition-all duration-200 cursor-pointer outline-none relative select-none ${
                activeTab === "cart"
                  ? "bg-[#C9A84C] text-[#0D1B3E] shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart size={14} />
                {totalItems > 0 && (
                  <span
                    className={`absolute -top-2.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black shadow-sm border ${
                      activeTab === "cart"
                        ? "bg-[#0D1B3E] text-[#C9A84C] border-[#C9A84C]"
                        : "bg-[#C9A84C] text-[#0D1B3E] border-[#0D1B3E]"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="ml-0.5">Savatcha</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Dinamik Sahna Konteyneri */}
      <main className="mx-auto max-w-7xl px-4 pt-6 md:px-12">
        {activeTab === "home" && <HomeCatalog />}
        {activeTab === "cart" && <CartView />}
        {activeTab === "map" && <MapView />}
        {activeTab === "checkout" && <CheckoutView />}
      </main>

      {/* Mobile Floating Bottom Tab Bar - Dizayndagi oq-shaffof (White/90) ko'rinishda */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/60 bg-white/95 pb-safe pt-2 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md md:hidden rounded-t-3xl">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 flex-1 transition-transform active:scale-95 cursor-pointer outline-none ${activeTab === "home" ? "text-[#C9A84C]" : "text-gray-400"}`}
          >
            <Grid size={20} />
            <span className="text-[10px] font-bold tracking-wider">Bosh</span>
          </button>

          <button
            onClick={() => setActiveTab("home")} // Dizaynda Katalog alohida turibdi
            className={`flex flex-col items-center gap-1 flex-1 transition-transform active:scale-95 cursor-pointer outline-none text-gray-400`}
          >
            <Grid size={20} className="rotate-45" />{" "}
            {/* Farqli ko'rinish uchun */}
            <span className="text-[10px] font-bold tracking-wider">
              Katalog
            </span>
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex flex-col items-center gap-1 flex-1 transition-transform active:scale-95 cursor-pointer outline-none ${
              activeTab === "map" ? "text-[#C9A84C]" : "text-gray-400"
            }`}
          >
            {/* Lucide-react ikonka. Agar loyihada MapPin import bo'lmasa, yuqorida import qivorasan */}
            <MapPin size={20} />

            <span className="text-[10px] font-bold tracking-wider">Xarita</span>
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className={`relative flex flex-col items-center gap-1 flex-1 transition-transform active:scale-95 cursor-pointer outline-none ${activeTab === "cart" ? "text-[#C9A84C]" : "text-gray-400"}`}
          >
            <ShoppingCart size={20} />
            <span className="text-[10px] font-bold tracking-wider">Savat</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A84C] text-[9px] font-black text-white">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("home")} // Store'ga "profile" qo'shguncha xato bermasligi uchun
            className={`flex flex-col items-center gap-1 flex-1 transition-transform active:scale-95 cursor-pointer outline-none text-gray-400`}
          >
            <User size={20} />
            <span className="text-[10px] font-bold tracking-wider">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
