import React, { useState, useEffect } from "react";
import {
  Download,
  ShoppingCart,
  Globe,
  Monitor,
  Smartphone,
  Chrome,
  Link as Linux,
  HardDrive,
  Apple,
  CheckCircle,
} from "lucide-react";

// Adicionar tipagem para as props de Plataformas
interface PlataformasProps {
  selecionado: string;
  setSelecionado: React.Dispatch<React.SetStateAction<string>>;
}

// Tipagem para DownloadAndroidSection
interface DownloadAndroidSectionProps {
  onSelectPlatform: (platform: string) => void;
}

function Header() {
  const [showLangModal, setShowLangModal] = useState(false);
  let langTimeout: NodeJS.Timeout;
  const handleEnter = () => {
    clearTimeout(langTimeout);
    setShowLangModal(true);
  };
  const handleLeave = () => {
    langTimeout = setTimeout(() => setShowLangModal(false), 150);
  };
  const languages = [
    ["العربية", "বাংলা", "Deutsch"],
    ["English", "Español", "Filipino"],
    ["Français", "हिन्दी", "Bahasa Indonesia"],
    ["Itallano", "日本語", "한국어"],
    ["Монгол", "Português", "Português (Brasil)"],
    ["Русский", "ภาษาไทย", "Українська"],
    ["Tiếng Việt", "简体中文", "繁体中文"],
  ];
  return (
    <header className="w-full bg-transparent py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Esquerda: Logo e Menu */}
        <div className="flex items-center gap-12">
          <a href="#" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="w-14 h-14" />
          </a>
          {/* Menu */}
          <nav className="flex gap-8 text-black font-medium">
            <a href="#" className="hover:text-green-600 transition-colors">
              Produtos
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Aplicativo
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Desenvolvedor
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Recurso
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Apoiar
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Blogue
            </a>
          </nav>
        </div>
        {/* Direita */}
        <div
          className="flex items-center gap-4 relative"
          onMouseLeave={handleLeave}
        >
          <div className="flex items-center gap-1" onMouseEnter={handleEnter}>
            <img
              src="/mundo.svg"
              alt="Mundo"
              className="w-6 h-6 cursor-pointer"
            />
            <span className="font-medium cursor-pointer">Português</span>
          </div>
          <img src="/sacola.svg" alt="Sacola" className="w-6 h-6" />
          <a
            href="#"
            className="flex items-center gap-2 rounded-full px-4 py-2 font-medium bg-white text-black hover:bg-gray-100 transition-colors border border-gray-200"
          >
            Download grátis
            <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
          </a>
          {/* Modal de idiomas */}
          {showLangModal && (
            <div
              className="absolute left-0 top-12 z-50 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center animate-fade-in"
              style={{ minWidth: 340 }}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                {languages.flat().map((lang, idx) => (
                  <button
                    key={lang}
                    className="text-black text-base font-medium py-1 px-2 rounded hover:bg-[#F5F6FA] transition-colors"
                    onClick={() => setShowLangModal(false)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Plataformas({ selecionado, setSelecionado }: PlataformasProps) {
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (/windows/i.test(userAgent)) setSelecionado("windows");
    else if (/macintosh|mac os x/i.test(userAgent)) setSelecionado("macos");
    else if (/iphone|ipad|ipod/i.test(userAgent)) setSelecionado("ios");
    else if (/android/i.test(userAgent)) setSelecionado("android");
  }, [setSelecionado]);

  const plataformas = [
    { id: "macos", nome: "macOS", icon: "/apple.svg" },
    { id: "windows", nome: "Windows", icon: "/windows.svg" },
    { id: "ios", nome: "iOS", icon: "/A.svg" },
    { id: "android", nome: "Android", icon: "/android.svg" },
    { id: "chrome", nome: "Chrome", icon: "/crome.svg" },
    { id: "linux", nome: "Linux", icon: "/linux.svg" },
    {
      id: "pontehardware",
      nome: "Ponte de hardware",
      icon: "/pontehadware.svg",
    },
  ];
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {plataformas.map((p) => (
        <div
          key={p.id}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-colors font-medium text-black text-lg cursor-pointer select-none ${
            selecionado === p.id ? "bg-gray-100" : "bg-transparent"
          }`}
          style={{ minWidth: 170, height: 48 }}
          onClick={() => setSelecionado(p.id)}
        >
          <img src={p.icon} alt={p.nome} className="w-6 h-6" />
          <span>{p.nome}</span>
        </div>
      ))}
    </div>
  );
}

function DownloadSection() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className="text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                Baixar para Windows
              </h2>
              <span
                className="bg-[#E9ECF2] text-[#393C4E] text-xl font-bold px-4 py-1 rounded-lg"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                v5.10.0
              </span>
            </div>
            <p
              className="text-base"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Requer Windows 10 ou mais recente
            </p>
          </div>
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-4"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7.5" stroke="#393C4E" />
                <text
                  x="8"
                  y="12"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#393C4E"
                >
                  i
                </text>
              </svg>
              Soma de verificação do pacote.
            </div>
            <div className="border-b border-[#D9DBE9] mb-6"></div>
            <div className="flex gap-4">
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-lg font-semibold px-8 rounded-full transition-colors border border-black hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/windows.svg"
                  alt="Windows"
                  className="w-6 h-6 filter invert transition-all group-hover:filter-none"
                />
                <span className="transition-colors">Microsoft Store</span>
              </button>
              <button
                className="group flex items-center justify-center gap-2 bg-white text-black text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-black hover:text-white"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/windows.svg"
                  alt="Windows"
                  className="w-6 h-6 transition-all group-hover:invert"
                />
                Windows
              </button>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/windows.webp"
            alt="Windows App"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

function DownloadMacSection() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className="text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                Baixar para macOS
              </h2>
              <span
                className="bg-[#E9ECF2] text-[#393C4E] text-xl font-bold px-4 py-1 rounded-lg"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                v5.10.0
              </span>
            </div>
            <p
              className="text-base"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Requer macOS 11 (Big Sur) ou mais recente
            </p>
          </div>
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-4"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7.5" stroke="#393C4E" />
                <text
                  x="8"
                  y="12"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#393C4E"
                >
                  i
                </text>
              </svg>
              Soma de verificação do pacote.
            </div>
            <div className="border-b border-[#D9DBE9] mb-6"></div>
            <div className="flex gap-4">
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-lg font-semibold px-8 rounded-full transition-colors border border-black hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/A.svg"
                  alt="App Store"
                  className="w-6 h-6 filter invert transition-all group-hover:filter-none"
                />
                <span className="transition-colors">App Store</span>
              </button>
              <button
                className="group flex items-center justify-center gap-2 bg-white text-black text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-black hover:text-white"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/apple.svg"
                  alt="Download"
                  className="w-6 h-6 transition-all group-hover:invert"
                />
                Download
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="ml-1"
                >
                  <path
                    d="M12 5v14m0 0l-6-6m6 6l6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/windows.webp"
            alt="macOS App"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

function DownloadIOSSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [redirectPlatform, setRedirectPlatform] = useState<string | null>(null);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 4000);
  };
  // Função para redirecionar para outra plataforma
  const handleRedirect = (platform: string) => {
    setShowPopup(false);
    setRedirectPlatform(platform);
    setTimeout(() => {
      setShowRedirect(false);
      setRedirectPlatform(null);
      // Disparar evento customizado para App
      const event = new CustomEvent("redirectPlatform", { detail: platform });
      window.dispatchEvent(event);
    }, 300);
  };
  // Ouvir evento customizado no App
  useEffect(() => {
    const listener = (e: any) => {
      if (e.detail) {
        // Não faz nada aqui, pois o App já trata
      }
    };
    window.addEventListener("redirectPlatform", listener);
    return () => window.removeEventListener("redirectPlatform", listener);
  }, []);
  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className="text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                Baixar para iOS
              </h2>
              <span
                className="bg-[#E9ECF2] text-[#393C4E] text-xl font-bold px-4 py-1 rounded-lg"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                v5.10.0
              </span>
            </div>
            <p
              className="text-base"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Requer iOS 13.0 ou mais recente
            </p>
          </div>
          <div>
            <div className="border-b border-[#D9DBE9] mb-6"></div>
            <div className="flex gap-4">
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-lg font-semibold px-8 rounded-full transition-colors border border-black hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
                onClick={handleClick}
                disabled={loading}
              >
                <img
                  src="/A.svg"
                  alt="App Store"
                  className="w-6 h-6 filter invert transition-all group-hover:filter-none"
                />
                <span className="transition-colors">App Store</span>
              </button>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/iosim.webp"
            alt="iOS App"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xs w-full text-center animate-fade-in flex flex-col items-center">
            <svg
              className="animate-spin mb-4"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#A3C7B6"
                strokeWidth="4"
                opacity="0.3"
              />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="#1A1A1A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="text-lg text-[#393C4E]"
              style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
            >
              Verificando disponibilidade na App Store...
            </span>
          </div>
        </div>
      )}
      {/* Popup de manutenção */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Download para iOS em manutenção
            </h3>
            <p
              className="text-lg text-[#393C4E] mb-6"
              style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
            >
              No momento, o download do aplicativo para iOS está temporariamente
              indisponível.
              <br />
              Por favor, utilize a versão para Windows ou macOS.
              <br />
              Em breve, o app para iOS estará disponível novamente com
              melhorias.
              <br />
              Agradecemos sua compreensão!
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <button
                className="px-6 py-2 rounded-full bg-black text-white font-semibold text-base hover:bg-[#393C4E] transition-colors flex flex-col items-center min-w-[120px]"
                onClick={() => handleRedirect("windows")}
              >
                <span>Baixar para</span>
                <span className="font-bold">Windows</span>
              </button>
              <button
                className="px-6 py-2 rounded-full bg-black text-white font-semibold text-base hover:bg-[#393C4E] transition-colors flex flex-col items-center min-w-[120px]"
                onClick={() => handleRedirect("macos")}
              >
                <span>Baixar para</span>
                <span className="font-bold">macOS</span>
              </button>
            </div>
            <button
              className="mt-2 px-8 py-3 rounded-full bg-[#E9ECF2] text-black font-semibold text-lg hover:bg-[#393C4E] hover:text-white transition-colors"
              onClick={() => setShowPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DownloadAndroidSection({
  onSelectPlatform,
}: DownloadAndroidSectionProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 4000);
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className="text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                Baixar para Android
              </h2>
              <span
                className="bg-[#E9ECF2] text-[#393C4E] text-xl font-bold px-4 py-1 rounded-lg"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                v5.10.0
              </span>
            </div>
            <p
              className="text-base"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Requer Android 8, 64-bit only ou mais recente
            </p>
          </div>
          <div>
            <div className="border-b border-[#D9DBE9] mb-6"></div>
            <div className="flex gap-4">
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-lg font-semibold px-8 rounded-full transition-colors border border-black hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
                onClick={handleClick}
                disabled={loading}
              >
                {/* Google Play SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3.6 2.4C3.6 2.4 3.6 2.4 3.6 2.4C3.6 2.4 3.6 2.4 3.6 2.4ZM4.2 2.4C3.8 2.6 3.6 3 3.6 3.4V20.6C3.6 21 3.8 21.4 4.2 21.6L4.3 21.7L13.6 12.4L4.3 3.1L4.2 2.4ZM15 13.8L5.7 23.1C6 23.3 6.4 23.3 6.7 23.1L20.2 15.2C20.7 14.9 20.7 14.1 20.2 13.8L15 13.8ZM20.2 8.8L6.7 0.9C6.4 0.7 6 0.7 5.7 0.9L15 10.2L20.2 8.8ZM13.6 12.4L20.2 15.2C20.7 14.9 20.7 14.1 20.2 13.8L13.6 12.4Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="transition-colors">Google Play</span>
              </button>
              <button
                className="group flex items-center justify-center gap-2 bg-white text-black text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-black hover:text-white"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
                onClick={handleClick}
                disabled={loading}
              >
                {/* Ícone Android */}
                <img
                  src="/android.svg"
                  alt="Android APK"
                  className="w-6 h-6 transition-all group-hover:invert"
                />
                Android APK
              </button>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/iosim.webp"
            alt="Android App"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xs w-full text-center animate-fade-in flex flex-col items-center">
            <svg
              className="animate-spin mb-4"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#A3C7B6"
                strokeWidth="4"
                opacity="0.3"
              />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="#1A1A1A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="text-lg text-[#393C4E]"
              style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
            >
              Verificando disponibilidade na Google Play...
            </span>
          </div>
        </div>
      )}
      {/* Popup de manutenção */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Download para Android em manutenção
            </h3>
            <p
              className="text-lg text-[#393C4E] mb-6"
              style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
            >
              No momento, o download do aplicativo para Android está
              temporariamente indisponível.
              <br />
              Por favor, utilize a versão para Windows ou macOS.
              <br />
              Em breve, o app para Android estará disponível novamente com
              melhorias.
              <br />
              Agradecemos sua compreensão!
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <button
                className="px-6 py-2 rounded-full bg-black text-white font-semibold text-base hover:bg-[#393C4E] transition-colors flex flex-col items-center min-w-[120px]"
                onClick={() => {
                  setShowPopup(false);
                  onSelectPlatform("windows");
                }}
              >
                <span>Baixar para</span>
                <span className="font-bold">Windows</span>
              </button>
              <button
                className="px-6 py-2 rounded-full bg-black text-white font-semibold text-base hover:bg-[#393C4E] transition-colors flex flex-col items-center min-w-[120px]"
                onClick={() => {
                  setShowPopup(false);
                  onSelectPlatform("macos");
                }}
              >
                <span>Baixar para</span>
                <span className="font-bold">macOS</span>
              </button>
            </div>
            <button
              className="mt-2 px-8 py-3 rounded-full bg-[#E9ECF2] text-black font-semibold text-lg hover:bg-[#393C4E] hover:text-white transition-colors"
              onClick={() => setShowPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DownloadChromeSection() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className="text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                Baixar para Chrome
              </h2>
            </div>
          </div>
          <div>
            <div className="border-b border-[#D9DBE9] mb-6"></div>
            <div className="flex gap-4">
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-base font-semibold px-8 rounded-full transition-colors border border-black hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 260,
                  height: 54,
                  borderRadius: 100,
                }}
              >
                {/* Usar crome.svg da pasta public */}
                <img
                  src="/crome.svg"
                  alt="Chrome"
                  className="w-6 h-6 filter invert transition-all group-hover:filter-none"
                />
                <span className="transition-colors">Chrome Web Store</span>
              </button>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/cromweb.webp"
            alt="Chrome App"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

function DownloadLinuxSection() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className="text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                Baixar para Linux
              </h2>
              <span
                className="bg-[#E9ECF2] text-[#393C4E] text-xl font-bold px-4 py-1 rounded-lg"
                style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
              >
                v5.10.0
              </span>
            </div>
            <p
              className="text-base mb-2"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Requer Ubuntu 22.04 LTS (Jammy Jellyfish), Fedora 37, Debian 11
              (Bullseye) ou mais recente
            </p>
            <div
              className="flex flex-col gap-1 text-sm mb-2"
              style={{
                color: "#393C4E",
                fontFamily: "Stabil Grotesk, system-ui, sans-serif",
              }}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7.5" stroke="#393C4E" />
                  <text
                    x="8"
                    y="12"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#393C4E"
                  >
                    i
                  </text>
                </svg>
                Soma de verificação do pacote.
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7.5" stroke="#393C4E" />
                  <text
                    x="8"
                    y="12"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#393C4E"
                  >
                    i
                  </text>
                </svg>
                Como instalar o cliente Linux
              </div>
            </div>
            <div className="border-b border-[#D9DBE9] mb-6"></div>
            <div className="flex gap-4">
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-lg font-semibold px-8 rounded-full transition-colors border border-black hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
              >
                {/* Avião Snap Store */}
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 filter invert transition-all group-hover:filter-none"
                >
                  <path
                    d="M2 21l21-9-21-9v7l15 2-15 2v7z"
                    fill="currentColor"
                  />
                </svg>
                <span className="transition-colors">Snap Store</span>
              </button>
              <button
                className="group flex items-center justify-center gap-2 bg-white text-black text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-black hover:text-white"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 340,
                  height: 62,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/linux.svg"
                  alt="Linux"
                  className="w-6 h-6 transition-all group-hover:invert"
                />
                Linux
              </button>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/windows.webp"
            alt="Linux App"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

function HardwareBridgeSection() {
  const [linuxOpen, setLinuxOpen] = useState(false);
  let linuxMenuTimeout: ReturnType<typeof setTimeout>;
  const handleLinuxEnter = () => {
    clearTimeout(linuxMenuTimeout);
    setLinuxOpen(true);
  };
  const handleLinuxLeave = () => {
    linuxMenuTimeout = setTimeout(() => setLinuxOpen(false), 100);
  };
  return (
    <div className="flex justify-center items-center mt-8">
      <div
        className="flex bg-[#F5F6FA] rounded-3xl overflow-hidden"
        style={{ width: 1532, height: 504 }}
      >
        {/* Esquerda - Texto e botões */}
        <div
          className="flex flex-col justify-between"
          style={{ width: 800, height: 504, padding: "40px 36px 36px 36px" }}
        >
          <div>
            <h2
              className="text-4xl font-bold text-black leading-tight mb-8"
              style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
            >
              Melhora a estabilidade de transferência entre a carteira de
              hardware OneKey e o navegador.
            </h2>
          </div>
          <div>
            <div className="flex gap-4 relative">
              <button
                className="group flex items-center justify-center gap-2 bg-white text-black text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-black hover:text-white"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 180,
                  height: 54,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/apple.svg"
                  alt="macOS"
                  className="w-6 h-6 transition-all group-hover:invert"
                />
                macOS
              </button>
              <button
                className="group flex items-center justify-center gap-2 bg-black text-white text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-white hover:text-black"
                style={{
                  fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                  width: 180,
                  height: 54,
                  borderRadius: 100,
                }}
              >
                <img
                  src="/windows.svg"
                  alt="Windows"
                  className="w-6 h-6 filter invert transition-all group-hover:filter-none"
                />
                <span className="transition-colors">Windows</span>
              </button>
              <div
                className="relative"
                onMouseEnter={handleLinuxEnter}
                onMouseLeave={handleLinuxLeave}
              >
                <button
                  className="group flex items-center justify-center gap-2 bg-white text-black text-lg font-semibold px-8 border border-black rounded-full transition-colors hover:bg-black hover:text-white"
                  style={{
                    fontFamily: "Stabil Grotesk, system-ui, sans-serif",
                    width: 180,
                    height: 54,
                    borderRadius: 100,
                  }}
                  tabIndex={0}
                >
                  <img
                    src="/linux.svg"
                    alt="Linux"
                    className="w-6 h-6 transition-all group-hover:invert"
                  />
                  Linux
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="ml-1"
                  >
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {linuxOpen && (
                  <div
                    className="absolute z-50 bg-white rounded-2xl shadow-xl py-2 w-56 flex flex-col border border-[#E9ECF2] left-0 top-full mt-2"
                    onMouseEnter={handleLinuxEnter}
                    onMouseLeave={handleLinuxLeave}
                    style={{ minWidth: 220 }}
                  >
                    <button className="text-left px-5 py-3 text-base font-semibold text-black hover:bg-[#F5F6FA] rounded-2xl transition-colors">
                      Linux 64-bit (deb)
                    </button>
                    <button className="text-left px-5 py-3 text-base font-semibold text-black hover:bg-[#F5F6FA] rounded-2xl transition-colors">
                      Linux 64-bit (rpm)
                    </button>
                    <button className="text-left px-5 py-3 text-base font-semibold text-black hover:bg-[#F5F6FA] rounded-2xl transition-colors">
                      Linux 32-bit (deb)
                    </button>
                    <button className="text-left px-5 py-3 text-base font-semibold text-black hover:bg-[#F5F6FA] rounded-2xl transition-colors">
                      Linux 32-bit (rpm)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Direita - Imagem */}
        <div
          className="flex items-center justify-center"
          style={{ width: 732, height: 504 }}
        >
          <img
            src="/windows.webp"
            alt="Hardware Bridge"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCards() {
  return (
    <div className="flex justify-center gap-8 mt-12">
      {/* Card 1 */}
      <div
        className="flex flex-col justify-between bg-[#F0F1F2]"
        style={{
          width: 766,
          height: 548,
          borderRadius: 40,
          padding: "64px 0 0 64px",
        }}
      >
        <div>
          <h3
            className="text-4xl font-bold text-black mb-8"
            style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
          >
            Configure sua carteira de
            <br />
            hardware OneKey
          </h3>
          <button
            className="group mt-2 px-8 flex items-center justify-center rounded-full border border-black text-lg font-semibold bg-[#F0F1F2] text-black transition-colors hover:bg-black hover:text-white"
            style={{
              fontFamily: "Stabil Grotesk, system-ui, sans-serif",
              width: 340,
              height: 62,
              borderRadius: 100,
            }}
          >
            <span className="group-hover:text-white">Começando</span>
          </button>
        </div>
        <div
          className="flex justify-end items-end pr-8 pb-8"
          style={{ height: "100%" }}
        >
          <img
            src="/1.webp"
            alt="Configurar"
            style={{ maxHeight: 320, maxWidth: 320 }}
          />
        </div>
      </div>
      {/* Card 2 */}
      <div
        className="flex flex-col justify-between bg-[#F0F1F2]"
        style={{
          width: 766,
          height: 548,
          borderRadius: 40,
          padding: "64px 0 0 64px",
        }}
      >
        <div>
          <h3
            className="text-4xl font-bold text-black mb-8"
            style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
          >
            Suporte a várias cadeias
          </h3>
          <button
            className="group mt-2 px-8 flex items-center justify-center rounded-full border border-black text-lg font-semibold bg-[#F0F1F2] text-black transition-colors hover:bg-black hover:text-white"
            style={{
              fontFamily: "Stabil Grotesk, system-ui, sans-serif",
              width: 340,
              height: 62,
              borderRadius: 100,
            }}
          >
            <span className="group-hover:text-white">
              Confira a lista completa
            </span>
          </button>
        </div>
        <div
          className="flex justify-end items-end pr-8 pb-8"
          style={{ height: "100%" }}
        >
          <img
            src="/2.webp"
            alt="Suporte a cadeias"
            style={{ maxHeight: 320, maxWidth: 320 }}
          />
        </div>
      </div>
    </div>
  );
}

function ContatoSection() {
  return (
    <div className="flex justify-center mt-12">
      <div
        className="w-[1200px] bg-[#A3C7B6] rounded-3xl flex items-center px-16 py-10"
        style={{ borderRadius: 40 }}
      >
        <div className="flex-1 flex flex-col gap-6">
          <h2
            className="text-2xl font-bold text-black mb-2"
            style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
          >
            Manter contato
          </h2>
          <div className="flex gap-6 items-center text-black">
            {/* Twitter */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
            >
              <path
                d="M24.052 3.25h4.293l-9.38 10.72L30 28.56h-8.64l-6.768-8.848-7.743 8.847H2.553l10.033-11.467L2 3.25h8.86l6.117 8.087 7.075-8.087Zm-1.507 22.74h2.379L9.567 5.684H7.014l15.53 20.305Z"
                fill="currentColor"
              ></path>
            </svg>
            {/* GitHub */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
            >
              <path
                d="M16 2C8.265 2 2 8.265 2 16c0 6.195 4.008 11.427 9.572 13.282.7.123.963-.297.963-.665 0-.332-.018-1.434-.018-2.607-3.517.647-4.427-.858-4.707-1.645-.157-.402-.84-1.645-1.435-1.977-.49-.263-1.19-.91-.018-.928 1.103-.018 1.89 1.015 2.153 1.435 1.26 2.117 3.273 1.523 4.078 1.155.122-.91.49-1.523.892-1.873-3.115-.35-6.37-1.557-6.37-6.912 0-1.523.542-2.783 1.435-3.763-.14-.35-.63-1.785.14-3.71 0 0 1.172-.367 3.85 1.435a12.99 12.99 0 0 1 3.5-.472c1.19 0 2.38.157 3.5.472 2.677-1.82 3.85-1.434 3.85-1.434.77 1.924.28 3.36.14 3.71.893.98 1.435 2.222 1.435 3.762 0 5.372-3.273 6.563-6.387 6.912.507.438.944 1.278.944 2.59 0 1.873-.017 3.378-.017 3.85 0 .368.262.805.962.665A14.022 14.022 0 0 0 30 16c0-7.735-6.265-14-14-14Z"
                fill="currentColor"
              ></path>
            </svg>
            {/* Medium */}
            <svg
              viewBox="0 0 1043.63 592.71"
              width="32"
              height="32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="Layer 2">
                <path
                  fill="currentColor"
                  d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36m322.89 0c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279m132.08 0c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"
                  data-name="Layer 1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end gap-2">
          <button
            className="group border border-black rounded-full px-6 py-2 text-base font-semibold bg-transparent hover:bg-black hover:text-white transition-colors"
            style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
          >
            Assine nossas notificações
          </button>
          <span
            className="text-xs text-[#393C4E] text-right max-w-xs mt-2"
            style={{ fontFamily: "Stabil Grotesk, system-ui, sans-serif" }}
          >
            Assine nossas notificações (por motivos de privacidade, use um
            e-mail diferente daquele que você usa para comprar OneKey, também
            excluímos periodicamente essas informações do pedido)
          </span>
        </div>
      </div>
    </div>
  );
}

function FooterOneKey() {
  return (
    <footer
      className="w-full bg-black text-white mt-16 pt-16 pb-8 px-0"
      style={{ borderTopLeftRadius: 56, borderTopRightRadius: 56 }}
    >
      <div className="max-w-[1400px] mx-auto px-12">
        <div className="flex flex-wrap gap-12">
          {/* Logo e social */}
          <div className="flex flex-col min-w-[220px] gap-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-10 h-10 bg-white rounded-full p-2"
              />
              <span className="text-2xl font-bold">OneKey</span>
            </div>
            <span className="text-xs text-[#A3C7B6]">
              membro do{" "}
              <span className="text-white underline">Grupo SatoKey</span>
            </span>
          </div>
          {/* Colunas de links */}
          <div className="flex-1 grid grid-cols-6 gap-8">
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">Produtos</div>
              <ul className="space-y-1">
                <li>OneKey Pro</li>
                <li>OneKey Classic 1S</li>
                <li>OneKey Lite</li>
                <li>OneKey Mini</li>
                <li className="underline">Ver todos os produtos</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">
                Loja global
              </div>
              <ul className="space-y-1">
                <li>Loja global</li>
                <li>Amazon Japão</li>
                <li>Amazon EUA, Canadá e México</li>
                <li>Amazônia Alemanha</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">
                Aplicativo
              </div>
              <ul className="space-y-1">
                <li>macOS</li>
                <li>Windows</li>
                <li>iOS</li>
                <li>Android</li>
                <li>Chrome</li>
                <li>Linux</li>
                <li>Ponte de hardware</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">Serviços</div>
              <ul className="space-y-1">
                <li>Troca</li>
                <li>Criptomoedas Suportadas</li>
                <li>Conversor de Frase de Recuperação</li>
                <li>EIPs</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">
                Desenvolvedor
              </div>
              <ul className="space-y-1">
                <li>
                  <span className="text-[#A3C7B6] underline">
                    O Portal do Desenvolvedor
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">Aprender</div>
              <ul className="space-y-1">
                <li>Por que escolher OneKey</li>
                <li>Arquitetura de segurança</li>
                <li>Blogue</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">Soluções</div>
              <ul className="space-y-1">
                <li>Soluções empresariais</li>
                <li>Referência</li>
                <li>Produtos de marca conjunta</li>
                <li>Revendedor Oficial</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">Apoiar</div>
              <ul className="space-y-1">
                <li>Centro de ajuda</li>
                <li>Envie uma solicitação</li>
                <li>Atualização de firmware</li>
              </ul>
            </div>
            <div>
              <div className="text-[#A3C7B6] font-semibold mb-2">Sobre</div>
              <ul className="space-y-1">
                <li>Informação da companhia</li>
                <li>Carreira</li>
                <li>Kits de mídia</li>
                <li>política de Privacidade</li>
                <li>Termo de Acordo do Usuário</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Social icons */}
        <div className="flex justify-center gap-8 mt-12 mb-2">
          <img src="/x.svg" alt="X" className="w-7 h-7" />
          <img src="/github.svg" alt="GitHub" className="w-7 h-7" />
          <img src="/medium.svg" alt="Medium" className="w-7 h-7" />
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [selecionado, setSelecionado] = useState("windows");
  useEffect(() => {
    const listener = (e: any) => {
      if (e.detail === "windows" || e.detail === "macos") {
        setSelecionado(e.detail);
      }
    };
    window.addEventListener("redirectPlatform", listener);
    return () => window.removeEventListener("redirectPlatform", listener);
  }, []);

  // Transição suave
  return (
    <div className="min-h-screen">
      <Header />
      <h1 className="text-5xl font-bold text-center mt-8 mb-2">
        Baixar OneKey
      </h1>
      <Plataformas selecionado={selecionado} setSelecionado={setSelecionado} />
      <div className="relative min-h-[520px]">
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "windows"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <DownloadSection />
        </div>
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "macos"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <DownloadMacSection />
        </div>
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "ios"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <DownloadIOSSection />
        </div>
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "android"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <DownloadAndroidSection onSelectPlatform={setSelecionado} />
        </div>
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "chrome"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <DownloadChromeSection />
        </div>
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "linux"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <DownloadLinuxSection />
        </div>
        <div
          className={`transition-opacity duration-500 absolute w-full ${
            selecionado === "pontehardware"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <HardwareBridgeSection />
        </div>
      </div>
      <FeatureCards />
      <ContatoSection />
      <FooterOneKey />
      {/* Conteúdo principal */}
    </div>
  );
}

export default App;
