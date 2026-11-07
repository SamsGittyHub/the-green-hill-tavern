import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { WordReveal, easeSnap, springs } from './motion'
import { hours, pub } from '../data/site'
import { openStatus } from '../lib/hours'
import { useMedia } from '../lib/useMedia'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const desktop = useMedia('(min-width: 768px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const status = openStatus(hours)

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { ...springs.snappy, delay, opacity: { duration: 0.6, ease: easeSnap, delay }, filter: { duration: 0.6, ease: easeSnap, delay } },
  })

  return (
    <section id="top" ref={ref} aria-label="Welcome" className="relative isolate min-h-[100dvh] overflow-hidden bg-forest-950 text-cream-50">
      {/* Photograph: Ken Burns settle, then slow parallax on desktop */}
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        style={reduce || !desktop ? undefined : { y }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeSnap }}
      >
        <img
          src="/images/exterior-front.webp"
          srcSet="/images/exterior-front-800.webp 800w, /images/exterior-front.webp 1448w"
          sizes="100vw"
          alt="The cream-painted front of The Green Hill Tavern on a summer's day, with hanging baskets, a hanging pub sign and picnic benches"
          className="h-full w-full object-cover object-[60%_center] [filter:brightness(0.78)_saturate(0.8)] md:object-center"
          fetchPriority="high"
          loading="eager"
          width="1448"
          height="1086"
        />
      </motion.div>

      {/* Scrims: deep green rising from bottom-left keeps type readable */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest-800 opacity-60 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/25 md:via-forest-950/45 md:to-forest-950/15" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_0%_100%,rgb(15_31_24/0.85),transparent_70%)]" />

      <div className="mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:px-10 lg:pb-16">
        <motion.p {...fade(0.05)} className="eyebrow mb-5 text-brass-300 sm:mb-6">
          Free House &middot; {pub.street}, {pub.town}
        </motion.p>

        <WordReveal
          as="h1"
          animateOnMount
          delay={0.12}
          lines={['The Green Hill', { text: 'Tavern', italic: true }]}
          className="font-display font-[460] text-[clamp(3.4rem,12.5vw,11.5rem)] leading-[0.86] tracking-[-0.035em] [font-variation-settings:'opsz'_72] [text-shadow:0_2px_40px_rgb(15_31_24/0.35)]"
        />

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p {...fade(0.32)} className="max-w-[34ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed text-cream-50/85">
            Hand-pulled ales, Sunday roasts worth booking for, and a quiz on Thursdays. Your local since {pub.established}.
          </motion.p>

          <motion.div {...fade(0.44)} className="flex flex-col items-start gap-4 md:items-end">
            <a href="#book" className="btn btn-brass">
              Book a table <span aria-hidden="true" className="arrow">&rarr;</span>
            </a>
            <p className="flex items-center gap-2 text-sm text-cream-50/75" aria-live="polite">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-brass-400' : 'bg-cream-50/40'}`} />
              {status.text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
