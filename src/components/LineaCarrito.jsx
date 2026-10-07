/* ============================================================
   COMPONENTE LineaCarrito
   Una línea del carrito: un producto con su cantidad y su subtotal.

   Recibe (props):
     - linea: { producto, cantidad } ya resuelto por el carrito.
     - alSumar: suma UNA unidad.
     - alQuitar: quita UNA unidad.
     - alEliminar: elimina la línea completa.

   Devuelve: un elemento de la lista del carrito.

   Igual que TarjetaProducto, se instancia tantas veces como líneas
   tenga el carrito. Sus tres eventos onClick permiten cambiar la
   cantidad en los dos sentidos y eliminar la línea desde el carrito.
   ============================================================ */

import { formatearPrecio, rutaImagen } from "../utils/formato";

function LineaCarrito({ linea, alSumar, alQuitar, alEliminar }) {
    const { producto, cantidad } = linea;

    /* El subtotal se calcula sobre el precio de OFERTA, que es el que
       realmente se paga. Tarjeta, línea y total usan el mismo criterio. */
    const subtotal = producto.oferta * cantidad;

    return (
        <li className="list-group-item d-flex flex-wrap align-items-center gap-3">
            <img
                src={rutaImagen(producto.imagen)}
                alt={producto.alt}
                width="40"
                height="50"
                className="flex-shrink-0"
            />

            <div className="flex-grow-1">
                <p className="mb-0 fw-bold">{producto.nombre}</p>
                <p className="mb-0 small text-body-secondary">
                    {formatearPrecio(producto.oferta)} × {cantidad}
                </p>
            </div>

            <span className="fw-bold text-primary">
                {formatearPrecio(subtotal)}
            </span>

            <div className="btn-group btn-group-sm" role="group">
                {/* Quita una unidad. Con una sola unidad no tiene sentido,
                    así que se deshabilita y queda el botón de eliminar. */}
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => alQuitar(producto.id)}
                    disabled={cantidad === 1}
                    aria-label={`Quitar una unidad de ${producto.nombre}`}
                >
                    −
                </button>

                {/* Suma una unidad. Estaba en la Semana 6 y se perdió al
                    pasar a React en la Semana 7 sin que nadie lo decidiera:
                    el carrito quedó con "−" pero sin su "+". */}
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => alSumar(producto.id)}
                    aria-label={`Agregar una unidad de ${producto.nombre}`}
                >
                    +
                </button>

                {/* Elimina la línea completa, sea cual sea la cantidad */}
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => alEliminar(producto.id)}
                    aria-label={`Eliminar ${producto.nombre} del carrito`}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default LineaCarrito;
