/* ============================================================
   COMPONENTE ListaProductos
   La rejilla del catálogo.

   Recibe (props):
     - productos: los productos ya filtrados que hay que mostrar.
     - busqueda: el texto buscado, solo para poder citarlo en el aviso.
     - categoria: la categoría activa, para el mismo aviso.
     - cargando: true mientras el fetch está en vuelo.
     - error: mensaje si la carga falló, null si todo fue bien.
     - idsEnCarrito: qué productos ya están en el carrito.
     - alAgregar, alQuitar: funciones que se pasan tal cual a cada tarjeta.

   Devuelve: la sección del catálogo.

   No filtra ni carga nada: recibe el listado ya resuelto y se limita a
   pintarlo. Aquí vive la mayor parte del renderizado condicional de la
   aplicación, porque este componente tiene CUATRO vistas posibles y
   decide entre ellas según el estado:

     1. cargando  -> aviso de carga
     2. error     -> mensaje amigable
     3. sin resultados -> explica por cuál filtro se quedó vacío, o
                          que el catálogo entero está vacío
     4. con productos  -> la rejilla

   Las tres primeras salen antes con un return, que es más legible que
   anidar tres ternarios dentro del JSX.
   ============================================================ */

import { TODAS_LAS_CATEGORIAS } from "../utils/formato";
import TarjetaProducto from "./TarjetaProducto";

function ListaProductos({
    productos,
    busqueda,
    categoria,
    cargando,
    error,
    idsEnCarrito,
    alAgregar,
    alQuitar,
}) {
    const hayCategoria = categoria !== TODAS_LAS_CATEGORIAS;

    /* VISTA 1 — mientras el useEffect de App pide los datos.
       role="status" hace que los lectores de pantalla lo anuncien. */
    if (cargando) {
        return (
            <section id="catalogo" className="pt-4">
                <h2>Catálogo</h2>
                <p className="d-flex align-items-center gap-3 mt-3" role="status">
                    <span
                        className="spinner-border spinner-border-sm text-primary"
                        aria-hidden="true"
                    ></span>
                    Cargando catálogo…
                </p>
            </section>
        );
    }

    /* VISTA 2 — la carga falló. Mensaje amigable, nunca una pantalla en
       blanco ni el error técnico en crudo: ese va a la consola. */
    if (error) {
        return (
            <section id="catalogo" className="pt-4">
                <h2>Catálogo</h2>
                <p className="alert alert-warning mt-3" role="alert">
                    {error}
                </p>
            </section>
        );
    }

    /* VISTA 3 — hay catálogo, pero los filtros no dejaron nada. El aviso
       explica por cuál de los dos se quedó sin resultados: el texto, la
       categoría, o ambos a la vez. */
    if (productos.length === 0) {
        /* Sin filtros activos, una lista vacía solo puede significar que
           se quitaron todos los juegos: decir "prueba con otro nombre"
           no tendría sentido. */
        if (busqueda === "" && !hayCategoria) {
            return (
                <section id="catalogo" className="pt-4">
                    <h2>Catálogo</h2>
                    <p className="alert alert-secondary mt-3" role="status">
                        El catálogo está vacío. Agrega un juego con el
                        formulario o recarga la página para recuperar el
                        catálogo original.
                    </p>
                </section>
            );
        }

        return (
            <section id="catalogo" className="pt-4">
                <h2>Catálogo</h2>
                <p className="alert alert-secondary mt-3" role="status">
                    No encontramos juegos
                    {busqueda !== "" && <> que coincidan con «{busqueda}»</>}
                    {hayCategoria && <> en la categoría {categoria}</>}. Prueba
                    con otro nombre o vuelve a «{TODAS_LAS_CATEGORIAS}».
                </p>
            </section>
        );
    }

    /* VISTA 4 — la rejilla */
    return (
        <section id="catalogo" className="pt-4">
            <h2>Catálogo</h2>
            <p className="text-body-secondary">
                {productos.length}{" "}
                {/* Concordancia de singular y plural: con un solo
                    resultado, "juegos disponibles" chirría */}
                {productos.length === 1
                    ? "juego disponible"
                    : "juegos disponibles"}
                {/* El nombre de la categoría solo aparece si hay una activa */}
                {hayCategoria && <> en {categoria}</>}, todos con precio de
                oferta.
            </p>

            <div className="row g-4 mt-1">
                {/* .map() recorre el listado y crea una tarjeta por
                    producto. La prop key es obligatoria para que React
                    identifique cada elemento entre renderizados: sin ella
                    avisa por consola y puede reutilizar mal el DOM. */}
                {productos.map((producto) => (
                    <TarjetaProducto
                        key={producto.id}
                        producto={producto}
                        yaEsta={idsEnCarrito.includes(producto.id)}
                        alAgregar={alAgregar}
                        alQuitar={alQuitar}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaProductos;
