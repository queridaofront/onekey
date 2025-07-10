import { db } from "./firebase";
import { ref, push, serverTimestamp } from "firebase/database";

function getOrCreateVisitId(page: string) {
  const key = `visit_id_${page}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export async function registrarEvento(
  tipo: "visita" | "download",
  origem: string
) {
  // Só registra visita se não existir id para a página
  if (tipo === "visita") {
    const visitId = getOrCreateVisitId(origem);
    if (localStorage.getItem(`visit_registered_${origem}`)) return;
    localStorage.setItem(`visit_registered_${origem}`, "1");
  }

  const ipwhois = await fetch("https://ipwho.is/").then((res) => res.json());
  const ipapi = await fetch("http://ip-api.com/json/").then((res) =>
    res.json()
  );

  const evento = {
    tipo,
    origem,
    ip: ipwhois.ip || ipapi.query,
    pais: ipwhois.country || ipapi.country,
    pais_code: (ipwhois.country_code || ipapi.countryCode || "").toLowerCase(),
    cidade: ipwhois.city || ipapi.city,
    estado: ipwhois.region || ipapi.regionName,
    org: ipwhois.connection?.org || ipapi.org,
    agente: navigator.userAgent,
    plataforma: navigator.platform,
    data: new Date().toISOString(),
    timestamp: serverTimestamp(),
    id: getOrCreateVisitId(origem),
  };

  await push(ref(db, "eventos"), evento);
}
