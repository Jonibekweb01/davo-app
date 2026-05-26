import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { useUiStore } from '../../store/useUiStore';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';

export const CartView: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCartStore();
  const setActiveTab = useUiStore((state) => state.setActiveTab);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn bg-white rounded-3xl border border-gray-100 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF0F8] text-[#C9A84C] mb-4">
          <ShoppingBag size={28} />
        </div>
        <h3 className="text-xl font-extrabold text-[#0D1B3E]">Savatchangiz bo'sh</h3>
        <p className="mt-1 text-xs text-gray-400 max-w-xs">
          Siz hali hech qanday dori vositasi qo'shmadingiz.
        </p>
        <button
          onClick={() => setActiveTab('home')}
          className="mt-6 flex items-center gap-2 rounded-xl bg-[#0D1B3E] text-white px-5 py-2.5 text-xs font-bold shadow-md hover:bg-[#1a2d5a] transition-all cursor-pointer"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>Katalogga qaytish</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      {/* Chap Tomon: Tanlangan dorilar */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-black text-[#0D1B3E] uppercase tracking-wider">Tanlangan dorilar</h3>
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
          >
            Tozalash
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.medicine.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#EEF0F8] p-2">
                  <img src={item.medicine.image} alt={item.medicine.name} className="h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0D1B3E]">{item.medicine.name}</h4>
                  <p className="text-[11px] text-gray-400">{item.medicine.pharmacyName}</p>
                  <p className="text-xs font-black text-[#C9A84C] mt-0.5">
                    {item.medicine.price.toLocaleString()} so'm
                  </p>
                </div>
              </div>

              {/* Boshqaruv tugmalari */}
              <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-gray-50 pt-2 sm:border-none sm:pt-0">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                    className="p-1 rounded text-gray-500 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Minus size={12} strokeWidth={2.5} />
                  </button>
                  <span className="w-5 text-center font-bold text-xs text-[#0D1B3E]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                    disabled={item.quantity >= item.medicine.stock}
                    className="p-1 rounded text-gray-500 hover:bg-white transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-[#0D1B3E] min-w-[80px] text-right">
                    {(item.medicine.price * item.quantity).toLocaleString()} so'm
                  </span>
                  <button
                    onClick={() => removeFromCart(item.medicine.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* O'ng Tomon: Hisob-Kitob Bloki */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-100 rounded-[24px] p-5 space-y-4 lg:sticky lg:top-28 shadow-sm">
          <h3 className="text-sm font-black tracking-wide text-[#0D1B3E] uppercase border-b border-gray-100 pb-2">Buyurtma tafsiloti</h3>
          
          <div className="space-y-2.5 text-xs font-semibold">
            <div className="flex justify-between text-gray-400">
              <span>Dorilar soni</span>
              <span className="text-[#0D1B3E] font-bold">{items.reduce((sum, i) => sum + i.quantity, 0)} ta</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Yetkazib berish</span>
              <span className="text-green-600 text-[10px] font-black uppercase">Bepul</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
              <span className="text-sm text-[#0D1B3E]">Umumiy summa</span>
              <span className="text-lg font-black text-[#C9A84C]">{totalPrice().toLocaleString()} so'm</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('checkout')}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0D1B3E] text-white py-3.5 text-sm font-bold shadow-md hover:bg-[#1a2d5a] transition-all cursor-pointer"
          >
            <span>To'lovga o'tish</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};