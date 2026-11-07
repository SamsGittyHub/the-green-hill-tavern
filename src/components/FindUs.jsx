import { Reveal, Stagger, StaggerItem, WordReveal } from './motion'
import { hours, pub } from '../data/site'
import { fmt, londonNow } from '../lib/hours'

export default function FindUs() {
  const { day: today } = londonNow()

  return (
    <section id="find-us" aria-labelledby="find-us-title" className="relative bg-forest-900 text-cream-50">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full px-4 py-24 sm:px-6 sm:py-28 lg:ml-auto lg:max-w-[40rem] lg:px-10 lg:py-32 lg:pr-16">
          <Reveal as="p" className="eyebrow text-brass-400">Opening hours &amp; find us</Reveal>
          <WordReveal
            as="h2"
            id="find-us-title"
            lines={['The door’s open', { text: 'from noon', italic: true }]}
            className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-[400] leading-[1] tracking-[-0.025em]"
          />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left text-[0.875rem] sm:text-[0.95rem]">
              <caption className="sr-only">Opening hours. Bar and kitchen times by day.</caption>
              <thead>
                <tr className="eyebrow text-[0.65rem] text-cream-50/60">
                  <th scope="col" className="pb-3 font-semibold">Day</th>
                  <th scope="col" className="pb-3 font-semibold">Bar</th>
                  <th scope="col" className="pb-3 font-semibold">Kitchen</th>
                </tr>
              </thead>
              <Stagger as="tbody" gap={0.04}>
                {hours.map((h) => {
                  const isToday = h.day === today
                  return (
                    <StaggerItem as="tr" key={h.day}
                      className={`border-t border-cream-50/10 ${isToday ? 'text-brass-300' : 'text-cream-50/85'}`}
                      aria-current={isToday ? 'date' : undefined}>
                      <th scope="row" className="py-3 pr-3 font-medium sm:pr-4">
                        {h.label}
                        {isToday && <span className="eyebrow ml-2 text-[0.6rem] text-brass-400"><span aria-hidden="true" className="sm:hidden">&bull;</span><span className="sr-only sm:not-sr-only">Today</span></span>}
                      </th>
                      <td className="py-3 pr-3 tabular-nums sm:pr-4">{fmt(h.bar[0])} &ndash; {fmt(h.bar[1])}</td>
                      <td className="py-3 tabular-nums">{fmt(h.kitchen[0])} &ndash; {fmt(h.kitchen[1])}</td>
                    </StaggerItem>
                  )
                })}
              </Stagger>
            </table>
          </div>
          <Reveal as="p" className="mt-4 text-xs text-cream-50/60">Bank holiday and Christmas hours may vary. We’ll post them here.</Reveal>

          <Reveal className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <address className="not-italic leading-relaxed">
              <p className="eyebrow mb-2 text-[0.65rem] text-cream-50/60">Address</p>
              {pub.street}<br />{pub.town}<br />{pub.postcode}
              <br />
              <a href={pub.directions} target="_blank" rel="noopener noreferrer" className="link-u is-underlined mt-3 inline-block text-sm text-brass-300">
                Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </address>
            <div className="leading-relaxed">
              <p className="eyebrow mb-2 text-[0.65rem] text-cream-50/60">Get in touch</p>
              <a href={pub.phoneHref} className="link-u">{pub.phone}</a><br />
              <a href={`mailto:${pub.email}`} className="link-u break-all">{pub.email}</a>
              {/* TODO: confirm parking/transport details */}
              <p className="mt-3 text-sm text-cream-50/65">Free car park beside the pub. Bus stop right outside.</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative min-h-[22rem] lg:min-h-full">
          <iframe
            title="Map showing The Green Hill Tavern, 14 High Street, Ridden"
            src={pub.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.55)_sepia(0.2)_contrast(1.05)]"
          />
        </Reveal>
      </div>
    </section>
  )
}
