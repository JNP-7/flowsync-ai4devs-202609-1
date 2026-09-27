import { usePageTitle } from '../hooks/usePageTitle'

export function BuscadorNoticiasPage() {
  usePageTitle('Buscador de noticias')

  return (
    <section>
      <h1>Buscador de noticias</h1>
      <p>Próximamente podrás buscar noticias aquí.</p>
    </section>
  )
}
