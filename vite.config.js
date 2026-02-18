import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://sbteknikmalzeme.com",
      dynamicRoutes: ["/", "/about", "/services", "/contact"],
      // generateRobotsTxt: true, // default zaten true :contentReference[oaicite:1]{index=1}
    }),
  ],
});
