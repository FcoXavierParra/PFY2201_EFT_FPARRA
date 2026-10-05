/* ============================================================
   COMPONENTE FormularioContacto
   Formulario para escribirle al administrador del sitio: nombre,
   email y mensaje, validados antes de enviarse.

   No recibe props: el formulario es autónomo. Sus datos no le
   importan a ningún otro componente, así que su estado vive aquí,
   igual que el menú de Encabezado.
   Devuelve: la sección #contacto.

   El estado y la validación los pone el hook useFormulario, que
   comparte con FormularioProducto; la regla de qué es válido está en
   utils/validacion.js. A este componente solo le queda declarar sus
   campos y decidir cómo se ven.

   No hay servidor: un envío válido se confirma en pantalla y el
   formulario se limpia. Conectarlo a un servicio de correo añadiría
   una dependencia externa que puede fallar el día de la corrección.
   ============================================================ */

import CampoFormulario from "./CampoFormulario";
import useFormulario from "../hooks/useFormulario";
import { validarContacto } from "../utils/validacion";

/* Estado inicial, fuera del componente para no recrearlo en cada
   renderizado; el hook lo reutiliza al limpiar */
const CONTACTO_VACIO = { nombre: "", email: "", mensaje: "" };

function FormularioContacto() {
    const formulario = useFormulario("contacto", CONTACTO_VACIO, validarContacto);

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
                        {formulario.enviado && (
                            <div className="alert alert-success" role="status">
                                ¡Gracias! Recibimos tu mensaje y te responderemos
                                a la brevedad.
                            </div>
                        )}

                        {/* noValidate apaga la validación del navegador: los
                            mensajes son los nuestros y se ven igual en todos.
                            Contactar no cambia nada en la aplicación, así que
                            el envío válido no hace nada más que confirmarse. */}
                        <form noValidate onSubmit={formulario.manejarEnvio(() => {})}>
                            <CampoFormulario
                                formulario={formulario}
                                nombre="nombre"
                                etiqueta="Nombre"
                                type="text"
                                autoComplete="name"
                            />
                            <CampoFormulario
                                formulario={formulario}
                                nombre="email"
                                etiqueta="Correo electrónico"
                                type="email"
                                autoComplete="email"
                            />
                            <CampoFormulario
                                formulario={formulario}
                                nombre="mensaje"
                                etiqueta="Mensaje"
                                como="textarea"
                                rows="4"
                            />

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
