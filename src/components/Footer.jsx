import { Reveal, Stagger, StaggerItem } from './motion'
import { pub } from '../data/site'

const nav = [
  ['#about', 'Our Pub'],
  ['#menu', 'Menu'],
  ['#whats-on', 'What’s On'],
  ['#gallery', 'Gallery'],
  ['#find-us', 'Find Us'],
  ['#book', 'Book a table'],
]

const Icon = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" /></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" className="fill-current" /></svg>
  ),
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 pb-10 pt-20 text-cream-50 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.95] tracking-[-0.03em]">
              The Green Hill <em className="text-brass-400">Tavern</em>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-50/65">
              Free house, {pub.town}. Real ales, honest food and a warm welcome since {pub.established}.
            </p>
          </Reveal>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4 text-[0.65rem] text-cream-50/60">Explore</p>
            <Stagger as="ul" className="space-y-2.5 text-sm" gap={0.04}>
              {nav.map(([href, label]) => (
                <StaggerItem as="li" key={href}>
                  <a href={href} className="link-u text-cream-50/80 hover:text-cream-50">{label}</a>
                </StaggerItem>
              ))}
            </Stagger>
          </nav>

          <Reveal className="text-sm leading-relaxed text-cream-50/80 md:col-span-4">
            <p className="eyebrow mb-4 text-[0.65rem] text-cream-50/60">Visit</p>
            <address className="not-italic">
              {pub.street}, {pub.town} {pub.postcode}
              <br />
              <a href={pub.phoneHref} className="link-u">{pub.phone}</a>
              <br />
              <a href={`mailto:${pub.email}`} className="link-u break-all">{pub.email}</a>
            </address>
            <ul className="mt-6 flex gap-2">
              {Object.entries(pub.social).map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/20 text-cream-50/80 transition-[transform,color,border-color] duration-300 ease-(--ease-snap) hover:-translate-y-0.5 hover:border-brass-400 hover:text-brass-300">
                    {Icon[name]}
                    <span className="sr-only">{name === 'facebook' ? 'Facebook' : 'Instagram'} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream-50/10 pt-6 text-xs text-cream-50/60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {pub.name}. Please drink responsibly. <a href="https://www.drinkaware.co.uk" target="_blank" rel="noopener noreferrer" className="link-u is-underlined">drinkaware.co.uk</a></p>
          {/* TODO: add your company/licence details and a privacy policy link if you collect any data */}
          <p>Children welcome until 9pm. Dogs welcome any time.</p>
        </div>
      </div>
    </footer>
  )
}
