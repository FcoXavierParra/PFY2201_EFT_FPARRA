/* ============================================================
   COMPONENTE CampoFormulario
   Un campo de formulario con su etiqueta y su mensaje de error.

   Recibe (props):
     - formulario: lo que devuelve useFormulario (errores y propsDeCampo).
     - nombre: el campo, tal como se llama en los datos del formulario.
     - etiqueta: el texto visible de la etiqueta.
     - como: "input" (por defecto) o "textarea".
     - el resto (type, rows, autoComplete...) pasa tal cual al control.

   Devuelve: el bloque etiqueta + control + error.

   Lo usan los tres formularios del sitio. Sin él, cada campo repetiría
   las mismas doce líneas de etiqueta, control y error; con él, un campo
   es una línea que dice solo lo que lo hace distinto.
   ============================================================ */

function CampoFormulario({ formulario, nombre, etiqueta, como = "input", ...resto }) {
    const control = formulario.propsDeCampo(nombre);
    const error = formulario.errores[nombre];

    /* Una variable con mayúscula inicial se puede usar como etiqueta
       JSX: así el mismo componente pinta un <input> o un <textarea> */
    const Control = como;

    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={control.id}>
                {etiqueta}
            </label>

            <Control {...resto} {...control} />

            {/* RENDERIZADO CONDICIONAL: el mensaje solo existe si hay
                error. invalid-feedback es de Bootstrap y se ve porque el
                control lleva is-invalid. Su id es el que el control cita
                en aria-describedby, para que el lector de pantalla lo lea. */}
            {error && (
                <div id={control["aria-describedby"]} className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
}

export default CampoFormulario;
