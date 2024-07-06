import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { fileURLToPath, URL } from "node:url";

export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        plugins: [sveltekit()],
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: "globalThis",
                },
                // Enable esbuild polyfill plugins
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        buffer: true,
                    }),
                ],
            },
        },
        define: {
            "process.env": env,
        },
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
    });
};
