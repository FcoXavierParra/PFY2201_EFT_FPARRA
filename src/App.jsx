/* ============================================================
   COMPONENTE App — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Sumativa 3 (Semana 8)

   Componente raíz. Aquí vive el estado que comparten varios
   componentes y desde aquí baja por props.

   Por qué está aquí y no repartido: el contador del carrito lo pinta
   el encabezado, las líneas las pinta la sección del carrito y quien
   agrega productos es una tarjeta del catálogo. Son tres ramas
   distintas del árbol leyendo el mismo dato, así que el dato tiene que
   vivir en el ancestro común. Es el patrón que React llama "levantar
   el estado".

   Lo contrario también vale: el menú desplegable del encabezado guarda
   su estado dentro de Encabezado, porque no le importa a nadie más.

   NOVEDAD DE LA SEMANA 8: el catálogo ya no se importa como módulo.
   Ahora es estado, y lo llena un useEffect que lo pide por fetch a un
   archivo JSON externo. De ahí salen también los estados de carga y
   de error.
   ============================================================ */

import { useEffect, useState } from "react";

import Buscador from "./components/Buscador";
import Carrito from "./components/Carrito";
import Encabezado from "./components/Encabezado";
import FiltroCategorias from "./components/FiltroCategorias";
import Inicio from "./components/Inicio";
import ListaProductos from "./components/ListaProductos";
import PieDePagina from "./components/PieDePagina";
import {
    calcularAhorro,
    filtrarPorCategoria,
    filtrarPorNombre,
    obtenerCategorias,
    TODAS_LAS_CATEGORIAS,
    URL_DATOS,
} from "./utils/formato";

function App() {
    /* ---------- Estado con useState ---------- */

    /* EL CATÁLOGO. Arranca vacío y lo llena el useEffect de abajo.
       En la Semana 7 esto era un import: un dato fijo, conocido al
       compilar. Ahora es estado, porque llega después y puede fallar. */
    const [productos, setProductos] = useState([]);

    /* Mientras el fetch está en vuelo. Empieza en true: la aplicación
       nace cargando, no vacía. Si empezara en false, se vería un
       instante el mensaje de "no hay juegos" antes de los datos. */
    const [cargando, setCargando] = useState(true);

    /* Mensaje de error si la carga falla. null cuando todo va bien. */
    const [error, setError] = useState(null);

    /* El carrito guarda solo id y cantidad, no el producto entero.
       Duplicar aquí los datos del catálogo obligaría a mantener dos
       copias sincronizadas de la misma información. */
    const [carrito, setCarrito] = useState([]);

    /* El texto del buscador */
    const [busqueda, setBusqueda] = useState("");

    /* La categoría elegida en el filtro */
    const [categoria, setCategoria] = useState(TODAS_LAS_CATEGORIAS);

    /* ---------- Efecto: cargar el catálogo ----------

       useEffect con [] como segundo argumento se ejecuta UNA vez, justo
       después del primer renderizado. Es el lugar donde React espera
       los efectos secundarios: pedir datos, suscribirse a algo, tocar
       el exterior. Hacerlo durante el renderizado sería un error,
       porque el renderizado tiene que ser una función pura.

       La guarda "cancelado" existe porque en desarrollo StrictMode
       monta el componente, lo desmonta y lo vuelve a montar para
       destapar efectos mal escritos. Sin ella, la respuesta del primer
       fetch intentaría actualizar un componente ya desmontado. */
    useEffect(() => {
        let cancelado = false;

        fetch(URL_DATOS)
            .then((respuesta) => {
                /* Un 404 NO hace que fetch falle: hay que mirar el
                   estado a mano antes de intentar leer el JSON. */
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
                /* Mensaje amigable para la pantalla; el detalle técnico
                   queda en la consola, que es donde sirve. */
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

    /* ---------- Valores derivados ----------
       Estos NO son estado: se recalculan en cada renderizado a partir
       del estado. Guardarlos en su propio useState es el error clásico,
       porque entonces hay que acordarse de actualizarlos a mano y tarde
       o temprano se desincronizan. */

    /* Las categorías salen de los productos, así que ahora se calculan
       en cada renderizado: hasta que el fetch responde, no se conocen. */
    const categorias = obtenerCategorias(productos);

    /* El mayor descuento del catálogo, para la presentación de portada.
       Math.max() sin argumentos devuelve -Infinity, de ahí la guarda. */
    const ahorroMaximo =
        productos.length > 0
            ? Math.max(...productos.map((p) => calcularAhorro(p.precio, p.oferta)))
            : 0;

    /* Los dos filtros se encadenan: primero la categoría, luego el
       texto. El orden da igual para el resultado, pero encadenarlos
       así deja claro que ambos se aplican a la vez. */
    const productosVisibles = filtrarPorNombre(
        filtrarPorCategoria(productos, categoria),
        busqueda
    );

    /* El carrito resuelto: cada línea con su producto completo al lado */
    const lineasCarrito = carrito.map((linea) => ({
        producto: productos.find((p) => p.id === linea.id),
        cantidad: linea.cantidad,
    }));

    /* Total de unidades, para el contador del encabezado */
    const unidades = carrito.reduce((suma, linea) => suma + linea.cantidad, 0);

    /* Los ids que ya están en el carrito. TarjetaProducto lo usa para
       decidir si su botón dice "Agregar al carrito" o "En el carrito". */
    const idsEnCarrito = carrito.map((linea) => linea.id);

    /* ---------- Acciones sobre el carrito ---------- */

    /**
     * Agrega un producto al carrito. Si ya estaba, suma una unidad a su
     * línea en lugar de crear una línea repetida.
     * @param {number} id - Identificador del producto.
     */
    function agregarAlCarrito(id) {
        setCarrito((actual) => {
            const existente = actual.find((linea) => linea.id === id);

            if (existente) {
                return actual.map((linea) =>
                    linea.id === id
                        ? { ...linea, cantidad: linea.cantidad + 1 }
                        : linea
                );
            }

            return [...actual, { id, cantidad: 1 }];
        });
    }

    /**
     * Quita una unidad de un producto. No baja de uno: para dejarlo en
     * cero está el botón de eliminar, que es más claro para el usuario.
     * @param {number} id - Identificador del producto.
     */
    function quitarUnaUnidad(id) {
        setCarrito((actual) =>
            actual.map((linea) =>
                linea.id === id && linea.cantidad > 1
                    ? { ...linea, cantidad: linea.cantidad - 1 }
                    : linea
            )
        );
    }

    /**
     * Elimina del carrito la línea completa de un producto.
     * @param {number} id - Identificador del producto.
     */
    function eliminarDelCarrito(id) {
        setCarrito((actual) => actual.filter((linea) => linea.id !== id));
    }

    /** Deja el carrito vacío. */
    function vaciarCarrito() {
        setCarrito([]);
    }

    /* ---------- Interfaz ---------- */

    return (
        <>
            <Encabezado unidades={unidades}>
                <Buscador busqueda={busqueda} alBuscar={setBusqueda} />
            </Encabezado>

            {/* El catálogo y el carrito van lado a lado desde 992 px, con el
                carrito fijo al hacer scroll. Puestos uno debajo del otro, el
                carrito quedaba a nueve tarjetas de distancia y la tienda
                parecía solo un catálogo. Por debajo de 992 px se apilan, y
                para llegar al carrito está el enlace del encabezado. */}
            <main className="container pb-4">
                <Inicio
                    totalProductos={productos.length}
                    ahorroMaximo={ahorroMaximo}
                />

                <div className="row g-4">
                    <div className="col-lg-8">
                        {/* El filtro no tiene sentido hasta que hay catálogo:
                            mientras carga o si falló, no se muestra */}
                        {!cargando && !error && (
                            <FiltroCategorias
                                categorias={categorias}
                                seleccionada={categoria}
                                alSeleccionar={setCategoria}
                            />
                        )}

                        <ListaProductos
                            productos={productosVisibles}
                            busqueda={busqueda}
                            categoria={categoria}
                            cargando={cargando}
                            error={error}
                            idsEnCarrito={idsEnCarrito}
                            alAgregar={agregarAlCarrito}
                        />
                    </div>

                    <aside className="col-lg-4">
                        <Carrito
                            lineas={lineasCarrito}
                            alQuitar={quitarUnaUnidad}
                            alEliminar={eliminarDelCarrito}
                            alVaciar={vaciarCarrito}
                        />
                    </aside>
                </div>
            </main>

            <PieDePagina />
        </>
    );
}

export default App;
