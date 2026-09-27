import { Link } from 'react-router-dom'
import './Footer.css'

type FooterProps = {
  orgName: string
  logoSrc: string
}

export function Footer({ orgName, logoSrc }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <img src={logoSrc} alt="" className="site-footer__logo" />
        <p>
          © {new Date().getFullYear()} {orgName}
        </p>
        <Link to="/" className="site-footer__link">
          Inicio
        </Link>
      </div>
    </footer>
  )
}
