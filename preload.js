const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => ipcRenderer.invoke("get-system-info"),
  getSystemLanguage: () =>
    ipcRenderer.invoke("get-system-info").then((info) => info.locale),
});
