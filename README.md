# Nexus Play — Componentes funcionales en React

**Actividad Formativa 5 (Semana 7)** — PFY2201 Desarrollo Frontend I, Duoc UC.
"Construyendo componentes funcionales en React para un eCommerce interactivo".

El mismo e-commerce de las semanas anteriores, ahora **reconstruido con React**:
catálogo con precios de oferta, carrito de compras con contador y total, y buscador
que filtra mientras se escribe.

- **Sitio publicado:** <https://fcoxavierparra.github.io/PFY2201_S8_FPARRA/>
- **Autor:** Francisco Javier Parra

## Qué cambia respecto de la Semana 6

Hasta la Semana 6 el sitio era HTML, CSS y JavaScript con manipulación directa del DOM
(`createElement`, `appendChild`, delegación de eventos). Esta semana **se reescribe la
lógica en React**: el estado describe qué debe verse y React se encarga de pintarlo.

Se conservan el caso, los nueve productos, las portadas SVG, la identidad visual, la
barra de navegación, la sección de inicio, el filtro por categorías y el pie de página.
Se retiran el carrusel de destacados, el formulario de contacto, el modal de compra y la
carga por `fetch`: no forman parte de lo que evalúa esta actividad y habría que
reimplementarlos a mano, porque **el JavaScript de Bootstrap no convive con React** —
manipula el DOM por su cuenta y React es quien lo gobierna aquí.

El menú colapsable es el ejemplo de cómo se resuelve eso: se usa el CSS de Bootstrap
(`.collapse` oculta, `.show` muestra) y React se limita a añadir o quitar la clase
según su estado. Cero JavaScript del framework.

## Cómo ejecutarlo

Requiere **Node.js LTS** (probado con la 24.21.0) y conexión a internet, porque
Bootstrap 5.3.8 viene del CDN.

```bash
npm install     # instala las dependencias
npm run dev     # servidor de desarrollo
```

El proyecto se abre en <http://localhost:5173/PFY2201_S8_FPARRA/>. La ruta lleva el
nombre del repositorio porque así se publica en GitHub Pages: ver *Publicación*.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitio de producción en `dist/` |
| `npm run preview` | Sirve el `dist/` ya construido, para comprobarlo antes de publicar |
| `npm run deploy` | Construye y publica el `dist/` en la rama `gh-pages` |
| `npm run lint` | Revisa el código con oxlint |

## Funcionalidades

| Funcionalidad | Técnica | Dónde |
|---|---|---|
| **Listado de productos** | `.map()` sobre los datos del catálogo | Nueve tarjetas con nombre, precio normal, **precio de oferta**, descripción e imagen |
| **Agregar al carrito** | evento `onClick` | Si el producto ya está en el carrito suma una unidad en lugar de duplicar la línea |
| **Eliminar del carrito** | evento `onClick` | Quitar una unidad, eliminar la línea completa o vaciar el carrito |
| **Contador y total** | `.reduce()` sobre el estado | El contador cuenta unidades; el total suma los precios de oferta y muestra el ahorro |
| **Buscador en vivo** | evento `onChange` | Filtra el catálogo mientras se escribe, sin pulsar ningún botón |
| **Filtro por categorías** | evento `onClick` | Las categorías se calculan desde los datos, no se escriben a mano. Se combina con el buscador |
| **Menú colapsable** | evento `onClick` + estado local | La hamburguesa abre y cierra el menú en móvil, y se cierra sola al elegir una sección |
| **Renderizado condicional** | operador ternario y `&&` | Cinco estados distintos, ver abajo |

### Renderizado condicional

Cinco estados de la aplicación cambian lo que se ve en pantalla:

1. **Carrito vacío** → en lugar de una lista y un total en cero, un mensaje que indica
   qué hacer.
2. **Filtros sin coincidencias** → en lugar de una rejilla vacía, un aviso que explica
   por cuál de los dos filtros se quedó sin resultados: el texto, la categoría o ambos.
3. **Oferta destacada** → la etiqueta *"¡Mejor precio!"* aparece solo en los productos
   cuyo descuento llega al 30 %; el resto muestra el porcentaje de ahorro en texto.
4. **Categoría activa** → su botón se pinta con el color de marca y los demás quedan en
   contorno.
5. **Menú desplegado** → la clase `show` se añade solo cuando el estado lo pide.

## Estructura

```
├── index.html                  Plantilla base: carga Bootstrap y monta React
├── vite.config.js              Configuración de Vite, con la ruta base de Pages
├── package.json
├── capturas/                   Evidencias de las funcionalidades
└── src/
    ├── main.jsx                Punto de entrada: monta <App /> en el DOM
    ├── App.jsx                 Estado de la aplicación y reparto por props
    ├── index.css               Capa de estilo propio sobre Bootstrap 5
    ├── data/productos.js       Los nueve productos, con precio y oferta
    ├── utils/formato.js        Funciones reutilizables de formato y filtrado
    ├── assets/img/              Portadas SVG y logotipo
    └── components/
        ├── Encabezado.jsx       Barra de navegación, buscador y contador
        ├── Buscador.jsx         Campo de búsqueda (onChange)
        ├── Inicio.jsx           Presentación de la tienda
        ├── FiltroCategorias.jsx Botones de categoría (onClick)
        ├── ListaProductos.jsx   Rejilla del catálogo
        ├── TarjetaProducto.jsx  Ficha de un producto
        ├── Carrito.jsx          Sección del carrito
        ├── LineaCarrito.jsx     Una línea del carrito
        ├── TotalCarrito.jsx     Unidades, ahorro y total
        └── PieDePagina.jsx      Contacto y redes
```

### Dónde vive el estado

El estado que comparten varios componentes está en `App.jsx` y baja por props:

```js
const [carrito, setCarrito]     = useState([]);      // { id, cantidad }
const [busqueda, setBusqueda]   = useState("");      // texto del buscador
const [categoria, setCategoria] = useState("Todas"); // filtro de categoría
```

Está ahí y no repartido porque el contador lo pinta el encabezado, las líneas las pinta
el carrito y quien agrega productos es una tarjeta del catálogo: tres ramas distintas
del árbol leyendo el mismo dato, así que el dato vive en el ancestro común.

Lo contrario también vale: **el menú desplegable guarda su estado dentro de
`Encabezado`**, porque no le importa a ningún otro componente. La regla es que el estado
sube solo hasta donde hace falta compartirlo.

El listado filtrado y las líneas del carrito **no son estado**: se derivan en cada
renderizado a partir de `carrito`, `busqueda`, `categoria` y el catálogo. Guardarlos en
su propio `useState` obligaría a mantenerlos sincronizados a mano.

## Publicación

El sitio se sirve desde `https://fcoxavierparra.github.io/PFY2201_S8_FPARRA/`, que es
un subdirectorio y no la raíz del dominio. Por eso `vite.config.js` declara:

```js
base: '/PFY2201_S8_FPARRA/'
```

Sin esa línea el sitio publicado pide sus archivos en `/assets/...` y sale en blanco.
Por la misma razón **las imágenes se importan** en lugar de referenciarse por ruta: así
Vite les reescribe la URL durante la construcción y respetan la ruta base.

En la rama `gh-pages` va el contenido de `dist/`, no el código fuente. `npm run deploy`
hace las dos cosas.

## Créditos

Las portadas y el logotipo son SVG propios, creados para este proyecto.
Bootstrap 5.3.8 se carga desde jsDelivr. React 19 y Vite 8 se instalan con npm.
