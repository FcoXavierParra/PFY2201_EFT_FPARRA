/* ============================================================
   COMPONENTE FormularioPago
   Datos de despacho y de contacto para cerrar la compra.

   Recibe (props):
     - alConfirmar: función que recibe los datos válidos.
     - alVolver: función para volver a la lista del carrito.

   Devuelve: el formulario de pago.

   Es una SIMULACIÓN: no hay pasarela de pago ni servidor. Por eso no
   pide datos de tarjeta: un formulario que los pide sin necesitarlos
   enseña un mal hábito, y para mostrar el flujo de compra no hacen
   falta. El correo y el celular son a donde "se enviarían" la boleta
   y el aviso de despacho.

   Tercer formulario del sitio sobre useFormulario y CampoFormulario:
   solo declara sus campos y su regla de validación.
   ============================================================ */

import CampoFormulario from "./CampoFormulario";
import useFormulario from "../hooks/useFormulario";
import { validarCompra } from "../utils/validacion";

const COMPRA_VACIA = {
    nombre: "",
    email: "",
    celular: "",
    direccion: "",
    comuna: "",
};

function FormularioPago({ alConfirmar, alVolver }) {
    const formulario = useFormulario("pago", COMPRA_VACIA, validarCompra);

    return (
        <form noValidate onSubmit={formulario.manejarEnvio(alConfirmar)}>
            <h3 className="h5 mt-3">Datos de despacho</h3>

            <CampoFormulario
                formulario={formulario}
                nombre="nombre"
                etiqueta="Nombre completo"
                type="text"
                autoComplete="name"
            />
            <CampoFormulario
                formulario={formulario}
                nombre="email"
                etiqueta="Correo (para la boleta)"
                type="email"
                autoComplete="email"
            />
            <CampoFormulario
                formulario={formulario}
                nombre="celular"
                etiqueta="Celular (para el aviso de despacho)"
                type="tel"
                autoComplete="tel"
                placeholder="+56 9 1234 5678"
            />
            <CampoFormulario
                formulario={formulario}
                nombre="direccion"
                etiqueta="Dirección"
                type="text"
                autoComplete="street-address"
            />
            <CampoFormulario
                formulario={formulario}
                nombre="comuna"
                etiqueta="Comuna"
                type="text"
                autoComplete="address-level2"
            />

            <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-primary">
                    Confirmar compra
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={alVolver}>
                    Volver al carrito
                </button>
            </div>

            <p className="small text-body-secondary mt-3 mb-0">
                Simulación: no se cobra nada ni se envía ningún mensaje.
            </p>
        </form>
    );
}

export default FormularioPago;
