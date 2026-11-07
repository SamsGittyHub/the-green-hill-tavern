import { Reveal, Stagger, StaggerItem, WordReveal } from './motion'
import { hours, pub } from '../data/site'
import { fmt, londonNow } from '../lib/hours'

/** Full-bleed map with a paper hours card laid over it. */
export default function FindUs() {
  const { day: today } = londonNow()

  return (
    <section id="find-us" aria-labelledby="find-us-title" className="relative bg-paper-2 lg:min-h-[52rem]">
      <div className="relative h-[22rem] sm:h-[28rem] lg:absolute lg:inset-0 lg:h-auto">
        <iframe
          title="Map showing The Green Hill Tavern, 14 High Street, Ridden"
          src={pub.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.6)_sepia(0.25)_contrast(1.02)]"
        />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10 lg:py-20 lg:pointer-events-none">
        <Reveal className="on-paper relative -mt-16 bg-paper p-6 text-ink shadow-[0_30px_70px_-30px_rgb(18_26_22/0.55)] sm:p-10 lg:pointer-events-auto lg:mt-0 lg:ml-auto lg:w-[36rem]">
          <p className="label text-brass-deep">Opening hours &amp; find us</p>
          <WordReveal
            as="h2"
            id="find-us-title"
            lines={['The door’s open', { text: 'from noon.', italic: true }]}
            className="mt-4 font-display text-[clamp(2.2rem,3.6vw,3.2rem)] leading-[0.98] text-fascia [&_.italic]:text-forest"
          />

          <div className="mt-8 overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left text-[0.875rem] sm:text-[0.95rem]">
              <caption className="sr-only">Opening hours. Bar and kitchen times by day.</caption>
              <thead>
                <tr className="label text-[0.65rem] text-ink/60">
                  <th scope="col" className="pb-3 font-semibold">Day</th>
                  <th scope="col" className="pb-3 font-semibold">Bar</th>
                  <th scope="col" className="pb-3 font-semibold">Kitchen</th>
                </tr>
              </thead>
              <Stagger as="tbody" gap={0.04}>
                {hours.map((h) => {
                  const isToday = h.day === today
                  return (
                    <StaggerItem as="tr" key={h.day} aria-current={isToday ? 'date' : undefined}
                      className={`border-t border-ink/10 ${isToday ? 'bg-forest text-paper' : 'text-ink/85'}`}>
                      <th scope="row" className={`py-2.5 pr-3 font-semibold ${isToday ? 'pl-2' : ''}`}>
                        {h.label}
                        {isToday && <span className="sr-only"> (today)</span>}
                      </th>
                      <td className="py-2.5 pr-3 tabular-nums">{fmt(h.bar[0])}&ndash;{fmt(h.bar[1])}</td>
                      <td className="py-2.5 pr-2 tabular-nums">{fmt(h.kitchen[0])}&ndash;{fmt(h.kitchen[1])}</td>
                    </StaggerItem>
                  )
                })}
              </Stagger>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink/60">Bank holiday and Christmas hours may vary. We’ll post them here.</p>

          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-ink/15 pt-6 sm:grid-cols-[0.8fr_1.2fr]">
            <address className="not-italic leading-relaxed">
              <p className="label mb-2 text-[0.65rem] text-ink/60">Address</p>
              {pub.street}<br />{pub.town} {pub.postcode}
              <br />
              <a href={pub.directions} target="_blank" rel="noopener noreferrer" className="link-u is-underlined mt-2 inline-block text-sm font-semibold text-brass-deep">
                Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </address>
            <div className="leading-relaxed">
              <p className="label mb-2 text-[0.65rem] text-ink/60">Get in touch</p>
              <a href={pub.phoneHref} className="link-u">{pub.phone}</a><br />
              <a href={`mailto:${pub.email}`} className="link-u text-[0.9rem] [overflow-wrap:anywhere]">{pub.email}</a>
              {/* TODO: confirm parking/transport details */}
              <p className="mt-2 text-sm text-ink/65">Free car park beside the pub. Bus stop right outside.</p>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </section>
  )
}
