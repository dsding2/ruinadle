import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Flask backend
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://localhost:5000', // Flask backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
