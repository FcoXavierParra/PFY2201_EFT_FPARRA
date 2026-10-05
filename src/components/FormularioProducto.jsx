/* ============================================================
   COMPONENTE FormularioProducto
   Formulario para agregar un videojuego al catálogo.

   Recibe (props):
     - catalogo: los productos actuales, para no aceptar un nombre repetido.
     - categorias: las categorías existentes, que se sugieren al escribir.
     - alAgregar: función que App entrega para sumar el juego al catálogo.

   Devuelve: la sección #agregar.

   Es el otro lado del state del catálogo: TarjetaProducto lo quita,
   este componente lo agrega. Ninguno de los dos toca el catálogo
   directamente; avisan hacia arriba por props y App decide.

   Comparte con FormularioContacto el hook useFormulario y el
   componente CampoFormulario: solo cambian los campos y las reglas.
   ============================================================ */

import { useState } from "react";

import CampoFormulario from "./CampoFormulario";
import useFormulario from "../hooks/useFormulario";
import { validarProducto } from "../utils/validacion";

const PRODUCTO_VACIO = {
    nombre: "",
    genero: "",
    precio: "",
    oferta: "",
    descripcion: "",
};

/* Los juegos agregados aquí no traen portada: se usa una genérica */
const PORTADA_GENERICA = "img/sin-portada.svg";

function FormularioProducto({ catalogo, categorias, alAgregar }) {
    /* La validación necesita el catálogo actual para detectar nombres
       repetidos, así que se le pasa una función que lo incluye */
    const formulario = useFormulario("producto", PRODUCTO_VACIO, (datos) =>
        validarProducto(datos, catalogo)
    );

    /* El nombre del último juego agregado, para el aviso de éxito.
       Hace falta guardarlo aparte porque el formulario se limpia. */
    const [ultimoAgregado, setUltimoAgregado] = useState("");

    /** Convierte los textos del formulario en un producto y lo entrega. */
    function agregar(datos) {
        const nombre = datos.nombre.trim();
        alAgregar({
            nombre,
            genero: datos.genero.trim(),
            /* Los campos llegan como texto; el catálogo guarda números */
            precio: Number(datos.precio),
            oferta: Number(datos.oferta),
            descripcion: datos.descripcion.trim(),
            imagen: PORTADA_GENERICA,
            alt: `Portada genérica para ${nombre}`,
        });
        setUltimoAgregado(nombre);
    }

    return (
        <section id="agregar" className="pt-5">
            <h2>Agregar un videojuego</h2>
            <p className="text-body-secondary">
                El juego aparece al final del catálogo. Los cambios duran
                hasta que recargues la página.
            </p>

            <div className="card">
                <div className="card-body">
                    {formulario.enviado && (
                        <div className="alert alert-success" role="status">
                            Agregamos «{ultimoAgregado}» al catálogo.{" "}
                            <a href="#catalogo">Verlo en el catálogo</a>
                        </div>
                    )}

                    <form noValidate onSubmit={formulario.manejarEnvio(agregar)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <CampoFormulario
                                    formulario={formulario}
                                    nombre="nombre"
                                    etiqueta="Nombre"
                                    type="text"
                                />
                            </div>
                            <div className="col-md-6">
                                {/* list enlaza el campo con el <datalist> de
                                    abajo: sugiere las categorías que existen,
                                    pero deja escribir una nueva. Si se escribe
                                    una nueva, aparece sola en el filtro. */}
                                <CampoFormulario
                                    formulario={formulario}
                                    nombre="genero"
                                    etiqueta="Categoría"
                                    type="text"
                                    list="producto-categorias"
                                />
                                <datalist id="producto-categorias">
                                    {categorias.map((categoria) => (
                                        <option key={categoria} value={categoria} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-6">
                                <CampoFormulario
                                    formulario={formulario}
                                    nombre="precio"
                                    etiqueta="Precio normal ($)"
                                    type="number"
                                    min="1"
                                    step="1"
                                    inputMode="numeric"
                                />
                            </div>
                            <div className="col-6">
                                <CampoFormulario
                                    formulario={formulario}
                                    nombre="oferta"
                                    etiqueta="Precio de oferta ($)"
                                    type="number"
                                    min="1"
                                    step="1"
                                    inputMode="numeric"
                                />
                            </div>
                        </div>

                        <CampoFormulario
                            formulario={formulario}
                            nombre="descripcion"
                            etiqueta="Descripción"
                            como="textarea"
                            rows="2"
                        />

                        <button type="submit" className="btn btn-primary">
                            Agregar al catálogo
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default FormularioProducto;
