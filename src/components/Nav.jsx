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
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll, close on Escape, trap focus in the mobile panel
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = [btnRef.current, ...panelRef.current.querySelectorAll('a')]
        const idx = f.indexOf(document.activeElement)
        if (e.shiftKey && idx <= 0) { e.preventDefault(); f.at(-1).focus() }
        else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.snappy, opacity: { duration: 0.5, ease: easeSnap } }}
      className={`fixed inset-x-0 top-0 z-50 bg-fascia text-paper transition-shadow duration-500 ease-(--ease-snap) ${scrolled ? 'shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)]' : ''}`}
    >
      {/* Brass pinstripe along the bottom edge of the sign board */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-brass/40" />
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="sign group text-[0.95rem] text-paper sm:text-base" onClick={() => setOpen(false)}>
          <span className="transition-colors duration-300 ease-(--ease-snap) group-hover:text-brass-light">The Green Hill</span>{' '}
          <span className="text-brass">Tavern</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l, i) => (
            <motion.li key={l.href} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.snappy, delay: 0.08 + i * 0.05 }}>
              <a href={l.href} className="link-u text-[0.8rem] font-medium uppercase tracking-[0.14em] text-paper/80 hover:text-paper">
                {l.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#book" className="btn btn-brass hidden min-h-10 px-5 py-2 text-[0.8rem] sm:inline-flex">Book a table</a>
          <button
            ref={btnRef}
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
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
        </div>
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
            className="on-paper fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between overflow-y-auto bg-paper px-6 pb-10 pt-6 text-ink lg:hidden"
          >
            <ul className="divide-y divide-ink/10">
              {[...links, { href: '#book', label: 'Book a table' }].map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springs.snappy, delay: 0.04 + i * 0.05 }}>
                  <a href={l.href} onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-[2.4rem] leading-none text-ink active:text-brass-deep">
                    {l.label}
                    <span aria-hidden="true" className="text-xl text-brass-deep">&rarr;</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 text-sm text-ink/75">
              <p>{pub.street}, {pub.town} {pub.postcode}</p>
              <a href={pub.phoneHref} className="mt-1 inline-block font-semibold text-brass-deep">{pub.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
