const { execSync } = require('child_process');
const fs = require('fs');

fs.rmSync('dist', { recursive: true })

execSync(`tsup`, { stdio: "inherit" });

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

const { copyFolder } = require('../../dist/utils/copy-folder.js');

copyFolder("code-base", "dist/code-base")

console.log("Build completed");
