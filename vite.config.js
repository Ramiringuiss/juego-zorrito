import { defineConfig } from 'vite'

export default defineConfig({
  // Esto le dice a Vite que tu juego vive en esta subruta de GitHub
  base: '/juego-zorrito/',
  build: {
    // Esto obliga a Vite a compilar el juego en una carpeta llamada 'docs'
    outDir: 'docs'
  }
})
