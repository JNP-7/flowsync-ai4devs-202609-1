# Alcance MVP FlowSync (jnp)

## 1. El terreno que ya existe

Hoy FlowSync solo tiene cuentas de usuario. Una persona puede registrarse con nombre, email y contraseña, iniciar sesión, ver su perfil y cerrar sesión. El único dato de dominio es el usuario: no hay tareas, ni estados, ni ningún espacio compartido, y tampoco nada en tiempo real. Todo lo que pide la idea está por construir. Lo que sí hay que respetar es que ya existen la identidad y la sesión, y que cualquier usuario autenticado sirve como posible responsable de una tarea.

## 2. El interrogatorio

**1. Qué duele y qué decisión cambia**
- Qué duele: la daily de sincronización y el "¿en qué estás?" constante por Slack o chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- Episodio concreto: _pendiente_.

**2. Quién gana**
- Los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Equipo: remoto y pequeño, de 3 a 10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Espacio: uno único y compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda fuera del MVP y se anota como supuesto.
- Primer usuario concreto: un equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un caso de estudio, no un cliente real.

**3. Qué es "tiempo real"**
- Ver los cambios de estado sin refrescar ni preguntar. No es chat, ni videollamada, ni colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la tarea, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y se rechaza a propósito.
- Forma de la señal: un resumen que espera, no un aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.

**4. De dónde sale el estado y por qué se mantiene**
- Lo teclea la persona que hace la tarea, en segundos. Sacarlo de señales externas (Git/PRs, CI, calendario) queda fuera del MVP: es otro producto, con integraciones y OAuth de terceros.
- Qué gana quien lo actualiza: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.

**5. "Menos rollo que Jira" y criterio de éxito**
- Una tarea lleva lo mínimo: título, responsable, estado y fecha de vencimiento. La fecha sirve para ver de un vistazo qué se ha pasado de plazo.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- Criterio a una semana de uso real: que el equipo cancele la ronda de "¿en qué estás?" y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Si la información se queda vieja, el producto pierde el sentido, y se asume. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.

**Supuestos declarados** (no los ha respondido el producto)
- Episodio concreto del dolor: no se ha dado. Supongo el típico: dos personas trabajan en paralelo en lo mismo porque una empezó sin que la otra lo supiera.
- La daily no desaparece entera: solo cae la ronda de "¿en qué estás?". Los bloqueos siguen en la daily y el MVP no los resuelve. Lo deduzco del criterio de éxito ("que cancele esa ronda").

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. Eso se paga dos veces. Primero, con la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos, y con los mensajes sueltos por Slack a lo largo del día. Segundo, con trabajo duplicado: dos personas empiezan lo mismo porque ninguna sabía que la otra ya estaba en ello. El gestor de tareas que usan hoy podría resolverlo, pero es tan pesado de mantener que nadie lo tiene al día.

### Usuarios

Los miembros de un equipo remoto de 3 a 10 personas, todos al mismo nivel. No es un lead ni un manager: no hay reporte hacia arriba. Caso de estudio: un equipo de 6 personas de producto SaaS repartido en 3 husos horarios. Hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Todos ven y editan lo mismo, en un único espacio compartido.

### Propuesta de valor

Una sola lista de tareas del equipo que se mantiene al día sola porque actualizarla cuesta dos clics, y quien la actualiza cobra en el momento: es su propia cola de trabajo. Cualquiera, al llegar por la mañana o al volver de una reunión, ve qué está cogido, qué está libre y qué ha cambiado, sin preguntar a nadie. La decisión que cambia es concreta: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.

- **Criterio de éxito (una semana de uso real):** el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.
- **Riesgo #1 a validar:** que el estado se quede viejo. Si pasa, el producto no sirve. La mitigación es el coste de actualizar, no la obligación.

### Alcance

Una vertical fina y usable de punta a punta sobre las cuentas que ya existen:

1. **Crear una tarea en segundos**, con el título como único campo obligatorio. Responsable y fecha de vencimiento son opcionales. Se puede editar y borrar.
2. **Cambiar el estado en dos clics** entre tres estados fijos (Por hacer, En curso, Hecha), sin flujos configurables.
3. **Coger una tarea libre o reasignarla** a cualquier persona del espacio.
> Recorte propio sobre la propuesta de la IA: quedan fuera el 4 (lista única compartida filtrable, con vencidas resaltadas), el 5 (refresco en vivo) y el 6 (marca de "cambiado desde tu última visita"). Están justificados abajo, en el NO-alcance.

### NO-alcance

Cada exclusión va con la hipótesis que **no** ayuda a validar. Las hipótesis son dos: (a) si ver el estado de las tareas elimina la ronda de "¿en qué estás?"; (b) si actualizar cuesta tan poco que el estado no se queda viejo.

- **Notificaciones push y recordatorios de vencimiento.** La señal tiene que esperar a que la mires, no interrumpir. Un aviso reintroduce justo la interrupción que queremos quitar y no dice nada de (a) ni de (b).
- **Resumen diario por email.** Es otro canal que mirar. Si la lista ya enseña lo que ha cambiado desde tu última visita, el email no valida nada nuevo.
- **Integración con Slack.** Mete FlowSync dentro del canal de interrupciones. Además, validaría si la gente mira Slack, no si mira la lista.
- **Presencia e indicadores de actividad** ("quién está conectado", "escribiendo…"). El estado es de la tarea, no de la persona. Es vigilancia y se rechaza a propósito, no por falta de tiempo.
- **Chat, videollamada y edición simultánea.** "Tiempo real" significa frescura del estado, no comunicación. Ninguno toca (a) ni (b).
- **Comentarios en tareas.** Convierten la tarea en una conversación que hay que leer. Suben el coste de actualizar, que es justo lo que (b) tiene que demostrar que es bajo.
- **Descripción larga, prioridad, etiquetas, subtareas y dependencias.** Cada campo añade una decisión al crear o actualizar y sube el coste de (b). Para saber quién está en qué basta con título, responsable, estado y fecha.
- **Estados o flujos configurables.** Configurar es exactamente el "rollo de Jira". Con tres estados fijos basta para distinguir libre, cogido y hecho.
- **Sprints, estimaciones, épicas, backlog priorizado.** Resuelven la planificación, no la sincronización. Un equipo que los necesite no es nuestro usuario.
- **Analítica, reporting e informes.** Solo le sirven a alguien que mira hacia arriba, y el usuario son los pares. No dicen nada sobre si desaparece la ronda.
- **Roles y permisos avanzados.** Los roles son planos por decisión. Con permisos, el mensaje sería "esta lista no es de todos", que va contra (b).
- **Varios equipos o espacios, o personas en más de uno.** El caso de estudio es un único equipo. Se anota como supuesto: un único espacio al que pertenece toda persona con cuenta.
- **Invitaciones y gestión de miembros.** Con un espacio único, registrarse es entrar. Invitar solo haría falta si hubiera más de un espacio.
- **Sacar el estado de Git/PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. Además, se saltaría la hipótesis (b) en vez de validarla.
- **Importar tareas desde otro gestor o sincronizar con él.** FlowSync sustituye al gestor, no convive con él. Sincronizar lleva a la doble actualización, que es como muere esta categoría.
- **Gestión de bloqueos.** Sigue en la daily. Este MVP no la resuelve y no promete que la daily desaparezca entera.
- **Historial de cambios completo o auditoría.** La marca de "cambiado desde tu última visita" cubre el caso. Un histórico sirve para investigar, no para decidir qué coger.
- **Lista única compartida, filtrable por estado, con vencidas resaltadas** (recorte propio). Es útil, pero no es necesaria para un primer MVP.
- **Refresco en vivo sin recargar** (recorte propio). Puede confundir a quien usa la herramienta y no entiende por qué algo se ve diferente de repente. Para el caso "llego y veo qué se ha movido" no hace falta.
- **Marca de "cambiado desde tu última visita"** (recorte propio). Sería útil, pero no es necesaria para el funcionamiento básico. Es la exclusión de la que menos seguro estoy (ver las tres líneas).
- **App móvil nativa.** El momento de uso es al sentarse a trabajar. Una app no cambia (a) ni (b).

### Incoherencias que señaló la IA tras el recorte

- **Quitar el 4 deja sin sitio común donde ver el estado.** La hipótesis (a) es "ver el estado del equipo de un vistazo elimina la ronda de ¿en qué estás?". Sin una lista compartida no hay "de un vistazo", y la propuesta de valor ("una sola lista del equipo") ya no se cumple. Se mantuvo el recorte por decisión propia, pero el documento, tal como queda, promete algo que su propio alcance no permite cumplir.
- **La fecha de vencimiento se queda sin uso.** Solo servía para ver qué se había pasado de plazo, y eso iba en el 4.
- **Sin el 5 ni el 6 no queda nada del "tiempo real"** que se definió en el interrogatorio ("ver cambios sin refrescar ni preguntar"). Solo se ve el estado cuando se abre o se recarga la pantalla.

## Las tres líneas

1. **Los dos números:** la IA propuso 6; después de mi recorte quedan 3.
2. **Tres cosas que dejé fuera, y por qué:**
   - Refresco en vivo (5): puede confundir a los usuarios, que no entenderían por qué algo se ve diferente de repente.
   - Lista única compartida filtrable con vencidas resaltadas (4): útil, pero no necesaria para un MVP.
   - Marca de "cambiado desde tu última visita" (6): útil para esta primera versión, pero no necesaria para el funcionamiento básico de la herramienta.
3. **La exclusión de la que menos seguro estoy:** la marca de "cambiado desde tu última visita" (6). Se contradicen dos cosas. Quitarla deja una base funcional más fina. Pero sin ella el trabajo puede "pisarse", que es justo lo que la herramienta quería evitar. Tendría que entrar si en la semana de uso real vuelve a pasar que dos personas empiezan lo mismo.
