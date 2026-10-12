import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no
 * filtra datos de cuenta y responsable sin nombre.
 *
 * «Suelta o dentro de la lista» se comprueba en todas las lecturas que
 * devuelven una tarea: detalle, lista, creación, cambio de estado y cambio de
 * fecha de vencimiento.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-06-15'

  async function sesion(client: any, email = 'sesion@example.com') {
    await User.create({ fullName: 'Quien Mira', email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  async function tareaDe(fullName: string | null, email = 'ada@example.com') {
    const responsable = await User.create({ fullName, email, password: 'secreto123' })
    const tarea = await Task.create({
      title: 'Escribir el motor analítico',
      status: 'pending',
      assigneeId: responsable.id,
    })

    return { responsable, tarea }
  }

  function claves(assignee: object) {
    return Object.keys(assignee).sort()
  }

  test('el detalle trae el nombre y las iniciales del responsable', async ({ client, assert }) => {
    const token = await sesion(client)
    const { responsable, tarea } = await tareaDe('Ada Lovelace')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.equal(response.body().data.assignee.id, responsable.id)
    assert.equal(response.body().data.assignee.fullName, 'Ada Lovelace')
    assert.equal(response.body().data.assignee.initials, 'AL')
  })

  test('la lista trae el nombre y las iniciales del responsable', async ({ client, assert }) => {
    const token = await sesion(client)
    const { responsable, tarea } = await tareaDe('Ada Lovelace')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const fila = response.body().data.find((t: { id: number }) => t.id === tarea.id)
    assert.exists(fila)
    assert.equal(fila.assignee.id, responsable.id)
    assert.equal(fila.assignee.fullName, 'Ada Lovelace')
    assert.equal(fila.assignee.initials, 'AL')
  })

  test('el detalle no incluye el email ni otros datos de la cuenta', async ({ client, assert }) => {
    const token = await sesion(client)
    const { tarea } = await tareaDe('Ada Lovelace', 'secreto-de-ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.notProperty(assignee, 'email')
    assert.deepEqual(claves(assignee), ['fullName', 'id', 'initials'])
    assert.notInclude(response.text(), 'secreto-de-ada@example.com')
  })

  test('la lista no incluye el email ni otros datos de la cuenta', async ({ client, assert }) => {
    const token = await sesion(client)
    await tareaDe('Ada Lovelace', 'secreto-de-ada@example.com')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.isNotEmpty(response.body().data)

    for (const fila of response.body().data) {
      assert.notProperty(fila.assignee, 'email')
      assert.deepEqual(claves(fila.assignee), ['fullName', 'id', 'initials'])
    }
    assert.notInclude(response.text(), 'secreto-de-ada@example.com')
  })

  test('la tarea recién creada no incluye el email del responsable', async ({ client, assert }) => {
    const token = await sesion(client, 'secreto-de-quien-crea@example.com')

    const response = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Apuntar algo' })

    response.assertStatus(201)

    const { assignee } = response.body().data
    assert.notProperty(assignee, 'email')
    assert.deepEqual(claves(assignee), ['fullName', 'id', 'initials'])
    assert.notInclude(response.text(), 'secreto-de-quien-crea@example.com')
  })

  test('la respuesta de un cambio de estado no incluye el email del responsable', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const { tarea } = await tareaDe('Ada Lovelace', 'secreto-de-ada@example.com')

    const response = await client
      .patch(`/api/v1/tasks/${tarea.id}/status`)
      .header('Authorization', `Bearer ${token}`)
      .json({ status: 'in_progress' })

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.notProperty(assignee, 'email')
    assert.deepEqual(claves(assignee), ['fullName', 'id', 'initials'])
    assert.notInclude(response.text(), 'secreto-de-ada@example.com')
  })

  test('la respuesta de un cambio de fecha no incluye el email del responsable', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const { tarea } = await tareaDe('Ada Lovelace', 'secreto-de-ada@example.com')

    const response = await client
      .put(`/api/v1/tasks/${tarea.id}/due-date`)
      .header('Authorization', `Bearer ${token}`)
      .json({ today: HOY, dueDate: '2026-06-30' })

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.notProperty(assignee, 'email')
    assert.deepEqual(claves(assignee), ['fullName', 'id', 'initials'])
    assert.notInclude(response.text(), 'secreto-de-ada@example.com')
  })

  test('un responsable sin nombre llega con nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const { tarea } = await tareaDe(null, 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
  })

  test('en la lista, un responsable sin nombre llega con nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const { tarea } = await tareaDe(null, 'ada@example.com')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const fila = response.body().data.find((t: { id: number }) => t.id === tarea.id)
    assert.exists(fila)
    assert.isNull(fila.assignee.fullName)
    assert.equal(fila.assignee.initials, 'AE')
  })
})
