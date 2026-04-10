# 0aftermath Agent Knowledge Base
> Maintained autonomously by the `self-learning-autopilot` agent.  
> Human-readable audit trail of every architectural decision and bug discovered.

---

## Standing Rules (Never Override)
These rules were established by the project owner and are immutable:

1. **No Tailwind CDN**: All styling must be served from the locally compiled `tailwind-build.css` and the handcrafted `styles.css`. The CDN is permanently banned.
2. **Container Discipline**: `.container` must always be defined with `max-width: 1280px` and `margin-inline: auto`. This rule guards against the v4 compiler silently dropping layout boundaries.
3. **Zero Duplicate Content**: No two page sections may convey the same information. If a "Services" section exists, no "Built with Precision" section may echo it.
4. **Defer All Scripts**: Every third-party `<script>` tag must carry a `defer` or `async` attribute to guarantee First Contentful Paint is never blocked.
5. **Zero Tolerance QA**: No code is pushed to `main` without the Quality Control Auditor physically loading the page and confirming margins, alignment, and widget z-index layers are correct.
6. **Native Skill Protocol**: All agent personas must be formalized as Anthropic Skills using the `skill-creator` SKILL.md format (YAML frontmatter + body instructions). Loose markdown files in custom directories are not accepted.
7. **Premium Aesthetic**: All generated visuals must adhere to the "Sharp & Geometric" brand system: Primary `#4F46E5`, Secondary `#06B6D4`, Accent `#F59E0B`. No generic purple gradients or AI-slop aesthetics.

---

## Scan History

## [2026-04-10] Initial Architecture Scan — Human Authored
- **BUG**: Tailwind CDN was blocking First Contentful Paint → **Fix Applied**: CDN removed, standalone Tailwind CLI compiled `tailwind-build.css`.
- **BUG**: Tailwind v4 compiler silently dropped `.container` class → **Fix Applied**: Hardcoded `.container` into `styles.css` to bypass compiler dependency.
- **DRIFT**: Redundant "Built with Precision" cards duplicating Services section → **Fix Applied**: Section removed from `index.html`.
- **OPTIMIZATION**: Third-party Lucide Icons script lacked `defer` → **Rule Applied**: All external scripts now require `defer`.
- **DRIFT**: Agent personas existed as loose `.md` files in a custom directory → **Fix Applied**: Migrated to official Anthropic `skill-creator` SKILL.md format.
