/* ============================================================
   COMPONENTE Carrito
   La sección del carrito de compras.

   Recibe (props):
     - lineas: [{ producto, cantidad }], el carrito ya resuelto.
     - alQuitar, alEliminar, alVaciar: las tres acciones sobre el carrito.

   Devuelve: la sección completa del carrito.

   Reparte el trabajo en dos hijos: LineaCarrito pinta cada producto y
   TotalCarrito calcula el pie. Este componente solo decide QUÉ se
   muestra: la lista o el estado vacío.
   ============================================================ */

import LineaCarrito from "./LineaCarrito";
import TotalCarrito from "./TotalCarrito";

function Carrito({ lineas, alQuitar, alEliminar, alVaciar }) {
    /* RENDERIZADO CONDICIONAL (criterio 5).
       Con el carrito vacío no tiene sentido mostrar una lista vacía ni
       un total de cero: se sustituye por un mensaje que dice qué hacer. */
    const vacio = lineas.length === 0;

    return (
        <section id="carrito" className="carrito-fijo">
            <h2>Tu carrito</h2>

            <div className="card mt-3">
                <div className="card-body">
                    {vacio ? (
                        <p className="mb-0 text-body-secondary" role="status">
                            Tu carrito está vacío. Agrega un juego del catálogo
                            para empezar.
                        </p>
                    ) : (
                        <>
                            <ul className="list-group list-group-flush">
                                {lineas.map((linea) => (
                                    <LineaCarrito
                                        key={linea.producto.id}
                                        linea={linea}
                                        alQuitar={alQuitar}
                                        alEliminar={alEliminar}
                                    />
                                ))}
                            </ul>

                            <TotalCarrito lineas={lineas} />

                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm mt-3"
                                onClick={alVaciar}
                            >
                                Vaciar carrito
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Carrito;
