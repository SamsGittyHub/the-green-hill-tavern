import { Reveal, Stagger, StaggerItem } from './motion'
import { rating, reviews } from '../data/site'

export default function Reviews() {
  const featured = reviews.find((r) => r.featured)
  const rest = reviews.filter((r) => !r.featured)

  return (
    <section aria-labelledby="reviews-title" className="on-paper relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Giant rating as the visual anchor */}
        <div className="lg:col-span-4">
          <Reveal as="h2" id="reviews-title" className="label text-brass-deep">Overheard at the bar</Reveal>
          <Reveal className="mt-6">
            <p className="font-display text-[clamp(6rem,14vw,11rem)] leading-[0.8] tracking-[-0.03em] text-forest">{rating.score}</p>
            <p className="mt-4 text-sm text-ink/70">out of 5, from {rating.count} {rating.source} reviews</p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <figure>
            <Reveal as="blockquote">
              <p className="font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.12] text-fascia">
                <span aria-hidden="true" className="text-brass-deep">&ldquo;</span>{featured.quote}<span aria-hidden="true" className="text-brass-deep">&rdquo;</span>
              </p>
            </Reveal>
            <Reveal as="figcaption" delay={0.08} className="label mt-6 text-ink/70">
              {featured.name} &middot; {featured.meta}
            </Reveal>
          </figure>

          <Stagger className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/15 pt-10 md:grid-cols-2 md:gap-14">
            {rest.map((r) => (
              <StaggerItem as="figure" key={r.name}>
                <blockquote className="font-display text-[1.35rem] italic leading-snug text-fascia">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="label mt-4 text-ink/65">{r.name} &middot; {r.meta}</figcaption>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
