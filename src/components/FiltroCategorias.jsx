/* ============================================================
   COMPONENTE FiltroCategorias
   Botones para filtrar el catálogo por género.

   Recibe (props):
     - categorias: las categorías disponibles, "Todas" incluida.
     - seleccionada: la categoría activa ahora mismo.
     - alSeleccionar: función que App entrega para cambiarla.

   Devuelve: la sección de categorías.

   No decide qué productos se ven: solo avisa de qué botón se pulsó.
   El filtrado ocurre en App, que es donde vive el estado. Así este
   componente sirve igual aunque cambie la forma de filtrar.

   Aporta un segundo evento onClick al criterio 4 y un renderizado
   condicional al 5: el botón activo se pinta distinto del resto.
   ============================================================ */

function FiltroCategorias({ categorias, seleccionada, alSeleccionar }) {
    return (
        <section id="categorias" className="pb-2">
            <h2 className="h5">Categorías</h2>

            <div
                className="d-flex flex-wrap gap-2 mt-3"
                role="group"
                aria-label="Filtrar el catálogo por categoría"
            >
                {categorias.map((categoria) => {
                    /* Renderizado condicional: la categoría activa lleva el
                       color de marca y las demás quedan en contorno */
                    const activa = categoria === seleccionada;

                    return (
                        <button
                            key={categoria}
                            type="button"
                            className={
                                "btn btn-sm " +
                                (activa ? "btn-primary" : "btn-outline-secondary")
                            }
                            /* aria-pressed comunica el estado del botón a los
                               lectores de pantalla, que no ven el color */
                            aria-pressed={activa}
                            onClick={() => alSeleccionar(categoria)}
                        >
                            {categoria}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default FiltroCategorias;
