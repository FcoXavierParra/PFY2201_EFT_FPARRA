/* ============================================================
   COMPONENTE Inicio
   Presentación de la tienda: el primer bloque de la página.

   Recibe (props):
     - totalProductos: cuántos juegos hay en el catálogo.
     - ahorroMaximo: el mayor descuento disponible, en porcentaje.

   Devuelve: la sección de bienvenida.

   Los dos datos llegan calculados desde App en lugar de escritos a
   mano en el texto: si cambia el catálogo, la presentación no se
   queda mintiendo.

   Desde la Semana 8 el catálogo llega por fetch, así que durante el
   primer instante ambos valen cero. Por eso la frase con las cifras
   es renderizado condicional: aparece cuando hay datos que contar.
   ============================================================ */

function Inicio({ totalProductos, ahorroMaximo }) {
    const hayCatalogo = totalProductos > 0;

    return (
        <section id="inicio" className="py-4 py-lg-5">
            <h1>Nexus Play</h1>

            <p className="lead mb-2">
                Tu tienda de videojuegos: acción, aventura, RPG, deportes y
                estrategia.
            </p>

            {hayCatalogo ? (
                <p className="text-body-secondary mb-0">
                    {totalProductos} títulos en catálogo, todos con precio
                    rebajado y descuentos de hasta un {ahorroMaximo} %. Agrega
                    al carrito lo que quieras: el total se calcula solo.
                </p>
            ) : (
                <p className="text-body-secondary mb-0">
                    Catálogo con precios rebajados. Agrega al carrito lo que
                    quieras: el total se calcula solo.
                </p>
            )}
        </section>
    );
}

export default Inicio;
