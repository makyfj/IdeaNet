import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // To make local backend calls
    plugins: [reactRefresh()],

    server: {
      port: process.env.VITE_PORT,
    },

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
  });
};
