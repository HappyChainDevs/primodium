import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { comlink } from "vite-plugin-comlink";
import tsconfigPaths from "vite-tsconfig-paths";
import postcss from "./postcss.config";

export default defineConfig({
  plugins: [react(), comlink(), tsconfigPaths()],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  worker: {
    plugins: [comlink()],
  },
  build: {
    rollupOptions: {
      external: [/^contracts:.*/],
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mud: [
            "@latticexyz/common",
            "@latticexyz/react",
            "@latticexyz/recs",
            "@latticexyz/store-sync",
            "@latticexyz/world",
          ],
          phaser: ["phaser"],
        },
      },
    },
    target: "ES2022",
  },

  optimizeDeps: {
    esbuildOptions: {
      supported: {
        bigint: true,
      },
    },

    include: [
      "bn.js",
      "js-sha3",
      "hash.js",
      "bech32",
      "long",
      "protobufjs/minimal",
      "debug",
      "is-observable",
      "nice-grpc-web",
      "@improbable-eng/grpc-web",
    ],
  },
  envPrefix: "PRI_",
  envDir: "../../",
  css: {
    postcss,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@game": path.resolve(__dirname, "./src/game"),
    },
  },
});
