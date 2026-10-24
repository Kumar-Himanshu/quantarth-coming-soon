# QuantArth — Coming Soon

A static, coming-soon landing page for **QuantArth** — AI-powered financial intelligence.

Built with plain HTML5, CSS3, and vanilla JavaScript. No build step, no dependencies, deployable anywhere static files are served.

---

## 📁 Project Structure

```
quantarth-coming-soon/
├── index.html              ← Entry point
├── favicon.svg             ← SVG favicon
├── assets/
│   ├── css/
│   │   └── styles.css      ← All styles (CSS variables at the top)
│   └── js/
│       └── main.js         ← Neural-canvas animation + scroll reveals
└── README.md
```

---

## ✏️ Before Going Live — Configuration Checklist

All configurable values are marked in the source with comments. Here's a quick reference:

### Contact email
Search for **`CONTACT_EMAIL`** or `hello@quantarth.com` in `index.html`.  
Replace every occurrence with your real address:

```html
<!-- Hero CTA -->
<a href="mailto:YOUR_EMAIL@quantarth.com" ...>

<!-- Footer -->
<a href="mailto:YOUR_EMAIL@quantarth.com" ...>
```

### LinkedIn URL
Search for **`FOOTER_CONFIG`** in `index.html`.  
Update the `href` on the LinkedIn `<a>` tag:

```html
<a href="https://linkedin.com/company/YOUR-COMPANY-SLUG" ...>
```
To hide the LinkedIn link entirely, remove that `<a>` element and the adjacent `.footer-divider`.

### Brand colors & typography
All design tokens are CSS variables at the top of `assets/css/styles.css`:

```css
:root {
  --color-accent-primary:   #00d4ff;  /* electric cyan */
  --color-accent-secondary: #0ea5e9;  /* sky blue */
  --color-accent-tertiary:  #6366f1;  /* indigo-violet */
  --color-accent-teal:      #14b8a6;  /* teal */
  --font-display: 'Outfit', ...;
  --font-body:    'Inter', ...;
  /* … */
}
```

### SEO & Open Graph
Update the `<title>`, `<meta name="description">`, `og:url`, `og:image`, and `twitter:image` tags at the top of `index.html` with your final copy and hosted OG image URL.

---

## 🖥️ Local Preview

No build step required. Use any static file server:

### Option A — Python (built-in, no install)
```bash
python -m http.server 3000
# Then open: http://localhost:3000
```

### Option B — Node.js `serve`
```bash
npx serve .
# Then open the URL shown in the terminal
```

### Option C — VS Code Live Server
Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.

> **Important:** Open via a server, not by double-clicking `index.html` directly.  
> The `file://` protocol blocks some font and canvas features in certain browsers.

---

## 🚀 Deploying to Cloudflare Pages

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: QuantArth coming soon"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quantarth-coming-soon.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account.
4. Select the `quantarth-coming-soon` repository.
5. Configure the build settings:
   | Setting | Value |
   |---|---|
   | **Build command** | *(leave empty)* |
   | **Build output directory** | `/` |
   | **Root directory** | *(leave empty)* |
6. Click **Save and Deploy**.

Cloudflare will deploy in ~30 seconds. You'll get a `*.pages.dev` URL immediately.

### Step 3 — Connect your custom domain
1. In the Cloudflare Pages project, go to **Custom domains** → **Set up a custom domain**.
2. Enter `quantarth.com` and follow the DNS instructions.
3. If your domain is already on Cloudflare, the CNAME record is added automatically.

> **Note:** DNS propagation can take up to 48 hours, though it's typically under 5 minutes when the domain is on Cloudflare.

### Subsequent deployments
Every `git push` to the `main` branch automatically triggers a new Cloudflare Pages deployment. No manual steps needed.

---

## ♿ Accessibility Notes

- All animations are disabled for users with `prefers-reduced-motion: reduce`.
- A skip-to-content link is the first focusable element in the DOM.
- All interactive elements have visible `:focus-visible` styles.
- Icon-only links carry descriptive `aria-label` attributes.
- Semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) are used throughout.
- Color contrast meets WCAG AA for all body text.

---

## 📦 Dependencies

None. This is a pure HTML/CSS/JS static site. No npm, no node_modules, no build step.

- Fonts: [Google Fonts](https://fonts.google.com/) — Outfit + Inter (loaded via CSS `@import`)
- Icons: Inline SVG (no external icon library)
- Animation: Vanilla JS canvas + CSS keyframes

---

## 📄 License

© 2026 QuantArth. All rights reserved. This codebase is proprietary.
