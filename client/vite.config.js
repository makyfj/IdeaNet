import { defineConfig } from "vite";
import { resolve } from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/

export default defineConfig({
  // To make local backend calls
  plugins: [reactRefresh()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
