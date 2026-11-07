import { ImageReveal, Reveal, Stagger, StaggerItem, WordReveal } from './motion'
import { regulars, upcoming } from '../data/site'

const dayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'Europe/London' })
const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', timeZone: 'Europe/London' })
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'Europe/London' })

export default function WhatsOn() {
  // Hide events that have already happened
  const today = new Date().toISOString().slice(0, 10)
  const next = upcoming.filter((e) => e.date >= today).slice(0, 5)

  return (
    <section id="whats-on" aria-labelledby="whats-on-title" className="on-light relative bg-cream-100 py-24 text-ink sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="p" className="eyebrow text-brass-700">What’s on</Reveal>
            <WordReveal
              as="h2"
              id="whats-on-title"
              lines={['Every week', { text: 'at the Green Hill', italic: true }]}
              className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-[400] leading-[1] tracking-[-0.025em] text-forest-900"
            />
            <Reveal as="p" className="mt-6 max-w-sm leading-relaxed text-ink/75">
              The regulars that keep the place going. Free to join in unless it says otherwise.
            </Reveal>
            <ImageReveal
              src="/images/games-room-800.webp"
              srcSet="/images/games-room-800.webp 800w, /images/games-room.webp 1448w"
              sizes="(min-width: 1024px) 35vw, 100vw"
              alt="The back room set up for a night in, with the pool table in the middle and a jukebox in the corner"
              loading="lazy"
              width="1448"
              height="1086"
              className="mt-10 hidden rounded-[2px] lg:block"
              imgClassName="aspect-[5/4] w-full object-cover"
            />
          </div>

          <Stagger as="ul" className="border-t border-forest-900/25 lg:col-span-7">
            {regulars.map((r) => (
              <StaggerItem as="li" key={r.day}
                className="group grid grid-cols-1 gap-1 border-b border-forest-900/15 py-6 transition-colors duration-300 ease-(--ease-snap) sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6 sm:py-7 sm:hover:bg-cream-50/60">
                <p className="eyebrow text-brass-700 sm:pl-3">{r.day}</p>
                <div>
                  <h3 className="font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-forest-900 sm:text-3xl">{r.title}</h3>
                  <p className="mt-1.5 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink/75">{r.desc}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-ink/70 sm:mt-0 sm:pr-3 sm:text-right">{r.time}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {next.length > 0 && (
          <div className="mt-24 lg:mt-32">
            <div className="flex items-end justify-between gap-6">
              <Reveal as="h3" className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] italic tracking-[-0.015em] text-forest-900">
                Coming up
              </Reveal>
              {/* TODO: link to your Facebook events page if you keep one */}
            </div>
            <Stagger as="ol" className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[2px] bg-forest-900/15 sm:grid-cols-2 lg:grid-cols-5">
              {next.map((e, i) => {
                const d = new Date(`${e.date}T12:00:00Z`)
                return (
                  <StaggerItem as="li" key={e.date + e.title}
                    className={`group flex flex-col bg-cream-100 p-6 transition-colors duration-300 ease-(--ease-snap) hover:bg-cream-50 ${i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:bg-forest-900 lg:text-cream-50 lg:hover:bg-forest-800' : ''}`}>
                    <time dateTime={e.date} className="flex items-baseline gap-2">
                      <span className={`font-display text-5xl leading-none tracking-[-0.03em] ${i === 0 ? 'text-forest-900 lg:text-brass-300' : 'text-forest-900'}`}>{dateFmt.format(d)}</span>
                      <span className={`eyebrow ${i === 0 ? 'text-brass-700 lg:text-cream-50/75' : 'text-brass-700'}`}>{dayFmt.format(d)} {monthFmt.format(d)}</span>
                    </time>
                    <p className={`eyebrow mt-6 text-[0.65rem] ${i === 0 ? 'text-ink/70 lg:text-cream-50/70' : 'text-ink/70'}`}>{e.kind}</p>
                    <h4 className="mt-1 font-display text-xl leading-snug">{e.title}</h4>
                    <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-ink/75 lg:text-cream-50/75' : 'text-ink/75'}`}>{e.desc}</p>
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
