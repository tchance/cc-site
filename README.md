# tylerchance.info

Personal site for [Tyler Chance](https://www.linkedin.com/in/tylerscottchance/), VP of Product at Hearst Magazines. Two pages, no build step, plain HTML + CSS + JS. Deployed on Netlify at [tylerchance.info](https://www.tylerchance.info).

## Layout

```
index.html          Home: hero, beliefs, selected work, CTA
about.html          Full résumé with expandable roles, skills, contact
site.css            Tokens + all component styles (shared by both pages)
site.js             Live sync clock + résumé expand/collapse (shared)
print.css           Paper styles: black-on-white, all rows opened, URLs printed
robots.txt          Allow-all + sitemap pointer
sitemap.xml         Both canonical URLs
llms.txt            Plain-text site overview for AI crawlers
site.webmanifest    PWA metadata (name, theme color, icons)
favicon*.{svg,png}  Scalable + 32px legacy + 180px iOS + 512px PWA
apple-touch-icon.png
```

Per-page differences (e.g. which hero animation delay to use) are driven by a `data-page="home"` / `data-page="about"` attribute on `<body>` and selected against in `site.css`. Keep that pattern if you add a third page.

## Content

All page content is static HTML in `index.html` and `about.html` — no runtime templating. AI crawlers that don't run JS still see everything. Editing the résumé, beliefs, or dispatches means editing the HTML directly.

## SEO / GEO

- JSON-LD `Person` schema inline on both pages; `/about` adds a `WebPage` node via `@graph`.
- Open Graph + Twitter card tags.
- Canonical URLs point at `https://www.tylerchance.info`.
- `llms.txt` gives AI crawlers a structured overview.

After deploying to the canonical domain: submit `sitemap.xml` in Google Search Console + Bing Webmaster, and validate JSON-LD at [validator.schema.org](https://validator.schema.org/).

## Local development

```
python -m http.server 8000
```

Then open http://localhost:8000/. Absolute paths (`/site.css`, `/about`) require serving over HTTP — opening the HTML files directly via `file://` will 404 on them.

## Deployment

Pushes to `main` auto-deploy via Netlify. Netlify's default "pretty URLs" handling strips `.html`, so `/about` resolves to `about.html`.

## Design source

The visual direction ("Newsroom Terminal") came from a [Claude Design](https://claude.ai/design) handoff. The original prototype bundle — HTML mockups, JSX component sketches, chat transcript — lives outside this repo as reference material.
