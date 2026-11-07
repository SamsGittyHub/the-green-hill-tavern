import { Reveal, WordReveal } from './motion'
import { pub } from '../data/site'

export default function Book() {
  const mailto = `mailto:${pub.email}?subject=${encodeURIComponent('Table booking')}&body=${encodeURIComponent(
    'Name:\nDate:\nTime:\nNumber of people:\nAny dogs, highchairs or dietary needs?\n',
  )}`

  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-forest py-24 text-paper sm:py-32 lg:py-40">
      {/* Arch outline echoing the hero frame */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-12 h-[140%] w-[min(46rem,120vw)] -translate-x-1/2 rounded-t-[999px] border border-brass/25" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal as="p" className="label text-brass-light">Bookings</Reveal>
        <WordReveal
          as="h2"
          id="book-title"
          lines={['We’ll keep you', { text: 'a seat by the fire.', italic: true }]}
          className="mx-auto mt-6 text-balance font-display text-[clamp(2.8rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.015em] [&_.italic]:text-brass-light"
        />
        <Reveal as="p" className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-paper/80">
          Give us a ring to book. Sundays fill up fast, so call by Friday for a roast.
        </Reveal>
        <Reveal className="mt-10 flex flex-col items-center gap-5">
          {/* TODO: if you use an online booking system (ResDiary, OpenTable, Tablein...), point this button at it */}
          <a href={pub.phoneHref} className="btn btn-brass px-9">
            Call {pub.phone} <span aria-hidden="true" className="arrow">&rarr;</span>
          </a>
          <a href={mailto} className="link-u is-underlined text-sm font-medium text-paper/85">or email us to book</a>
        </Reveal>
      </div>
    </section>
  )
}
