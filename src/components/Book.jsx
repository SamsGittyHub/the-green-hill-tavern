import { Reveal, WordReveal } from './motion'
import { pub } from '../data/site'

export default function Book() {
  const mailto = `mailto:${pub.email}?subject=${encodeURIComponent('Table booking')}&body=${encodeURIComponent(
    'Name:\nDate:\nTime:\nNumber of people:\nAny dogs, highchairs or dietary needs?\n',
  )}`

  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-brass-400 py-24 text-forest-950 sm:py-28 lg:py-32">
      {/* Faint ruled lines, like a bookings ledger */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_47px,#0f1f18_47px,#0f1f18_48px)]" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal as="p" className="eyebrow text-forest-950/80">Bookings</Reveal>
        <WordReveal
          as="h2"
          id="book-title"
          lines={['We’ll keep a table', { text: 'by the fire.', italic: true }]}
          className="mx-auto mt-5 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-[400] leading-[0.92] tracking-[-0.035em]"
        />
        <Reveal as="p" className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-forest-950/80">
          Give us a ring to book. Sundays fill up fast, so call by Friday for a roast.
        </Reveal>
        <Reveal className="mt-10 flex flex-col items-center gap-5">
          {/* TODO: if you use an online booking system (ResDiary, OpenTable, Tablein...), point this button at it */}
          <a href={pub.phoneHref} className="btn btn-forest px-9 text-sm">
            Call {pub.phone} <span aria-hidden="true" className="arrow">&rarr;</span>
          </a>
          <a href={mailto} className="link-u is-underlined text-sm font-medium">or email us to book</a>
        </Reveal>
      </div>
    </section>
  )
}
