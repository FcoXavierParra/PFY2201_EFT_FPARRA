/* ============================================================
   HOOK PERSONALIZADO useFormulario — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Evaluación Final Transversal (Semana 9)

   Todo lo que tienen en común los formularios del sitio: guardar lo
   escrito en cada campo, validar al enviar, mostrar los errores por
   campo y limpiar tras un envío correcto.

   ¿Por qué un hook? El sitio tiene dos formularios —el de contacto y
   el de agregar un videojuego— que se comportan exactamente igual y
   solo se diferencian en sus campos y en sus reglas. Sin el hook, esas
   cuarenta líneas estarían copiadas en los dos componentes, y un
   arreglo en una copia se olvidaría en la otra. Con él, cada
   formulario declara QUÉ campos tiene y QUÉ reglas aplican; el CÓMO
   vive aquí una sola vez.

   Es la misma idea que useProductos, aplicada a otro trabajo.
   ============================================================ */

import { useState } from "react";

/**
 * Gestiona el estado y la validación de un formulario controlado.
 * @param {string} prefijo - Antepuesto a los id de los campos, para que
 *   dos formularios con un campo "nombre" no repitan id en la página.
 * @param {Object} inicial - Los campos y su valor vacío.
 * @param {Function} validar - Recibe los datos y devuelve un objeto con
 *   un mensaje por campo inválido (vacío si todo está bien).
 * @returns {{errores: Object, enviado: boolean, propsDeCampo: Function,
 *   manejarEnvio: Function}}
 */
export default function useFormulario(prefijo, inicial, validar) {
    /* Lo que hay escrito en cada campo */
    const [datos, setDatos] = useState(inicial);

    /* Un mensaje por campo inválido; vacío si todo está bien */
    const [errores, setErrores] = useState({});

    /* Si el último envío fue correcto, para mostrar el aviso */
    const [enviado, setEnviado] = useState(false);

    /**
     * Actualiza un campo al escribir. Un solo manejador para todos: el
     * atributo name del input dice qué propiedad cambiar.
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
            setErrores({ ...errores, [name]: validar(nuevos)[name] });
        }
    }

    /**
     * Construye el manejador del submit.
     * @param {Function} alSerValido - Qué hacer con los datos cuando
     *   pasan la validación. Es lo único que cambia entre formularios.
     */
    function manejarEnvio(alSerValido) {
        return (evento) => {
            /* Sin esto el navegador recargaría la página al enviar */
            evento.preventDefault();

            const encontrados = validar(datos);
            setErrores(encontrados);

            if (Object.keys(encontrados).length === 0) {
                alSerValido(datos);
                setEnviado(true);
                setDatos(inicial);
            }
        };
    }

    /* Atributos de un campo según tenga error o no. is-invalid es de
       Bootstrap: el borde rojo sale sin CSS propio. aria-invalid y
       aria-describedby hacen que el lector de pantalla lea el error. */
    function propsDeCampo(nombre) {
        return {
            id: `${prefijo}-${nombre}`,
            name: nombre,
            value: datos[nombre],
            onChange: alEscribir,
            className: `form-control${errores[nombre] ? " is-invalid" : ""}`,
            "aria-invalid": Boolean(errores[nombre]),
            "aria-describedby": errores[nombre]
                ? `${prefijo}-error-${nombre}`
                : undefined,
        };
    }

    return { errores, enviado, propsDeCampo, manejarEnvio };
}
