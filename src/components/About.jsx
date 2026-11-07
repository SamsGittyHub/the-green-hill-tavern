import { ImageReveal, Reveal, Rule, Stagger, StaggerItem, WordReveal } from './motion'

// TODO: confirm these facts (cask lines, dogs, garden etc.)
const facts = [
  ['Free house', 'No brewery tie. We pour what we like.'],
  ['Four cask lines', 'Rotating guests from small local breweries.'],
  ['Dogs welcome', 'Water bowls by the door, biscuits behind the bar.'],
  ['Covered garden', 'Benches out front and a timber gazebo for wet days.'],
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-paper relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        {/* Centred editorial lede */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="p" className="label text-brass-deep">Our pub</Reveal>
          <WordReveal
            as="h2"
            id="about-title"
            lines={['A corner local with', { text: 'a long memory.', italic: true }]}
            className="mt-6 text-balance font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.015em] text-fascia [&_.italic]:text-forest"
          />
        </div>
        {/* TODO: replace with the pub's real history */}
        <Reveal as="p" className="mx-auto mt-12 max-w-2xl text-[1.15rem] leading-[1.8] text-ink/80 first-letter:float-left first-letter:mr-2 first-letter:mt-1.5 first-letter:font-display first-letter:text-[4.6rem] first-letter:leading-[0.78] first-letter:text-brass-deep">
          The Green Hill started life as a coaching inn for carters coming in off the Ridden road. The bay windows went in around the
          turn of the last century, the long pine bar has been polished by elbows ever since, and it’s been a free house, pouring
          whatever we think is good, for as long as anyone at the bar can tell you.
        </Reveal>

        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ImageReveal
              src="/images/exterior-corner-800.webp"
              srcSet="/images/exterior-corner-800.webp 800w, /images/exterior-corner.webp 1560w"
              sizes="(min-width: 1024px) 55vw, 100vw"
              alt="The white gable end of the pub on the corner of West Street, painted with the words The Greenhill Tavern Free House"
              loading="lazy"
              width="1560"
              height="986"
              imgClassName="aspect-[16/10] w-full object-cover object-[45%_center]"
            />
            <Reveal as="p" className="label mt-4 text-ink/60">The West Street gable, still signwritten by hand</Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal as="p" className="font-display text-[1.65rem] leading-snug text-fascia">
              Today you’ll find a well-kept house bitter, a rotating guest or three, honest food from the kitchen and a fire going from October.
            </Reveal>
            <Rule className="mt-10 bg-ink/20" />
            <Stagger as="ol" className="divide-y divide-ink/10">
              {facts.map(([t, d], i) => (
                <StaggerItem as="li" key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5">
                  <span aria-hidden="true" className="font-display text-xl italic text-brass-deep">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="sign text-[0.95rem] text-fascia">{t}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/75">{d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
