/* ============================================================
   COMPONENTE TarjetaProducto
   La ficha de un producto del catálogo.

   Recibe (props):
     - producto: el objeto con nombre, precio, oferta, descripción e imagen.
     - yaEsta: true si el producto ya está en el carrito.
     - alAgregar: función que App entrega para sumar el producto al carrito.
     - alQuitarDelCarrito: función para sacarlo del carrito.
     - alRetirar: función para retirarlo del catálogo.

   Devuelve: la tarjeta completa de ese producto.

   Es el componente reutilizable por excelencia de la aplicación: se
   instancia una vez por producto con datos distintos y la misma
   estructura, también para los juegos que se agregan desde el
   formulario.

   La imagen se compone con rutaImagen(), porque desde la Semana 8 los
   SVG viven en public/ y Vite no les reescribe la ruta.
   ============================================================ */

import {
    calcularAhorro,
    esOfertaDestacada,
    formatearPrecio,
    rutaImagen,
} from "../utils/formato";

function TarjetaProducto({
    producto,
    yaEsta,
    alAgregar,
    alQuitarDelCarrito,
    alRetirar,
}) {
    /* Retirar del catálogo pide confirmación: borra el juego de la
       tienda, y sin ella un clic equivocado obligaría a recargar la
       página para recuperarlo. Quitar del carrito no la pide porque se
       deshace con un clic en "Agregar al carrito". */
    function confirmarRetiro() {
        if (window.confirm(`¿Retirar «${producto.nombre}» del catálogo?`)) {
            alRetirar(producto.id);
        }
    }

    /* Se calculan una sola vez y se usan abajo, para no repetir la
       operación dentro del JSX */
    const ahorro = calcularAhorro(producto.precio, producto.oferta);
    const destacada = esOfertaDestacada(producto.precio, producto.oferta);

    /* El catálogo vive en una columna de 8/12, así que las tarjetas pasan a
       tres por fila solo en pantallas muy anchas */
    return (
        <article className="col-12 col-sm-6 col-xxl-4">
            <div className="card h-100">
                {/* 1. IMAGEN del producto */}
                <img
                    className="card-img-top"
                    src={rutaImagen(producto.imagen)}
                    alt={producto.alt}
                    width="320"
                    height="400"
                />

                <div className="card-body d-flex flex-column">
                    {/* 2. NOMBRE del producto */}
                    <h3 className="card-title h5">{producto.nombre}</h3>

                    <p className="small text-body-secondary mb-2">
                        {producto.genero}
                    </p>

                    {/* 3. DESCRIPCIÓN corta */}
                    <p className="card-text small">{producto.descripcion}</p>

                    {/* 4 y 5. PRECIO NORMAL y PRECIO DE OFERTA.
                        El normal va tachado para que se lea de un vistazo
                        cuál de los dos es el que se paga. */}
                    <p className="mb-1 mt-auto">
                        <span className="text-body-secondary text-decoration-line-through me-2">
                            {formatearPrecio(producto.precio)}
                        </span>
                        <span className="fs-5 fw-bold text-primary">
                            {formatearPrecio(producto.oferta)}
                        </span>
                    </p>

                    {/* RENDERIZADO CONDICIONAL.
                        La etiqueta destacada aparece solo cuando el descuento
                        llega al umbral; el resto de productos muestran nada
                        más el porcentaje de ahorro. Se ve la diferencia entre
                        unas tarjetas y otras sin tocar el código. */}
                    {destacada ? (
                        <p className="mb-3">
                            <span className="badge text-bg-primary">
                                ¡Mejor precio! −{ahorro} %
                            </span>
                        </p>
                    ) : (
                        <p className="mb-3 small text-body-secondary">
                            Ahorras un {ahorro} %
                        </p>
                    )}

                    {/* RENDERIZADO CONDICIONAL + evento onClick.
                        El botón cambia de texto y de estilo cuando el producto
                        ya está en el carrito.

                        NO se deshabilita a propósito: seguir pulsando suma
                        otra unidad, que es lo que hace cualquier tienda y lo
                        que la gente espera. Lo único que cambia es lo que se
                        lee, para que de un vistazo se sepa qué hay dentro del
                        carrito sin tener que mirarlo. */}
                    <button
                        type="button"
                        className={
                            "btn w-100 " +
                            (yaEsta ? "btn-outline-primary" : "btn-primary")
                        }
                        onClick={() => alAgregar(producto.id)}
                    >
                        {yaEsta ? "En el carrito ✓" : "Agregar al carrito"}
                    </button>

                    {/* RENDERIZADO CONDICIONAL: solo si ya está en el
                        carrito tiene sentido ofrecer sacarlo de ahí. Va
                        pegado al botón de agregar porque es su contrario. */}
                    {yaEsta && (
                        <button
                            type="button"
                            className="btn btn-link btn-sm text-body-secondary mt-1"
                            onClick={() => alQuitarDelCarrito(producto.id)}
                            aria-label={`Quitar ${producto.nombre} del carrito`}
                        >
                            Quitar del carrito
                        </button>
                    )}

                    {/* Retirar del CATÁLOGO es otra cosa: no toca la compra,
                        cambia la tienda. Por eso va separado por una línea,
                        en rojo y con otro verbo. Cuando estaba como enlace
                        justo bajo "En el carrito ✓" se leía como una acción
                        del carrito, y al pulsarlo el juego desaparecía de la
                        tienda sin que nadie lo esperara.
                        El aria-label nombra el juego: "Retirar del catálogo"
                        repetido en cada tarjeta no le sirve a un lector de
                        pantalla. */}
                    <div className="border-top mt-3 pt-3 text-end">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={confirmarRetiro}
                            aria-label={`Retirar ${producto.nombre} del catálogo`}
                        >
                            Retirar del catálogo
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default TarjetaProducto;
