# Design brief: The Green Hill Tavern

**Feel.** A painted-sign free house on a corner of the High Street: black-and-cream frontage, hanging baskets, a long pine bar with brass foot rail, quarry-tiled floors. The site should feel like the pub's signwriting and chalkboards, not like a restaurant chain or a SaaS template.

**Hero extraction.** Full-bleed photograph of the real frontage (Architecture C: Full-Bleed Subject). Deep-green scrim rising from the bottom-left. Viewport-scale serif headline anchored bottom-left, one brass CTA. Three hues only: green, cream, brass.

**Type.**
- Display: *Fraunces* (variable, optical size axis). High-contrast old-style serif with a soft, hand-cut quality; italics for warmth. Tight negative tracking at display sizes.
- Text: *Libre Franklin* (variable). Descended from Franklin Gothic, the face of Victorian/Edwardian signage and railway posters. Used small-caps-style for eyebrows (uppercase, wide tracking).
- Self-hosted via Fontsource (no third-party font requests).

**Palette.**
| Token | Hex | Use |
|---|---|---|
| `forest-950` | `#0f1f18` | deepest green, footer |
| `forest-900` | `#14291f` | primary dark surface |
| `forest-800` | `#1d3a2c` | raised dark surface |
| `brass-400` | `#c9a35c` | accents on dark (5.9:1 on forest-900) |
| `brass-700` | `#7a5c25` | accents/text on cream (5.2:1) |
| `cream-50` | `#f6efe0` | light surface, text on dark |
| `cream-100` | `#ece2cc` | alternate light surface |
| `wood-900` | `#24170f` | dark wood surface (gallery) |
| `ink` | `#1b1712` | body text on cream |

**Rhythm.** Hero (photo) → About (cream, asymmetric split) → marquee break (green) → Menu (forest, tabbed bill of fare with dotted leaders) → What's On (cream-100, timetable ledger) → Gallery (dark wood, asymmetric mosaic) → Reviews (cream, one featured quote) → Hours & Find Us (forest, split with map) → Bookings (brass band) → Footer (forest-950).

**Motion.** *Physical* personality, three curves: spring-snappy (entries/reveals), spring-smooth (tab indicator, state), ease-snap `cubic-bezier(.22,1,.36,1)` (hover). Masked word reveals on section headings, fade-up on body, clip-path wipes on photographs, slow hero parallax (desktop only). `prefers-reduced-motion` drops to opacity-only; marquee stops.
