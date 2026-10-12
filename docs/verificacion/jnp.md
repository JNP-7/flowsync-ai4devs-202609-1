# Matriz de trazabilidad — «Lo que cada tarea muestra de su responsable»

Requisito: `openspec/specs/tasks/spec.md` → *Requirement: Lo que cada tarea muestra de su responsable*.
Tests: `backend/tests/functional/tasks/assignee.spec.ts` (suite `Tasks | responsable`).

> El requisito dice «suelta o dentro de la lista», así que cada scenario se comprueba en todas las
> respuestas que devuelven una tarea: `GET /tasks/:id`, `GET /tasks`, `POST /tasks`,
> `PATCH /tasks/:id/status` y `PUT /tasks/:id/due-date`.

## Matriz

El nombre del test es el que muestra la suite (`grupo / título`).

| Scenario | Respuesta comprobada | Test (nombre exacto en la suite) | Resultado |
|---|---|---|---|
| Responsable identificable | `GET /tasks/:id` | `Tasks \| responsable / el detalle trae el nombre y las iniciales del responsable` | ✅ pasa |
| Responsable identificable | `GET /tasks` | `Tasks \| responsable / la lista trae el nombre y las iniciales del responsable` | ✅ pasa |
| La tarea no filtra datos de cuenta | `GET /tasks/:id` | `Tasks \| responsable / el detalle no incluye el email ni otros datos de la cuenta` | ✅ pasa |
| La tarea no filtra datos de cuenta | `GET /tasks` | `Tasks \| responsable / la lista no incluye el email ni otros datos de la cuenta` | ❌ **falla** |
| La tarea no filtra datos de cuenta | `POST /tasks` | `Tasks \| responsable / la tarea recién creada no incluye el email del responsable` | ❌ **falla** |
| La tarea no filtra datos de cuenta | `PATCH /tasks/:id/status` | `Tasks \| responsable / la respuesta de un cambio de estado no incluye el email del responsable` | ❌ **falla** |
| La tarea no filtra datos de cuenta | `PUT /tasks/:id/due-date` | `Tasks \| responsable / la respuesta de un cambio de fecha no incluye el email del responsable` | ✅ pasa |
| Responsable sin nombre | `GET /tasks/:id` | `Tasks \| responsable / un responsable sin nombre llega con nombre nulo e iniciales` | ✅ pasa |
| Responsable sin nombre | `GET /tasks` | `Tasks \| responsable / en la lista, un responsable sin nombre llega con nombre nulo e iniciales` | ✅ pasa |

## Hallazgo: incumplimiento del requisito

Los 3 fallos tienen la misma causa. `backend/app/transformers/task_transformer.ts` serializa el
`assignee` con `UserTransformer`, que incluye `email`, `createdAt` y `updatedAt`. Lo usan la lista,
la creación y el cambio de estado. `TaskDetailTransformer` sí usa `TaskAssigneeTransformer`
(solo `id`, `fullName`, `initials`), y por eso el detalle y el cambio de fecha cumplen.

Los tests no se han adaptado al código: describen lo que dice la spec. La corrección queda fuera
del alcance de esta tarea (solo se podía tocar `backend/tests/`): bastaría con que
`TaskTransformer` use `TaskAssigneeTransformer`.

## Parte B: las tres líneas

- **Antes / después:** creía cubiertos 2 de 3 scenarios; lo estaban 3 de 3 con test, 2 de 3 con el test en verde.
- **¿Falta test o falta regla?:** «Responsable sin nombre» — el scenario solo dice que las iniciales «siguen llegando», y el valor (`AE`, del email) está en la spec de `auth`, no en esta: la regla existía y faltaba comprobarla aquí, pero dudé si la estaba inventando yo.
- **Lo que el scenario no determinaba:** qué cuenta como «dato de cuenta» en «La tarea no filtra datos de cuenta»: fijé que `assignee` tenga exactamente `id`, `fullName` e `initials` (el `id` incluido), y un cuarto campo inofensivo haría fallar el test.
