/* ============================================================
   COMPONENTE Carrito
   La sección del carrito de compras, de principio a fin: la lista,
   los datos de despacho y el comprobante.

   Recibe (props):
     - lineas: [{ producto, cantidad }], el carrito ya resuelto.
     - alSumar, alQuitar, alEliminar, alVaciar: las acciones sobre el carrito.
     - compra: la última compra confirmada, o null.
     - alComprar: función que recibe los datos de despacho válidos.
     - alCerrarCompra: función para cerrar el comprobante.

   Devuelve: la sección completa del carrito.

   Reparte el trabajo en hijos: LineaCarrito pinta cada producto,
   TotalCarrito calcula el pie, FormularioPago pide los datos y
   Comprobante muestra la compra hecha. Este componente solo decide
   QUÉ se muestra.

   Tiene UN estado propio, pagando, por la misma razón que el menú de
   Encabezado: si se está en la lista o en el formulario de pago no le
   importa a nadie fuera del carrito. La compra confirmada, en cambio,
   vive en App, porque al confirmarla App tiene que vaciar el carrito.
   ============================================================ */

import { useState } from "react";

import Comprobante from "./Comprobante";
import FormularioPago from "./FormularioPago";
import LineaCarrito from "./LineaCarrito";
import TotalCarrito from "./TotalCarrito";

function Carrito({
    lineas,
    alSumar,
    alQuitar,
    alEliminar,
    alVaciar,
    compra,
    alComprar,
    alCerrarCompra,
}) {
    /* false: la lista del carrito. true: el formulario de pago. */
    const [pagando, setPagando] = useState(false);

    /** Recibe los datos válidos del formulario y cierra la compra. */
    function confirmar(datos) {
        setPagando(false);
        alComprar(datos);
    }

    /* RENDERIZADO CONDICIONAL (criterio 3): cuatro vistas, en orden de
       prioridad. Se decide aquí, antes del JSX, para que el return no
       sea una cadena de ternarios anidados. */
    let contenido;

    if (compra) {
        /* 1. Recién comprado: el comprobante, aunque el carrito ya esté vacío */
        contenido = <Comprobante compra={compra} alCerrar={alCerrarCompra} />;
    } else if (lineas.length === 0) {
        /* 2. Vacío: un mensaje que dice qué hacer, no una lista vacía */
        contenido = (
            <p className="mb-0 text-body-secondary" role="status">
                Tu carrito está vacío. Agrega un juego del catálogo para empezar.
            </p>
        );
    } else if (pagando) {
        /* 3. Pagando: el resumen arriba y el formulario debajo */
        contenido = (
            <>
                <TotalCarrito lineas={lineas} />
                <FormularioPago alConfirmar={confirmar} alVolver={() => setPagando(false)} />
            </>
        );
    } else {
        /* 4. La lista, con su total y las acciones */
        contenido = (
            <>
                <ul className="list-group list-group-flush">
                    {lineas.map((linea) => (
                        <LineaCarrito
                            key={linea.producto.id}
                            linea={linea}
                            alSumar={alSumar}
                            alQuitar={alQuitar}
                            alEliminar={alEliminar}
                        />
                    ))}
                </ul>

                <TotalCarrito lineas={lineas} />

                <div className="d-flex flex-wrap gap-2 mt-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setPagando(true)}
                    >
                        Ir a pagar
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={alVaciar}
                    >
                        Vaciar carrito
                    </button>
                </div>
            </>
        );
    }

    return (
        <section id="carrito" className="carrito-fijo">
            <h2>Tu carrito</h2>

            <div className="card mt-3">
                <div className="card-body">{contenido}</div>
            </div>
        </section>
    );
}

export default Carrito;
