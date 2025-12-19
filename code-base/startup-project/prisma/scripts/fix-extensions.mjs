#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'generated');

function fix(p) {
  const files = fs.readdirSync(p);
  for (const file of files) {
    const full = path.join(p, file);
    if (fs.statSync(full).isDirectory()) {
      fix(full);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(full, 'utf8');
      const original = content;
      // Adiciona .js a importações relativas ESM sem extensão
      content = content.replace(/from\s+["'](\.\/[^"']+)["']/g, (match, p1) => {
        if (p1.endsWith('.js') || p1.includes('node:') || p1.startsWith('@')) return match;
        return `from "${p1}.js"`;
      });
      if (content !== original) fs.writeFileSync(full, content, 'utf8');
    }
  }
}

try { fix(dir); } catch (e) {}
