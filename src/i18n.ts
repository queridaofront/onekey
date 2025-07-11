import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: "en", // Sempre inglês por padrão
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: [
        "localStorage",
        "cookie",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
      lookupLocalStorage: "selectedLanguage",
      lookupCookie: "selectedLanguage",
    },
  });

// Função para inicializar o idioma (sempre inglês por padrão)
export const initializeLanguage = async () => {
  try {
    const savedLang = localStorage.getItem("selectedLanguage");

    // Se não há idioma salvo, usar inglês
    const langToUse = savedLang || "en";

    await i18n.changeLanguage(langToUse);
    localStorage.setItem("selectedLanguage", langToUse);

    console.log(`Idioma inicializado: ${langToUse}`);
    return langToUse;
  } catch (error) {
    console.error("Erro ao inicializar idioma:", error);
    await i18n.changeLanguage("en");
    return "en";
  }
};

export default i18n;
