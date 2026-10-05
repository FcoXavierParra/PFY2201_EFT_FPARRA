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

/**
 * ¿Es el texto un número entero de pesos mayor que cero?
 * Los campos de un formulario siempre llegan como texto, aunque el
 * input sea type="number": de ahí la conversión.
 * @param {string} texto - Lo que hay escrito en el campo.
 * @returns {boolean}
 */
function esPrecioValido(texto) {
    const valor = Number(texto);
    return texto.trim() !== "" && Number.isInteger(valor) && valor > 0;
}

/**
 * Valida los datos del formulario para agregar un videojuego.
 * @param {{ nombre: string, genero: string, precio: string,
 *   oferta: string, descripcion: string }} datos
 * @param {Array} catalogo - Los productos actuales, para no repetir nombre.
 * @returns {Object<string, string>} Un mensaje por cada campo inválido.
 */
export function validarProducto(datos, catalogo) {
    const errores = {};
    const nombre = datos.nombre.trim();

    if (nombre === "") {
        errores.nombre = "Escribe el nombre del videojuego.";
    } else if (
        /* Sin distinguir mayúsculas: "elden realms" es el mismo juego */
        catalogo.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase())
    ) {
        errores.nombre = "Ya hay un videojuego con ese nombre en el catálogo.";
    }

    if (datos.genero.trim() === "") {
        errores.genero = "Elige o escribe una categoría.";
    }

    if (!esPrecioValido(datos.precio)) {
        errores.precio = "Escribe el precio normal en pesos, sin puntos ni decimales.";
    }

    if (!esPrecioValido(datos.oferta)) {
        errores.oferta = "Escribe el precio de oferta en pesos, sin puntos ni decimales.";
    } else if (esPrecioValido(datos.precio) && Number(datos.oferta) > Number(datos.precio)) {
        /* La tarjeta tacha el precio normal: una "oferta" más cara no
           tendría sentido y el porcentaje de ahorro saldría negativo */
        errores.oferta = "La oferta no puede ser mayor que el precio normal.";
    }

    if (datos.descripcion.trim().length < LARGO_MINIMO_MENSAJE) {
        errores.descripcion = `La descripción debe tener al menos ${LARGO_MINIMO_MENSAJE} caracteres.`;
    }

    return errores;
}
