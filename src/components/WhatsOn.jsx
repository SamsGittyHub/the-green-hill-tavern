import { ImageReveal, Reveal, Stagger, StaggerItem, WordReveal } from './motion'
import { regulars, upcoming } from '../data/site'

const fmt = (opts) => new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'Europe/London' })
const dayFmt = fmt({ weekday: 'long' })
const dateFmt = fmt({ day: 'numeric' })
const monthFmt = fmt({ month: 'short' })

export default function WhatsOn() {
  const today = new Date().toISOString().slice(0, 10)
  const next = upcoming.filter((e) => e.date >= today).slice(0, 5)

  return (
    <section id="whats-on" aria-labelledby="whats-on-title" className="on-paper relative bg-paper-2 py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal as="p" className="label text-brass-deep">What’s on</Reveal>
            <WordReveal
              as="h2"
              id="whats-on-title"
              lines={['Every week', { text: 'at the Green Hill', italic: true }]}
              className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.01em] text-fascia [&_.italic]:text-forest"
            />
          </div>
          <Reveal as="p" className="max-w-xs text-[0.95rem] leading-relaxed text-ink/75">
            The regulars that keep the place going. Free to join in unless it says otherwise.
          </Reveal>
        </div>

        {/* Weekly fixtures as painted boards. Snap-scroll sideways on phones. */}
        <Stagger as="ul" className="strip -mx-4 mt-12 flex gap-3 overflow-x-auto px-4 scroll-px-4 pb-2 sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {regulars.map((r) => (
            <StaggerItem as="li" key={r.day}
              className="fascia group flex w-[78vw] max-w-[20rem] shrink-0 flex-col p-7 transition-transform duration-500 ease-(--ease-snap) sm:w-[18rem] lg:w-auto lg:max-w-none lg:hover:-translate-y-1">
              <p className="sign text-[0.85rem] text-brass">{r.day}</p>
              <h3 className="mt-8 font-display text-[1.9rem] leading-[1.05]">{r.title}</h3>
              <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-paper/75">{r.desc}</p>
              <p className="label mt-6 border-t border-brass/25 pt-4 text-brass-light">{r.time}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {next.length > 0 && (
          <div className="mt-24 grid grid-cols-1 gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal as="h3" className="font-display text-[clamp(2rem,3vw,2.75rem)] italic text-fascia">Coming up</Reveal>
              <ImageReveal
                src="/images/games-room-800.webp"
                srcSet="/images/games-room-800.webp 800w, /images/games-room.webp 1448w"
                sizes="(min-width: 1024px) 38vw, 100vw"
                alt="The back room set up for a night in, with the pool table in the middle and a jukebox in the corner"
                loading="lazy"
                width="1448"
                height="1086"
                className="mt-8 hidden lg:block"
                imgClassName="aspect-[4/3] w-full object-cover"
              />
              {/* TODO: link to your Facebook events page if you keep one */}
            </div>
            <Stagger as="ol" className="border-t border-ink/20 lg:col-span-7">
              {next.map((e) => {
                const d = new Date(`${e.date}T12:00:00Z`)
                return (
                  <StaggerItem as="li" key={e.date + e.title}
                    className="grid grid-cols-[4.5rem_1fr] gap-5 border-b border-ink/15 py-6 sm:grid-cols-[6.5rem_1fr_auto] sm:items-baseline sm:gap-8">
                    <time dateTime={e.date} className="font-display leading-none text-fascia">
                      <span className="block text-[3.2rem] sm:text-[3.8rem]">{dateFmt.format(d)}</span>
                      <span className="label mt-2 block text-brass-deep">{monthFmt.format(d)}</span>
                    </time>
                    <div>
                      <p className="label text-ink/65">{dayFmt.format(d)} &middot; {e.kind}</p>
                      <h4 className="mt-2 font-display text-[1.6rem] leading-tight text-fascia">{e.title}</h4>
                      <p className="mt-2 max-w-[48ch] text-[0.95rem] leading-relaxed text-ink/75">{e.desc}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        )}
      </div>
    </section>
  )
}
