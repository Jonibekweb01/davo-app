import React from "react";
import { ShoppingCart, MapPin } from "lucide-react";

interface MedicineProps {
  name: string;
  price: number;
  pharmacy: string;
  distance: string;
  image: string;
}

export const GlassCard: React.FC<MedicineProps> = ({
  name,
  price,
  pharmacy,
  distance,
  image,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00FF66]/30 hover:shadow-[0_8px_30px_rgb(0,255,102,0.1)]">
      {/* 3D effekt beruvchi orqa fon nuri */}
      <div className="absolute -right-10 -top-10 -z-10 h-24 w-24 rounded-full bg-[#00FF66]/10 blur-2xl transition-all duration-500 group-hover:bg-[#00FF66]/20" />

      {/* Rasm joyi */}
      <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-white/5 p-4">
        <img
          src={image}
          alt={name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Ma'lumotlar */}
      <div className="mt-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-wide text-white truncate">
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
            <MapPin size={12} className="text-[#00FF66]" />
            <span>
              {pharmacy} ({distance})
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-black text-[#00FF66]">
            {price.toLocaleString()} UZS
          </span>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF66] text-[#010314] transition-transform duration-200 active:scale-95 cursor-pointer hover:bg-[#00E55A]">
            <ShoppingCart size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
