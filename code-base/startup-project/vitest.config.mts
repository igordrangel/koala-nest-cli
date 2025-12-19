import swc from "unplugin-swc";
import tsConfigPatchs from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    environment: "node",
  },
  plugins: [
    tsConfigPatchs(),
    swc.vite({
      module: { type: "es6" },
      sourceMaps: true,
    }),
  ],
});
