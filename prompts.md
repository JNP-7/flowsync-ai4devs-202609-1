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
Guarda todos los prompts que te escriba a partir de ahora (incluido este) en prompts.md con el mismo formato que indica ese fichero
```

**Qué salió:** funcionó a la primera: sustituyó el ejemplo por este prompt con el formato del fichero.

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Vamos a trabajar durante la sesión sobre el requisito "Lo que cada tarea muestra de su responsable" que está en openspec/specs/tasks/spec.md .Trabaja solo ese requisito, no la capability entera. Vamos a crear la matriz de trazabilidad y los tests para ese requisito. La matriz de trazabilidad crealá en docs/verificacion/jnp.md (si no existe el fichero/directorios, crealos). Los tests que escribas van en backend/tests/functional/tasks/, siguiendo el estilo de los que ya hay en backend/tests/functional/auth/. No toques nada fuera de backend/tests/
```

**Qué salió:** creó 9 tests y la matriz en docs/verificacion/jnp.md; 5 pasan y 4 fallan porque `TaskTransformer` expone el email del responsable (incumple la spec), y lo dejó documentado sin tocar código fuera de tests.

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
En la matriz de compatibilidad indica Qué test cubre cada scenario, con el nombre exacto que aparece en la suite
```

**Qué salió:** funcionó a la primera: añadió el nombre completo `Tasks | responsable / <título>` de cada test; la matriz ya existía como «de trazabilidad».

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Si, pero revisa el formato, parece que las 2 últimas columnas se han mezclado
```

**Qué salió:** funcionó a la primera: el `|` del nombre del grupo partía la celda; lo escapó como `\|`.

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"en la lista, un responsable sin nombre llega con nombre nulo e iniciales" que parte falla en este test
```

**Qué salió:** funcionó a la primera: identificó la aserción concreta que falla (`notProperty(..., 'email')`) y explicó que el test falla por esa aserción extra (la sobre el email) y no por lo que pide su scenario («nombre nulo e iniciales», que sí se cumple); la había añadido yo y mezclaba otro scenario, así que ofreció quitarla, y de ahí el Prompt 6.

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Sí, la idea es que cada test cubra un solo escenario, quita esa aserción
```

**Qué salió:** funcionó a la primera: quitó la aserción del email y actualizó la matriz; el test pasa a verde.
