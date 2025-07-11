const fs = require("fs");
const path = require("path");

console.log("🚀 Iniciando build ultra-otimizado...");

// Limpar TUDO
const foldersToRemove = ["dist", "dist2", "node_modules/.cache", ".vite"];

foldersToRemove.forEach((folder) => {
  const folderPath = path.join(process.cwd(), folder);
  if (fs.existsSync(folderPath)) {
    try {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`🗑️  Removido: ${folder}`);
    } catch (error) {
      console.log(`⚠️  Não foi possível remover: ${folder}`);
    }
  }
});

// Remover arquivos pesados desnecessários
const heavyFiles = [
  "public/taurinstal.bmp",
  "public/image.png",
  "public/*.exe",
  "public/*.dmg",
  "public/*.app",
];

heavyFiles.forEach((pattern) => {
  if (fs.existsSync("public")) {
    const files = fs.readdirSync("public").filter((file) => {
      if (pattern.includes("*")) {
        const ext = pattern.split("*")[1];
        return file.endsWith(ext);
      }
      return file === pattern.split("/").pop();
    });

    files.forEach((file) => {
      try {
        fs.unlinkSync(path.join("public", file));
        console.log(`🗑️  Removido arquivo pesado: ${file}`);
      } catch (error) {
        // Arquivo não existe
      }
    });
  }
});

console.log("✅ Limpeza ultra-concluída! Build será mínimo.");
