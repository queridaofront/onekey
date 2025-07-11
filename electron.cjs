const os = require("os");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1800,
    height: 1200,
    minWidth: 1400,
    minHeight: 900,
    icon: path.join(__dirname, "public", "logo_green_vector.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setSize(1800, 1200); // Força o tamanho
  win.center(); // Centraliza na tela
  win.setMinimumSize(1400, 900); // Garante mínimo
  win.maximize(); // Abre maximizado

  // Carrega a página inicial na rota /wallet
  win.loadURL("http://localhost:1111/wallet"); // Abre direto na /wallet
}

app.whenReady().then(createWindow);

// IPC para enviar dados do sistema
ipcMain.handle("get-system-info", () => {
  return {
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    username: os.userInfo().username,
    locale: app.getLocale(), // Idioma do sistema
  };
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
