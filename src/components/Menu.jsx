import { useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ImageReveal, Reveal, WordReveal, easeSnap, itemVariants, springs } from './motion'
import { menu } from '../data/site'

const tagLabels = { V: 'Vegetarian', VG: 'Vegan', GF: 'Gluten free', 'V option': 'Vegetarian option available' }

export default function Menu() {
  const [active, setActive] = useState(menu[0].id)
  const tabRefs = useRef({})
  const current = menu.find((m) => m.id === active)

  // WAI-ARIA tabs: arrow keys move between tabs, Home/End jump to the ends
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
    <section id="menu" aria-labelledby="menu-title" className="relative bg-forest-900 py-24 text-cream-50 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal as="p" className="eyebrow text-brass-400">Food &amp; drink</Reveal>
            <WordReveal
              as="h2"
              id="menu-title"
              lines={['From the kitchen', { text: '& the cellar', italic: true }]}
              className="mt-5 font-display text-[clamp(2.75rem,6.5vw,6rem)] font-[400] leading-[0.92] tracking-[-0.03em]"
            />
          </div>
          <Reveal as="p" className="max-w-sm text-[0.95rem] leading-relaxed text-cream-50/70">
            Cooked in-house from local suppliers. Tell us about allergies when you order and we’ll look after you.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {/* Tabs scroll sideways on small screens */}
            <Reveal className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
              <LayoutGroup id="menu-tabs">
                <div role="tablist" aria-label="Menu sections" className="flex min-w-max gap-1 border-b border-cream-50/15" onKeyDown={onKeyDown}>
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
                        className={`relative min-h-11 px-3 pb-3 pt-2 text-[0.8125rem] font-medium tracking-[0.06em] transition-colors duration-300 ease-(--ease-snap) sm:px-4 ${
                          selected ? 'text-brass-300' : 'text-cream-50/65 hover:text-cream-50'
                        }`}
                      >
                        {m.label}
                        {selected && (
                          <motion.span layoutId="tab-indicator" transition={springs.smooth}
                            className="absolute inset-x-3 -bottom-px h-[2px] bg-brass-400 sm:inset-x-4" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>
            </Reveal>

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
                className="pt-8 focus-visible:outline-offset-8"
              >
                <p className="text-sm italic text-cream-50/65">{current.note}</p>
                <motion.ul className="mt-6 divide-y divide-cream-50/10" initial="hidden" animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
                  {current.items.map((item) => (
                    <motion.li key={item.name} variants={itemVariants} className="group py-5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-[1.35rem] leading-snug tracking-[-0.01em] transition-colors duration-300 ease-(--ease-snap) group-hover:text-brass-300 sm:text-2xl">
                          {item.name}
                        </h3>
                        {item.tags?.map((t) => (
                          <abbr key={t} title={tagLabels[t]} className="shrink-0 rounded-full border border-cream-50/25 px-1.5 py-px text-[0.625rem] font-semibold tracking-[0.08em] text-cream-50/75 no-underline">
                            {t}
                          </abbr>
                        ))}
                        <span aria-hidden="true" className="leader" />
                        <p className="shrink-0 font-display text-xl tabular-nums text-brass-300">
                          <span className="sr-only">Price: </span>£{item.price}
                        </p>
                      </div>
                      <p className="mt-1.5 max-w-[52ch] text-[0.95rem] leading-relaxed text-cream-50/70">{item.desc}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>

            <Reveal as="p" className="mt-8 text-xs leading-relaxed text-cream-50/60">
              V vegetarian &middot; VG vegan &middot; GF gluten free. Our kitchen handles all 14 major allergens; full allergen information is available at the bar.
              {/* TODO: link to a downloadable allergen sheet / PDF menu if you have one */}
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <ImageReveal
                src="/images/bar-800.webp"
                srcSet="/images/bar-800.webp 800w, /images/bar.webp 1448w"
                sizes="40vw"
                alt="The long pine-panelled bar with hand pulls, racked glasses and a brass foot rail over a red and black tiled floor"
                loading="lazy"
                width="1448"
                height="1086"
                imgClassName="aspect-[4/5] w-full object-cover object-[30%_center]"
                className="rounded-[2px]"
              />
              <p className="mt-3 text-xs tracking-wide text-cream-50/60">The front bar. Ask what’s new on the pumps.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
