import { defineConfig, PluginOption } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { spriteify } from "vite-plugin-spriteify";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "MERVA", // change this to something unique

  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      strict: true,
    },
  },
  plugins: [
    react(),
    spriteify({
      withTypes: true,
      inputDir: "utils/svg-icons",
      outputDir: "src/shared/assets/icons",
    }) as unknown as PluginOption,
    nodePolyfills({
      exclude: ["fs"],

      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "recharts",
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
    ],
  },
  build: {
    target: "esnext",
    modulePreload: true,
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: true,
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // utils: ["buffer"],
          storage: ["axios", "zustand", "zustand/middleware"],
          runtime: ["react", "react/jsx-runtime", "react-dom"],
          router: ["react-router-dom"],
          // editor: ["@mantine/tiptap", "@mantine/carousel"],
          ui: ["@mantine/core", "@mantine/hooks", "@mantine/dates"]
        },
      },
    },
  },
});
