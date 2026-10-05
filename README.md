# Nexus Play — Tienda de videojuegos en React

**Evaluación Final Transversal (Semana 9)** — PFY2201 Desarrollo Frontend I, Duoc UC.

Sitio web de una tienda de videojuegos online. Muestra un catálogo en tarjetas, permite
filtrarlo por categoría y por nombre, gestionar un carrito, agregar y quitar videojuegos
del catálogo, y escribirle al administrador con un formulario de contacto validado.

Está construido con **HTML5, CSS3, JavaScript, Bootstrap 5 y React**.

- **Sitio publicado:** <https://fcoxavierparra.github.io/PFY2201_EFT_FPARRA/>
- **Repositorio:** <https://github.com/FcoXavierParra/PFY2201_EFT_FPARRA>
- **Autor:** Francisco Javier Parra

> **¿Solo quieres verlo funcionar?** Abre el sitio publicado: no hay que instalar nada.
> Las instrucciones de abajo son para ejecutarlo en tu equipo.

---

## Instalación

### Requisitos

- **Node.js LTS**, versión 20 o superior (probado con la 24.21.0). Incluye `npm`.
  Se descarga de <https://nodejs.org>. Para comprobar que está instalado:

  ```bash
  node -v
  npm -v
  ```

- Un navegador actual: Chrome, Edge, Firefox o Safari.

### Pasos

1. **Obtén el proyecto**, de una de estas dos formas:

   ```bash
   # Opción A: clonar el repositorio
   git clone https://github.com/FcoXavierParra/PFY2201_EFT_FPARRA.git
   cd PFY2201_EFT_FPARRA
   ```

   *Opción B:* descomprimir el ZIP entregado y abrir una terminal **dentro de la carpeta
   que contiene `package.json`**.

2. **Instala las dependencias** (React, Vite, Bootstrap). Crea la carpeta
   `node_modules/`; tarda menos de un minuto:

   ```bash
   npm install
   ```

3. **Arranca el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abre en el navegador** la dirección que muestra la terminal:
   <http://localhost:5173/PFY2201_EFT_FPARRA/>

   La ruta lleva el nombre del repositorio porque así se publica en GitHub Pages; ver
   [Publicación](#publicación).

Para detener el servidor, `Ctrl + C` en la terminal.

> **No abras `index.html` con doble clic.** El catálogo se carga con `fetch` desde un
> archivo JSON, y los navegadores bloquean esas peticiones en páginas abiertas como
> archivo (`file://`). El sitio tiene que servirse por HTTP: con `npm run dev`, con
> `npm run preview` o desde el sitio publicado.

### Todos los comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias. Solo la primera vez |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitio de producción en `dist/` |
| `npm run preview` | Sirve el `dist/` ya construido, para comprobarlo antes de publicar |
| `npm run deploy` | Construye y publica el `dist/` en la rama `gh-pages` |
| `npm run lint` | Revisa el código con oxlint |

---

## Uso

El sitio es una sola página. La barra de navegación lleva a cada sección; en el
teléfono se despliega con el botón ☰ y se cierra sola al elegir una sección.

| Sección | Qué se puede hacer |
|---|---|
| **Inicio** | Presentación de la tienda, con el número de juegos y el mayor descuento del catálogo |
| **Categorías** | Pulsar una categoría muestra solo sus juegos. "Todas" vuelve al catálogo completo |
| **Buscador** (en la barra) | Filtra por nombre **mientras se escribe**. Se combina con la categoría elegida |
| **Catálogo** | Cada tarjeta muestra imagen, nombre, categoría, descripción, precio normal y de oferta |
| **Carrito** | Ver los productos agregados, cambiar cantidades, eliminar una línea o vaciarlo |
| **Agregar un videojuego** | Sumar un juego nuevo al catálogo |
| **Contacto** | Escribirle al administrador del sitio |

### Comprar

1. En una tarjeta, pulsa **Agregar al carrito**. El botón pasa a decir **En el carrito ✓**
   y el contador de la barra suma uno.
2. Pulsarlo otra vez suma otra unidad.
3. En el carrito, **−** quita una unidad, **Eliminar** quita la línea y **Vaciar carrito**
   lo deja vacío. El total y el ahorro se recalculan solos.

En pantallas anchas el carrito queda fijo a la derecha del catálogo; en el teléfono va
debajo, y se llega a él con el botón del carrito de la barra.

### Agregar y quitar videojuegos

- **Agregar:** completa el formulario *Agregar un videojuego*. La categoría sugiere las
  que existen, pero se puede escribir una nueva: aparecerá sola en el filtro. El juego
  se suma al final del catálogo con una portada genérica.
- **Quitar:** pulsa **Quitar del catálogo** en su tarjeta. Si estaba en el carrito, sale
  también de ahí.

Los cambios duran **hasta recargar la página**: el sitio es estático y no tiene dónde
guardarlos. Al recargar vuelve el catálogo original.

### Contactar

Completa nombre, correo y mensaje y pulsa **Enviar mensaje**. El sitio no tiene
servidor, así que un envío correcto se confirma en pantalla y el formulario se limpia.

### Mensajes de validación

Los dos formularios se validan **al enviar**. Cada campo con un problema se marca en
rojo con su mensaje debajo, y el mensaje desaparece en cuanto se corrige.

| Formulario | Campo | Regla |
|---|---|---|
| Contacto | Nombre | Obligatorio |
| | Correo | Obligatorio y con formato `nombre@dominio.ext` |
| | Mensaje | Al menos 10 caracteres |
| Agregar videojuego | Nombre | Obligatorio y no repetido en el catálogo (sin distinguir mayúsculas) |
| | Categoría | Obligatoria |
| | Precio normal y de oferta | Números enteros mayores que cero, sin puntos |
| | Precio de oferta | No mayor que el precio normal |
| | Descripción | Al menos 10 caracteres |

---

## Cómo cumple los requerimientos del caso

| Requerimiento | Dónde |
|---|---|
| Etiquetas semánticas | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address` |
| Flexbox o CSS Grid | **CSS Grid propio** en `.contacto-grid` (`index.css` §5); Flexbox con las utilidades `d-flex` de Bootstrap en barra, tarjetas y carrito |
| Bootstrap 5: navbar, tarjetas, formularios | `Encabezado`, `TarjetaProducto`, `FormularioContacto`, `FormularioProducto` |
| Diseño responsivo | Rejilla de Bootstrap (`row`/`col-*`), navbar colapsable, tipografía fluida con `clamp()` |
| Objeto JS con los videojuegos | `public/data/productos.json`: un arreglo de objetos con nombre, categoría (`genero`), precio, oferta, descripción e imagen |
| Tarjetas generadas dinámicamente | `ListaProductos` recorre el arreglo con `.map()` y crea un `TarjetaProducto` por juego |
| Filtro por categoría | `FiltroCategorias`; las categorías se calculan desde los datos |
| Validación del formulario de contacto | `utils/validacion.js` + `FormularioContacto` |
| Componentes React | 13 componentes y 2 hooks propios en `src/components/` y `src/hooks/`, ver [Estructura](#estructura) |
| State para agregar o eliminar videojuegos | `useProductos` expone `agregarProducto` y `quitarProducto` |
| Carga dinámica desde un archivo | `useEffect` + `fetch` en `useProductos` |
| Props que conectan componentes | El filtro, el buscador y el carrito cambian el estado de `App`, que baja a `ListaProductos` por props |

---

## Arquitectura en React

### Dónde vive cada estado

La regla: **el estado sube solo hasta donde hace falta compartirlo**, y cuando un grupo
de estados describe un mismo trabajo, se saca a un hook.

| Dónde | Estado | Por qué ahí |
|---|---|---|
| `hooks/useProductos.js` | `productos`, `cargando`, `error` | Describen un solo trabajo: conseguir el catálogo |
| `App.jsx` | `carrito`, `busqueda`, `categoria` | Los leen varias ramas del árbol: barra, catálogo y carrito |
| `hooks/useFormulario.js` | `datos`, `errores`, `enviado` | Uno por formulario: a nadie más le importa lo que se está escribiendo |
| `Encabezado.jsx` | `menuAbierto` | Solo le importa a la barra |

**Lo que NO es estado.** El listado filtrado, las categorías, las líneas del carrito, el
contador y los totales se **derivan** del estado en cada renderizado. Guardarlos en su
propio `useState` obligaría a sincronizarlos a mano.

### Cómo viajan los datos

```
App  ── productos filtrados, idsEnCarrito ──▶ ListaProductos ──▶ TarjetaProducto
 ▲                                                                   │
 └──────────── alAgregar(id) · alQuitar(id) ◀────────────────────────┘
```

Los datos **bajan** por props; los cambios **suben** como llamadas a funciones que `App`
entrega por props. Ningún componente hijo modifica el estado de otro: avisa hacia arriba
y `App` decide. Por eso, al elegir una categoría, `FiltroCategorias` llama a
`alSeleccionar`, `App` actualiza `categoria` y `ListaProductos` recibe el listado nuevo.

### Los dos hooks propios

**`useProductos`** carga el catálogo y permite cambiarlo:

```js
const { productos, cargando, error, agregarProducto, quitarProducto } = useProductos();
```

Dentro, un `useEffect` con `[]` pide el JSON una sola vez al montar. Comprueba
`response.ok` antes del `.json()`, porque un 404 no hace fallar a `fetch`, y usa una
guarda de cancelación para que no actualice un componente desmontado.

**`useFormulario`** guarda lo que reúnen los dos formularios: los campos, los errores, la
validación al enviar y la limpieza. Cada formulario solo declara sus campos y sus reglas:

```js
const formulario = useFormulario("contacto", CONTACTO_VACIO, validarContacto);
```

Sin él, el formulario de contacto y el de producto repetirían las mismas cuarenta líneas.

### Renderizado condicional

| Situación | Qué se ve |
|---|---|
| Catálogo cargando | Aviso con spinner en lugar de la rejilla |
| Error de carga | Mensaje amigable; el resto del sitio sigue en pie |
| Filtros sin coincidencias | Aviso que dice por cuál filtro se quedó vacío |
| Catálogo vacío | Aviso que explica cómo recuperarlo |
| Producto en el carrito | Su botón dice "En el carrito ✓" y cambia de estilo |
| Carrito vacío | "Tu carrito está vacío…" |
| Oferta del 30 % o más | Etiqueta "¡Mejor precio!" |
| Campo inválido | Borde rojo y mensaje bajo el campo |
| Envío correcto | Aviso de éxito |

---

## Estructura

```
├── index.html                    Plantilla base: solo el <div id="root"> donde monta React
├── vite.config.js                Configuración de Vite, con la ruta base de Pages
├── package.json                  Dependencias y comandos
├── capturas/                     Evidencias de funcionamiento
├── public/                       Se copia tal cual al build
│   ├── data/productos.json       Los datos del catálogo
│   ├── img/                      Portadas SVG, portada genérica y logotipo
│   └── favicon.svg
└── src/
    ├── main.jsx                  Punto de entrada: importa Bootstrap y los estilos, monta <App />
    ├── App.jsx                   Estado compartido, acciones del carrito y del catálogo
    ├── index.css                 Estilo propio sobre Bootstrap: paleta, clamp(), Grid
    ├── hooks/
    │   ├── useProductos.js       Carga del catálogo (useEffect) y cambios sobre él
    │   └── useFormulario.js      Estado y validación comunes a los formularios
    ├── utils/
    │   ├── formato.js            Rutas, formato de precios y filtros
    │   └── validacion.js         Reglas de los dos formularios
    └── components/
        ├── Encabezado.jsx        Barra de navegación, buscador y contador
        ├── Buscador.jsx          Campo de búsqueda
        ├── Inicio.jsx            Presentación de la tienda
        ├── FiltroCategorias.jsx  Botones de categoría
        ├── ListaProductos.jsx    Rejilla del catálogo y sus vistas
        ├── TarjetaProducto.jsx   Ficha de un videojuego
        ├── Carrito.jsx           Sección del carrito
        ├── LineaCarrito.jsx      Una línea del carrito
        ├── TotalCarrito.jsx      Unidades, ahorro y total
        ├── FormularioProducto.jsx Agregar un videojuego al catálogo
        ├── FormularioContacto.jsx Formulario de contacto
        ├── CampoFormulario.jsx   Etiqueta + campo + error, para ambos formularios
        └── PieDePagina.jsx       Datos de contacto y redes
```

---

## Publicación

El sitio se sirve desde `https://fcoxavierparra.github.io/PFY2201_EFT_FPARRA/`, un
subdirectorio y no la raíz del dominio. Por eso `vite.config.js` declara:

```js
base: '/PFY2201_EFT_FPARRA/'
```

Y por eso el JSON y las imágenes de `public/` se piden con la base delante: Vite no
reescribe sus rutas.

```js
export const URL_DATOS = import.meta.env.BASE_URL + "data/productos.json";
```

Escribir `/data/productos.json` a pelo funciona en local y **da 404 al publicar**.

`npm run deploy` construye el sitio y sube `dist/` a la rama `gh-pages`. GitHub Pages se
activa una vez en *Settings → Pages*, eligiendo esa rama.

---

## Pruebas y compatibilidad

### Pruebas automáticas

Se ejecutan con Chrome sin interfaz, controlado por el protocolo de DevTools, contra el
sitio publicado y con un perfil de navegador limpio:

| Bloque | Pruebas | Qué cubren |
|---|--:|---|
| Formulario de contacto | 19 | Errores al enviar vacío, email mal formado, error que se borra al corregir, envío correcto, Grid en una y dos columnas |
| Catálogo editable | 31 | Validaciones, agregar con categoría nueva, portada, quitar (carrito y filtro coherentes), catálogo vacío, recarga |

Todas comprueban además que **la consola queda sin errores** y que en 375 px de ancho
**no hay scroll horizontal**.

### Navegadores y dispositivos

| Navegador / dispositivo | Resultado |
|---|---|
| Chrome (escritorio) | ✅ pruebas automáticas; *revisión manual pendiente* |
| Edge (escritorio) | *pendiente de la ronda manual* |
| Firefox (escritorio) | *pendiente de la ronda manual* |
| Teléfono | *pendiente de la ronda manual* |
| Vista móvil de DevTools, 375 px | ✅ |

---

## Decisiones técnicas

**Un JSON propio y no una API externa.** El catálogo necesita precio y oferta para el
carrito, y las API públicas de videojuegos (como RAWG) no los tienen. Además, una API
externa es una dependencia que puede estar caída el día de la revisión, y su clave
quedaría a la vista en el JavaScript publicado.

**Bootstrap por npm y no por CDN.** Viaja dentro del proyecto: el sitio no depende de un
servidor externo para verse bien. Solo se usa su CSS; su JavaScript manipula el DOM por
su cuenta y chocaría con React.

**Sin servidor para el formulario de contacto.** Conectarlo a un servicio de correo
añadiría otra dependencia externa. El envío se valida y se confirma en pantalla.

---

## Créditos

Las portadas y el logotipo son SVG propios, creados para este proyecto.
React 19, Vite 8 y Bootstrap 5.3.8 se instalan con npm.
