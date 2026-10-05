/* ============================================================
   COMPONENTE FormularioContacto
   Formulario para escribirle al administrador del sitio: nombre,
   email y mensaje, validados antes de enviarse.

   No recibe props: el formulario es autónomo. Sus datos no le
   importan a ningún otro componente, así que su estado vive aquí,
   igual que el menú de Encabezado.
   Devuelve: la sección #contacto.

   Tres estados locales:
     - datos:   lo que hay escrito en cada campo.
     - errores: un mensaje por campo inválido; vacío si todo está bien.
     - enviado: si el último envío fue correcto, para mostrar el aviso.

   Los campos son controlados, como el Buscador: el valor que se ve es
   el del estado. La regla de qué es válido no está aquí sino en
   utils/validacion.js; este componente solo decide cómo mostrarla.

   No hay servidor: un envío válido se confirma en pantalla y el
   formulario se limpia. Conectarlo a un servicio de correo añadiría
   una dependencia externa que puede fallar el día de la corrección.
   ============================================================ */

import { useState } from "react";

import { validarContacto } from "../utils/validacion";

/* Estado inicial, fuera del componente para reutilizarlo al limpiar */
const FORMULARIO_VACIO = { nombre: "", email: "", mensaje: "" };

function FormularioContacto() {
    const [datos, setDatos] = useState(FORMULARIO_VACIO);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    /**
     * Actualiza un campo al escribir. Un solo manejador para los tres:
     * el atributo name del input dice qué propiedad cambiar.
     */
    function alEscribir(evento) {
        const { name, value } = evento.target;
        const nuevos = { ...datos, [name]: value };
        setDatos(nuevos);
        setEnviado(false);

        /* Si el campo ya estaba marcado, se revalida en cada tecla para
           que el error desaparezca en cuanto se corrige. Los campos sin
           error no se validan al escribir: marcar en rojo algo que el
           usuario aún no termina de escribir es molesto. */
        if (errores[name]) {
            setErrores({ ...errores, [name]: validarContacto(nuevos)[name] });
        }
    }

    /** Valida todo al enviar. Solo si no hay errores se da por enviado. */
    function alEnviar(evento) {
        /* Sin esto el navegador recargaría la página al enviar */
        evento.preventDefault();

        const encontrados = validarContacto(datos);
        setErrores(encontrados);

        if (Object.keys(encontrados).length === 0) {
            setEnviado(true);
            setDatos(FORMULARIO_VACIO);
        }
    }

    /* Clases y atributos de un campo según tenga error o no.
       is-invalid y invalid-feedback son de Bootstrap: el borde rojo y
       el mensaje bajo el campo salen sin CSS propio. */
    function propsDeCampo(nombre) {
        return {
            id: `contacto-${nombre}`,
            name: nombre,
            value: datos[nombre],
            onChange: alEscribir,
            className: `form-control${errores[nombre] ? " is-invalid" : ""}`,
            "aria-invalid": Boolean(errores[nombre]),
            "aria-describedby": errores[nombre] ? `error-${nombre}` : undefined,
        };
    }

    return (
        <section id="contacto" className="pt-5">
            <h2>Contacto</h2>

            {/* Rejilla propia (ver .contacto-grid en index.css): el
                formulario y los datos de atención, lado a lado en
                pantallas medianas y uno sobre otro en el teléfono */}
            <div className="contacto-grid">
                <div className="card">
                    <div className="card-body">
                        {/* Aviso de envío correcto: solo tras un envío
                            válido, y se oculta en cuanto se vuelve a escribir */}
                        {enviado && (
                            <div className="alert alert-success" role="status">
                                ¡Gracias! Recibimos tu mensaje y te responderemos
                                a la brevedad.
                            </div>
                        )}

                        {/* noValidate apaga la validación del navegador: los
                            mensajes son los nuestros y se ven igual en todos */}
                        <form noValidate onSubmit={alEnviar}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="contacto-nombre">
                                    Nombre
                                </label>
                                <input type="text" autoComplete="name" {...propsDeCampo("nombre")} />
                                {errores.nombre && (
                                    <div id="error-nombre" className="invalid-feedback">
                                        {errores.nombre}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="contacto-email">
                                    Correo electrónico
                                </label>
                                <input type="email" autoComplete="email" {...propsDeCampo("email")} />
                                {errores.email && (
                                    <div id="error-email" className="invalid-feedback">
                                        {errores.email}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="contacto-mensaje">
                                    Mensaje
                                </label>
                                <textarea rows="4" {...propsDeCampo("mensaje")} />
                                {errores.mensaje && (
                                    <div id="error-mensaje" className="invalid-feedback">
                                        {errores.mensaje}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Enviar mensaje
                            </button>
                        </form>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h3 className="h6">¿Dudas con tu compra?</h3>
                        <p className="text-body-secondary mb-2">
                            Escríbenos por este formulario y te respondemos
                            dentro de un día hábil.
                        </p>
                        <p className="text-body-secondary mb-0">
                            Atención de lunes a viernes, de 9:00 a 18:00 h.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FormularioContacto;
