import { motion, useReducedMotion } from 'motion/react'

// PHYSICAL motion personality. Three curves only, mirroring the CSS tokens in index.css.
export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 1 },
  smooth: { type: 'spring', stiffness: 200, damping: 24, mass: 1 },
}
export const easeSnap = [0.22, 1, 0.36, 1]

const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -50px 0px' }
const RISE = 24 // single reveal distance used everywhere

/** Fade-up reveal on scroll. */
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...springs.snappy, delay, opacity: { duration: 0.6, ease: easeSnap, delay } }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Stagger container + item for lists and grids (stagger capped by the caller). */
export function Stagger({ as = 'div', className, children, gap = 0.08, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export const itemVariants = {
  hidden: { opacity: 0, y: RISE },
  visible: { opacity: 1, y: 0, transition: { ...springs.snappy, opacity: { duration: 0.6, ease: easeSnap } } },
}

export function StaggerItem({ as = 'div', className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={itemVariants} {...rest}>
      {children}
    </Comp>
  )
}

/**
 * Masked word-by-word heading reveal. Screen readers get the plain text via aria-label;
 * the animated word spans are hidden from the accessibility tree.
 * `lines` is an array of strings or { text, italic } objects; each renders on its own line.
 */
export function WordReveal({ as = 'h2', lines, className, delay = 0, animateOnMount = false, id }) {
  const reduce = useReducedMotion()
  const Tag = as
  const label = lines.map((l) => (typeof l === 'string' ? l : l.text)).join(' ')
  let i = 0
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT }

  return (
    <Tag id={id} className={className} aria-label={label}>
      <motion.span aria-hidden="true" className="block" {...trigger}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      >
        {lines.map((line, li) => {
          const text = typeof line === 'string' ? line : line.text
          const italic = typeof line === 'object' && line.italic
          return (
            <span key={li} className={`block ${italic ? 'italic' : ''}`}>
              {text.split(' ').map((word, wi) => {
                i += 1
                return (
                  <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={
                        reduce
                          ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
                          : {
                              hidden: { y: '105%' },
                              visible: { y: '0%', transition: springs.snappy },
                            }
                      }
                    >
                      {word}
                    </motion.span>
                    {wi < text.split(' ').length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

/**
 * Clip-path wipe reveal for photographs.
 * The observer sits on an unclipped wrapper: a fully clipped element never reports as intersecting.
 */
export function ImageReveal({ className, imgClassName = '', delay = 0, ...img }) {
  const reduce = useReducedMotion()
  const t = { duration: 0.9, ease: easeSnap, delay }
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
      <motion.div
        className="overflow-hidden"
        variants={
          reduce
            ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: t } }
            : { hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: t } }
        }
      >
        <motion.img
          {...img}
          className={imgClassName}
          variants={reduce ? undefined : { hidden: { scale: 1.12 }, visible: { scale: 1, transition: t } }}
        />
      </motion.div>
    </motion.div>
  )
}

/** Hairline rule that draws from the left. */
export function Rule({ className = '' }) {
  return (
    <motion.hr
      aria-hidden="true"
      className={`origin-left border-0 h-px ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: easeSnap }}
    />
  )
}
