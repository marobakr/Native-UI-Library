# Sidebar Navigation (`vf-sidebar-nav`)

Framework-independent reimplementation of the Angular `vf-sidebar-nav` / `vfSidebarNavToggle`
/ `vf-sidebar-nav-section` / `vfSidebarNavItem` / `vf-sidebar-nav-user` components
(`projects/ui/src/lib/sidebar-nav`, `master` branch of `vf-dynamic-catalog-components`).

## Usage

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/sidebar-nav/sidebar-nav.css" />

<nav class="vf-sidebar-nav" data-component="sidebar-nav" role="navigation" aria-label="Primary">
  <div class="vf-sidebar-nav__header">
    <div class="vf-sidebar-nav__brand-row">
      <span class="vf-sidebar-nav__brand-mark">E</span>
      <span class="vf-sidebar-nav__brand-name">Enterprise Co.</span>
      <button type="button" class="vf-sidebar-nav__toggle" data-sidebar-nav-toggle aria-expanded="true" aria-label="Collapse sidebar">
        <svg><!-- your icon, rotates 180° when collapsed --></svg>
      </button>
    </div>
    <div class="vf-sidebar-nav__divider"></div>
  </div>

  <div class="vf-sidebar-nav__body">
    <div class="vf-sidebar-nav__section">
      <div class="vf-sidebar-nav__section-items">
        <a class="vf-sidebar-nav__item vf-sidebar-nav__item--active" href="/subscriptions" aria-current="page">
          <span class="vf-sidebar-nav__active-bar" aria-hidden="true"></span>
          <span class="vf-sidebar-nav__item-icon"><svg>...</svg></span>
          <span class="vf-sidebar-nav__item-label">Subscriptions</span>
          <span class="vf-sidebar-nav__item-badge">2</span>
          <span class="vf-sidebar-nav__item-dot" aria-hidden="true"></span>
        </a>
      </div>
    </div>

    <div class="vf-sidebar-nav__section">
      <div class="vf-sidebar-nav__section-label">Resources</div>
      <div class="vf-sidebar-nav__section-items">
        <a class="vf-sidebar-nav__item" href="/support">
          <span class="vf-sidebar-nav__item-icon"><svg>...</svg></span>
          <span class="vf-sidebar-nav__item-label">Support</span>
        </a>
      </div>
    </div>
  </div>

  <div class="vf-sidebar-nav__footer">
    <div class="vf-sidebar-nav__user">
      <span class="vf-sidebar-nav__user-avatar">KM</span>
      <span class="vf-sidebar-nav__user-info">
        <span class="vf-sidebar-nav__user-name">Khaled M</span>
        <span class="vf-sidebar-nav__user-role">Admin</span>
      </span>
      <button type="button" class="vf-sidebar-nav__user-action" aria-label="Account options"><svg>...</svg></button>
    </div>
  </div>
</nav>
```

## Classes

| Class | Description |
| --- | --- |
| `vf-sidebar-nav` | Root (`role="navigation"`), 215px wide by default |
| `vf-sidebar-nav--collapsed` | Collapses to 88px — every descendant below hides its text/labels via this single modifier, nothing else needs to change |
| `vf-sidebar-nav__header` / `__footer` | Pinned (non-scrolling) header/footer slots |
| `vf-sidebar-nav__body` | Scrollable middle section (nav sections live here) |
| `vf-sidebar-nav__toggle` | Collapse/expand button — wire it up with `data-sidebar-nav-toggle` |
| `vf-sidebar-nav__section` / `__section-label` / `__section-items` | A labeled (or unlabeled) group of items |
| `vf-sidebar-nav__item` | A nav link/button (`<a>` or `<button>`) |
| `vf-sidebar-nav__item--active` | Active/current item — pair with `aria-current="page"` and a `vf-sidebar-nav__active-bar` |
| `vf-sidebar-nav__item-icon` / `__item-label` / `__item-badge` / `__item-dot` | Item internals — label and badge text hide while collapsed, the dot shows instead |
| `vf-sidebar-nav__user` / `__user-avatar` / `__user-info` / `__user-name` / `__user-role` / `__user-action` | Footer profile card |

## Data attributes (read by `sidebar-nav.js`)

| Attribute | On | Purpose |
| --- | --- | --- |
| `data-component="sidebar-nav"` | `<nav>` | Marks the root for auto-init |
| `data-sidebar-nav-toggle` | `<button>` | Identifies the collapse/expand trigger |
| `data-aria-label` | `<button data-sidebar-nav-toggle>` | Optional: freezes the toggle's `aria-label` to a fixed custom string instead of the default "Expand sidebar"/"Collapse sidebar" swap (mirrors Angular's `ariaLabel` input on `vfSidebarNavToggle`) |

## Accessibility

- The root has `role="navigation"` and an author-supplied `aria-label`.
- The active item gets `aria-current="page"`.
- Disabled items use a real `disabled` attribute (`<button>`) — pair with `aria-disabled="true"` if you must use an `<a>` instead, since anchors have no native `disabled`.
- The toggle button's `aria-expanded` and `aria-label` ("Expand sidebar" / "Collapse sidebar") are kept in sync automatically, both on init and on every toggle.
- Collapsing is purely visual (CSS `display: none` on labels) — no content is removed from the accessibility tree via `aria-hidden`, matching Angular's `@if` template removal only for text nodes, not the interactive item itself.

## JavaScript API

```js
import { VfSidebarNav, initSidebarNavs } from '@/components/sidebar-nav/sidebar-nav.js';

// Auto-init runs on DOMContentLoaded. Call manually for dynamically-added markup:
const [nav] = initSidebarNavs(document.getElementById('some-fragment'));

document.querySelector('.vf-sidebar-nav').addEventListener('vf-sidebar-nav:change', (e) => {
  console.log(e.detail.collapsed); // boolean
});
```

## Design tokens used

`--vf-color-ink-50/100/200/500`, `--vf-color-border`, `--vf-color-brand-600/700`,
`--vf-color-text-primary/secondary`, `--vf-color-focus`, `--vf-border-width-thin`,
`--vf-border-radius-sm/full`, `--vf-space-xs/sm/lg`, `--vf-transition-duration-base`,
`--vf-transition-easing-smooth` (source's `--ease-emphasized`).

The collapsed/expanded widths (5.5rem / 13.4375rem) and several paddings (`p-3`, `p-1`)
are literal values with inline comments — they aren't part of the `xs`–`xl` spacing scale,
same treatment as other undocumented Tailwind defaults in this library (see
`.migration/missing-info.json`).

## Known deviations from the Angular source

None — this is a 1:1 structural/behavioral port. The one demo-only addition is the
`vf-sidebar-nav__item-dot`/`vf-sidebar-nav__item-badge` pair being present in markup
simultaneously with CSS choosing which to show, instead of Angular's `@if`/`@else if`
template branch — functionally identical, just implemented via the cascade instead of
conditional rendering (no JS involved either way).
