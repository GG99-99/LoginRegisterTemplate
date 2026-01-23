import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


/*******************************************
|   [ ] AGREGAR EL ALIAS AL PAQUETE SHARED  |
 *******************************************/

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: {
        '@shared':  path.resolve(__dirname, '../../shared/src'),
      }
  },
  root: ".",
  server: {
    watch: {
      usePolling: true, // Esto fuerza el polling en lugar de eventos nativos
     interval: 100,
     ignored: ['**/node_modules/**', '**/.git/**']
    },
    hmr: {
      overlay: true,
    },
    proxy: {
      // Cada vez que escribas "/api" en un fetch o axios...
      '/api': {
        target: 'http://localhost:4000', // ...Vite lo manda aquí en desarrollo
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build:{
    emptyOutDir: true,
    minify: false, // Desactivar minificación para debugging
    sourcemap: true // Generar source maps
  }
})
