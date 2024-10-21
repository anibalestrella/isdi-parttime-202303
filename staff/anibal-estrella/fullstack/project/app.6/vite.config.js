import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/guide/dep-pre-bundling.html
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['com'],
    },
    build: {
        commonjsOptions: {
            include: [/com/]
        }
    }
})