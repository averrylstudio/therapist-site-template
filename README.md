# Therapist website template

A calm, inviting, modern starter site for a therapy practice. Built by [Averryl Studio](https://averryl.com) as a $99 done-for-you starter site: we copy this template, swap in the therapist’s name, specialties, photos and logo, and hand them a finished website.

**Live preview:** [https://averrylstudio.github.io/therapist-site-template/](https://averrylstudio.github.io/therapist-site-template/)

The preview uses a **fictional** practice — Willow River Counseling, Dr. Jordan Rivers, LCSW. Every name, fee, address, phone number, email and biography line is placeholder text. Do not present it as a real clinic.

This is a static site (plain HTML, CSS and JavaScript). There is no build step. It is designed to be hosted for free on GitHub Pages, the same way [averryl.com](https://averryl.com) is.

---

## For a new client, edit one file

**`site.config.js`** is the only file you need to change for a typical handover.

It holds the practice name, therapist name and credentials, tagline, bio, specialties, services, fees and insurance wording, session formats, location and telehealth states, contact email and phone, the inquiry email (for the form), social links, colours, logo path, photo paths, crisis-line text, the “currently accepting clients” badge, testimonials (or the switch to hide them), the free-resource slot, and whether the “Site by Averryl Studio” credit is shown.

After you save the file, refresh the site. No build, no compile.

A short checklist:

1. Duplicate this repository for the client (see [Handing the site over](#handing-the-site-over) below). Do not edit the master template in place.
2. Open `site.config.js` and replace every placeholder. Search for the words “placeholder” and “sample” so none are left.
3. Set `siteUrl` to the live address (for example `https://www.jordanriverscounseling.com`). This is used for the form’s thank-you redirect, Open Graph tags and the JSON-LD schema.
4. Drop the therapist’s photos into `images/` and point `photos.*` at them. Add a logo file and set `logo` if they have one; leave `logo` as `""` to keep the wordmark.
5. Update `contact.inquiryEmail` to the therapist’s real email. The form sends there through FormSubmit (see below).
6. Update `sitemap.xml` and `robots.txt` so they use the client’s domain.
7. Optionally update the `<title>`, meta description and Open Graph tags in each HTML file’s `<head>`. JavaScript also sets these from the config, which is enough for Google; some social crawlers read only the static HTML, so changing the head is worth doing before launch.
8. Replace or hide the testimonials. Never invent client words. Set `testimonials.show` to `false` if you have none with consent.
9. Update the free PDF in `assets/` or set `resource.enabled` to `false`.
10. Preview locally (see below), then push and point the client’s domain at GitHub Pages.

### Colours and logo

Colours live under `colors` in the config and are applied as CSS variables. The defaults are a warm cream and a deep sage. A logo, if `logo` is set to a path such as `"images/logo.png"`, appears in the header and the footer. If it is empty, the practice name is shown as an elegant wordmark, with the small leaf mark (turn that off with `showMark: false`).

Recommended logo: a transparent PNG or SVG, roughly 400×120 or similar, on a clear background.

### Photos

All images already in `images/` are free Unsplash photographs, downloaded into the repo (not hotlinked). Replace them with the therapist’s own photos. Keep the same file names, or change the paths in `photos` in the config. Always write a real `alt` description.

Suggested replacements:

- `hero.jpg` — the practice or a calm room
- `portrait.jpg` — the therapist (the current file is a **stock photo**, clearly captioned as a placeholder)
- `office.jpg`, `chair.jpg`, `window.jpg` — the office or waiting room
- `nature.jpg`, `forest-mist.jpg`, `plants.jpg` — atmosphere

---

## The session-request form

The form on `contact.html` has no backend. It posts to [FormSubmit](https://formsubmit.co/) at `https://formsubmit.co/<inquiryEmail>`, using the address in `site.config.js`.

Fields: name, email, phone (optional), preferred contact method, session type (individual / couples / family), in-person or telehealth, “what brings you here” (optional, with a note not to share sensitive details), best times, and a required consent checkbox. There is a honeypot field (`_honey`), a `_subject` line, a `_template=table` for a readable email, an automatic confirmation (`_autoresponse`), and a `_next` redirect to `thank-you.html`.

**Activation:** the first time a form is submitted to a new email address, FormSubmit sends a one-time confirmation email to that address. The therapist must click the link in that email before any further submissions will be delivered. Plan for this on handover: send a test request yourself, ask the therapist to check their inbox (and spam), and confirm the activation link.

The thank-you redirect (`_next`) is an absolute URL built from `siteUrl`. If `siteUrl` is wrong, the form will still send, but the visitor may not land on the thank-you page.

---

## Features included

1. **Guided breathing** — “Take a breath with me.” An animated circle on a 4–4–6 rhythm (in for four, hold for four, out for six). Respects reduced motion.
2. **What to expect in your first session** — a clear, step-by-step timeline.
3. **“Is this a good fit?”** — a short reflective checklist that leads gently to the request form. It is clearly labelled as *not* a diagnostic or clinical tool.
4. **Crisis resources** — a calm note in the footer, with the wording set in the config (default: 988 in the US, or a local emergency number). The form also has a clear “not for emergencies” notice.
5. **Comfort controls** — a small, persistent toggle for larger text and reduced motion. The choice is remembered in the browser.
6. **Telehealth and location badges** on the home page.
7. **Fees and insurance, in plain words** — including a simple explanation of private-pay and superbills.
8. **A downloadable free resource** — a short “Preparing for your first session” PDF, easy to replace.
9. **Privacy-minded by default** — fonts are self-hosted (no request to Google Fonts), and there is no analytics or tracking unless you add it.

The site is mobile-first and responsive, with WCAG AA contrast, keyboard navigation, visible focus states, alt text, a skip link, and `prefers-reduced-motion` support. Basic SEO is in place: meta tags, Open Graph, JSON-LD for the practice, a sitemap and `robots.txt`.

---

## Previewing locally

From this folder:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080). The form’s thank-you redirect will still point at the live `siteUrl` until you change it.

---

## Hosting on GitHub Pages

The live preview is served from this repository’s `main` branch, from the root of the project.

For a client site:

1. Create a **new** repository (private is fine, and usually better) from this template. Do not push client details to the public preview repo.
2. In the repository Settings → Pages, set the source to `main` and the folder to `/ (root)`.
3. The site will appear at `https://<owner>.github.io/<repo>/`.
4. If the client has a domain (they should buy this themselves), add a `CNAME` file containing that domain, and add the GitHub Pages DNS records at their registrar. GitHub will issue a free HTTPS certificate.

Relative paths are used throughout, so the site works both at a root domain and at a `github.io/repo` path.

---

## Handing the site over

There are two good options, matching what we offer the therapist:

**Care plan (recommended).** The site stays on the Averryl Studio GitHub account. We handle updates for the monthly care-plan fee. The client owns their domain and we point it at the site. They are never locked in — we can transfer the repository at any time.

**Full handover.** Transfer the repository to the client’s own GitHub account (Settings → General → Danger zone → Transfer ownership), or download a zip and help them publish it. After a transfer they own the code, the hosting and the updates. Walk them through FormSubmit activation and how to edit `site.config.js`.

In both cases the client owns their domain.

---

## Photo credits (placeholder images)

All placeholder photographs are from [Unsplash](https://unsplash.com), used under the [Unsplash License](https://unsplash.com/license). They were downloaded into `images/` and are not hotlinked. Please replace them with the therapist’s own photos for a live client site, and keep credits if any Unsplash images remain.

| File | Subject | Unsplash photograph |
| --- | --- | --- |
| `hero.jpg` | Sunlit sitting room | [photo-1600210492486-724fe5c67fb0](https://unsplash.com/photos/zt7fCXaDCks) — R ARCHITECTURE |
| `office.jpg` | Bright living room with plants | [photo-1618221195710-dd6b41faaea6](https://unsplash.com/photos/NTYWjCWvWpA) — Sidekix Media |
| `chair.jpg` | Mustard armchair | [photo-1586023492125-27b2c045efd7](https://unsplash.com/photos/ffH7rJp_C3U) — Minh Pham |
| `nature.jpg` | Sunlit forest path | [photo-1441974231531-c6227db76b6e](https://unsplash.com/photos/9M3tTio1yF8) — Jay Mantri |
| `forest-mist.jpg` | Forest and mountains at dusk | [photo-1511497584788-876760111969](https://unsplash.com/photos/JgOeRuGD_Y4) — John Towner |
| `plants.jpg` | Succulent in a mint pot | [photo-1485955900006-10f4d324d411](https://images.unsplash.com/photo-1485955900006-10f4d324d411) — Kara Eads |
| `books.jpg` | Soft-focus bookshelves | [photo-1463320726281-696a485928c7](https://images.unsplash.com/photo-1463320726281-696a485928c7) |
| `window.jpg` | Softly lit open-plan room | [photo-1505691723518-36a5ac3be353](https://unsplash.com/photos/YI_9S2uqSNQ) |
| `portrait.jpg` | Stock portrait (placeholder only) | [photo-1573496359142-b8d87734a5a2](https://unsplash.com/photos/7YVZYZeITc8) — Christina, WOCinTech Chat |

If a photographer’s name above is uncertain, follow the Unsplash link and credit the name shown on the photo page. The portrait is a stock photograph of a real person; it must stay clearly labelled as a placeholder and must be replaced before a client site goes live.

Fonts are **Fraunces** (Undercase Type) and **Source Sans 3** (Adobe / Paul D. Hunt), self-hosted, under the SIL Open Font License.

---

## Project structure

```
site.config.js      ← edit this for each client
index.html          Home
about.html          About the therapist
services.html       Services and specialties
fees.html           Fees, insurance, FAQ
contact.html        Session-request form
thank-you.html      After the form is sent
404.html
css/fonts.css       Self-hosted font faces
css/styles.css      All layout and design
js/app.js           Reads the config, wires features
images/             Photos, logo slot, favicon, leaf mark
fonts/              Fraunces and Source Sans 3 (woff2)
assets/             Downloadable PDF guide
sitemap.xml
robots.txt
```

---

## A note on selling this as a $99 starter site

Keep a clear scope for each sale: the therapist’s name, photo, bio, specialties, services, contact details, colours, logo, and one round of changes. Anything beyond that is a paid extra, so a $99 job does not become a $500 one. Present this as a starter site for new or small practices, and keep the custom “from $500” redesign for established ones. Offer the $49/month care plan as the natural next step, so the $99 sale can become recurring income.
