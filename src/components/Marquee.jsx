import { useState } from 'react'

const items = ['Hand-pulled real ales', 'Sunday roasts', 'Thursday quiz', 'Live music Saturdays', 'Dogs welcome', 'Covered beer garden', 'Pool & darts']

export default function Marquee() {
  const [paused, setPaused] = useState(false)
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap font-display text-[clamp(1.5rem,3vw,2.5rem)] italic tracking-[-0.01em] text-cream-50">
          {t}
          <span aria-hidden="true" className="mx-8 inline-block h-2 w-2 rotate-45 bg-brass-400 sm:mx-12" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="At the Green Hill" className="marquee relative overflow-hidden border-y border-brass-400/20 bg-forest-800 py-6 sm:py-8" data-paused={paused}>
      <div className="marquee-track flex">
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-0 right-0 flex min-h-11 min-w-11 items-center justify-center px-3 text-[0.65rem] uppercase tracking-[0.14em] text-cream-50/60 hover:text-cream-50 motion-reduce:hidden"
      >
        {paused ? 'Play' : 'Pause'}<span className="sr-only"> scrolling text</span>
      </button>
    </section>
  )
}
