import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { WordReveal, easeSnap, springs } from './motion'
import { hours, pub } from '../data/site'
import { openStatus } from '../lib/hours'
import { useMedia } from '../lib/useMedia'

/**
 * Asymmetric split hero on paper: viewport-scale serif name on the left,
 * the real frontage in an arch-topped frame on the right.
 */
export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const desktop = useMedia('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const status = openStatus(hours)

  const rise = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.snappy, delay, opacity: { duration: 0.6, ease: easeSnap, delay } },
  })

  return (
    <section id="top" ref={ref} aria-label="Welcome" className="on-paper relative overflow-hidden bg-paper pt-16">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[90rem] grid-cols-1 gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-16 lg:pt-12">
        {/* Photo: arch-topped like a sash window, with a brass keyline set off the edge */}
        <motion.figure
          className="relative order-2 mx-auto w-full max-w-md self-center lg:order-2 lg:max-w-none lg:self-stretch"
          initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% -2rem -2rem -2rem)' }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(-2rem -2rem -2rem -2rem)' }}
          transition={{ duration: 0.9, ease: easeSnap, delay: 0.1 }}
        >
          <div aria-hidden="true" className="absolute -inset-2 bottom-10 rounded-t-[999px] border border-brass-deep/40 sm:-inset-3 sm:bottom-9" />
          <div className="relative aspect-[5/6] overflow-hidden rounded-t-[999px] bg-paper-3 lg:aspect-auto lg:h-[calc(100%-3rem)] lg:min-h-[30rem]">
            <motion.img
              src="/images/exterior-front.webp"
              srcSet="/images/exterior-front-800.webp 800w, /images/exterior-front.webp 1448w"
              sizes="(min-width: 1024px) 42vw, 90vw"
              alt="The cream-painted front of The Green Hill Tavern on a summer's day, with hanging baskets, a hanging pub sign and picnic benches"
              className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover object-[48%_center] will-change-transform"
              style={reduce || !desktop ? undefined : { y: imgY }}
              fetchPriority="high"
              loading="eager"
              width="1448"
              height="1086"
            />
          </div>
          <figcaption className="label mt-5 flex items-center justify-between text-ink/70">
            <span>{pub.street}</span>
            <span>{pub.town}, {pub.area}</span>
          </figcaption>
        </motion.figure>

        <div className="order-1 lg:order-1 lg:pb-2">
          <motion.p {...rise(0.05)} className="label flex items-center gap-3 text-brass-deep">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Free house &middot; Est. {pub.established}
          </motion.p>

          <WordReveal
            as="h1"
            animateOnMount
            delay={0.1}
            lines={['The Green', { text: 'Hill', italic: true }, 'Tavern']}
            className="mt-6 font-display text-[clamp(3.75rem,9.6vw,10rem)] leading-[0.86] tracking-[-0.02em] text-fascia [&_.italic]:text-forest"
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <motion.p {...rise(0.32)} className="max-w-[36ch] text-[1.075rem] leading-relaxed text-ink/80">
              Hand-pulled ales, a Sunday roast worth booking for and a quiz every Thursday. On the corner of West Street, {pub.town}, since {pub.established}.
            </motion.p>
            <motion.div {...rise(0.44)} className="flex flex-col items-start gap-3 sm:items-end">
              <a href="#book" className="btn btn-fascia">
                Book a table <span aria-hidden="true" className="arrow">&rarr;</span>
              </a>
              <p className="flex items-center gap-2 text-sm text-ink/70" aria-live="polite">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status.open ? 'bg-forest-2 shadow-[0_0_0_3px_rgb(43_74_58/0.18)]' : 'bg-ink/30'}`} />
                {status.text}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
