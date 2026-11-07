import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { easeSnap, springs } from './motion'
import { pub } from '../data/site'

const links = [
  { href: '#about', label: 'Our Pub' },
  { href: '#menu', label: 'Menu' },
  { href: '#whats-on', label: 'What’s On' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#find-us', label: 'Find Us' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll, close on Escape, keep focus inside the mobile panel
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector('a')
    first?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = [btnRef.current, ...panelRef.current.querySelectorAll('a')]
        const idx = focusables.indexOf(document.activeElement)
        if (e.shiftKey && idx <= 0) { e.preventDefault(); focusables.at(-1).focus() }
        else if (!e.shiftKey && idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.snappy, opacity: { duration: 0.5, ease: easeSnap } }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-(--ease-snap) ${
        solid ? 'bg-forest-950/90 shadow-[0_1px_0_rgb(201_163_92/0.18)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-10">
        <a href="#top" className="group flex items-baseline gap-2 text-cream-50" onClick={() => setOpen(false)}>
          <span className="font-display text-xl leading-none tracking-[-0.01em] transition-transform duration-500 ease-(--ease-snap) group-hover:scale-[1.03] sm:text-[1.35rem]">
            The Green Hill <em className="text-brass-400">Tavern</em>
          </span>
          <span className="sr-only">, home</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l, i) => (
            <motion.li key={l.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ ...springs.snappy, delay: 0.1 + i * 0.05 }}>
              <a href={l.href} className="link-u text-[0.8125rem] font-medium tracking-[0.06em] text-cream-50/85 hover:text-cream-50">
                {l.label}
              </a>
            </motion.li>
          ))}
          <li>
            <a href="#book" className="btn btn-brass min-h-0 px-5 py-2.5 text-xs">Book a table</a>
          </li>
        </ul>

        <button
          ref={btnRef}
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center text-cream-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-(--ease-snap) ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ease-(--ease-snap) ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeSnap }}
            className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between overflow-y-auto bg-forest-950 px-6 pb-10 pt-8 lg:hidden"
          >
            <ul className="space-y-1">
              {[...links, { href: '#book', label: 'Book a table' }].map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springs.snappy, delay: 0.04 + i * 0.05 }}>
                  <a href={l.href} onClick={() => setOpen(false)}
                    className="block py-2 font-display text-[2.6rem] leading-tight tracking-[-0.02em] text-cream-50 active:text-brass-400">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 border-t border-cream-50/15 pt-6 text-sm text-cream-50/75">
              <p>{pub.street}, {pub.town} {pub.postcode}</p>
              <a href={pub.phoneHref} className="mt-1 inline-block text-brass-400">{pub.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
