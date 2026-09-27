import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { getTheme, type ThemeKey } from '../themes'
import './Theme.css'

type ThemeProps = {
  themeKey: ThemeKey
  hideHeader?: boolean
  hideFooter?: boolean
  children: ReactNode
}

export function Theme({ themeKey, hideHeader = false, hideFooter = false, children }: ThemeProps) {
  const theme = getTheme(themeKey)

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      {!hideHeader && (
        <Header orgName={theme.orgName} logoSrc={theme.logoSrc} navItems={theme.navItems} />
      )}
      <main id="main-content">{children}</main>
      {!hideFooter && <Footer orgName={theme.orgName} logoSrc={theme.logoSrc} />}
    </>
  )
}
