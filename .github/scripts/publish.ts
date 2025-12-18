import fs from 'fs';
import path from 'path';

function copyRecursively(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursively(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

fs.mkdirSync('dist', { recursive: true });

// Copiar arquivos TypeScript sem compilação
copyRecursively('src', 'dist/src');

fs.writeFileSync(
  "dist/package.json",
  fs.readFileSync("package.json", { encoding: "utf8" }).toString(),
  "utf8"
);
fs.writeFileSync(
  "dist/README.md",
  fs.readFileSync("README.md").toString(),
  "utf8"
);
fs.writeFileSync("dist/LICENSE", fs.readFileSync("LICENSE").toString(), "utf8");

// Copiar code-base
copyRecursively("code-base", "dist/code-base");

console.log("Build completed - TypeScript files copied without compilation (Bun native support)");
