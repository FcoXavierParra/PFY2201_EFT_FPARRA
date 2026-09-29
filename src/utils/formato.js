/* ============================================================
   UTILIDADES REUTILIZABLES — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Sumativa 3 (Semana 8)

   Funciones puras, sin estado ni dependencia de React: reciben
   valores y devuelven valores. Viven fuera de los componentes
   justamente para poder usarse desde cualquiera de ellos, que es lo
   que pide el criterio 4 de la pauta.
   ============================================================ */

/* Porcentaje de descuento a partir del cual una oferta se considera
   destacada. Se declara aquí, y no suelto dentro de un componente,
   para que el criterio sea el mismo en toda la aplicación. */
export const DESCUENTO_DESTACADO = 30;

/* ============================================================
   RUTAS DE LOS ARCHIVOS SERVIDOS DESDE public/

   Vite NO reescribe las rutas de los archivos que viven en public/:
   los copia tal cual al build. Como el sitio se publica en un
   subdirectorio de GitHub Pages (/PFY2201_S8_FPARRA/), la ruta hay
   que componerla a mano con la base.

   Escribir "/data/productos.json" a pelo funciona en local y da 404
   al publicar. Es el mismo problema de la ruta base de la Semana 7,
   pero aquí no avisa con la página en blanco: avisa con el catálogo
   vacío, que es más fácil de confundir con un fallo del código.
   ============================================================ */

/** URL del archivo JSON con el catálogo. La usa el useEffect de App. */
export const URL_DATOS = import.meta.env.BASE_URL + "data/productos.json";

/**
 * Compone la URL de una imagen guardada en public/.
 * @param {string} archivo - Ruta relativa, por ejemplo "img/logo.svg".
 * @returns {string} La URL con la base del sitio ya aplicada.
 */
export function rutaImagen(archivo) {
    return import.meta.env.BASE_URL + archivo;
}

/**
 * Formatea un número como precio en pesos chilenos.
 * Heredada de la Semana 6 sin cambios de comportamiento.
 * @param {number} valor - Monto en pesos, sin decimales.
 * @returns {string} El monto con separador de miles, por ejemplo "$34.990".
 */
export function formatearPrecio(valor) {
    return valor.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    });
}

/**
 * Calcula el descuento de un producto en porcentaje entero.
 * @param {number} precio - Precio normal.
 * @param {number} oferta - Precio de oferta.
 * @returns {number} El descuento redondeado, por ejemplo 22.
 */
export function calcularAhorro(precio, oferta) {
    return Math.round(((precio - oferta) / precio) * 100);
}

/**
 * Decide si un producto merece la etiqueta de oferta destacada.
 * La usa TarjetaProducto para el renderizado condicional del criterio 3.
 * @param {number} precio - Precio normal.
 * @param {number} oferta - Precio de oferta.
 * @returns {boolean} true si el descuento llega al umbral destacado.
 */
export function esOfertaDestacada(precio, oferta) {
    return calcularAhorro(precio, oferta) >= DESCUENTO_DESTACADO;
}

/* Valor con el que el filtro de categorías muestra el catálogo entero.
   Se exporta para que el componente del filtro y App usen la misma
   constante y no dos cadenas sueltas que puedan dejar de coincidir. */
export const TODAS_LAS_CATEGORIAS = "Todas";

/**
 * Devuelve las categorías presentes en el catálogo, sin repetir y en
 * orden alfabético. Se calculan a partir de los datos en lugar de
 * escribirlas a mano: si mañana se agrega un producto de un género
 * nuevo, su categoría aparece sola.
 * @param {Array} listado - Los productos del catálogo.
 * @returns {string[]} Las categorías, con "Todas" al principio.
 */
export function obtenerCategorias(listado) {
    const generos = [...new Set(listado.map((producto) => producto.genero))];
    return [TODAS_LAS_CATEGORIAS, ...generos.sort()];
}

/**
 * Filtra un listado de productos por categoría.
 * @param {Array} listado - Los productos del catálogo.
 * @param {string} categoria - La categoría elegida.
 * @returns {Array} Los productos de esa categoría, o todos.
 */
export function filtrarPorCategoria(listado, categoria) {
    if (categoria === TODAS_LAS_CATEGORIAS) {
        return listado;
    }

    return listado.filter((producto) => producto.genero === categoria);
}

/**
 * Filtra un listado de productos por coincidencia de texto en el nombre.
 * Ignora mayúsculas y espacios sobrantes. Con el texto vacío devuelve
 * el listado completo, que es lo que debe ocurrir al borrar la búsqueda.
 * @param {Array} listado - Los productos del catálogo.
 * @param {string} texto - Lo que el usuario escribió en el buscador.
 * @returns {Array} Los productos que coinciden.
 */
export function filtrarPorNombre(listado, texto) {
    const busqueda = texto.trim().toLowerCase();

    if (busqueda === "") {
        return listado;
    }

    return listado.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda)
    );
}
