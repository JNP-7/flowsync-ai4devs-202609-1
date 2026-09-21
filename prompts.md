# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Voy a hacerte una serie de prompts. Guardalos en prompts-sesion.md guiandote por la plantilla de prompts.md
```

**Qué salió:** creación de `prompts-sesion.md` siguiendo la plantilla de `prompts.md`.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
A parte de crearlos quiero que los ejecutes. Empieza por listarme los tableros de jira que tienes configurados
```

**Qué salió:** listados 2 proyectos Jira en javiernp7.atlassian.net vía MCP: `FLOW` (FlowSync) y `SAM1` (ejemplo de billing).

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Sí listame los issues del tablero FLOW que estén asignados a Javier Nicolau
```

**Qué salió:** JQL `project = FLOW AND assignee = "Javier Nicolau Perello"` devuelve 1 issue: `FLOW-5` "Cabecera con menú de navegación y pie de página" (Historia, Medium, estado "Tareas por hacer").

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Sí, profundiza en el detalle de esa tarea y elabora un plan de acción para completarla
```

**Qué salió:** detalle obtenido de FLOW-5 vía Jira MCP (descripción, criterios de aceptación, adjuntos `logo-generico.svg` y `paleta-colores.md`). Detectada contradicción en el ticket (los ítems de grupo "no llevan a página" vs. el criterio de aceptación que dice que sí navegan) y ausencia de iconos de abrir/cerrar pese a citarse como adjuntos. Resuelto con el usuario vía preguntas: se añade `react-router-dom`, los grupos solo despliegan submenú (no navegan), y el usuario aportará el contenido de la paleta y el SVG del logo. Plan de acción completo elaborado y aprobado (guardado en `~/.claude/plans/distributed-baking-finch.md`); pendiente de implementación.

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
El logo ya está en su sitio, a continuación el plaeta-colores.md
```

**Qué salió:** confirmado que `frontend/src/assets/logo-generico.svg` existe, pero el contenido de la paleta no llegó a incluirse en el mensaje — se le pidió al usuario que lo reenviara.

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
# Paleta de colores

| Uso | Color | Nota de contraste |
|---|---|---|
| Fondo de header/footer, texto sobre fondos claros | `#224FA8` (azul institucional) | Con texto blanco encima: contraste 7.6:1 — cumple AA y AAA |
| Acentos, hover, iconos, bordes | `#598BEC` (azul medio) | Contraste con blanco ≈3.3:1 — no usar como texto de enlace o texto normal, solo para elementos gráficos grandes/decorativos o estados (no pasa el 4.5:1 de WCAG AA) |
| Fondos sutiles (hover de menú, tarjetas) | `#D1E5EF` (azul muy claro) | Siempre con texto oscuro encima |
| Texto principal | `#212529` | Sobre blanco o sobre el azul claro |
| Fondo de página / texto sobre el azul institucional | `#FFFFFF` | — |
| Bordes / separadores | `#E5E7EB` | — |
```

**Qué salió:** paleta recibida (`#224FA8`, `#598BEC`, `#D1E5EF`, `#212529`, `#FFFFFF`, `#E5E7EB`). Con logo y paleta ya disponibles, se implementó FLOW-5 completo: `react-router-dom` añadido; componentes `Theme`/`Header`/`Nav`/`Footer` (patrón disclosure WAI-ARIA APG, 3 niveles, escape para cerrar, toggle móvil con iconos nuevos en `icons.svg`); páginas `HomePage` (contenido movido del antiguo `App.tsx`) y 5 placeholders (Curso IA, Contacto, Horarios, Última hora, Buscador de noticias); rutas cableadas en `App.tsx`/`main.tsx`; tokens de color en `index.css`; título por página vía `usePageTitle`. `npm run lint` y `npm run build` pasan limpios. No se pudo verificar en navegador real (la extensión Claude in Chrome no está conectada en esta sesión) — solo se comprobó por HTTP que el dev server sirve las rutas sin error; falta verificación manual de teclado/lector de pantalla por parte del usuario.

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Voy a verificar lo que hay hecho por ahora
```

**Qué salió:** el usuario pasa a verificar manualmente (teclado/navegador) lo implementado hasta ahora antes de continuar.

## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
En primer lugar veo que uno de los azules de logo (el más oscuro) es del mismo color del fondo de la cabecera. Vamos a asumir que es incorrecto y a editar ese azul en el logo por este naranja #f18b2f
```

**Qué salió:** editado `frontend/src/assets/logo-generico.svg`, sustituidas las 2 elipses en `#224FA8` (idéntico al fondo de cabecera/pie) por `#f18b2f`; la elipse `#598BEC` se deja igual. `npm run build` sigue pasando limpio.

## Prompt 9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Veo los submenus de navegación siempre desplegados. No deberían estar desplegados hasta que el usuario interactue con ellos haciendo click o interactuando mediante el teclado cuando el foco está posado sobre ellos
```

**Qué salió:** bug real en `Nav.css`: la regla `.nav-list, .nav-submenu { display: flex }` (especificidad de una clase) pisaba el `display: none` nativo del atributo `hidden` en los `<ul>` de submenú (misma especificidad, gana la de autor sobre la del user-agent), así que los submenús se veían siempre desplegados pese a que `open` empezaba en `false`. Corregido añadiendo `.nav-submenu[hidden] { display: none; }` (mayor especificidad por el selector de atributo). `npm run build` sigue pasando limpio.

## Prompt 10

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
El z-index de los menús no parece ser correcto. Cuando el menú está por encima del logo de react-vite de la página principal parte de ese logo aparece por encima
```

**Qué salió:** causa: `.site-header` no creaba su propio contexto de apilamiento (sin `position`/`z-index`), así que su `<header>` y el desplegable del submenú (`position: absolute`, sin `z-index` propio) competían directamente, en el contexto de apilamiento raíz, con `.hero .framework` de `HomePage` (que sí tiene `z-index: 1` explícito en `App.css`) — y ese ganaba por tener mayor z-index que el `auto` del submenú. Corregido dando a `.site-header` `position: relative; z-index: 10;`, con lo que la cabecera entera (y todo lo que despliega) pasa a pintarse por encima de cualquier contenido de página. `npm run build` sigue pasando limpio.

## Prompt 11

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Correcto. Ahora cuando he abierto uno de los submenus e intento abrir otro no se cierra el primero. Por ejemplo, si abre primero "Sobre nosotros" y luego abro "Actividades" los dos menús están abiertos al mismo tiempo. Solo debería estar abierto el último
```

**Qué salió:** causa: cada `NavGroupItem` en `Nav.tsx` gestionaba su propio `open` de forma aislada, sin coordinación entre hermanos. Refactorizado a un nuevo componente `NavLevel` que centraliza, por cada `<ul>` de hermanos, cuál ítem está abierto (`openLabel: string | null`) tipo acordeón: abrir uno cierra cualquier otro hermano del mismo nivel; niveles anidados (p. ej. "Noticias" dentro de "Actividades") mantienen su propio estado independiente al ser una `NavLevel` distinta. `npm run lint` y `npm run build` pasan limpios.

## Prompt 12

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Correcto, pero los menús más anidados no se cierran si su menú padre ha sido cerrado. Es el caso del menú hijo de "Noticias". Si "Actividades" se cierra, o bien porque el usuario lo cierra o bien porque se cierra al abrir "Sobre nosotros" el submenú de "Noticias" no se cierra. Debería cerrarse
```

**Qué salió:** causa: el `NavLevel` del submenú de un grupo seguía montado al cerrarse el grupo (solo se le ponía `hidden`), así que conservaba su propio `openLabel` interno — por eso "Noticias" seguía "recordando" que estaba abierto dentro de "Actividades" tras cerrarla. Corregido añadiendo `key={open ? 'open' : 'closed'}` al `NavLevel` anidado dentro de `NavGroupItem`, forzando que React lo desmonte/remonte (reseteando su estado) cada vez que el grupo padre cambia entre abierto y cerrado. `npm run lint` y `npm run build` pasan limpios.

## Prompt 13

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Ahora es correcto. Veo, pero, el botón de "Saltar al contenido principal" este es un que usan lso lectores de pantalla. Los usuarios que hacen un uso normal de la web no lo necesitan. Así pues, no debería visualizarse en la esquina superior izquierda. No lo escondas con un display none ya que esto lo ocultario para los lectores también
```

**Qué salió:** causa: el `.skip-link` se ocultaba con `top: -40px`, pero la altura real del enlace (padding + texto, ≈42px) era mayor que ese desplazamiento, así que un par de píxeles quedaban asomando en la esquina superior izquierda — no era un `display:none` ni un problema de accesibilidad, sino un cálculo de offset insuficiente. Corregido con la técnica estándar de "skip link": `transform: translateY(-200%)` en reposo (desplaza el doble de su propia altura, así que nunca asoma, sea cual sea su tamaño real) y `translateY(0)` al recibir foco (`:focus`), con una transición que respeta `prefers-reduced-motion`. Sigue en el DOM y en el árbol de accesibilidad en todo momento — solo cambia su posición visual. `npm run lint` y `npm run build` pasan limpios.

## Prompt 14

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Es posible navegar por el menú de navegación tabulando, pero esto no cumple con las normas de accesibilidad que tienes configuradas para los menús principales de la web. Debería poder interactuar con ellos con las flechas del teclado y otros atajos según los estandares que he mencionado
```

**Qué salió:** mi justificación inicial ("el APG desaconseja `menu`/`menuitem` en navs de sitio") no se pudo verificar al comprobar las páginas reales del APG con WebFetch — me corregí ante el usuario. Se confirmó que el APG tiene un ejemplo oficial dedicado exactamente a esto, [Navigation Menubar Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/), y el usuario, tras ver la cita, eligió migrar a él. Reescrito `Nav.tsx` por completo: contexto React (`MenuContext`) con roving tabindex global (una única `activeKey` en todo el árbol), `openKeys` como cadena de ancestros (abrir cierra hermanos y cualquier nieto que hubiera quedado abierto), roles `menubar`/`menu`/`menuitem`, `aria-haspopup`/`aria-expanded`/`aria-controls`, flechas izquierda/derecha entre ítems de primer nivel, flecha abajo/arriba en el menubar para abrir+enfocar primer/último ítem, flecha derecha/izquierda dentro de un submenú para entrar/volver, Home/End, búsqueda por carácter (typeahead), Escape (cierra un nivel y vuelve al disparador, con `stopPropagation` para no cerrar de golpe todo el menú móvil de `Header.tsx`), y `onBlur` en el `<nav>` que cierra todo si el foco sale del widget. `npm run lint` y `npm run build` pasan limpios; verificado por HTTP que el módulo se sirve sin error de compilación.

## Prompt 15

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Ahora pruedo interactuar con el teclado como es debido. Añade ahora iconos de Chevron para ver visualmente con más claridad si un menu está desplegado o no. Para los 2 elementos de menu principales (posicionados horizontalmente) el chevron debe apuntar hacia abajo cuando está cerrado y hacia arriba cuando está abierto. Para los submenús, que están posicionados verticalmente, cuando están cerrados apunta hacia la derecha y cuando están abiertos a la izquierda.
```

**Qué salió:** añadido un único símbolo `chevron-icon` (apuntando abajo) en `icons.svg`, reutilizado en los 4 estados mediante rotación CSS calculada en `Nav.tsx`: horizontal cerrado = 0°, horizontal abierto = 180° (abajo→arriba); vertical cerrado = -90°, vertical abierto = 90° (derecha→izquierda). El icono es `aria-hidden` (decorativo, el estado ya lo comunica `aria-expanded` en el botón) y respeta `prefers-reduced-motion` en la transición de rotación. `npm run lint` y `npm run build` pasan limpios.

## Prompt 16

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Lo veo bien. El outline del foco de los botones del menu solo rodea el texto (y ahora el icono) debería ocupar todo el ancho que tiene disponible. Los dos botones del menú principal son correctos, pero los submenús no. Además haz que el chevron siempre esté lo más a la derecha posible (con un padding derecho minimo) y que el texto esté pegado a la izquierda (con un padding también)
```

**Qué salió:** causa: los `<li>` de `.nav-submenu` (flex en columna) ya ocupan el ancho completo por `align-items: stretch` por defecto, pero los `<a>`/`<button>` dentro son `display: inline-flex`, que se ajustan solo al contenido y no heredan ese ancho — de ahí que el outline de foco quedara ceñido al texto. Corregido con `.nav-submenu .nav-item a, .nav-submenu .nav-toggle { width: 100%; justify-content: space-between; padding: 10px 8px 10px 12px; }`: el enlace/botón ocupa todo el ancho disponible (outline completo), el texto queda a la izquierda con su padding y el chevron se empuja al extremo derecho con padding mínimo (8px) vía `justify-content: space-between`. Solo afecta a los submenús verticales; el menú principal horizontal (ya correcto según el usuario) no se toca. `npm run lint` y `npm run build` pasan limpios.

## Prompt 17

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Veo bien lo implementado. Puedes pasar el ticket de Jira a Listo. Haz un resumen de lo que has trabajado en un comentario del ticket
```

**Qué salió:** añadido un comentario de resumen en FLOW-5 (componentes, patrón de navegación APG, resolución de la contradicción del ticket, accesibilidad, assets, verificación y qué queda fuera de alcance) y ejecutada la transición `41` ("Listo") vía Jira MCP; el estado del issue pasa a "Finalizada" (categoría "Listo").
