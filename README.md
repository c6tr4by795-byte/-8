# IRAQ GREEN — منصة العراق الأخضر

A premium, mobile-first web app for tracking real, individually-identified
planted trees. This is the **frontend only** — pure HTML5, CSS3, and
vanilla JavaScript (ES6). No frameworks, no backend, no database yet.

---

## How to open it

You don't need to install anything.

- **Locally:** double-click `index.html` (or open it in any browser).
- **On a real host later (GitHub Pages / Vercel / Netlify):** upload this
  whole folder as-is. `index.html` at the root is the entry point.

---

## Folder structure

```
iraq-green/
├── index.html              → entry point, redirects to the login screen
├── css/
│   ├── variables.css       → design tokens: colors, fonts, spacing, shadows
│   ├── reset.css           → minimal, shared CSS reset
│   └── components.css      → reusable UI pieces (buttons, inputs, cards, toast)
├── js/
│   └── utils.js            → shared helpers (toast messages, validation, etc.)
├── assets/
│   └── icons/              → shared SVG icons (added as the app grows)
└── pages/
    └── login/
        ├── login.html
        ├── login.css
        └── login.js
```

### The rule for every screen

Every screen lives in its own folder under `pages/` with **exactly three
files**, all sharing the same name:

```
pages/<page-name>/<page-name>.html
pages/<page-name>/<page-name>.css
pages/<page-name>/<page-name>.js
```

- HTML never contains inline `<style>` or `<script>` blocks — only links
  to `.css` and `.js` files.
- Every page's `<head>` loads shared styles first, then its own:
  `variables.css` → `reset.css` → `components.css` → `<page-name>.css`.
- Every page loads `js/utils.js` before its own `<page-name>.js`.

This keeps every screen self-contained and easy to find, while still
sharing one visual language and one set of helper functions.

---

## Design language

- **Colors, fonts, spacing, shadows** all live in `css/variables.css` as
  CSS custom properties (e.g. `var(--color-forest)`). Never hard-code a
  color or font anywhere else — change the app's look from this one file.
- **Reusable components** (buttons, form fields, cards, the toast
  message, the "seed row" divider) live in `css/components.css` under
  the `ig-` class prefix (short for IRAQ GREEN), e.g. `.ig-btn`,
  `.ig-input`, `.ig-card`.
- **Shared JS helpers** live in `js/utils.js` under the `IG` namespace,
  e.g. `IG.showToast('تم الحفظ')`.

---

## What's built so far

- ✅ **Login screen** (`pages/login/login.html`) — email/password sign
  in, Google sign-in button, "forgot password" and "create account"
  links, full client-side validation, loading state. All backend/auth
  calls are left as clearly commented placeholders.
- ✅ **Register screen** (`pages/register/register.html`) — full name,
  email, password + confirmation (with match checking), province
  (Iraq's 18 governorates) and city, Google sign-up button, full
  client-side validation, loading state, link back to login. Backend
  account creation is a clearly marked placeholder.

## What's coming next (not built yet — waiting for approval)

- Forgot password screen
- Home / dashboard (tree list, map, points, level, badges)
- Tree profile screen (ID, QR code, history, health, photos)
- User profile screen (rank, achievements, badges)

Each of these will be added one screen at a time, following the same
three-file pattern, so the project stays easy to maintain as it grows.

---

## Data model (planned, not implemented yet)

These fields are **only interface/architecture placeholders for now** —
no storage, database, or API is connected yet.

**Tree record**
`Tree ID · QR Code · Tree Number · Tree Type · Planting Date · Planting
Time · GPS Location · Province · City · Area · Park · Status · Health ·
Photos · Inspection History · Notes`

**Owner record (permanently linked to each tree)**
`User ID · Full Name · Profile Photo · Registration Date · Province ·
City · Total Trees · Total Points · Current Level · Rank · Badges ·
Achievements`

Each QR Code will belong to exactly one tree and will never be reused.

---

## Roadmap toward PWA

The project is structured so a `manifest.json` and a service worker can
be added later without restructuring anything — every page already
works as a plain static file, which is the main requirement for PWA
installability on Android and iPhone.
