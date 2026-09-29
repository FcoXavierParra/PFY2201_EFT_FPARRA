/* ============================================================
   COMPONENTE TotalCarrito
   El pie del carrito: unidades, ahorro acumulado y total a pagar.

   Recibe (props):
     - lineas: el carrito resuelto, [{ producto, cantidad }].

   Devuelve: el bloque de totales.

   Calcula con .reduce(), que recorre el arreglo acumulando un valor.
   No recibe el total ya sumado a propósito: encerrar aquí el cálculo
   evita que la cifra se calcule en dos sitios distintos y acaben
   discrepando.
   ============================================================ */

import { formatearPrecio } from "../utils/formato";

function TotalCarrito({ lineas }) {
    /* Unidades: suma de cantidades, no número de líneas. Dos copias de
       un mismo juego son dos productos en el carrito, no uno. */
    const unidades = lineas.reduce((suma, linea) => suma + linea.cantidad, 0);

    /* Total a pagar: siempre sobre el precio de oferta */
    const total = lineas.reduce(
        (suma, linea) => suma + linea.producto.oferta * linea.cantidad,
        0
    );

    /* Lo que costaría sin las ofertas, para poder mostrar el ahorro */
    const totalSinOferta = lineas.reduce(
        (suma, linea) => suma + linea.producto.precio * linea.cantidad,
        0
    );

    const ahorro = totalSinOferta - total;

    return (
        <div className="border-top border-secondary pt-3 mt-3">
            <p className="d-flex justify-content-between mb-1">
                <span>Productos</span>
                <span className="fw-bold">{unidades}</span>
            </p>

            <p className="d-flex justify-content-between mb-1 text-body-secondary">
                <span>Precio sin ofertas</span>
                <span className="text-decoration-line-through">
                    {formatearPrecio(totalSinOferta)}
                </span>
            </p>

            <p className="d-flex justify-content-between mb-1 text-body-secondary">
                <span>Ahorro</span>
                <span>−{formatearPrecio(ahorro)}</span>
            </p>

            <p className="d-flex justify-content-between mb-0 fs-5">
                <span className="fw-bold">Total a pagar</span>
                <span className="fw-bold text-primary">
                    {formatearPrecio(total)}
                </span>
            </p>
        </div>
    );
}

export default TotalCarrito;
