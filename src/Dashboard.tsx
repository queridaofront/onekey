import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import DeviceDetector from "device-detector-js";

export default function Dashboard() {
  const [visitas, setVisitas] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [showVisitasModal, setShowVisitasModal] = useState(false);

  useEffect(() => {
    const eventosRef = ref(db, "eventos");
    return onValue(eventosRef, (snapshot) => {
      const val = snapshot.val() || {};
      const eventos = Object.values(val);
      setVisitas(eventos.filter((e: any) => e.tipo === "visita"));
      setDownloads(eventos.filter((e: any) => e.tipo === "download"));
    });
  }, []);

  // Contagem de visitas hoje
  const hoje = new Date().toISOString().slice(0, 10);
  const visitasHoje = visitas.filter(
    (v) => (v.data || "").slice(0, 10) === hoje
  ).length;

  // Função para formatar números
  const formatNumber = (num: number) => num.toLocaleString("pt-BR");

  // Função para obter código da bandeira
  function getFlagCode(v: any) {
    if (v.pais_code) return v.pais_code;
    if (v.pais) {
      return v.pais
        .normalize("NFD")
        .replace(/[^\w\s]/gi, "")
        .slice(0, 2)
        .toLowerCase();
    }
    return "";
  }

  // Função para detectar informações do dispositivo
  function getDeviceInfo(userAgent: string) {
    if (!userAgent)
      return {
        device: "desktop",
        os: "Unknown",
        browser: "Unknown",
        brand: "",
        model: "",
        osVersion: "",
        browserVersion: "",
      };

    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);

    return {
      device: device.device?.type || "desktop",
      os: device.os?.name || "Unknown",
      browser: device.client?.name || "Unknown",
      brand: device.device?.brand || "",
      model: device.device?.model || "",
      osVersion: device.os?.version || "",
      browserVersion: device.client?.version || "",
    };
  }

  // Função para obter ícone do dispositivo
  function getDeviceIcon(deviceType: string, os: string) {
    if (deviceType === "smartphone") return "📱";
    if (deviceType === "tablet") return "📱";
    if (deviceType === "desktop") {
      if (os.toLowerCase().includes("windows")) return "🖥️";
      if (os.toLowerCase().includes("mac")) return "🖥️";
      if (os.toLowerCase().includes("linux")) return "🖥️";
      return "💻";
    }
    return "💻";
  }

  // Função para obter ícone do navegador
  function getBrowserIcon(browser: string) {
    const browserLower = browser.toLowerCase();
    if (browserLower.includes("chrome")) return "🌐";
    if (browserLower.includes("firefox")) return "🦊";
    if (browserLower.includes("safari")) return "🌐";
    if (browserLower.includes("edge")) return "🌐";
    return "🌐";
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-100">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Voltar
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Visão Geral</h2>
          <p className="text-gray-400">
            Monitoramento em tempo real dos dados do sistema
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Visitas */}
          <div
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer"
            onClick={() => setShowVisitasModal(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    Visitas
                  </h3>
                  <p className="text-sm text-gray-400">Total de acessos</p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                {formatNumber(visitas.length)}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">
                  {formatNumber(visitas.length)}
                </span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">
                  {formatNumber(visitasHoje)}
                </span>
              </div>
            </div>
          </div>
          {/* Card Infectados (mock) */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    Infectados
                  </h3>
                  <p className="text-sm text-gray-400">Casos detectados</p>
                </div>
              </div>
              <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                0
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">0</span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">0</span>
              </div>
            </div>
          </div>
          {/* Card Instalações (mock) */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v8m0 0l-3-3m3 3l3-3M4 16h12"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    Instalações
                  </h3>
                  <p className="text-sm text-gray-400">Total de instalações</p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                0
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">0</span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">0</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card de clientes que baixaram */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Clientes que baixaram</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {downloads
              .slice(-12)
              .reverse()
              .map((d, i) => {
                const flagCode = getFlagCode(d);
                const deviceInfo = getDeviceInfo(d.agente || "");
                const deviceIcon = getDeviceIcon(
                  deviceInfo.device,
                  deviceInfo.os
                );
                const browserIcon = getBrowserIcon(deviceInfo.browser);

                return (
                  <div
                    key={i}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-200"
                  >
                    {/* Primeira linha: País, Bandeira e Data */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            flagCode
                              ? `https://flagcdn.com/32x24/${flagCode}.png`
                              : "/public/mundo.svg"
                          }
                          alt={d.pais}
                          className="w-6 h-4 rounded border bg-gray-100 object-cover"
                          onError={(e) =>
                            (e.currentTarget.src = "/public/mundo.svg")
                          }
                        />
                        <div>
                          <div className="font-semibold text-sm text-gray-100">
                            {d.pais || "Desconhecido"}
                          </div>
                          <div className="text-xs text-gray-400">
                            {d.cidade}
                            {d.estado ? `, ${d.estado}` : ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        {new Date(d.data).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Segunda linha: Dispositivo e Navegador */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{deviceIcon}</span>
                        <div className="text-xs">
                          <div className="text-gray-300 font-medium">
                            {deviceInfo.brand && deviceInfo.model
                              ? `${deviceInfo.brand} ${deviceInfo.model}`
                              : deviceInfo.device === "desktop"
                              ? "Desktop"
                              : deviceInfo.device === "smartphone"
                              ? "Smartphone"
                              : deviceInfo.device === "tablet"
                              ? "Tablet"
                              : "Dispositivo"}
                          </div>
                          <div className="text-gray-500">
                            {deviceInfo.os} {deviceInfo.osVersion}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{browserIcon}</span>
                        <div className="text-xs text-gray-400 text-right">
                          <div>{deviceInfo.browser}</div>
                          <div>{deviceInfo.browserVersion}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {downloads.length === 0 && (
              <div className="text-center text-gray-500 py-8 col-span-full">
                Nenhum download registrado.
              </div>
            )}
          </div>
        </div>
        {/* Modal de visitas */}
        {showVisitasModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
            <div className="bg-white text-black rounded-2xl p-6 max-w-lg w-full shadow-2xl relative animate-fade-in transition-all duration-300">
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-black"
                onClick={() => setShowVisitasModal(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Últimas Visitas
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scroll">
                {visitas
                  .slice(-10)
                  .reverse()
                  .map((v, i) => {
                    const flagCode = getFlagCode(v);
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 border-b pb-3 last:border-b-0"
                      >
                        <img
                          src={
                            flagCode
                              ? `https://flagcdn.com/32x24/${flagCode}.png`
                              : "/public/mundo.svg"
                          }
                          alt={v.pais}
                          className="w-8 h-6 rounded border bg-gray-100 object-cover"
                          onError={(e) =>
                            (e.currentTarget.src = "/public/mundo.svg")
                          }
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-base flex items-center gap-2">
                            {v.pais || "Desconhecido"}
                            {v.cidade && <>- {v.cidade}</>}
                            {v.estado && (
                              <span className="text-xs text-gray-500">
                                ({v.estado})
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                            <span className="inline-block px-2 py-0.5 bg-gray-200 rounded">
                              {v.plataforma}
                            </span>
                            <span>{new Date(v.data).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {visitas.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    Nenhuma visita registrada.
                  </div>
                )}
              </div>
            </div>
            <style>{`
              .custom-scroll::-webkit-scrollbar { width: 8px; }
              .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
            `}</style>
          </div>
        )}
      </main>
    </div>
  );
}
