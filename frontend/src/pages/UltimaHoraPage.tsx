import { usePageTitle } from '../hooks/usePageTitle'

export function UltimaHoraPage() {
  usePageTitle('Última hora')

  return (
    <section>
      <h1>Última hora</h1>
      <p>Próximamente encontrarás aquí las últimas noticias.</p>
    </section>
  )
}
