/* ============================================================
   COMPONENTE PieDePagina
   Información de cierre del sitio: contacto y redes sociales.

   No recibe props: su contenido es fijo.
   Devuelve: el <footer> del sitio.

   Los textos vienen de la Semana 6 sin cambios. Se mantiene <address>,
   que es la etiqueta semántica para datos de contacto, y el pie
   contiene solo información de cierre: la retroalimentación de la
   Semana 1 avisó de no alojar aquí secciones completas de contenido.
   ============================================================ */

function PieDePagina() {
    return (
        <footer id="pie" className="border-top border-3 border-primary py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-6">
                        <h2 className="h6">Visítanos</h2>
                        <address className="mb-0 text-body-secondary">
                            Avenida Providencia 1234, Santiago, Chile
                            <br />
                            Teléfono:{" "}
                            <a href="tel:+56221234567">+56 2 2123 4567</a>
                            <br />
                            Correo:{" "}
                            <a href="mailto:contacto@nexusplay.cl">
                                contacto@nexusplay.cl
                            </a>
                        </address>
                    </div>

                    <div className="col-md-6">
                        <h2 className="h6">Síguenos</h2>
                        {/* Enlaces externos: pestaña nueva y rel="noopener
                            noreferrer" como medida de seguridad */}
                        <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
                            <li>
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    YouTube
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://discord.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 border-top border-secondary pt-3 text-center">
                        <p className="mb-0 small text-body-secondary">
                            Copyright &copy; 2026 Nexus Play. Todos los derechos
                            reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default PieDePagina;
