import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Reveal, WordReveal, easeSnap } from './motion'
import { gallery } from '../data/site'

// Asymmetric mosaic positions for the first four photos (12-col grid on desktop)
const layout = [
  'aspect-[4/3] sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:aspect-auto',
  'aspect-[4/3] lg:col-span-5 lg:aspect-auto',
  'aspect-[4/3] lg:col-span-5 lg:aspect-auto',
  'aspect-[16/10] sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:aspect-auto',
]

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const dialogRef = useRef(null)
  const lastTrigger = useRef(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
  }, [index])

  const open = (i, e) => {
    lastTrigger.current = e.currentTarget
    setIndex(i)
  }
  const close = () => {
    setIndex(null)
    lastTrigger.current?.focus()
  }
  const step = (dir) => setIndex((i) => (i + dir + gallery.length) % gallery.length)

  const photo = index !== null ? gallery[index] : null

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-wood-900 py-24 text-cream-50 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <WordReveal
            as="h2"
            id="gallery-title"
            lines={[{ text: 'Pull up a stool', italic: true }]}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-[380] leading-none tracking-[-0.03em]"
          />
          <Reveal as="p" className="eyebrow text-brass-400">Inside &amp; out</Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:auto-rows-[clamp(13rem,19vw,17rem)]">
          {gallery.map((g, i) => (
            <motion.li
              key={g.src}
              className={`relative overflow-hidden rounded-[2px] bg-wood-800 ${layout[i] ?? 'lg:col-span-4 aspect-[4/3]'}`}
              initial={{ opacity: 0, clipPath: 'inset(12% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: easeSnap, delay: Math.min(i, 5) * 0.08 }}
            >
              <button
                type="button"
                onClick={(e) => open(i, e)}
                className="group absolute inset-0 block h-full w-full cursor-zoom-in"
                aria-label={`View larger: ${g.alt}`}
              >
                <img
                  src={g.small}
                  srcSet={`${g.small} 800w, ${g.src} ${g.w}w`}
                  sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw"
                  alt=""
                  loading="lazy"
                  width={g.w}
                  height={g.h}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-(--ease-snap) group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-wood-900/40 to-transparent opacity-0 transition-opacity duration-500 ease-(--ease-snap) group-hover:opacity-100" />
              </button>
            </motion.li>
          ))}

          {/* Chalkboard tile, taken from the board on the bar */}
          <Reveal as="li" className="flex min-h-52 flex-col justify-between gap-10 rounded-[2px] border border-brass-400/25 bg-forest-900 p-6 sm:col-span-2 sm:p-8 lg:col-span-4 lg:row-span-2 lg:aspect-auto">
            <p className="eyebrow text-brass-400">On the bar</p>
            <p className="font-display text-[clamp(2rem,3vw,2.75rem)] italic leading-[1.02] tracking-[-0.02em]">
              Good drinks.<br />Good times.
            </p>
          </Reveal>
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label={photo ? photo.alt : 'Photo viewer'}
        className="m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-0 text-cream-50 backdrop:bg-forest-950/90 backdrop:backdrop-blur-sm"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        {photo && (
          <figure className="flex flex-col items-center gap-4 p-4">
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: easeSnap }}
              className="max-h-[78dvh] w-auto max-w-[min(92vw,1400px)] object-contain"
            />
            <figcaption className="max-w-2xl text-center text-sm text-cream-50/80">{photo.alt}</figcaption>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step(-1)} className="btn min-h-11 border border-cream-50/25 px-5 py-2 text-xs text-cream-50">
                <span aria-hidden="true">&larr;</span> Prev
              </button>
              <button type="button" onClick={close} className="btn btn-brass min-h-11 px-5 py-2 text-xs" autoFocus>Close</button>
              <button type="button" onClick={() => step(1)} className="btn min-h-11 border border-cream-50/25 px-5 py-2 text-xs text-cream-50">
                Next <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  )
}
