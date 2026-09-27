import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Nav'
import type { NavItem } from '../navigation'
import './Header.css'

type HeaderProps = {
  orgName: string
  logoSrc: string
  navItems: NavItem[]
}

export function Header({ orgName, logoSrc, navItems }: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navId = useId()
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  function closeMobileNav() {
    setMobileNavOpen(false)
  }

  function handleNavKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && mobileNavOpen) {
      closeMobileNav()
      toggleButtonRef.current?.focus()
    }
  }

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link to="/" className="site-header__brand" onClick={closeMobileNav}>
          <img src={logoSrc} alt={orgName} className="site-header__logo" />
          <span className="site-header__org-name">{orgName}</span>
        </Link>
        <button
          type="button"
          ref={toggleButtonRef}
          className="site-header__nav-toggle"
          aria-expanded={mobileNavOpen}
          aria-controls={navId}
          aria-label={mobileNavOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMobileNavOpen((value) => !value)}
        >
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href={`/icons.svg#${mobileNavOpen ? 'close-icon' : 'menu-icon'}`} />
          </svg>
        </button>
      </div>
      <div
        id={navId}
        className={`site-header__nav${mobileNavOpen ? ' site-header__nav--open' : ''}`}
        onKeyDown={handleNavKeyDown}
      >
        <Nav items={navItems} onNavigate={closeMobileNav} />
      </div>
    </header>
  )
}
