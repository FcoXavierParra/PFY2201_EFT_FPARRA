/* ============================================================
   COMPONENTE Encabezado
   Barra superior: marca, menú de navegación y contador del carrito.

   Recibe (props):
     - unidades: número total de juegos en el carrito.
     - children: el buscador, que se inserta dentro de la barra.

   Devuelve: el <header> del sitio.

   Tiene UN estado propio, menuAbierto, y aquí sí corresponde que viva
   dentro del componente: es estado de interfaz que no le importa a
   nadie más. El carrito, en cambio, lo leen tres ramas distintas del
   árbol, y por eso vive en App. La regla es esa: el estado sube solo
   hasta donde hace falta compartirlo.

   El menú colapsable se resuelve con CSS de Bootstrap y React: la
   clase .collapse lo oculta y .show lo muestra, así que basta añadir o
   quitar "show". NO se usa el JavaScript de Bootstrap, que manipula el
   DOM por su cuenta y se pelearía con React. Por encima de 992 px
   navbar-expand-lg vuelve a mostrar el menú con un !important, de modo
   que el estado deja de tener efecto y no hay que desactivarlo a mano.
   ============================================================ */

import { useState } from "react";

import { rutaImagen } from "../utils/formato";

function Encabezado({ unidades, children }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    /* Cierra el menú tras pulsar un enlace. Con el menú desplegado en
       móvil, saltar a una sección dejaba la lista abierta tapando justo
       el contenido al que se acababa de ir. */
    function irASeccion() {
        setMenuAbierto(false);
    }

    return (
        <header>
            <nav
                className="navbar navbar-expand-lg sticky-top border-bottom border-3 border-primary"
                aria-label="Menú principal"
            >
                <div className="container">
                    {/* Marca de la tienda: logo y nombre */}
                    <a
                        className="navbar-brand d-flex align-items-center gap-2"
                        href="#inicio"
                        onClick={irASeccion}
                    >
                        <img
                            src={rutaImagen("img/logo.svg")}
                            alt="Logo de Nexus Play: un mando de videojuegos junto a las letras NP"
                            width="40"
                            height="40"
                        />
                        <span className="fw-bold">Nexus Play</span>
                    </a>

                    {/* Botón hamburguesa: solo se ve con el menú colapsado.
                        aria-expanded refleja el estado para los lectores de
                        pantalla. */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-expanded={menuAbierto}
                        aria-label="Abrir o cerrar el menú de navegación"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Renderizado condicional: la clase "show" se añade solo
                        cuando el menú está abierto */}
                    <div
                        className={
                            "collapse navbar-collapse gap-lg-3" +
                            (menuAbierto ? " show" : "")
                        }
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#inicio"
                                    onClick={irASeccion}
                                >
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#catalogo"
                                    onClick={irASeccion}
                                >
                                    Catálogo
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#categorias"
                                    onClick={irASeccion}
                                >
                                    Categorías
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#pie"
                                    onClick={irASeccion}
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>

                        {/* El buscador llega como children para que el
                            encabezado no tenga que conocer su funcionamiento */}
                        {children}

                        {/* Contador del carrito: exigido por las instrucciones.
                            aria-live avisa a los lectores de pantalla cada vez
                            que el número cambia. */}
                        <a
                            className="btn btn-outline-primary btn-sm text-nowrap"
                            href="#carrito"
                            onClick={irASeccion}
                        >
                            Carrito{" "}
                            <span
                                className="badge text-bg-primary"
                                aria-live="polite"
                            >
                                {unidades}
                            </span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Encabezado;
