import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Reveal, WordReveal, easeSnap } from './motion'
import { gallery } from '../data/site'

/** Full-bleed horizontal filmstrip with arrow controls and a lightbox. */
export default function Gallery() {
  const [index, setIndex] = useState(null)
  const dialogRef = useRef(null)
  const stripRef = useRef(null)
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
  const scroll = (dir) => {
    const el = stripRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reduce ? 'auto' : 'smooth' })
  }

  const photo = index !== null ? gallery[index] : null

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-hidden bg-forest py-24 text-paper sm:py-32">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-10">
        <div>
          <Reveal as="p" className="label text-brass-light">Inside &amp; out</Reveal>
          <WordReveal
            as="h2"
            id="gallery-title"
            lines={[{ text: 'Pull up a stool.', italic: true }]}
            className="mt-5 font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-none"
          />
        </div>
        <Reveal className="flex gap-2">
          {[[-1, 'Previous photos', '←'], [1, 'Next photos', '→']].map(([dir, label, glyph]) => (
            <button key={dir} type="button" onClick={() => scroll(dir)} aria-label={label}
              className="flex h-12 w-12 items-center justify-center border border-paper/30 text-lg transition-[background-color,color,transform] duration-300 ease-(--ease-snap) hover:bg-paper hover:text-forest active:scale-95">
              <span aria-hidden="true">{glyph}</span>
            </button>
          ))}
        </Reveal>
      </div>

      <ul ref={stripRef} className="strip mt-12 flex gap-4 overflow-x-auto px-4 scroll-px-4 sm:px-6 sm:scroll-px-6 lg:px-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] lg:scroll-px-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]" aria-label="Photos of the pub">
        {gallery.map((g, i) => (
          <motion.li
            key={g.src}
            className="relative h-[58vh] max-h-[34rem] min-h-[18rem] shrink-0 overflow-hidden bg-forest-2"
            style={{ aspectRatio: `${g.w} / ${g.h}`, maxWidth: '86vw' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeSnap, delay: Math.min(i, 5) * 0.08 }}
          >
            <button type="button" onClick={(e) => open(i, e)} aria-label={`View larger: ${g.alt}`}
              className="group absolute inset-0 block h-full w-full cursor-zoom-in">
              <img
                src={g.small}
                srcSet={`${g.small} 800w, ${g.src} ${g.w}w`}
                sizes="(min-width: 1024px) 50vw, 86vw"
                alt=""
                loading="lazy"
                width={g.w}
                height={g.h}
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-(--ease-snap) group-hover:scale-[1.04]"
              />
            </button>
          </motion.li>
        ))}
        <motion.li
          className="fascia flex h-[58vh] max-h-[34rem] min-h-[18rem] w-[78vw] max-w-[24rem] shrink-0 flex-col justify-between p-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeSnap }}
        >
          <p className="label text-brass">On the chalkboard</p>
          <p className="font-display text-[clamp(2.2rem,3.2vw,3rem)] italic leading-[1.02]">Good drinks.<br />Good times.</p>
        </motion.li>
        <li aria-hidden="true" className="w-px shrink-0" />
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label={photo ? photo.alt : 'Photo viewer'}
        className="m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-0 text-paper backdrop:bg-fascia/92"
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
            <figcaption className="max-w-2xl text-center text-sm text-paper/80">{photo.alt}</figcaption>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step(-1)} className="btn min-h-11 border border-paper/30 px-5 py-2 text-xs text-paper">
                <span aria-hidden="true">&larr;</span> Prev
              </button>
              <button type="button" onClick={close} className="btn btn-brass min-h-11 px-5 py-2 text-xs" autoFocus>Close</button>
              <button type="button" onClick={() => step(1)} className="btn min-h-11 border border-paper/30 px-5 py-2 text-xs text-paper">
                Next <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  )
}
