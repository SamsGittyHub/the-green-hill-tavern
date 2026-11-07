import { useState } from 'react'

// Painted boards, like the fascia over the bay windows
const boards = ['Real Ales', 'Food', 'Sunday Roasts', 'Quiz Night', 'Live Music', 'Beer Garden', 'Dogs Welcome', 'Pool & Darts']

export default function Marquee() {
  const [paused, setPaused] = useState(false)
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {boards.map((t) => (
        <li key={t} className="fascia sign whitespace-nowrap px-7 py-3.5 text-[clamp(1rem,1.6vw,1.35rem)]">
          {t}
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="At the Green Hill" className="marquee relative overflow-hidden border-y border-ink/10 bg-paper-2 py-6" data-paused={paused}>
      <div className="marquee-track flex">
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-0 right-0 flex min-h-11 min-w-11 items-center justify-center bg-paper-2/90 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-ink motion-reduce:hidden"
      >
        {paused ? 'Play' : 'Pause'}<span className="sr-only"> scrolling signs</span>
      </button>
    </section>
  )
}
