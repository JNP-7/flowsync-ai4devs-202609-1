export type NavLink = {
  type: 'link'
  label: string
  to: string
}

export type NavGroup = {
  type: 'group'
  label: string
  items: NavItem[]
}

export type NavItem = NavLink | NavGroup

export const flowsyncNavItems: NavItem[] = [
  {
    type: 'group',
    label: 'Sobre nosotros',
    items: [
      { type: 'link', label: 'Curso IA', to: '/sobre-nosotros/curso-ia' },
      { type: 'link', label: 'Contacta con nosotros', to: '/sobre-nosotros/contacto' },
    ],
  },
  {
    type: 'group',
    label: 'Actividades',
    items: [
      { type: 'link', label: 'Horarios', to: '/actividades/horarios' },
      {
        type: 'group',
        label: 'Noticias',
        items: [
          { type: 'link', label: 'Última hora', to: '/actividades/noticias/ultima-hora' },
          { type: 'link', label: 'Buscador de noticias', to: '/actividades/noticias/buscador' },
        ],
      },
    ],
  },
]
