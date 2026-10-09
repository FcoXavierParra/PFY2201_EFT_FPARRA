/* ============================================================
   COMPONENTE Comprobante
   El comprobante de una compra confirmada.

   Recibe (props):
     - compra: { numero, fecha, cliente, lineas } que App guardó al
       confirmar. Las líneas son una COPIA del carrito en ese momento:
       el carrito se vacía, pero el comprobante tiene que seguir
       mostrando lo que se compró.
     - alCerrar: función para volver a comprar.

   Devuelve: el comprobante, con el detalle y el total.

   Reutiliza TotalCarrito para el resumen: los mismos cálculos que el
   carrito, sin repetirlos.
   ============================================================ */

import TotalCarrito from "./TotalCarrito";
import { formatearPrecio } from "../utils/formato";

function Comprobante({ compra, alCerrar }) {
    const { numero, fecha, cliente, lineas } = compra;

    return (
        <div role="status">
            <div className="alert alert-success mb-3">
                <strong>¡Compra confirmada!</strong> Gracias, {cliente.nombre}.
            </div>

            <dl className="row small mb-2">
                <dt className="col-5">N.º de orden</dt>
                <dd className="col-7 mb-1">{numero}</dd>
                <dt className="col-5">Fecha</dt>
                <dd className="col-7 mb-1">{fecha}</dd>
                <dt className="col-5">Despacho</dt>
                <dd className="col-7 mb-0">
                    {cliente.direccion}, {cliente.comuna}
                </dd>
            </dl>

            <ul className="list-unstyled small border-top border-secondary pt-2 mb-0">
                {lineas.map(({ producto, cantidad }) => (
                    <li key={producto.id} className="d-flex justify-content-between">
                        <span>
                            {producto.nombre} × {cantidad}
                        </span>
                        <span>{formatearPrecio(producto.oferta * cantidad)}</span>
                    </li>
                ))}
            </ul>

            <TotalCarrito lineas={lineas} etiquetaTotal="Total pagado" />

            <p className="small text-body-secondary mt-3">
                Enviamos la boleta a <strong>{cliente.email}</strong> y el aviso
                de despacho al <strong>{cliente.celular}</strong>.
                <br />
                <em>Simulación: no se envió ningún mensaje ni se hizo ningún cobro.</em>
            </p>

            <button type="button" className="btn btn-primary" onClick={alCerrar}>
                Seguir comprando
            </button>
        </div>
    );
}

export default Comprobante;
