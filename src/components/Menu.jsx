import { useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Reveal, WordReveal, easeSnap, itemVariants, springs } from './motion'
import { menu } from '../data/site'

const tagLabels = { V: 'Vegetarian', VG: 'Vegan', GF: 'Gluten free', 'V option': 'Vegetarian option available' }

/** A printed bill of fare laid on the dark bar top. */
export default function Menu() {
  const [active, setActive] = useState(menu[0].id)
  const tabRefs = useRef({})
  const current = menu.find((m) => m.id === active)

  // WAI-ARIA tabs: arrows move between tabs, Home/End jump to the ends
  const onKeyDown = (e) => {
    const idx = menu.findIndex((m) => m.id === active)
    let next = null
    if (e.key === 'ArrowRight') next = (idx + 1) % menu.length
    if (e.key === 'ArrowLeft') next = (idx - 1 + menu.length) % menu.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = menu.length - 1
    if (next !== null) {
      e.preventDefault()
      setActive(menu[next].id)
      tabRefs.current[menu[next].id]?.focus()
    }
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-fascia py-24 text-paper sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal as="p" className="label text-brass">Food &amp; drink</Reveal>
            <WordReveal
              as="h2"
              id="menu-title"
              lines={['From the kitchen', { text: '& the cellar', italic: true }]}
              className="mt-5 font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.015em] [&_.italic]:text-brass-light"
            />
          </div>
          <Reveal as="p" className="max-w-sm text-[0.95rem] leading-relaxed text-paper/70">
            Cooked in-house from local suppliers. Tell us about any allergies when you order.
          </Reveal>
        </div>

        {/* The card */}
        <Reveal className="on-paper relative mt-14 bg-paper px-5 py-10 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)] sm:px-10 sm:py-14 lg:mt-20 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 border border-ink/15 sm:inset-4" />
          <div className="relative">
            <p className="sign text-center text-[clamp(1.4rem,2.4vw,2rem)] text-fascia">Bill of Fare</p>
            <div className="double-rule mx-auto mt-4 max-w-xs text-ink" aria-hidden="true" />

            <div className="-mx-5 mt-8 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
              <LayoutGroup id="menu-tabs">
                <div role="tablist" aria-label="Menu sections" onKeyDown={onKeyDown}
                  className="mx-auto flex w-max min-w-full justify-start gap-1 sm:justify-center">
                  {menu.map((m) => {
                    const selected = m.id === active
                    return (
                      <button
                        key={m.id}
                        ref={(el) => (tabRefs.current[m.id] = el)}
                        role="tab"
                        id={`tab-${m.id}`}
                        aria-selected={selected}
                        aria-controls={`panel-${m.id}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActive(m.id)}
                        className={`relative min-h-11 whitespace-nowrap px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ease-(--ease-snap) ${
                          selected ? 'text-paper' : 'text-ink/65 hover:text-ink'
                        }`}
                      >
                        {selected && (
                          <motion.span layoutId="tab-pill" transition={springs.smooth} aria-hidden="true"
                            className="absolute inset-0 -z-0 bg-forest" />
                        )}
                        <span className="relative">{m.label}</span>
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                role="tabpanel"
                id={`panel-${current.id}`}
                aria-labelledby={`tab-${current.id}`}
                tabIndex={0}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(2px)' }}
                transition={{ duration: 0.25, ease: easeSnap }}
                className="mt-8 focus-visible:outline-offset-8"
              >
                <p className="text-center font-display text-lg italic text-ink/70">{current.note}</p>
                <motion.ul
                  className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-2"
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
                >
                  {current.items.map((item) => (
                    <motion.li key={item.name} variants={itemVariants} className="group border-t border-ink/10 py-5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-[1.4rem] leading-snug text-fascia transition-colors duration-300 ease-(--ease-snap) group-hover:text-forest-2">
                          {item.name}
                        </h3>
                        <span aria-hidden="true" className="leader" />
                        <p className="shrink-0 font-display text-[1.3rem] tabular-nums text-brass-deep">
                          <span className="sr-only">Price: </span>£{item.price}
                        </p>
                      </div>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/75">
                        {item.desc}
                        {item.tags?.map((t) => (
                          <abbr key={t} title={tagLabels[t]} className="ml-2 inline-block border border-ink/25 px-1.5 text-[0.62rem] font-semibold tracking-[0.08em] text-ink/75 no-underline">
                            {t}
                          </abbr>
                        ))}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>

            <p className="mt-10 border-t border-ink/10 pt-6 text-center text-xs leading-relaxed text-ink/65">
              V vegetarian &middot; VG vegan &middot; GF gluten free. Our kitchen handles all 14 major allergens; full allergen information is at the bar.
              {/* TODO: link to a downloadable allergen sheet / PDF menu if you have one */}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
