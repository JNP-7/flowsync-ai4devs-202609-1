## Purpose

Permitir que una persona cree una cuenta, inicie y cierre sesión, mantenga la sesión al recargar y consulte su perfil, tanto a través de la API como desde la aplicación web.

## Requirements

### Requirement: Registro de cuenta por la API

El sistema SHALL permitir crear una cuenta con `POST /api/v1/auth/signup` a partir de nombre completo (texto o `null`), email, contraseña y confirmación de contraseña, y SHALL iniciar sesión en el mismo paso.

#### Scenario: Registro correcto

- **WHEN** se envía `POST /api/v1/auth/signup` con un email que no existe, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** responde 200 con `{ "data": { "user": {...}, "token": "<texto>" } }`, y el usuario contiene `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`

#### Scenario: Registro sin nombre

- **WHEN** se envía el registro con `fullName` a `null` y el resto de campos válidos
- **THEN** la cuenta se crea y `fullName` vuelve a `null` en la respuesta

#### Scenario: La contraseña nunca se devuelve

- **WHEN** se completa un registro, un inicio de sesión o una consulta de perfil
- **THEN** ninguna respuesta contiene la contraseña ni nada derivado de ella

### Requirement: Validación del registro

El sistema SHALL rechazar con 422 un registro cuyos datos no cumplan las reglas, indicando el campo afectado.

#### Scenario: Email ya registrado

- **WHEN** se envía el registro con un email que ya pertenece a otra cuenta
- **THEN** responde 422 con un error sobre el campo `email` y no crea ninguna cuenta

#### Scenario: Email con formato inválido o demasiado largo

- **WHEN** se envía el registro con un email sin formato de email, o de más de 254 caracteres
- **THEN** responde 422 con un error sobre el campo `email`

#### Scenario: Contraseña fuera de longitud

- **WHEN** se envía el registro con una contraseña de menos de 8 o de más de 32 caracteres
- **THEN** responde 422 con un error sobre el campo `password`

#### Scenario: La confirmación no coincide

- **WHEN** se envía el registro con una confirmación distinta de la contraseña
- **THEN** responde 422 con un error sobre el campo `passwordConfirmation`

#### Scenario: Campo obligatorio vacío

- **WHEN** se envía el registro con el email, la contraseña o la confirmación vacíos o ausentes
- **THEN** responde 422 con un error sobre cada campo que falta

### Requirement: Inicio de sesión por la API

El sistema SHALL permitir iniciar sesión con `POST /api/v1/auth/login` mediante email y contraseña, y SHALL devolver un token de acceso.

#### Scenario: Credenciales correctas

- **WHEN** se envía `POST /api/v1/auth/login` con el email y la contraseña de una cuenta existente
- **THEN** responde 200 con `{ "data": { "user": {...}, "token": "<texto>" } }`

#### Scenario: Credenciales incorrectas

- **WHEN** se envía el inicio de sesión con una contraseña equivocada, o con un email que no pertenece a ninguna cuenta
- **THEN** responde 400, con la misma respuesta en ambos casos, y no devuelve token

#### Scenario: Datos del inicio de sesión ausentes o mal formados

- **WHEN** se envía el inicio de sesión sin email, con un email sin formato de email, o sin contraseña
- **THEN** responde 422 con un error sobre cada campo afectado

#### Scenario: Varios inicios de sesión

- **WHEN** la misma cuenta inicia sesión varias veces
- **THEN** cada inicio devuelve un token distinto y los tokens anteriores siguen siendo válidos

### Requirement: Consulta del perfil

El sistema SHALL devolver los datos de la cuenta autenticada con `GET /api/v1/account/profile`, autenticando mediante la cabecera `Authorization: Bearer <token>`.

#### Scenario: Con token válido

- **WHEN** se envía `GET /api/v1/account/profile` con un token válido
- **THEN** responde 200 con `{ "data": {...} }` con los mismos campos de usuario que devuelve el registro

#### Scenario: Sin token o con token inválido

- **WHEN** se envía `GET /api/v1/account/profile` sin cabecera de autorización, o con un token desconocido o ya cerrado
- **THEN** responde 401

### Requirement: Iniciales del usuario

El sistema SHALL incluir en el usuario un campo `initials` en mayúsculas.

#### Scenario: Nombre de dos palabras

- **WHEN** el nombre completo es "Ada Lovelace"
- **THEN** `initials` es "AL"

#### Scenario: Nombre de una sola palabra

- **WHEN** el nombre completo es "Ada"
- **THEN** `initials` es "AD"

### Requirement: Cierre de sesión por la API

El sistema SHALL cerrar la sesión con `POST /api/v1/account/logout` invalidando el token con el que se hace la petición.

#### Scenario: Cierre correcto

- **WHEN** se envía `POST /api/v1/account/logout` con un token válido
- **THEN** responde 200 con `{ "message": "Logged out successfully" }`, sin envoltorio `data`, y ese token deja de ser válido

#### Scenario: Otros tokens de la misma cuenta

- **WHEN** una cuenta con dos tokens cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo válido

#### Scenario: Sin token

- **WHEN** se envía `POST /api/v1/account/logout` sin token válido
- **THEN** responde 401

### Requirement: Respuestas en JSON

El sistema SHALL responder siempre en JSON, con independencia de la cabecera `Accept` de la petición.

#### Scenario: Petición que pide otro formato

- **WHEN** se envía a cualquier ruta de la API una petición con `Accept: text/html`
- **THEN** la respuesta, incluidos los errores, es JSON

### Requirement: Protección de rutas en la aplicación

La aplicación SHALL permitir ver el perfil solo con sesión iniciada, y ver el inicio de sesión y el registro solo sin ella.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** es llevada a `/login`

#### Scenario: Login o registro con sesión

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** es llevada a `/profile`

#### Scenario: Dirección desconocida

- **WHEN** una persona abre una dirección que no existe
- **THEN** es llevada a `/profile` y, si no tiene sesión, de ahí a `/login`

#### Scenario: Comprobación de la sesión guardada en curso

- **WHEN** una persona con una sesión guardada abre cualquier pantalla y la aplicación aún está comprobándola
- **THEN** ve un indicador de carga y no es redirigida hasta que la comprobación termina

### Requirement: Pantalla de inicio de sesión

La aplicación SHALL ofrecer en `/login` un formulario con email y contraseña, un botón "Entrar" y un enlace "Crea una" hacia el registro.

#### Scenario: Inicio correcto

- **WHEN** la persona rellena credenciales correctas y pulsa "Entrar"
- **THEN** inicia sesión y ve su perfil

#### Scenario: Envío en curso

- **WHEN** la persona pulsa "Entrar"
- **THEN** el botón queda desactivado y muestra "Entrando…" hasta recibir respuesta

#### Scenario: Credenciales incorrectas

- **WHEN** la persona envía un email o una contraseña que no corresponden a ninguna cuenta
- **THEN** ve el aviso "El email o la contraseña no son correctos." y permanece en `/login`

#### Scenario: Campos vacíos

- **WHEN** la persona pulsa "Entrar" con el email o la contraseña vacíos
- **THEN** ve bajo cada campo vacío el mensaje "Falta rellenar el email." o "Falta rellenar la contraseña."

#### Scenario: Email con formato inválido

- **WHEN** la persona pulsa "Entrar" con un email sin formato de email
- **THEN** ve bajo el campo "Introduce una dirección de email válida."

### Requirement: Pantalla de registro

La aplicación SHALL ofrecer en `/register` un formulario con nombre completo (opcional), email, contraseña y repetición de la contraseña, un botón "Crear cuenta" y un enlace "Inicia sesión" hacia el login.

#### Scenario: Registro correcto

- **WHEN** la persona rellena datos válidos y pulsa "Crear cuenta"
- **THEN** la cuenta se crea, la sesión queda iniciada y ve su perfil

#### Scenario: Nombre en blanco

- **WHEN** la persona deja el nombre vacío o solo con espacios
- **THEN** la cuenta se crea sin nombre

#### Scenario: Las contraseñas no coinciden

- **WHEN** la persona pulsa "Crear cuenta" con la contraseña y su repetición distintas
- **THEN** ve bajo la repetición "Las contraseñas no coinciden." y no se envía nada al servidor

#### Scenario: Email ya registrado

- **WHEN** la persona se registra con un email que ya tiene cuenta
- **THEN** ve bajo el email "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Contraseña demasiado corta

- **WHEN** la persona se registra con una contraseña de menos de 8 caracteres
- **THEN** ve bajo la contraseña un mensaje que indica el mínimo de 8 caracteres

#### Scenario: Pista de la contraseña

- **WHEN** la pantalla no muestra ningún error sobre la contraseña
- **THEN** bajo el campo se lee "Entre 8 y 32 caracteres."

### Requirement: Persistencia de la sesión

La aplicación SHALL conservar la sesión en el navegador y restaurarla al recargar.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión iniciada recarga la página
- **THEN** sigue con la sesión iniciada y ve su perfil sin volver a identificarse

#### Scenario: Sesión rechazada por el servidor

- **WHEN** al recargar el servidor rechaza la sesión guardada
- **THEN** la sesión se descarta, la persona llega a `/login` y ve el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor inaccesible al recargar

- **WHEN** al recargar el servidor no responde o falla
- **THEN** la persona llega a `/login` con un aviso que explica el fallo y la sesión guardada no se borra, de modo que otra recarga con el servidor disponible la restaura

#### Scenario: Aviso solo en el login

- **WHEN** se pierde una sesión previa
- **THEN** el motivo se muestra en la pantalla de inicio de sesión y no en la de registro

### Requirement: Pantalla de perfil

La aplicación SHALL mostrar en `/profile` las iniciales, el nombre, el email y la fecha de alta de la cuenta, junto a un botón "Cerrar sesión".

#### Scenario: Cuenta con nombre

- **WHEN** una persona con nombre abre su perfil
- **THEN** ve sus iniciales, su nombre, su email y "Miembro desde" con la fecha de alta en formato largo en castellano

#### Scenario: Cuenta sin nombre

- **WHEN** una persona sin nombre abre su perfil
- **THEN** ve "Sin nombre" donde iría el nombre

### Requirement: Cierre de sesión en la aplicación

La aplicación SHALL cerrar la sesión desde el botón "Cerrar sesión" del perfil.

#### Scenario: Cierre correcto

- **WHEN** la persona pulsa "Cerrar sesión"
- **THEN** el botón muestra "Cerrando sesión…" y desactivado, la persona llega a `/login` y no ve ningún aviso

## Puntos sin decidir

Comportamiento observable cuya intención no se puede saber leyendo el código. No se han convertido en requisitos.

- **Iniciales de un nombre de más de dos palabras.** "Ada María Lovelace" da "AM". Lectura A: es el contrato (nombre y primer apellido). Lectura B: es un descuido y debería usar la última palabra ("AL").
- **Iniciales sin nombre.** "ana.perez@ejemplo.com" da "AE", con el dominio incluido. Lectura A: es intencionado, se parte el email en dos trozos. Lectura B: es un descuido y debería usar solo la parte anterior a la arroba ("AN").
- **Respuesta del cierre de sesión.** Es `{ "message": "Logged out successfully" }`, sin `data` y en inglés, mientras el resto de respuestas llevan `data` y la interfaz está en castellano. Lectura A: la excepción es deliberada, porque no hay datos que devolver. Lectura B: es una inconsistencia que nadie ha corregido.
- **Cierre de sesión en la aplicación con el servidor caído.** La sesión se cierra en la aplicación aunque el servidor no responda, y el token sigue válido en el servidor. Lectura A: es el objetivo, dejar de estar identificado en esa pantalla. Lectura B: es un riesgo, porque un token que debía morir sigue vivo.
- **Tokens sin caducidad aparente y acumulados.** Cada inicio de sesión crea un token y los anteriores siguen valiendo. No se puede confirmar sin esperar si alguno caduca. Lectura A: sesiones largas y varios dispositivos a la vez, por diseño. Lectura B: falta una política de caducidad o de revocación.
- **Mayúsculas en el email.** No consta que se normalicen, así que "Ana@ejemplo.com" y "ana@ejemplo.com" podrían ser cuentas distintas. Lectura A: el email distingue mayúsculas, por diseño. Lectura B: es un descuido que permite duplicados.
- **Cualquier error 400 en la aplicación.** Siempre se muestra "El email o la contraseña no son correctos.", aunque el 400 venga de otra causa. Lectura A: en este vertical el único 400 posible son las credenciales. Lectura B: la interfaz da por supuesto algo que el servidor no promete.
- **Registro sin la clave del nombre.** Con `fullName` a `null` se acepta; no se sabe qué responde si la clave no viaja. Lectura A: el nombre es opcional, sin más. Lectura B: la clave es obligatoria y solo su valor es opcional.

# Parte B: las tres listas

## 1. Requisitos escritos y requisitos comprobados

- Requisitos que escribió el agente: 13
- Requisitos que se comprobaron abriendo el código: 6

## 2. Incoherencias que aparecieron al escribir la spec

- Las iniciales de un nombre de más de dos palabras usan la segunda palabra y no la última ("Ada María Lovelace" da "AM"). Se ve en el campo `initials` del registro, del inicio de sesión y del perfil, y en el círculo de la pantalla de perfil.
- Las iniciales de una cuenta sin nombre se sacan partiendo el email por la arroba, y entra el dominio ("ana.perez@ejemplo.com" da "AE"). Se ve en el mismo campo `initials` y en el círculo del perfil.
- El cierre de sesión responde `{ "message": "Logged out successfully" }`, sin el envoltorio `data` del resto de respuestas y en inglés cuando la aplicación está en castellano. Se ve en la respuesta de `POST /api/v1/account/logout`.
- El mensaje de contraseña demasiado corta empieza en minúscula ("la contraseña debe tener al menos 8 caracteres."), a diferencia del resto de mensajes. Se ve bajo el campo de contraseña de la pantalla de registro.
- Cualquier error 400 se muestra como "El email o la contraseña no son correctos.", aunque no sea un fallo de credenciales. Se ve en el aviso de las pantallas de inicio de sesión y de registro.

## 3. Lo que no supe decidir si era un bug o el contrato

- **Cierre de sesión con el servidor caído.** La aplicación cierra la sesión aunque el servidor no responda y el token sigue válido en el servidor: o dejar de estar identificado en esa pantalla es el objetivo y basta, o un token que debía morir sigue vivo y es un riesgo.
- **Tokens sin caducidad aparente y acumulados.** Cada inicio de sesión crea un token y los anteriores siguen valiendo, y sin esperar no se puede confirmar si alguno caduca: o son sesiones largas y varios dispositivos a la vez por diseño, o falta una política de caducidad o de revocación.
- **Mayúsculas en el email.** No consta que se normalicen, así que "Ana@ejemplo.com" y "ana@ejemplo.com" podrían ser cuentas distintas: o el email distingue mayúsculas por diseño, o es un descuido que permite duplicados.
- **Registro sin la clave del nombre.** Con `fullName` a `null` se acepta y no se sabe qué responde si la clave no viaja: o el nombre es opcional sin más, o la clave es obligatoria y solo su valor puede ser vacío.
