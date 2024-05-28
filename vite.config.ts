import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      onLog(level, log, handler) {
        if (log.cause && log.cause.cause === `Can't resolve original location of error.`) {
          return
        }
        handler(level, log)
      }
    },
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
