import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useMapStore } from "../../store/useMapStore";
import { MapPin, Navigation, Navigation2, Pill } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RoutingMachine } from "./RoutingMachine";

// Leaflet default ikonka xatolarini tozalash
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Apteka ikonkali neon marker yasash
const createPharmacyIcon = (isActive: boolean) => {
  const mainColor = isActive ? "#C9A84C" : "#1E293B"; // Aktiv bo'lsa Oltin, aks holda to'q ko'k
  const iconColor = isActive ? "#0D1B3E" : "#C9A84C"; // Ikonka rangi
  const borderColor = isActive ? "#ffffff" : "#C9A84C";

  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${mainColor}; 
        width: 32px; 
        height: 32px; 
        border-radius: 10px; 
        border: 2px solid ${borderColor}; 
        box-shadow: ${isActive ? "0 0 15px rgba(201, 168, 76, 0.6)" : "none"};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    `,
    className: "custom-pharmacy-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Foydalanuvchining shaxsiy lokatsiyasi uchun ko'k marker
const createUserIcon = () => {
  return new L.DivIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute animate-ping inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-75"></div>
        <div style="background-color: #3b82f6; width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);"></div>
      </div>
    `,
    className: "custom-user-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const ChangeMapView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15, { animate: true });
    }
  }, [center, map]);
  return null;
};

export const MapView: React.FC = () => {
  const {
    userLocation,
    pharmacies,
    setUserLocation,
    setPharmacies,
    selectedPharmacy,
    setSelectedPharmacy,
    showRoute,
    setShowRoute,
  } = useMapStore();

  const defaultCenter: [number, number] = [41.311081, 69.240562]; // Toshkent markazi

  const getUserLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => console.error("Lokatsiyani aniqlashda xatolik:", error),
        { enableHighAccuracy: true },
      );
    }
  };

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/pharmacies");
        const resData = await response.json();
        console.log("Backenddan kelgan ma'lumot:", resData);

        const dataArray =
          resData.data?.pharmacies ||
          (Array.isArray(resData) ? resData : resData.data);

        if (Array.isArray(dataArray)) {
          setPharmacies(dataArray);
        } else {
          console.error(
            "Xato: Dorixonalar massiv formatida kelmadi!",
            dataArray,
          );
        }
      } catch (error) {
        console.error("Dorixonalar yuklanishida xatolik yuz berdi:", error);
      }
    };

    fetchPharmacies();
  }, [setPharmacies]);

  useEffect(() => {
    if (!userLocation) {
      getUserLiveLocation();
    }
  }, []);

  return (
    <div className="p-3 md:p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:h-[calc(100vh-140px)] animate-fadeIn bg-[#F4F6FA] pb-28 lg:pb-6">
      {/* 1. DORIXONALAR RO'YXATI */}
      <div className="order-2 lg:order-1 lg:col-span-1 bg-[#0D1B3E] p-4 md:p-5 rounded-3xl flex flex-col max-h-[450px] lg:max-h-full h-full overflow-hidden shadow-xl lg:shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 shrink-0">
          <h3 className="text-base md:text-lg font-black tracking-wide text-white">
            Yaqin dorixonalar
          </h3>
          <button
            onClick={getUserLiveLocation}
            className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-2.5 py-1.5 text-[11px] font-black text-[#C9A84C] hover:bg-white/10 transition-all active:scale-95 cursor-pointer select-none"
          >
            <Navigation size={11} fill="#C9A84C" />
            <span>Lokatsiya</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-none">
          {pharmacies &&
            pharmacies.map((pharmacy: any) => {
              const currentId = pharmacy._id || pharmacy.id;
              const isSelected =
                selectedPharmacy?._id === currentId ||
                (selectedPharmacy as any)?.id === currentId;

              return (
                <div
                  key={currentId}
                  onClick={() => setSelectedPharmacy(pharmacy)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#C9A84C] bg-[#C9A84C]/10 shadow-[0_4px_20px_rgba(201,168,76,0.12)]"
                      : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-xs md:text-sm text-white tracking-wide line-clamp-1">
                        {pharmacy.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 flex items-start gap-1 leading-normal line-clamp-2">
                        <MapPin
                          size={12}
                          className="text-[#C9A84C] shrink-0 mt-0.5"
                        />
                        <span>{pharmacy.address || pharmacy.manzil}</span>
                      </p>
                    </div>
                    <span className="text-[9px] bg-white/10 text-gray-300 font-black px-1.5 py-0.5 rounded-md border border-white/5 shrink-0">
                      ~800m
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] border-t border-white/5 pt-2">
                    <span className="text-gray-400 font-bold flex items-center gap-1">
                      <Pill size={11} className="text-[#C9A84C]" />
                      {pharmacy.medicinesCount || 0} xil dori
                    </span>
                    <span className="text-[#C9A84C] font-black bg-[#C9A84C]/10 px-2 py-0.5 rounded-full text-[10px]">
                      {pharmacy.workingHours || "08:00-22:00"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 2. INTERAKTIV XARITA */}
      <div className="order-1 lg:order-2 lg:col-span-2 rounded-3xl overflow-hidden border border-[#0D1B3E]/5 relative h-[380px] sm:h-[450px] lg:h-full shadow-xl lg:shadow-2xl">
        <MapContainer
          center={userLocation || defaultCenter}
          zoom={14}
          style={{ height: "100%", width: "100%", background: "#EEF0F8" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          <ChangeMapView
            center={
              selectedPharmacy && selectedPharmacy.location?.coordinates
                ? [
                    selectedPharmacy.location.coordinates[1], // lat
                    selectedPharmacy.location.coordinates[0], // lng
                  ]
                : userLocation || defaultCenter
            }
          />

          {/* Foydalanuvchi joylashuvi */}
          {userLocation && (
            <Marker position={userLocation} icon={createUserIcon()}>
              <Popup>
                <span className="text-xs font-bold text-gray-900">
                  Siz shu yerdasiz
                </span>
              </Popup>
            </Marker>
          )}

          {/* Dorixona markerlari */}
          {pharmacies &&
            pharmacies.map((pharmacy: any) => {
              let lat = 0;
              let lng = 0;

              if (
                pharmacy.location &&
                Array.isArray(pharmacy.location.coordinates)
              ) {
                lng = Number(pharmacy.location.coordinates[0]);
                lat = Number(pharmacy.location.coordinates[1]);
              } else {
                lat = Number(pharmacy.latitude || pharmacy.lat);
                lng = Number(pharmacy.longitude || pharmacy.lng);
              }

              if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
                return null;
              }

              const currentPharmacyId = pharmacy._id || pharmacy.id;

              return (
                <Marker
                  key={currentPharmacyId}
                  position={[lat, lng]}
                  icon={createPharmacyIcon(
                    selectedPharmacy?._id === currentPharmacyId ||
                      (selectedPharmacy as any)?.id === currentPharmacyId,
                  )}
                  eventHandlers={{
                    click: () => setSelectedPharmacy(pharmacy),
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <h4 className="font-bold text-slate-800">
                        {pharmacy.name || "Apteka"}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {pharmacy.address || pharmacy.manzil}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* Dinamik marshrut chizuvchi */}
          {showRoute &&
            userLocation &&
            selectedPharmacy &&
            selectedPharmacy.location?.coordinates && (
              <RoutingMachine
                userLoc={userLocation}
                pharmacyLoc={[
                  selectedPharmacy.location.coordinates[1],
                  selectedPharmacy.location.coordinates[0],
                ]}
              />
            )}
        </MapContainer>

        {/* 3. XARITA USTIDAGI MA'LUMOT PANEL */}
        {selectedPharmacy && (
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0D1B3E]/95 border border-[#C9A84C]/20 p-3.5 rounded-2xl backdrop-blur-md z-[999] flex items-center justify-between gap-3 animate-slideUp shadow-lg">
            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black tracking-wide text-white truncate">
                {selectedPharmacy.name}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-300 mt-0.5 line-clamp-1">
                {selectedPharmacy.address || (selectedPharmacy as any).manzil}
              </p>
            </div>

            <button
              onClick={() => {
                if (!userLocation) {
                  alert("Marshrut chizish uchun oldin lokatsiyangizni yoqing!");
                  return;
                }
                setShowRoute(!showRoute);
              }}
              className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl shadow-md cursor-pointer active:scale-95 transition-all duration-200 ${
                showRoute
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-[#C9A84C] text-[#0D1B3E] hover:bg-[#B3933B]"
              }`}
            >
              {showRoute ? (
                <span className="font-black text-xs sm:text-sm">X</span>
              ) : (
                <Navigation2
                  size={16}
                  className="sm:size-[20px]"
                  fill="#0D1B3E"
                />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
