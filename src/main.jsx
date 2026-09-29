/* ============================================================
   PUNTO DE ENTRADA — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Sumativa 3 (Semana 8)

   Monta el componente App dentro del <div id="root"> de index.html.
   Es el único archivo que toca el DOM directamente: de ahí para
   dentro, todo lo pinta React.

   StrictMode es una envoltura solo de desarrollo: no renderiza nada,
   pero avisa en consola de patrones que darán problemas en versiones
   futuras de React. Desaparece del build de producción.
   ============================================================ */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

/* ============================================================
   LOS ESTILOS, Y POR QUÉ EL ORDEN IMPORTA

   Bootstrap se instala con npm y se importa aquí, como enseña la guía
   de la semana. Hasta la Semana 7 venía de un CDN, y se cambió por dos
   razones:

     1. Era una dependencia externa en tiempo de ejecución: si el CDN
        falla o está bloqueado, el sitio se ve sin estilos.
     2. Los navegadores con prevención de seguimiento avisan en consola
        al pedir recursos a dominios de terceros.

   Importado, Vite lo empaqueta junto al resto y el sitio funciona sin
   depender de nadie.

   Bootstrap va PRIMERO e index.css DESPUÉS: la hoja propia reasigna
   variables del framework, así que tiene que llegar después para poder
   sobrescribirlas. Vite conserva este orden en el CSS del build.

   Solo se importa el CSS. El JavaScript de Bootstrap manipula el DOM
   por su cuenta y se pelearía con React, que es quien lo gobierna aquí;
   el menú colapsable se resuelve con las clases del framework y estado
   de React.
   ============================================================ */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
