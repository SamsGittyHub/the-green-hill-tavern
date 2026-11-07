import { Reveal, Stagger, StaggerItem } from './motion'
import { rating, reviews } from '../data/site'

export default function Reviews() {
  const featured = reviews.find((r) => r.featured)
  const rest = reviews.filter((r) => !r.featured)

  return (
    <section aria-labelledby="reviews-title" className="on-light relative bg-cream-50 py-24 text-ink sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Reveal as="h2" id="reviews-title" className="eyebrow text-brass-700">What the regulars say</Reveal>
          <Reveal as="p" className="text-sm text-ink/70">
            <span className="font-display text-2xl text-forest-900">{rating.score}</span> / 5 from {rating.count} {rating.source} reviews
          </Reveal>
        </div>

        <figure className="mt-10 lg:mt-14">
          <Reveal as="blockquote" className="max-w-5xl">
            <p className="font-display text-[clamp(1.85rem,4vw,3.6rem)] font-[360] leading-[1.12] tracking-[-0.02em] text-forest-900">
              <span aria-hidden="true" className="mr-1 text-brass-700">&ldquo;</span>
              {featured.quote}
              <span aria-hidden="true" className="text-brass-700">&rdquo;</span>
            </p>
          </Reveal>
          <Reveal as="figcaption" delay={0.08} className="mt-6 text-sm text-ink/70">
            <span className="font-semibold text-ink">{featured.name}</span> &middot; {featured.meta}
          </Reveal>
        </figure>

        <Stagger className="mt-16 grid grid-cols-1 gap-10 border-t border-forest-900/15 pt-10 md:grid-cols-2 md:gap-16 lg:ml-[33%] lg:mt-20">
          {rest.map((r) => (
            <StaggerItem as="figure" key={r.name}>
              <blockquote className="font-display text-xl italic leading-snug text-forest-900">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-ink/70">
                <span className="font-semibold text-ink">{r.name}</span> &middot; {r.meta}
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
