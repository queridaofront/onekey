import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Wallet from "./Wallet";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";
import { initializeLanguage } from "./i18n";

// Detecta se está no Electron
const isElectron = typeof window !== "undefined" && (window as any).require;

// Inicializar idioma antes de renderizar
const initApp = async () => {
  try {
    // Sempre inicializar em inglês por padrão
    await initializeLanguage();

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        {isElectron ? (
          // Se estiver no Electron, renderiza diretamente o Wallet
          <BrowserRouter>
            <Routes>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/wallet" replace />} />
            </Routes>
          </BrowserRouter>
        ) : (
          // Se estiver no navegador, renderiza o App normal
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        )}
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro ao inicializar app:", error);
    // Renderizar mesmo com erro
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        {isElectron ? (
          <BrowserRouter>
            <Routes>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/wallet" replace />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        )}
      </React.StrictMode>
    );
  }
};

initApp();
