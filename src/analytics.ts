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
  try {
    console.log(`Tentando registrar evento: ${tipo} em ${origem}`);
    // Só registra visita se não existir id para a página
    if (tipo === "visita") {
      const visitId = getOrCreateVisitId(origem);
      if (localStorage.getItem(`visit_registered_${origem}`)) {
        console.log(`Visita já registrada para ${origem}`);
        return;
      }
      localStorage.setItem(`visit_registered_${origem}`, "1");
    }

    console.log("Obtendo informações de IP...");
    const ipwhois = await fetch("https://ipwho.is/").then((res) => res.json());

    const evento = {
      tipo,
      origem,
      ip: ipwhois.ip || "desconhecido",
      pais: ipwhois.country || "desconhecido",
      pais_code: (ipwhois.country_code || "").toLowerCase(),
      cidade: ipwhois.city || "desconhecida",
      estado: ipwhois.region || "desconhecido",
      org: ipwhois.connection?.org || "desconhecido",
      agente: navigator.userAgent,
      plataforma: navigator.platform,
      data: new Date().toISOString(),
      timestamp: serverTimestamp(),
      id: getOrCreateVisitId(origem),
      dominio: window.location.hostname,
    };

    console.log("Salvando evento no Firebase:", evento);
    await push(ref(db, "eventos"), evento);
    console.log("Evento salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar evento:", error);
    // Tentar salvar sem as APIs de IP em caso de erro
    try {
      const eventoFallback = {
        tipo,
        origem,
        ip: "desconhecido",
        pais: "desconhecido",
        pais_code: "unknown",
        cidade: "desconhecida",
        estado: "desconhecido",
        org: "desconhecido",
        agente: navigator.userAgent,
        plataforma: navigator.platform,
        data: new Date().toISOString(),
        timestamp: serverTimestamp(),
        id: getOrCreateVisitId(origem),
        dominio: window.location.hostname,
        erro: "fallback",
      };

      console.log("Tentando salvar evento fallback:", eventoFallback);
      await push(ref(db, "eventos"), eventoFallback);
      console.log("Evento fallback salvo com sucesso!");
    } catch (fallbackError) {
      console.error("Erro também no fallback:", fallbackError);
    }
  }
}
