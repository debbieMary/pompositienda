import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 🔥 Esto permite que sea accesible desde otros dispositivos
    port: 5173  // opcional, si querés especificar un puerto fijo
  }
})