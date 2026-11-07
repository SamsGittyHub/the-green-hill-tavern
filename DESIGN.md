# Design brief: The Green Hill Tavern (v2)

**Feel.** Taken straight from the building: black fascia boards with cream signwritten capitals ("ALES", "FOOD", "REAL ALES"), limewashed walls, a long pine bar with a brass rail. Light and printed rather than dark and moody. No film grain or noise overlays anywhere.

**Hero.** Asymmetric split (light). The pub's name set huge in a high-contrast serif on the left, with the real frontage in an arch-topped frame on the right, edged by a brass keyline. One CTA.

**Type.**
- Display: *DM Serif Display*. High-contrast, signwriter-style serif; also used in wide-tracked capitals (`.sign`) for board lettering.
- Text: *Instrument Sans* (variable).
- Self-hosted via Fontsource.

**Palette.**
| Token | Hex | Use |
|---|---|---|
| `fascia` | `#121a16` | sign boards, nav, menu backdrop, footer |
| `forest` | `#1f3a2d` | gallery, bookings, accents |
| `brass` | `#c39a52` | accents on dark |
| `brass-deep` | `#7a5a22` | accent text on paper (AA) |
| `paper` | `#f3ecdf` | main surface |
| `paper-2` | `#e9dfcc` | alternate surface |
| `ink` | `#1a1d1a` | body text |

**Sections.** Split hero (paper) → centred editorial About with drop cap + photo/facts (paper) → scrolling fascia boards (paper-2) → printed Bill of Fare card on the dark bar (fascia) → weekly fixtures as painted boards + dated ledger (paper-2) → full-bleed filmstrip gallery (forest) → giant rating + quotes (paper) → full-bleed map with hours card (paper-2) → arch-framed bookings (forest) → footer with full-width signwritten name (fascia).

**Motion.** Physical personality: spring-snappy reveals, spring-smooth tab pill, ease-snap hovers. Masked word reveals on headings, clip-path wipes on photos, slow parallax inside the hero arch (desktop only). `prefers-reduced-motion` drops to opacity-only and stops the marquee.
