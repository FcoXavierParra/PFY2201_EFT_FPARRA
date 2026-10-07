/* ============================================================
   COMPONENTE AvisoAdministracion
   Franja que avisa que el sitio está en modo administración.

   Recibe (props):
     - alSalir: función que App entrega para volver a la vista pública.

   Devuelve: el aviso, con el botón para salir.

   Existe porque en modo administración aparecen acciones que cambian
   la tienda (agregar y retirar juegos): quien las ve tiene que saber
   en qué modo está y tener la salida a mano, sin bajar hasta el pie.

   El modo NO tiene contraseña a propósito. En un sitio estático
   cualquier contraseña quedaría escrita en el JavaScript publicado y
   no protegería nada. Tampoco hace falta: los cambios viven solo en el
   navegador de quien los hace y desaparecen al recargar. El modo
   separa las dos vistas, no las protege.
   ============================================================ */

function AvisoAdministracion({ alSalir }) {
    return (
        <div
            className="alert alert-warning d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3 mb-0"
            role="status"
        >
            <span>
                <strong>Modo administración.</strong> Puedes agregar y retirar
                juegos del catálogo; los cambios duran hasta recargar la página.
            </span>
            <button type="button" className="btn btn-sm btn-outline-warning" onClick={alSalir}>
                Salir del modo administración
            </button>
        </div>
    );
}

export default AvisoAdministracion;
