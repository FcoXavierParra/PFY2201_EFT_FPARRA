/* ============================================================
   VALIDACIÓN DE FORMULARIOS — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Evaluación Final Transversal (Semana 9)

   Funciones puras, igual que las de formato.js: reciben los datos de
   un formulario y devuelven los errores, sin tocar el DOM ni el
   estado. Así la regla de "qué es válido" vive en un solo sitio y el
   componente solo decide cómo mostrarla.
   ============================================================ */

/* Mínimo de caracteres del mensaje. Un mensaje de dos letras no le
   sirve al administrador, y obliga a escribir al menos una frase. */
export const LARGO_MINIMO_MENSAJE = 10;

/* Formato de correo: algo, una arroba, algo, un punto y algo, sin
   espacios. No pretende cubrir todo lo que admite el estándar, solo
   atrapar los errores de tipeo habituales ("juan@", "juan.cl"). */
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida los datos del formulario de contacto.
 * @param {{ nombre: string, email: string, mensaje: string }} datos
 * @returns {Object<string, string>} Un mensaje por cada campo inválido.
 *   Si el objeto vuelve vacío, el formulario es válido.
 */
export function validarContacto({ nombre, email, mensaje }) {
    const errores = {};

    /* trim() antes de mirar: un campo con solo espacios está vacío */
    if (nombre.trim() === "") {
        errores.nombre = "Escribe tu nombre.";
    }

    if (email.trim() === "") {
        errores.email = "Escribe tu correo electrónico.";
    } else if (!FORMATO_EMAIL.test(email.trim())) {
        errores.email = "El correo no tiene un formato válido, por ejemplo nombre@correo.cl.";
    }

    if (mensaje.trim() === "") {
        errores.mensaje = "Escribe tu mensaje.";
    } else if (mensaje.trim().length < LARGO_MINIMO_MENSAJE) {
        errores.mensaje = `El mensaje debe tener al menos ${LARGO_MINIMO_MENSAJE} caracteres.`;
    }

    return errores;
}
