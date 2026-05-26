import React, { useState, useEffect, useRef } from "react";
import { useCartStore } from "../../store/useCartStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useUiStore } from "../../store/useUiStore";

export const CheckoutView: React.FC = () => {
  const { totalPrice, clearCart } = useCartStore();
  const { paymentMethod, setPaymentMethod, orderStatus, setOrderStatus } =
    useOrderStore();
  const setActiveTab = useUiStore((state) => state.setActiveTab);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [address, setAddress] = useState("");

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.startsWith("+998 ")) {
      setPhone(val);
    } else if (
      val.trim() === "+99" ||
      val.trim() === "+9" ||
      val.trim() === "+"
    ) {
      setPhone("+998 ");
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!name.trim() || !address.trim() || cleanPhone.length < 13) {
      alert("Iltimos, ma'lumotlarni to'g'ri va to'liq kiriting!");
      return;
    }

    setOrderStatus("processing");

    setTimeout(() => {
      if (isMounted.current) {
        if (paymentMethod === "click" || paymentMethod === "payme") {
          alert(`${paymentMethod.toUpperCase()} to'lov tizimiga o'tilmoqda...`);
        }
        setOrderStatus("success");
        clearCart();
      }
    }, 2000);
  };

  // SUCCESS STATE - Mobil format uchun moslangan maxsus ekran
  if (orderStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn text-[#0D1B3E] max-w-sm mx-auto px-6">
        <div className="text-[#C9A84C] bg-[#C9A84C]/10 p-5 rounded-full mb-6 animate-bounce">
          <span className="material-symbols-outlined text-[54px] font-bold select-none">
            check_circle
          </span>
        </div>
        <h3 className="text-2xl font-black tracking-wide">
          Buyurtma qabul qilindi!
        </h3>
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          Sizning buyurtmangiz muvaffaqiyatli rasmiylashtirildi. Kuryer tez
          orada siz bilan bog'lanadi. Shoshilinch holatda dorilar 30 daqiqada
          yetkaziladi.
        </p>
        <button
          onClick={() => {
            setOrderStatus("idle");
            setActiveTab("home");
          }}
          className="mt-8 w-full rounded-2xl bg-[#0D1B3E] text-white hover:bg-[#152754] py-4 text-sm font-black shadow-lg shadow-[#0D1B3E]/10 active:scale-[0.98] transition-all cursor-pointer"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-4 pb-24 space-y-5 animate-fadeIn text-[#0D1B3E]">
      {/* ORQAGA QAYTISH (MOBIL USLUBDA NAZORAT) */}
      <button
        onClick={() => setActiveTab("cart")}
        className="flex items-center gap-1.5 text-xs font-black text-gray-400 hover:text-[#0D1B3E] transition-colors cursor-pointer select-none"
      >
        <span className="material-symbols-outlined text-[18px]">
          arrow_back
        </span>
        <span className="uppercase tracking-widest text-[10px]">
          Orqaga qaytish
        </span>
      </button>

      {/* ASOSIY GRID: MOBILDA KETMA-KET, DESKTOPDA YONMA-YON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* FORMA BLOKI (Premium Smooth Rounded) */}
        <form
          onSubmit={handleSubmitOrder}
          className="bg-white border border-gray-100/70 p-5 rounded-[32px] shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
            <span className="material-symbols-outlined text-[#C9A84C] text-[22px]">
              local_shipping
            </span>
            <h3 className="text-sm font-black tracking-wide">
              Yetkazib berish ma'lumotlari
            </h3>
          </div>

          {/* INPUT: ISM */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">
              Ismingiz
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-gray-400 text-[18px]">
                person
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Asadbek"
                className="w-full text-xs font-bold rounded-xl border border-transparent bg-gray-50 py-3.5 pl-11 pr-4 text-[#0D1B3E] placeholder-gray-400 outline-none focus:border-[#C9A84C]/50 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* INPUT: TELEFON */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">
              Telefon raqamingiz
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-gray-400 text-[18px]">
                call
              </span>
              <input
                type="text"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 90 123 45 67"
                className="w-full text-xs font-bold rounded-xl border border-transparent bg-gray-50 py-3.5 pl-11 pr-4 text-[#0D1B3E] placeholder-gray-400 outline-none focus:border-[#C9A84C]/50 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* INPUT: MANZIL */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">
              Manzilingiz
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-gray-400 text-[18px]">
                home_pin
              </span>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Toshkent sh., Chilonzor tumani..."
                className="w-full text-xs font-bold rounded-xl border border-transparent bg-gray-50 py-3.5 pl-11 pr-4 text-[#0D1B3E] placeholder-gray-400 outline-none focus:border-[#C9A84C]/50 focus:bg-white transition-all resize-none shadow-inner"
              />
            </div>
          </div>

          {/* MOBILDA BUYURTMANI TASDIQLASH TUGMASI (AGAR TO'LOV TUGMASI ALOHIDA BO'LSA PASTROQDA HAM TURADI) */}
          <button
            type="submit"
            disabled={orderStatus === "processing"}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0D1B3E] text-white py-3.5 font-black tracking-wide hover:bg-[#152754] active:scale-[0.97] transition-all disabled:opacity-50 cursor-pointer text-xs shadow-md shadow-[#0D1B3E]/10"
          >
            {orderStatus === "processing" ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
            ) : (
              <span>Buyurtmani tasdiqlash</span>
            )}
          </button>
        </form>

        {/* TO'LOV TIZIMLARI BLOKI */}
        <div className="bg-white border border-gray-100/70 p-5 rounded-[32px] shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
              <span className="material-symbols-outlined text-[#C9A84C] text-[22px]">
                payments
              </span>
              <h3 className="text-sm font-black tracking-wide">To'lov usuli</h3>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Naqd */}
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all select-none ${
                  paymentMethod === "cash"
                    ? "border-[#C9A84C] bg-[#C9A84C]/5 scale-[1.01]"
                    : "border-gray-50 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${paymentMethod === "cash" ? "bg-[#C9A84C]/10 text-[#C9A84C]" : "bg-gray-50 text-gray-400"}`}
                  >
                    <span className="material-symbols-outlined text-[20px] block">
                      quick_reorder
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black">Kuryerga naqd pul</h4>
                    <p className="text-[10px] font-medium text-gray-400">
                      Eshik tagida tekshirib to'laysiz
                    </p>
                  </div>
                </div>
                <div
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-[#C9A84C]" : "border-gray-300"}`}
                >
                  {paymentMethod === "cash" && (
                    <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />
                  )}
                </div>
              </div>

              {/* Click */}
              <div
                onClick={() => setPaymentMethod("click")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all select-none ${
                  paymentMethod === "click"
                    ? "border-[#C9A84C] bg-[#C9A84C]/5 scale-[1.01]"
                    : "border-gray-50 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${paymentMethod === "click" ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-gray-400"}`}
                  >
                    <span className="material-symbols-outlined text-[20px] block">
                      credit_card
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black">Click Ilovasi</h4>
                    <p className="text-[10px] font-medium text-gray-400">
                      Onlayn xavfsiz to'lov tizimi
                    </p>
                  </div>
                </div>
                <div
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "click" ? "border-[#C9A84C]" : "border-gray-300"}`}
                >
                  {paymentMethod === "click" && (
                    <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />
                  )}
                </div>
              </div>

              {/* Payme */}
              <div
                onClick={() => setPaymentMethod("payme")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all select-none ${
                  paymentMethod === "payme"
                    ? "border-[#C9A84C] bg-[#C9A84C]/5 scale-[1.01]"
                    : "border-gray-50 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${paymentMethod === "payme" ? "bg-teal-50 text-teal-500" : "bg-gray-50 text-gray-400"}`}
                  >
                    <span className="material-symbols-outlined text-[20px] block">
                      account_balance_wallet
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black">Payme tizimi</h4>
                    <p className="text-[10px] font-medium text-gray-400">
                      Lahzali xavfsiz tranzaksiya
                    </p>
                  </div>
                </div>
                <div
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "payme" ? "border-[#C9A84C]" : "border-gray-300"}`}
                >
                  {paymentMethod === "payme" && (
                    <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* JAMI SUMMA BLOKI */}
          <div className="border-t border-gray-50 pt-3.5 flex justify-between items-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
              Jami Summa:
            </span>
            <span className="text-lg font-black text-[#C9A84C] tracking-tight">
              {totalPrice().toLocaleString()} so'm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
