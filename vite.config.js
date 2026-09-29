import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /* Ruta base del sitio publicado.
     GitHub Pages sirve el proyecto desde /PFY2201_S8_FPARRA/, no desde
     la raíz del dominio. Sin esta línea el build pide sus archivos en
     /assets/... y la página publicada sale en blanco con 404 en los
     .js y .css. Tiene que coincidir EXACTAMENTE con el nombre del
     repositorio, con la barra inicial y la final. */
  base: '/PFY2201_S8_FPARRA/',
})
