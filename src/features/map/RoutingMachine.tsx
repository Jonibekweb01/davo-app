import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface RoutingMachineProps {
  userLoc: [number, number];
  pharmacyLoc: [number, number];
}

export const RoutingMachine: React.FC<RoutingMachineProps> = ({
  userLoc,
  pharmacyLoc,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLoc || !pharmacyLoc) return;

    // 1. Marshrut boshqaruvchisini sozlash (OSRM bepul servisidan foydalanadi)
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLoc[0], userLoc[1]), // Boshlang'ich nuqta (Foydalanuvchi)
        L.latLng(pharmacyLoc[0], pharmacyLoc[1]), // Yakuniy nuqta (Dorixona)
      ],
      // @ts-ignore (Kutubxona nastroykasi uchun)
      lineOptions: {
        styles: [
          {
            color: "#C9A84C", // Bizning Oltin rangimiz!
            opacity: 0.85,
            weight: 6,
          },
        ],
      },
      addWaypoints: false, // Foydalanuvchi yo'nalishni o'zi qo'lda o'zgartira olmasligi uchun
      draggableWaypoints: false, // Nuqtalar surilmasligi uchun
      fitSelectedRoutes: true, // Marshrut chizilgach, xaritani avtomatik ikkala nuqta ko'rinadigan qilib yaqinlashtiradi
      show: false, // Chap tomondagi o'gay yozma instruksiyalar panelini yashirish (Faqat xaritada chiziq qoladi)
    }).addTo(map);

    // Komponent unmount bo'lganda yoki dorixona o'zgarganda eski marshrutni tozalash (Memory leak oldini olish)
    return () => {
      try {
        map.removeControl(routingControl);
      } catch (e) {
        console.error("Routing o'chirishda xatolik:", e);
      }
    };
  }, [map, userLoc, pharmacyLoc]);

  return null;
};
