import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 疑惑点
// https://vite.dev/config/
export default defineConfig({
  //可以学习的点
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:1337",
        changeOrigin: true,
      },
      "/uploads": { target: "http://localhost:1337", changeOrigin: true },
    },
  },
});
