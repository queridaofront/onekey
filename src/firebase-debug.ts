import { ref, push, get } from "firebase/database";
import { db } from "./firebase";

export async function testarFirebase() {
  try {
    console.log("Testando conectividade com Firebase...");

    // Teste 1: Tentar ler dados
    const testRef = ref(db, "test");
    await push(testRef, {
      teste: "conectividade",
      timestamp: new Date().toISOString(),
      dominio: window.location.hostname,
    });

    console.log("✅ Firebase conectado com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro na conectividade com Firebase:", error);
    return false;
  }
}

// Executar teste automaticamente
if (typeof window !== "undefined") {
  testarFirebase();
}
