import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'https://localhost:5001', // adjust to match your ASP.NET backend
        },
    },
    build: {
        outDir: '../TicketTracker/wwwroot', // Output to your ASP.NET static file folder
        emptyOutDir: true,
    },
})
