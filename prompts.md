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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Guarda los prompts de esta sesión (incluido este) y la respuesta que me des a cada uno  en el en fichero prompts.md con el mismo formato que sugiere el archivo actual
```

**Qué salió:** funcionó a la primera. Sustituyó el ejemplo por este prompt y a partir de aquí añade cada prompt nuevo de la sesión con su respuesta.

**Respuesta:**

```
Hecho: he quitado el ejemplo de prompts.md y he añadido este prompt como "Prompt 1" con su respuesta. Cada prompt que me mandes en esta sesión lo iré añadiendo como "Prompt N", con la respuesta que te dé.
```

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a crear un prd para el proyecto actual. Deja el resultado final en docs/prd/alcance-mvp-jnp.md En el siguiente prompt te diré cual es la idea que tengo sobre lo próximo que queremos implementar en este proyecto
```

**Respuesta:**

```
He creado docs/prd/alcance-mvp-jnp.md solo con la estructura que pide el README: el terreno que ya existe, el interrogatorio, los cinco bloques (problema, usuarios, propuesta de valor, alcance y NO-alcance) y las tres líneas. Está todo vacío. Mándame la idea y seguimos.
```

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira
```

**Respuesta:**

```
He revisado el código y he escrito el primer tramo del PRD, "El terreno que ya existe". Hoy FlowSync solo tiene cuentas de usuario: registro, login, perfil y logout. No hay tareas, ni un espacio compartido, ni nada en tiempo real, así que todo lo que pides está por construir. Lo único que hay que respetar es la identidad y la sesión, que ya existen.

La idea todavía son sensaciones ("más en tiempo real", "menos rollo que Jira"), así que antes de proponer un alcance te hago cinco preguntas en una sola ronda. No bajo a modelo de datos ni a endpoints:

1. Qué duele y qué decisión cambia: ¿qué se pierde hoy exactamente, con un episodio reciente concreto? Y cuando alguien vea el estado del equipo, ¿qué hará distinto? ¿"Sentirse informado" o algo más concreto?
2. Quién gana: ¿los compañeros entre sí o un lead/manager? ¿De qué tamaño es el equipo, está repartido en husos horarios, hay roles distintos? ¿Hay un único espacio o varios equipos?
3. Qué es "tiempo real": ¿ver cambios de estado sin refrescar, presencia ("quién está conectado"), chat o notificaciones? ¿Una señal que interrumpe o un resumen que espera a que lo mires?
4. De dónde sale el estado y por qué se mantendría al día: ¿lo escribe cada persona a mano o se saca de Git, CI o el calendario? ¿Qué gana quien lo actualiza? ¿Sustituye al gestor de tareas actual o convive con él?
5. Qué es "menos rollo que Jira" y cómo sabremos que funciona: ¿qué es lo mínimo que lleva una tarea y a qué renunciamos (sprints, estimaciones, informes...)? ¿Qué tendría que pasar tras una semana de uso real para decir que funcionó?

Respóndelas (o dime que decida yo y lo marco como supuesto) y redacto el problema, los usuarios, la propuesta de valor, el alcance y el NO-alcance.
```

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos con esas preguintas una a una. Para la primera: que duele hoy? -> la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien. qué deicisión cambia? no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
```

**Respuesta:**

```
He apuntado la respuesta 1 en "El interrogatorio", sin cambiarla. La pregunta 1 también pedía un episodio reciente concreto y falta. Si lo tienes, añádelo cuando quieras; sirve para defender el problema. Si no, lo dejo como supuesto.

Pregunta 2, quién gana: ¿los compañeros entre sí o un lead/manager que quiere ver el estado? ¿De qué tamaño es el equipo, está repartido en husos horarios, hay roles distintos? ¿Hay un único espacio compartido o varios equipos?
```

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
uién gana? los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar. ¿De qué tamaño es el equipo, está repartido en husos horarios, hay roles distintos? equipos remotos pequeños, 3–10 personas Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos. ¿Hay un único espacio compartido o varios equipos? un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
```

**Respuesta:**

```
He apuntado la respuesta 2 en el PRD. Falta si el equipo está repartido en husos horarios. Importa porque, con husos distintos, "tiempo real" se parece más a "lo que ha cambiado mientras no estaba" que a "lo que pasa ahora mismo". Si no lo sabes, lo dejo como supuesto.

Pregunta 3, qué es "tiempo real": ¿ver cambios de estado de las tareas sin refrescar, presencia ("quién está conectado ahora"), chat o notificaciones? ¿La señal interrumpe (aviso) o espera a que la mires (resumen)? ¿El estado es de la tarea o de la persona?
```

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Falta si el equipo está repartido en husos horarios. -> Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
```

**Respuesta:**

```
He apuntado el primer usuario concreto en la pregunta 2, marcado como caso de estudio. Con 3 husos horarios, el momento de uso probable es "llego o vuelvo y miro qué se ha movido", no estar mirando la pantalla a la vez que los demás. Lo tengo en cuenta en la pregunta 3.

Pregunta 3, qué es "tiempo real": ¿ver cambios de estado de las tareas sin refrescar, presencia ("quién está conectado ahora"), chat o notificaciones? ¿La señal interrumpe (aviso) o espera a que la mires (resumen)? ¿El estado es de la tarea o de la persona?
```

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
"Tiempo real" = ver cambios de estado sin refrescar ni preguntar NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento. Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
```

**Respuesta:**

```
He apuntado la respuesta 3 en el PRD.

Hay una tensión que conviene decidir en el alcance, no ahora. "Ver cambios sin refrescar" (la lista se actualiza sola mientras está abierta) y "llego por la mañana y veo qué se ha movido" (un resumen de lo que cambió mientras no estaba) son dos cosas distintas. Con 3 husos horarios, el caso que describes es el segundo. Puede que el refresco en vivo sea lo que menos valida la hipótesis y lo que más cuesta. Lo discutiremos en el recorte.

Pregunta 4, de dónde sale el estado: ¿lo escribe cada persona a mano o se saca de Git, CI o el calendario? ¿Qué gana quien lo actualiza, para que no se quede viejo? ¿FlowSync sustituye al gestor de tareas actual o convive con él?
```

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
```

**Respuesta:**

```
He apuntado el origen del estado en el PRD. Faltan dos partes de la pregunta 4, y la primera es la que más me preocupa:

- ¿Qué gana en ese momento quien actualiza el estado? Si el beneficio es solo para los demás, lo normal es que deje de hacerlo y la información se quede vieja. Eso mata el producto.
- ¿FlowSync sustituye al gestor de tareas pesado que ya usan o convive con él? Convivir obliga a actualizar dos sitios.
```

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Qué gana en ese momento quien actualiza el estado? esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría. ¿FlowSync sustituye al gestor de tareas pesado que ya usan o convive con él? ustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
```

**Respuesta:**

```
He apuntado la respuesta 4 completa en el PRD.

Hay una tensión que tendremos que resolver en el recorte. "Sustituye al gestor" aprieta hacia meter más cosas, porque un sustituto tiene que servir para trabajar todos los días. "Menos rollo que Jira" aprieta hacia meter menos. La pregunta 5 es la que la resuelve.

Pregunta 5: ¿qué es lo mínimo que lleva una tarea? ¿A qué renuncias explícitamente (sprints, estimaciones, épicas, backlog, informes...)? ¿Qué tendría que pasar tras una semana de uso real para decir que funcionó, y qué haces si la información se queda vieja?
```

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
¿qué es lo mínimo que lleva una tarea?  ítulo, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo. ¿A qué renuncias explícitamente (sprints, estimaciones, épicas, backlog, informes...)?  Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario. ¿Qué tendría que pasar tras una semana de uso real para decir que funcionó, y qué haces si la información se queda vieja?  que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó. Si la información se queda vieja el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
```

**Respuesta:**

```
He apuntado la respuesta 5 y con eso el interrogatorio queda cerrado en el PRD. He añadido dos supuestos que he tenido que decidir yo; léelos, porque por ahí se cuelan los huecos:

1. Episodio concreto: no me lo has dado. Supongo el típico: dos personas trabajan en paralelo en lo mismo sin saberlo.
2. La daily no desaparece entera, solo la ronda de "¿en qué estás?". Los bloqueos siguen en la daily y el MVP no los resuelve. Lo deduzco de tu criterio de éxito.

Siguiente paso: ¿redacto ya los cinco bloques (problema, usuarios, propuesta de valor, alcance y NO-alcance), recortando al máximo y justificando cada exclusión? Si ya tienes decididas otras exclusiones (por ejemplo, integraciones o comentarios), pásamelas antes y las meto directamente.
```

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
sí, redacta los cinco bloques recortando al máximo. Ten en cuenta además que exluimos lo siguiente del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Respuesta:**

```
Redactados los cinco bloques en el PRD, sin tablas, endpoints ni arquitectura.

Alcance: la IA propone 6 cosas: (1) crear, editar y borrar tareas con solo el título obligatorio; (2) cambiar el estado en dos clics entre tres estados fijos; (3) coger o reasignar una tarea; (4) una lista única filtrable por estado con las vencidas resaltadas; (5) refresco en vivo sin recargar; (6) marca de "cambiado desde tu última visita".

NO-alcance: 18 exclusiones. Cada una justificada por cuál de las dos hipótesis no ayuda a validar: (a) si ver el estado elimina la ronda de "¿en qué estás?"; (b) si actualizar cuesta tan poco que el estado no se queda viejo. Incluyen las cinco que me diste.

Ahora te toca el recorte. Mi candidato más claro es elegir entre el 5 y el 6, porque resuelven el mismo "tiempo real" de dos formas; con 3 husos horarios, el caso descrito es el 6. Borrar tareas también podría caer.

Cuando lo decidas, relleno "Las tres líneas". El primer número ya está: la IA propuso 6. El segundo es lo que quede después de tu recorte.
```

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Entre el 5 y el 6 me quedo solo con el 6, el 5 puede causar confusión a los usuarios de la herramienta que no entenderían por qué algo se ve diferente. Tambien puedes quitar el 4, esto es útil, pero no necesario para un MVP. Por último, con respecto al 6, si bien sería útil mantenerlo para esta primera versión, no es necesario para el funcionamiento básico de la herramiente. Esta es de la que menos seguro estoy ya que excluir el punto puede dar lugar a que el trabajo "se pise", que es lo que queriamos evitar con la herramienta
```

**Qué salió:** antes de aplicar el recorte del 4, la IA preguntó qué quitar exactamente, porque sin lista compartida no se ve el estado del equipo. Respondí "El 4 entero".

**Respuesta:**

```
Recorte aplicado: en el alcance quedan 3 cosas (crear, editar y borrar tareas; cambiar el estado en dos clics; coger o reasignar). El 4, el 5 y el 6 pasan al NO-alcance con tus motivos, y he rellenado "Las tres líneas" (6 → 3).

He añadido al PRD tres incoherencias que deja el recorte. No las he arreglado, solo las he anotado:
1. Sin el 4 no hay un sitio común donde ver el estado del equipo. La hipótesis (a) y la propuesta de valor ("una sola lista del equipo") ya no se pueden cumplir con este alcance.
2. La fecha de vencimiento se queda sin uso.
3. Sin el 5 ni el 6 no queda nada del "tiempo real" que definiste.

Además, el README pide que cada exclusión se justifique por la hipótesis que no ayuda a validar. "No es necesario para un MVP" y "puede causar confusión" no lo hacen. Te recomiendo reformular esos tres porqués antes de entregar.
```

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
El tiempo ha terminado. Puedes dejar de guardar los prompts (manten este último). El documento de alcance quedará como está ahora
```

**Respuesta:**

```
Hecho. Dejo de guardar prompts y el documento de alcance se queda como está.
```
