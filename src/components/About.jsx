import { ImageReveal, Reveal, Rule, Stagger, StaggerItem, WordReveal } from './motion'
import { pub } from '../data/site'

// TODO: confirm these facts (cask lines, dogs, parking etc.)
const facts = [
  ['Free house', 'No brewery tie. We pour what we like.'],
  ['Four cask lines', 'Rotating guests from small local breweries.'],
  ['Dogs welcome', 'Water bowls by the door, biscuits behind the bar.'],
  ['Covered garden', 'Benches out front and a timber gazebo for wet days.'],
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-light relative bg-cream-50 py-24 text-ink sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-7 lg:pr-8">
          <Reveal as="p" className="eyebrow text-brass-700">Our pub &middot; Est. {pub.established}</Reveal>
          <WordReveal
            as="h2"
            id="about-title"
            lines={['On the corner of High Street and West Street,', { text: 'pouring pints since before anyone can remember.', italic: true }]}
            className="mt-6 text-balance font-display text-[clamp(2.2rem,4.6vw,4.25rem)] font-[380] leading-[1.02] tracking-[-0.025em] text-forest-900"
          />
          {/* TODO: replace with the pub's real history */}
          <div className="mt-10 grid max-w-2xl gap-6 text-[1.0625rem] leading-[1.75] text-ink/80 sm:grid-cols-2 sm:gap-8">
            <Reveal as="p">
              The Green Hill started life as a coaching inn for carters coming in off the Ridden road. The bay windows went in
              around the turn of the last century, and the long pine bar has been polished by elbows ever since.
            </Reveal>
            <Reveal as="p" delay={0.08}>
              Today it’s a free house, which means no brewery tells us what to pour. Expect a well-kept house bitter, a
              rotating guest or three, honest food from the kitchen and a fire going from October.
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-24">
          <ImageReveal
            src="/images/exterior-corner-800.webp"
            srcSet="/images/exterior-corner-800.webp 800w, /images/exterior-corner.webp 1560w"
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt="The white gable end of the pub on the corner of West Street, painted with the words The Greenhill Tavern Free House"
            loading="lazy"
            width="1560"
            height="986"
            className="rounded-[2px] shadow-[0_30px_60px_-30px_rgb(20_41_31/0.45)]"
            imgClassName="aspect-[4/3] w-full object-cover object-[45%_center]"
          />
          <Reveal as="p" className="mt-3 text-xs tracking-wide text-ink/60">The West Street gable, still signwritten by hand.</Reveal>

          <Rule className="mt-12 bg-forest-900/20" />
          <Stagger as="dl" className="divide-y divide-forest-900/15">
            {facts.map(([t, d]) => (
              <StaggerItem key={t} className="grid grid-cols-[minmax(0,9.5rem)_1fr] gap-4 py-4">
                <dt className="font-display text-lg italic text-forest-900">{t}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink/75">{d}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
