import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { Link } from 'react-router-dom'
import type { NavItem } from '../navigation'
import './Nav.css'

type FocusableEl = HTMLAnchorElement | HTMLButtonElement

type MenuContextValue = {
  isActive: (key: string) => boolean
  isOpen: (key: string) => boolean
  registerRef: (key: string, el: FocusableEl | null) => void
  focus: (key: string) => void
  open: (key: string) => void
  close: (key: string) => void
  closeAll: () => void
  onNavigate?: () => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  const ctx = useContext(MenuContext)
  if (!ctx) {
    throw new Error('Nav components must be rendered inside <Nav>')
  }
  return ctx
}

function keyOf(path: number[]) {
  return path.join('.')
}

type NavProps = {
  items: NavItem[]
  onNavigate?: () => void
}

export function Nav({ items, onNavigate }: NavProps) {
  const [activeKey, setActiveKey] = useState(keyOf([0]))
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set())
  const refs = useRef(new Map<string, FocusableEl>())
  const pendingFocusKey = useRef<string | null>(null)

  useEffect(() => {
    if (pendingFocusKey.current) {
      refs.current.get(pendingFocusKey.current)?.focus()
      pendingFocusKey.current = null
    }
  })

  const registerRef = useCallback((key: string, el: FocusableEl | null) => {
    if (el) {
      refs.current.set(key, el)
    } else {
      refs.current.delete(key)
    }
  }, [])

  const focus = useCallback((key: string) => {
    setActiveKey(key)
    pendingFocusKey.current = key
  }, [])

  // Abrir un ítem deja abierta exactamente la cadena de sus ancestros + él mismo:
  // cierra hermanos (acordeón) y cualquier submenú anidado que hubiera quedado abierto antes.
  const open = useCallback((key: string) => {
    const parts = key.split('.')
    const chain = new Set<string>()
    for (let i = 1; i <= parts.length; i++) {
      chain.add(parts.slice(0, i).join('.'))
    }
    setOpenKeys(chain)
  }, [])

  const close = useCallback((key: string) => {
    setOpenKeys((current) => {
      const next = new Set(current)
      for (const existing of current) {
        if (existing === key || existing.startsWith(`${key}.`)) {
          next.delete(existing)
        }
      }
      return next
    })
  }, [])

  const closeAll = useCallback(() => setOpenKeys(new Set()), [])

  const isOpen = useCallback((key: string) => openKeys.has(key), [openKeys])
  const isActive = useCallback((key: string) => activeKey === key, [activeKey])

  return (
    <nav
      aria-label="Principal"
      className="nav"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeAll()
        }
      }}
    >
      <MenuContext.Provider
        value={{ isActive, isOpen, registerRef, focus, open, close, closeAll, onNavigate }}
      >
        <MenuLevel items={items} path={[]} role="menubar" />
      </MenuContext.Provider>
    </nav>
  )
}

type MenuLevelProps = {
  items: NavItem[]
  path: number[]
  role: 'menubar' | 'menu'
  id?: string
}

function MenuLevel({ items, path, role, id }: MenuLevelProps) {
  const { isOpen } = useMenuContext()
  const hidden = path.length > 0 && !isOpen(keyOf(path))

  return (
    <ul
      id={id}
      role={role}
      className={role === 'menubar' ? 'nav-list' : 'nav-submenu'}
      hidden={hidden}
    >
      {items.map((item, index) => (
        <MenuItem
          key={item.label}
          item={item}
          path={[...path, index]}
          orientation={role === 'menubar' ? 'horizontal' : 'vertical'}
          siblings={items}
        />
      ))}
    </ul>
  )
}

type MenuItemProps = {
  item: NavItem
  path: number[]
  orientation: 'horizontal' | 'vertical'
  siblings: NavItem[]
}

function MenuItem({ item, path, orientation, siblings }: MenuItemProps) {
  const ctx = useMenuContext()
  const submenuId = useId()
  const key = keyOf(path)
  const index = path[path.length - 1]
  const tabIndex = ctx.isActive(key) ? 0 : -1
  const isHorizontal = orientation === 'horizontal'

  function moveBy(delta: number) {
    const count = siblings.length
    const next = (index + delta + count) % count
    ctx.focus(keyOf([...path.slice(0, -1), next]))
  }

  function focusChild(last: boolean) {
    if (item.type !== 'group' || item.items.length === 0) return
    const childIndex = last ? item.items.length - 1 : 0
    ctx.focus(keyOf([...path, childIndex]))
  }

  function focusByChar(char: string) {
    const count = siblings.length
    for (let offset = 1; offset <= count; offset++) {
      const candidateIndex = (index + offset) % count
      if (siblings[candidateIndex].label.toLowerCase().startsWith(char)) {
        ctx.focus(keyOf([...path.slice(0, -1), candidateIndex]))
        return
      }
    }
  }

  function goBackToParent() {
    const parentPath = path.slice(0, -1)
    const parentKey = keyOf(parentPath)
    ctx.close(parentKey)
    ctx.focus(parentKey)
  }

  function handleKeyDown(event: ReactKeyboardEvent) {
    if ((isHorizontal && event.key === 'ArrowRight') || (!isHorizontal && event.key === 'ArrowDown')) {
      event.preventDefault()
      moveBy(1)
      return
    }
    if ((isHorizontal && event.key === 'ArrowLeft') || (!isHorizontal && event.key === 'ArrowUp')) {
      event.preventDefault()
      moveBy(-1)
      return
    }
    if (item.type === 'group' && isHorizontal && event.key === 'ArrowDown') {
      event.preventDefault()
      ctx.open(key)
      focusChild(false)
      return
    }
    if (item.type === 'group' && isHorizontal && event.key === 'ArrowUp') {
      event.preventDefault()
      ctx.open(key)
      focusChild(true)
      return
    }
    if (item.type === 'group' && !isHorizontal && event.key === 'ArrowRight') {
      event.preventDefault()
      ctx.open(key)
      focusChild(false)
      return
    }
    if (!isHorizontal && event.key === 'ArrowLeft') {
      event.preventDefault()
      goBackToParent()
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      ctx.focus(keyOf([...path.slice(0, -1), 0]))
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      ctx.focus(keyOf([...path.slice(0, -1), siblings.length - 1]))
      return
    }
    if (event.key === 'Escape') {
      if (path.length > 1) {
        event.preventDefault()
        event.stopPropagation()
        goBackToParent()
      } else if (item.type === 'group' && ctx.isOpen(key)) {
        event.preventDefault()
        event.stopPropagation()
        ctx.close(key)
      }
      return
    }
    if ((event.key === 'Enter' || event.key === ' ') && item.type === 'group') {
      event.preventDefault()
      ctx.open(key)
      focusChild(false)
      return
    }
    if (event.key === ' ' && item.type === 'link') {
      event.preventDefault()
      ;(event.currentTarget as HTMLAnchorElement).click()
      return
    }
    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      /[a-z0-9áéíóúñ]/i.test(event.key)
    ) {
      event.preventDefault()
      focusByChar(event.key.toLowerCase())
    }
  }

  if (item.type === 'link') {
    return (
      <li role="none" className="nav-item">
        <Link
          ref={(el) => ctx.registerRef(key, el)}
          role="menuitem"
          tabIndex={tabIndex}
          to={item.to}
          onKeyDown={handleKeyDown}
          onFocus={() => ctx.focus(key)}
          onClick={() => {
            ctx.closeAll()
            ctx.onNavigate?.()
          }}
        >
          {item.label}
        </Link>
      </li>
    )
  }

  const open = ctx.isOpen(key)
  // Horizontal (menús principales): abajo cerrado, arriba abierto.
  // Vertical (submenús): derecha cerrado, izquierda abierto.
  const chevronRotation = isHorizontal ? (open ? 180 : 0) : open ? 90 : -90

  return (
    <li role="none" className="nav-item nav-item--group">
      <button
        type="button"
        ref={(el) => ctx.registerRef(key, el)}
        role="menuitem"
        className="nav-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={submenuId}
        tabIndex={tabIndex}
        onKeyDown={handleKeyDown}
        onFocus={() => ctx.focus(key)}
        onClick={() => (open ? ctx.close(key) : ctx.open(key))}
      >
        {item.label}
        <svg
          className="nav-chevron"
          role="presentation"
          aria-hidden="true"
          style={{ transform: `rotate(${chevronRotation}deg)` }}
        >
          <use href="/icons.svg#chevron-icon" />
        </svg>
      </button>
      <MenuLevel id={submenuId} items={item.items} path={path} role="menu" />
    </li>
  )
}
