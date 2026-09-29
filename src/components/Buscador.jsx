/* ============================================================
   COMPONENTE Buscador
   Campo de búsqueda que filtra el catálogo MIENTRAS se escribe.

   Recibe (props):
     - busqueda: el texto actual, que vive en el estado de App.
     - alBuscar: función que App entrega para actualizar ese texto.

   Devuelve: el formulario de búsqueda.

   Es un componente controlado: no guarda el texto por su cuenta, lo
   lee de las props y avisa hacia arriba en cada pulsación. Así el
   valor que se ve en pantalla y el que usa el filtro son siempre el
   mismo dato, y no dos copias que puedan desincronizarse.

   Aquí vive el evento onChange que pide el criterio 4 de la pauta.
   ============================================================ */

function Buscador({ busqueda, alBuscar }) {
    return (
        <form
            className="d-flex flex-grow-1"
            role="search"
            /* El formulario no envía nada: el filtrado ocurre al escribir.
               Se frena el submit para que pulsar Enter no recargue la página. */
            onSubmit={(evento) => evento.preventDefault()}
        >
            <label className="visually-hidden" htmlFor="campoBusqueda">
                Buscar un videojuego
            </label>

            <input
                id="campoBusqueda"
                className="form-control form-control-sm"
                type="search"
                placeholder="Buscar un juego"
                value={busqueda}
                /* onChange se dispara en cada tecla: el listado se filtra
                   sin que haya que pulsar ningún botón */
                onChange={(evento) => alBuscar(evento.target.value)}
            />
        </form>
    );
}

export default Buscador;
