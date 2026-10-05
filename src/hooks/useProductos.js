/* ============================================================
   HOOK PERSONALIZADO useProductos — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Evaluación Final Transversal (Semana 9)

   Encapsula TODO lo que implica traer el catálogo: el estado donde
   queda, el estado de carga, el de error y el efecto que lo pide.

   ¿Por qué sacarlo de App?
   Porque App hacía dos trabajos que no tienen nada que ver entre sí:
   conseguir el catálogo y gestionar el carrito. Al separarlos, App pasa
   a leerse como QUÉ hace la aplicación, y este archivo guarda CÓMO
   llegan los datos. Si mañana el catálogo viniera de una API con
   autenticación, o hubiera que reintentar, o cachear, se cambiaría aquí
   dentro y App no se enteraría: sigue recibiendo los mismos valores.

   ¿Qué convierte a esto en un hook y no en una función normal?
   Que llama a otros hooks (useState y useEffect). Esa es la única
   diferencia. Por eso su nombre empieza por "use": es la convención que
   permite a React y al linter comprobar que se respetan las reglas de
   los hooks — llamarse siempre en el nivel superior de un componente o
   de otro hook, nunca dentro de un if ni de un bucle.

   Devuelve un objeto y no un arreglo a propósito. useState devuelve un
   arreglo porque solo trae dos cosas y quien lo usa les pone nombre al
   desestructurar. Aquí son cinco y siempre se llaman igual, así que un
   objeto evita tener que recordar el orden.
   ============================================================ */

import { useEffect, useState } from "react";

import { URL_DATOS } from "../utils/formato";

/**
 * Carga el catálogo de productos desde el archivo JSON del sitio.
 * @returns {{productos: Array, cargando: boolean, error: string|null,
 *   agregarProducto: Function, quitarProducto: Function}}
 *   productos: el catálogo, o un arreglo vacío mientras no haya llegado.
 *   cargando: true mientras la petición está en vuelo.
 *   error: mensaje amigable si la carga falló, o null.
 *   agregarProducto / quitarProducto: cambian el catálogo en memoria.
 */
export default function useProductos() {
    /* Arranca vacío: los datos llegan después del primer renderizado */
    const [productos, setProductos] = useState([]);

    /* Empieza en true porque la aplicación nace cargando, no vacía. Si
       empezara en false se vería un instante el mensaje de "no hay
       juegos" antes de que llegaran los datos. */
    const [cargando, setCargando] = useState(true);

    /* null mientras todo va bien */
    const [error, setError] = useState(null);

    /* useEffect con [] como segundo argumento se ejecuta UNA vez, justo
       después del primer renderizado. Es el lugar donde React espera los
       efectos secundarios: pedir datos, suscribirse a algo, tocar el
       exterior. Hacerlo durante el renderizado sería un error, porque el
       renderizado tiene que ser una función pura.

       Sin el arreglo vacío el efecto correría en cada renderizado, y
       como cambia el estado, eso sería un bucle infinito. */
    useEffect(() => {
        /* La guarda existe porque en desarrollo StrictMode monta el
           componente, lo desmonta y lo vuelve a montar para destapar
           efectos mal escritos. Sin ella, la respuesta del primer fetch
           intentaría actualizar un componente que ya no está. */
        let cancelado = false;

        fetch(URL_DATOS)
            .then((respuesta) => {
                /* Un 404 NO hace que fetch falle: la promesa se resuelve
                   igual y .json() reventaría leyendo una página de
                   error. Hay que mirar el estado a mano. */
                if (!respuesta.ok) {
                    throw new Error(`El servidor respondió ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then((datos) => {
                if (cancelado) return;
                setProductos(datos.productos);
                setCargando(false);
            })
            .catch((fallo) => {
                if (cancelado) return;
                /* El detalle técnico va a la consola, que es donde sirve;
                   a la pantalla va un mensaje que se entienda. */
                console.error("Fallo al cargar el catálogo:", fallo);
                setError(
                    "No pudimos cargar el catálogo. Revisa tu conexión y vuelve a intentarlo."
                );
                setCargando(false);
            });

        /* Función de limpieza: React la llama al desmontar */
        return () => {
            cancelado = true;
        };
    }, []);

    /* ---------- Cambios sobre el catálogo ----------
       Desde la EFT el catálogo no solo se lee: también se le agregan y
       quitan videojuegos. Los cambios viven solo en el estado: al
       recargar la página vuelve el catálogo del JSON, porque un sitio
       estático no tiene dónde guardarlos.

       Se exponen dos funciones con nombre y no setProductos: así quien
       usa el hook puede agregar o quitar, pero no reemplazar el catálogo
       entero por cualquier cosa. */

    /**
     * Agrega un videojuego al final del catálogo.
     * @param {Object} nuevo - El producto sin id; el id se calcula aquí.
     */
    function agregarProducto(nuevo) {
        setProductos((actual) => {
            /* El siguiente al mayor id existente. No sirve actual.length
               + 1: si se quitó un juego, ese id podría estar repetido. */
            const id = Math.max(0, ...actual.map((p) => p.id)) + 1;
            return [...actual, { ...nuevo, id }];
        });
    }

    /**
     * Quita un videojuego del catálogo.
     * @param {number} id - Identificador del producto.
     */
    function quitarProducto(id) {
        setProductos((actual) => actual.filter((p) => p.id !== id));
    }

    return { productos, cargando, error, agregarProducto, quitarProducto };
}
