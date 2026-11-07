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
    <footer className="bg-fascia pt-20 text-paper">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <p className="max-w-sm font-display text-[1.6rem] leading-snug text-paper/90">
              Free house, {pub.town}. Real ales, honest food and a warm welcome since {pub.established}.
            </p>
          </Reveal>

          <nav aria-label="Footer">
            <p className="label mb-4 text-[0.65rem] text-brass">Explore</p>
            <Stagger as="ul" className="space-y-2.5 text-sm" gap={0.04}>
              {nav.map(([href, label]) => (
                <StaggerItem as="li" key={href}>
                  <a href={href} className="link-u text-paper/80 hover:text-paper">{label}</a>
                </StaggerItem>
              ))}
            </Stagger>
          </nav>

          <Reveal className="text-sm leading-relaxed text-paper/80">
            <p className="label mb-4 text-[0.65rem] text-brass">Visit</p>
            <address className="not-italic">
              {pub.street}, {pub.town} {pub.postcode}<br />
              <a href={pub.phoneHref} className="link-u">{pub.phone}</a><br />
              <a href={`mailto:${pub.email}`} className="link-u break-all">{pub.email}</a>
            </address>
            <ul className="mt-6 flex gap-2">
              {Object.entries(pub.social).map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center border border-paper/20 text-paper/80 transition-[transform,color,border-color] duration-300 ease-(--ease-snap) hover:-translate-y-0.5 hover:border-brass hover:text-brass-light">
                    {Icon[name]}
                    <span className="sr-only">{name === 'facebook' ? 'Facebook' : 'Instagram'} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Full-width signwritten name, like the lettering on the gable end */}
      <Reveal className="mt-20 overflow-hidden border-y border-brass/25 py-6">
        <p aria-hidden="true" className="sign whitespace-nowrap text-center text-[clamp(1.6rem,6.2vw,6.5rem)] leading-none tracking-[0.08em] text-paper">
          The Green Hill <span className="text-brass">Tavern</span>
        </p>
      </Reveal>

      <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-4 py-6 text-xs text-paper/60 sm:flex-row sm:justify-between sm:px-6 lg:px-10">
        <p>&copy; {new Date().getFullYear()} {pub.name}. Please drink responsibly. <a href="https://www.drinkaware.co.uk" target="_blank" rel="noopener noreferrer" className="link-u is-underlined">drinkaware.co.uk</a></p>
        {/* TODO: add your company/licence details and a privacy policy link if you collect any data */}
        <p>Children welcome until 9pm. Dogs welcome any time.</p>
      </div>
    </footer>
  )
}
