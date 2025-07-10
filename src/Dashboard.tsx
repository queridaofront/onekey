import React from "react";

export interface DashboardData {
  visitas: {
    total: number;
    hoje: number;
    crescimento: number;
    tendencia: "up" | "down";
  };
  infectados: {
    total: number;
    hoje: number;
    crescimento: number;
    tendencia: "up" | "down";
  };
  instalacoes: {
    total: number;
    hoje: number;
    crescimento: number;
    tendencia: "up" | "down";
  };
}

// Exemplo de uso futuro: os dados podem vir de props, contexto ou API
const defaultData: DashboardData = {
  visitas: {
    total: 0,
    hoje: 0,
    crescimento: 0,
    tendencia: "up",
  },
  infectados: {
    total: 0,
    hoje: 0,
    crescimento: 0,
    tendencia: "down",
  },
  instalacoes: {
    total: 0,
    hoje: 0,
    crescimento: 0,
    tendencia: "up",
  },
};

export default function Dashboard({
  data = defaultData,
}: {
  data?: DashboardData;
}) {
  // Função para formatar números com separadores
  const formatNumber = (num: number) => num.toLocaleString("pt-BR");
  // Função para calcular a porcentagem de progresso
  const calculateProgress = (current: number, total: number) =>
    Math.min(total ? (current / total) * 100 : 0, 100);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
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
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
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
                    d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V4a1 1 0 00-1-1H5a1 1 0 00-1 1v1zM4 11h6v-2H4v2zM14 5h6V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1zM14 13h6v-2h-6v2zM14 19h6v-2h-6v2z"
                  />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Visão Geral</h2>
          <p className="text-gray-400">
            Monitoramento em tempo real dos dados do sistema
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Visitas */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
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
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  data.visitas.tendencia === "up"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                <svg
                  className={`w-3 h-3 ${
                    data.visitas.tendencia === "up" ? "rotate-0" : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span>{Math.abs(data.visitas.crescimento)}%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">
                  {formatNumber(data.visitas.total)}
                </span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">
                  {formatNumber(data.visitas.hoje)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${calculateProgress(
                      data.visitas.hoje,
                      data.visitas.total
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card Infectados */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
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
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  data.infectados.tendencia === "up"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                <svg
                  className={`w-3 h-3 ${
                    data.infectados.tendencia === "up"
                      ? "rotate-0"
                      : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span>{Math.abs(data.infectados.crescimento)}%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">
                  {formatNumber(data.infectados.total)}
                </span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">
                  {formatNumber(data.infectados.hoje)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${calculateProgress(
                      data.infectados.hoje,
                      data.infectados.total
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card Instalações */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
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
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  data.instalacoes.tendencia === "up"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                <svg
                  className={`w-3 h-3 ${
                    data.instalacoes.tendencia === "up"
                      ? "rotate-0"
                      : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span>{Math.abs(data.instalacoes.crescimento)}%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-100">
                  {formatNumber(data.instalacoes.total)}
                </span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Hoje:</span>
                <span className="text-gray-200 font-medium">
                  {formatNumber(data.instalacoes.hoje)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${calculateProgress(
                      data.instalacoes.hoje,
                      data.instalacoes.total
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
