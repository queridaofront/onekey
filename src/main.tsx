import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Wallet from "./Wallet";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";

// Detecta se está no Electron
const isElectron = typeof window !== "undefined" && (window as any).require;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isElectron ? (
      // Se estiver no Electron, renderiza diretamente o Wallet
      <Wallet />
    ) : (
      // Se estiver no navegador, usa o roteamento normal
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
