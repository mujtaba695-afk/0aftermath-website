# 0aftermath Architecture Rules — Knowledge Base

> This file is maintained by the `self-learning-autopilot` agent. Rules are appended after each autonomous scan. Do not manually edit unless correcting an error.

---

## Baseline Rules (Established)

### CSS Architecture
- Two stylesheets: `tailwind-build.css` (compiled) loads FIRST, `styles.css` (overrides) loads SECOND
- `.container` must always resolve to: `max-width: 1280px`, `margin-inline: auto`, `padding-inline: 1.5rem`
- If both files define the same selector, `styles.css` wins (cascade order). Prefer removing duplicates over using `!important`.

### Script Loading
- All `<script>` tags must have `defer` or `async`
- Exception: inline GTM and form handler scripts
- Lucide icons loaded via CDN with `defer`

### Page Structure
- Every page wraps content in `<section>` → `.container.mx-auto.px-6`
- Section backgrounds alternate: `bg-white` → `bg-bg-alt` → `bg-white`
- Vertical padding: `py-24` for major sections

### Z-Index Layers
- Base content: `z-0`
- Sticky header: `z-50`
- Dropdown menus: `z-[60]`
- Mobile menu: `z-[100]`
- Cal.com popup: `z-[9999]`

### Brand Colors (from tailwind.config.js)
- Primary: `#4F46E5`
- Secondary: `#06B6D4`
- Accent: `#F59E0B`
- Text: `#111827` / `#4B5563`

---

## Scan Reports

<!-- Self-learning autopilot appends dated entries below this line -->
