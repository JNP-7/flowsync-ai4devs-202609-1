import { Route, Routes } from 'react-router-dom'
import { Theme } from './components/Theme'
import { HomePage } from './pages/HomePage'
import { CursoIaPage } from './pages/CursoIaPage'
import { ContactoPage } from './pages/ContactoPage'
import { HorariosPage } from './pages/HorariosPage'
import { UltimaHoraPage } from './pages/UltimaHoraPage'
import { BuscadorNoticiasPage } from './pages/BuscadorNoticiasPage'

function App() {
  return (
    <Theme themeKey="flowsync">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-nosotros/curso-ia" element={<CursoIaPage />} />
        <Route path="/sobre-nosotros/contacto" element={<ContactoPage />} />
        <Route path="/actividades/horarios" element={<HorariosPage />} />
        <Route path="/actividades/noticias/ultima-hora" element={<UltimaHoraPage />} />
        <Route path="/actividades/noticias/buscador" element={<BuscadorNoticiasPage />} />
      </Routes>
    </Theme>
  )
}

export default App
