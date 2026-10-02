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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Guarda los prompts que te escriba a partir de ahora en prompts.md en el formato que describe ese mismo archivo
```

**Qué salió:** funcionó a la primera: guardó este prompt en `prompts.md` como Prompt 1 y borró el ejemplo de la plantilla.

---

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Vas a escribir la spec viva del vertical de cuentas y acceso de este proyecto
(registro, inicio de sesión, sesión y perfil), en backend y frontend.
El código ya existe y funciona: no propones nada y NO TOCAS NINGUNA LÍNEA DE CÓDIGO.
Lees lo que hay y describes lo que hace HOY.

Primero lee el código de las dos capas:
- backend: rutas, controladores, modelo de usuario, validadores y middlewares.
- frontend: pantallas de acceso, estado de sesión y protección de rutas.
```

**Qué salió:** leyó las dos capas y escribió `docs/spec-viva/jnp.md` con 13 requisitos. El prompt llegó cortado (sin ubicación, formato ni reglas duras), así que el formato lo tomó del README. Sin comprobar todavía contra el código; salieron incoherencias candidatas a la Parte B (iniciales, cierre de sesión, tokens).

---

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Escribe el resultado en docs/spec-viva/jnp.md, con este formato y sin variaciones:
- "## Purpose": una o dos frases sobre para qué existe esta capability.
- "## Requirements" y, colgando de él, "### Requirement:" en los que el sistema SHALL hacer algo.
- Bajo cada requisito, al menos un "#### Scenario:" con dos viñetas: "- **WHEN**" y "- **THEN**".
  No hay GIVEN: la precondición va dentro del WHEN.
- En castellano, salvo las mayúsculas de la RFC (SHALL, MUST...).

Ten en cuenta estas reglas:
1. Nada de secciones ADDED, MODIFIED ni REMOVED. Es la verdad actual, no un delta.
2. Solo comportamiento observable desde fuera. Ni un nombre de clase, de archivo ni
   ruta de código. En la API: petición y respuesta (método, URL, códigos, cuerpo).
   En pantalla: lo que una persona ve y puede hacer.
3. Solo cuentas y acceso. Nada de tareas ni de otras partes, aunque te ofrezcas a seguir.

Cuando algo no sepas si es intencionado o casual (un comportamiento raro, una regla que se
cumple en unos sitios y en otros no), NO lo resuelvas ni lo rellenes con seguridad: déjalo
marcado en una lista aparte al final, con las dos lec
Al terminar dime cuántos requisitos has escrito, solo el número.
```

**Qué salió:** el prompt llegó cortado en "con las dos lec". Reutilizó la spec del Prompt 2: sacó de los requisitos los escenarios dudosos (iniciales con más de dos palabras o sin nombre, cierre de sesión con fallo del servidor) y añadió al final una lista de puntos sin decidir, cada uno con dos lecturas. Sigue sin comprobar contra el código.

---

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Veo que ya has escrito 13 requisitos. Dame un listado en el que vea, para cada requisito, las partes del código que ya existen y que se usarán para satisfacerlo
```

**Qué salió:** listado en el chat con los ficheros de backend y frontend que respaldan cada uno de los 13 requisitos, a partir del código leído en el Prompt 2. Sin ejecutar nada.

---

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Se ha acabado el tiempo. Vamos a rellenar la Parte B debajo de la spec. empecemos por Cuántos requisitos escribió el agente, y cuántos comprobaste tú abriendo el código
```

**Qué salió:** añadió a la spec el encabezado de la Parte B y la lista 1 con los dos números (13 escritos, 0 comprobados). Quedan la lista 2 y la 3.

---

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
He comprado 6 de los 13 requisitos, actualiza Comprobados abriendo el código:
```

**Qué salió:** actualizó la lista 1 de la Parte B: 13 escritos, 6 comprobados (antes figuraba 0, el dato del agente; el 6 es el que aportó la persona). Quedan la lista 2 y la 3.

---

## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Añade todas las incoherencias a la lista 2
```

**Qué salió:** añadió a la lista 2 de la Parte B cinco incoherencias detectadas al escribir la spec, cada una con dónde se ve. Queda la lista 3.

---

## Prompt 8

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Aquellas incoherencias que no hemos agregado en la lista 2 agregalas a la lista 3
```

**Qué salió:** añadió la lista 3 a la Parte B con cuatro puntos (cierre de sesión con el servidor caído, tokens sin caducidad, mayúsculas en el email, clave del nombre ausente), cada uno con las dos lecturas que se contradicen. Las tres listas quedan completas.