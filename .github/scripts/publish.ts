import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function copyRecursively(src: string, dest: string): void {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const files = readdirSync(src);

  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (statSync(srcPath).isDirectory()) {
      copyRecursively(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  });
}

if (existsSync('dist')) {
  rmSync('dist', { recursive: true });
}

mkdirSync('dist', { recursive: true });

// Compilar TypeScript com Bun
execSync('bun build ./src/index.ts --outdir ./dist --format esm --target node', { stdio: 'inherit' });

// Copiar outros arquivos TypeScript sem compilação
copyRecursively('src', 'dist');

writeFileSync(
  "dist/package.json",
  readFileSync("package.json", { encoding: "utf8" }).toString(),
  "utf8"
);
writeFileSync(
  "dist/README.md",
  readFileSync("README.md").toString(),
  "utf8"
);
writeFileSync("dist/LICENSE", readFileSync("LICENSE").toString(), "utf8");

// Copiar code-base
copyRecursively("code-base", "dist/code-base");

console.log("Build completed - Files prepared for distribution");
