import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
	envPrefix: "MERVA", // change this to something unique
	server: {
		port: 3000,
		strictPort: true,
		fs: {
			strict: true,
		},
	},
	plugins: [react(), svgr(), nodePolyfills({
		exclude: [
			"fs",
		],

		globals: {
			Buffer: true,
			global: true,
			process: true,
		},
		protocolImports: true,
	}),],
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
	},

	optimizeDeps: {
		include: ["react", "react-dom", "react-router-dom"],
	},
	build: {
		modulePreload: true,
		cssMinify: "lightningcss",
		sourcemap: true,
		minify: true,
		rollupOptions: {
			output: {
				manualChunks: {
					runtime: ['react', 'react/jsx-runtime', 'react-dom'],
					router: ['react-router-dom'],
					ui: ["@mantine/core", "@mantine/hooks", "@mantine/dates"]
				}
			}
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/styles/_mantine";`,
			},
		},
	},
});
