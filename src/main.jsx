/* ============================================================
   PUNTO DE ENTRADA — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Formativa 5 (Semana 7)

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
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
