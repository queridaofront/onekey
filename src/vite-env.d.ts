/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI?: {
      getSystemInfo: () => Promise<{
        platform: string;
        release: string;
        arch: string;
        username: string;
        locale: string;
      }>;
      getSystemLanguage: () => Promise<string>;
    };
  }
}

export {};
