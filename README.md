# The Green Hill Tavern

Website for **The Green Hill Tavern**, a traditional free house at 22 West Street, Riddings, Alfreton, Derbyshire DE55 4AS.

Single-page site with anchor navigation: About, Menu, What's On, Gallery, Reviews, Opening Hours & Find Us, Bookings.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (theme tokens in `src/index.css`)
- [Motion](https://motion.dev) for scroll reveals, word reveals and parallax (respects `prefers-reduced-motion`)
- Self-hosted fonts via Fontsource: Fraunces (display) and Libre Franklin (text)
- [`serve`](https://github.com/vercel/serve) for production static hosting

## Editing content

Almost everything a landlord would want to change lives in **`src/data/site.js`**: phone, email, opening hours, the menu and prices, weekly events, upcoming events, gallery photos and reviews. Search the project for `TODO` to find every placeholder.

Opening hours, phone and email also appear in the structured data (JSON-LD) in **`index.html`**; keep the two in sync so Google shows the right details.

Photos live in `public/images/` as WebP (a full-size file plus an `-800` version for phones).

## Local development

Requires Node 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # outputs to dist/
npm start          # serves dist/ on $PORT (default 3000)
```

`npm start` runs `serve -s dist -l tcp://0.0.0.0:$PORT`, so it works on any host that sets `PORT`.

## Deploying to Railway

1. Create a project in Railway and choose **Deploy from GitHub repo**, picking this repository (branch `main`).
2. Railway detects Node automatically. Set (or confirm) the service settings:
   - **Build command:** `npm run build`
   - **Start command:** `npm start`
3. In **Settings → Networking**, click **Generate Domain** to get a public `*.up.railway.app` URL.
4. Every push to `main` redeploys automatically.

If you add a custom domain, update the URLs in `index.html` (canonical, Open Graph, JSON-LD), `public/robots.txt` and `public/sitemap.xml`.

## Design

See [`DESIGN.md`](DESIGN.md) for the design brief: palette, type, section rhythm and motion rules.
