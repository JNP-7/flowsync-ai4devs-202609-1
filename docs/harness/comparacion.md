# Comparación

|  | Con harness | Sin harness |
| --- | --- | --- |
| Qué archivos tocó | 23 en total. Todos los ficheros de `frontend/src` excepto los iconos predefinidos. También `package.json` e `index.html`. | 20 en total. Los mismos que en "Con harness". |
| Qué convenciones del proyecto respetó y cuáles no | No tuvo en cuenta los contrastes de colores para el icono y el fondo donde estaba colocado. Lo demás lo respetó, aunque no siempre lo implementó correctamente a la primera. | No tenía nada definido, salvo hacer el menú interactuable por teclado, lo cual respetó. |
| Cuántas veces tuviste que intervenir | +10 veces. Probablemente porque los componentes eran más complejos al estar sujetos a ciertas especificaciones. | +5 veces. Parecía incluso estar implementando cosas que no había "hecho bien" durante la primera tanda. Aun así, el componente era menos complejo. |
| Qué te tocaría arreglar a mano | El body de la página, ya que, al no haber especificado un diseño en particular (solo pautas de accesibilidad y una paleta de colores), no trabajó sobre él, lo cual no es incorrecto de por sí. Podría dar la tarea por lista en ambos casos. | El body de la página, ya que, al no haber especificado un diseño en particular (solo pautas de accesibilidad y una paleta de colores), no trabajó sobre él, lo cual no es incorrecto de por sí. Podría dar la tarea por lista en ambos casos. |

## Qué piezas montaste y cuál te costó más de lo que esperabas

Monté el header, el footer, el menú principal de navegación y el routing de la página. También se han creado las otras páginas en sí, aunque vacías por ahora. El más costoso fue el menú de navegación, ya que algunas pautas de accesibilidad las aplicó a medias o no las interpretó al 100 % de como las quería.

## La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla

La primera diferencia aparente es que el menú de navegación "Sin harness" lo montó como un menú de barra lateral, mientras que el de "Con harness" lo montó como un menubar siguiendo las pautas del W3C. La segunda es que "Sin harness" agregó el logo con un fondo blanco para respetar el contraste de colores, aunque no tenía ninguna pauta de accesibilidad aplicada, mientras que "Con harness" se lo saltó. Parece que el segundo había aprendido de la sesión del primero. Por último, "Con harness" creó `Theme.tsx`, un componente wrapper para `<header>`, `<body>` y `<footer>` que tenía pensado usar a futuro y que viene indicado en las reglas del frontend del proyecto. "Sin harness" no lo creó.

## Algo que dejaste escrito en el harness y que el agente no cumplió igualmente

Como ya mencioné, se saltó las normas de contraste de colores para el logo y el fondo sobre el que lo colocó o, más bien, no me avisó de que eso iba a provocar un problema.

