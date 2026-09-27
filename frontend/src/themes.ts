import logo from './assets/logo-generico.svg'
import { flowsyncNavItems, type NavItem } from './navigation'

export type ThemeKey = 'flowsync'

export type ThemeConfig = {
  orgName: string
  logoSrc: string
  navItems: NavItem[]
}

const themes: Record<ThemeKey, ThemeConfig> = {
  flowsync: {
    orgName: 'FlowSync',
    logoSrc: logo,
    navItems: flowsyncNavItems,
  },
}

export function getTheme(themeKey: ThemeKey): ThemeConfig {
  return themes[themeKey]
}
