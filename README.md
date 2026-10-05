# Nexus Play — Hooks y carga dinámica en React

**Actividad Sumativa 3 (Semana 8)** — PFY2201 Desarrollo Frontend I, Duoc UC.
"Mejorando funcionalidades clave en el eCommerce con React".

El mismo e-commerce de las semanas anteriores, ahora con el **catálogo cargado
dinámicamente** desde un archivo JSON externo mediante `useEffect`, siete estados
gestionados con `useState`, un **hook propio** que encapsula la carga, y ocho situaciones
resueltas con renderizado condicional.

- **Sitio publicado:** <https://fcoxavierparra.github.io/PFY2201_EFT_FPARRA/>
- **Autor:** Francisco Javier Parra

## Qué cambia respecto de la Semana 7

En la Semana 7 el catálogo era un módulo de JavaScript que se importaba: un dato fijo,
conocido al compilar y siempre disponible.

**Esta semana el catálogo llega de fuera.** Eso lo convierte en tres cosas a la vez:

- un **estado**, porque cambia después del primer renderizado;
- un **efecto secundario**, porque pedirlo es una acción sobre el exterior que no puede
  ocurrir durante el renderizado;
- y **algo que puede fallar**, porque la red no siempre responde.

De ahí salen los tres estados nuevos (`productos`, `cargando`, `error`) y las dos vistas
nuevas de la aplicación.

También se añade el botón que cambia de texto: cuando un producto ya está en el carrito,
su botón pasa de *"Agregar al carrito"* a *"En el carrito ✓"*.

## Cómo ejecutarlo

Requiere **Node.js LTS** (probado con la 24.21.0). Una vez instaladas las dependencias,
el sitio **no necesita conexión para verse bien**: Bootstrap se instala con npm y viaja
dentro del proyecto, no viene de ningún CDN.

```bash
npm install     # instala las dependencias
npm run dev     # servidor de desarrollo
```

El proyecto se abre en <http://localhost:5173/PFY2201_EFT_FPARRA/>. La ruta lleva el
nombre del repositorio porque así se publica en GitHub Pages: ver *Publicación*.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitio de producción en `dist/` |
| `npm run preview` | Sirve el `dist/` ya construido, para comprobarlo antes de publicar |
| `npm run deploy` | Construye y publica el `dist/` en la rama `gh-pages` |
| `npm run lint` | Revisa el código con oxlint |

## Los hooks

### `useState` — siete estados, en tres lugares distintos

**Tres viven en el hook `useProductos`**, porque todos describen lo mismo: cómo va la
obtención del catálogo.

```js
const [productos, setProductos] = useState([]);       // el catálogo
const [cargando, setCargando]   = useState(true);     // el fetch en vuelo
const [error, setError]         = useState(null);     // si la carga falla
```

**Tres viven en `App.jsx`** y bajan por props, porque los leen varias ramas del árbol:

```js
const [carrito, setCarrito]     = useState([]);       // { id, cantidad }
const [busqueda, setBusqueda]   = useState("");       // texto del buscador
const [categoria, setCategoria] = useState("Todas");  // filtro por género
```

**Y uno vive dentro de `Encabezado`**: `menuAbierto`, porque no le importa a ningún otro
componente.

La regla es que el estado sube solo hasta donde hace falta compartirlo — y, cuando un
grupo de estados describe un mismo trabajo, se saca a un hook.

`cargando` empieza en `true`: la aplicación nace cargando, no vacía. Si empezara en
`false` se vería un instante el mensaje de "no hay juegos" antes de llegar los datos.

**Lo que NO es estado.** El listado filtrado, las líneas del carrito, las categorías, el
contador y los totales se **derivan** en cada renderizado a partir del estado. Guardarlos
en su propio `useState` obligaría a mantenerlos sincronizados a mano, y tarde o temprano
se desincronizan.

### `useProductos` — el hook propio

Toda la obtención del catálogo —los tres estados y el efecto— vive en
`src/hooks/useProductos.js`. `App` lo consume en una línea:

```js
const { productos, cargando, error } = useProductos();
```

**Por qué sacarlo de `App`.** `App` hacía dos trabajos que no tienen nada que ver entre
sí: conseguir el catálogo y gestionar el carrito. Separados, `App` se lee como *qué* hace
la aplicación y el hook guarda *cómo* llegan los datos. Si mañana el catálogo viniera de
una API con autenticación, o hubiera que reintentar, o cachear, se cambiaría dentro del
hook y `App` no se enteraría: sigue recibiendo los mismos tres valores.

**Qué lo convierte en un hook** y no en una función normal: que llama a otros hooks
(`useState` y `useEffect`). Esa es la única diferencia. Su nombre empieza por `use` porque
es la convención que permite a React y al linter comprobar que se respetan las reglas de
los hooks — llamarse siempre en el nivel superior, nunca dentro de un `if` ni de un bucle.

**Devuelve un objeto y no un arreglo** a propósito. `useState` devuelve un arreglo porque
solo trae dos cosas y quien lo usa les pone nombre al desestructurar. Aquí son tres y
siempre se llaman igual, así que un objeto evita tener que recordar el orden.

### `useEffect` — cargar el catálogo

Dentro del hook:

```js
useEffect(() => {
    let cancelado = false;

    fetch(URL_DATOS)
        .then((respuesta) => {
            if (!respuesta.ok) throw new Error(`El servidor respondió ${respuesta.status}`);
            return respuesta.json();
        })
        .then((datos) => { if (!cancelado) { setProductos(datos.productos); setCargando(false); } })
        .catch((fallo) => { if (!cancelado) { /* mensaje amigable + setCargando(false) */ } });

    return () => { cancelado = true; };
}, []);
```

Tres decisiones que conviene explicar:

**`[]` como segundo argumento** hace que el efecto corra una sola vez, justo después del
primer renderizado. Sin el arreglo correría en cada renderizado, y como el efecto cambia
el estado, eso sería un bucle infinito.

**`response.ok` antes del `.json()`**, porque un 404 **no** hace que `fetch` falle: la
promesa se resuelve igual y `.json()` reventaría intentando leer una página de error. Hay
que mirar el estado a mano.

**La guarda `cancelado`** existe porque en desarrollo React monta el componente, lo
desmonta y lo vuelve a montar para destapar efectos mal escritos. Sin ella, la respuesta
del primer `fetch` intentaría actualizar un componente que ya no está.

### Renderizado condicional — ocho situaciones

| # | Estado | Qué se ve |
|---|---|---|
| 1 | **Cargando** | Aviso con spinner en lugar de la rejilla |
| 2 | **Error de carga** | Mensaje amigable; el encabezado, el carrito y el pie siguen en pie |
| 3 | **Producto ya en el carrito** | El botón dice "En el carrito ✓" y cambia a estilo de contorno |
| 4 | Carrito vacío | "Tu carrito está vacío. Agrega un juego del catálogo para empezar." |
| 5 | Filtros sin coincidencias | Aviso que dice por cuál de los dos filtros se quedó vacío |
| 6 | Oferta destacada | "¡Mejor precio!" solo en los productos con 30 % o más de descuento |
| 7 | Categoría activa | Su botón pintado con el color de marca; los demás en contorno |
| 8 | Menú desplegado | La clase `show` se añade solo cuando el estado lo pide |

`ListaProductos` concentra las cuatro primeras vistas y decide entre ellas con *returns*
tempranos, que se leen mejor que tres ternarios anidados dentro del JSX.

**El botón no se deshabilita** cuando el producto ya está en el carrito. Seguir pulsando
suma otra unidad, que es lo que hace cualquier tienda. Lo único que cambia es lo que se
lee, para saber de un vistazo qué hay dentro del carrito sin tener que abrirlo.

## Funcionalidades

| Funcionalidad | Técnica | Dónde |
|---|---|---|
| **Catálogo dinámico** | `useEffect` + `fetch` | Nueve productos desde `public/data/productos.json`, con nombre, precio normal, precio de oferta, descripción e imagen |
| **Agregar al carrito** | evento `onClick` | Si el producto ya está, suma una unidad en lugar de duplicar la línea |
| **Eliminar del carrito** | evento `onClick` | Quitar una unidad, eliminar la línea completa o vaciar el carrito |
| **Contador y total** | `.reduce()` sobre el estado | El contador cuenta unidades; el total suma los precios de oferta y muestra el ahorro |
| **Buscador en vivo** | evento `onChange` | Filtra mientras se escribe, sin pulsar ningún botón |
| **Filtro por categorías** | evento `onClick` | Las categorías se calculan desde los datos. Se combina con el buscador |
| **Menú colapsable** | evento `onClick` + estado local | Se cierra solo al elegir una sección |

## Estructura

```
├── index.html                  Plantilla base: carga Bootstrap y monta React
├── vite.config.js              Configuración de Vite, con la ruta base de Pages
├── package.json
├── capturas/                   Evidencias de las funcionalidades
├── public/                     Se copia tal cual al build, sin pasar por Vite
│   ├── data/productos.json     La fuente de datos del catálogo
│   ├── img/                    Portadas SVG y logotipo
│   └── favicon.svg
└── src/
    ├── main.jsx                Punto de entrada: monta <App /> en el DOM
    ├── App.jsx                 Estado, efecto de carga y reparto por props
    ├── index.css               Capa de estilo propio sobre Bootstrap 5
    ├── hooks/useProductos.js   Hook propio: carga del catálogo y sus estados
    ├── utils/formato.js        Funciones reutilizables: rutas, formato y filtros
    └── components/
        ├── Encabezado.jsx      Barra de navegación, buscador y contador
        ├── Buscador.jsx        Campo de búsqueda (onChange)
        ├── Inicio.jsx          Presentación de la tienda
        ├── FiltroCategorias.jsx Botones de categoría (onClick)
        ├── ListaProductos.jsx  Rejilla del catálogo y sus cuatro vistas
        ├── TarjetaProducto.jsx Ficha de un producto
        ├── Carrito.jsx         Sección del carrito
        ├── LineaCarrito.jsx    Una línea del carrito
        ├── TotalCarrito.jsx    Unidades, ahorro y total
        └── PieDePagina.jsx     Contacto y redes
```

## Publicación

El sitio se sirve desde `https://fcoxavierparra.github.io/PFY2201_EFT_FPARRA/`, que es un
subdirectorio y no la raíz del dominio. Por eso `vite.config.js` declara:

```js
base: '/PFY2201_EFT_FPARRA/'
```

**Y por eso el JSON y las imágenes se piden con la base delante.** Vite reescribe las
rutas de lo que se importa desde `src/`, pero **no toca lo que vive en `public/`**: lo
copia tal cual. Así que la ruta se compone a mano:

```js
export const URL_DATOS = import.meta.env.BASE_URL + "data/productos.json";
export function rutaImagen(archivo) { return import.meta.env.BASE_URL + archivo; }
```

Escribir `/data/productos.json` a pelo funciona en local y **da 404 al publicar**. Y a
diferencia de la ruta base del bundle, este fallo no avisa con una página en blanco:
avisa con el catálogo vacío y el mensaje de error, que es más fácil de confundir con un
fallo del propio código.

En la rama `gh-pages` va el contenido de `dist/`, no el código fuente. `npm run deploy`
hace las dos cosas. Pages se activa a mano en Settings → Pages.

## Por qué un JSON local y no una API externa

La guía de la semana enseña la API de RAWG, que exige registrarse y usar una *API key*.
Aquí se usa un archivo JSON propio, por tres razones:

1. **RAWG no tiene precios.** Devuelve nombre, géneros, plataformas, fecha y valoración,
   pero el carrito necesita `precio` y `oferta` para calcular el total.
2. **Sería una dependencia externa en tiempo de ejecución.** Si la API está caída o su
   cuota agotada, el catálogo aparece vacío para quien visite el sitio.
3. **La clave quedaría publicada.** En un sitio estático el navegador es quien llama a la
   API, así que la clave viaja dentro del JavaScript que se sirve. Los *secrets* de GitHub
   la sacan del código fuente, pero no del *bundle* publicado.

Las instrucciones lo contemplan: *"puede ser un archivo JSON local o una API pública
sencilla"*.

## Créditos

Las portadas y el logotipo son SVG propios, creados para este proyecto.
React 19, Vite 8 y Bootstrap 5.3.8 se instalan con npm.
