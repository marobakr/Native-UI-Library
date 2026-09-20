# Drawer (`vf-drawer`)

Framework-independent reimplementation of the Angular `vf-drawer` component
(`projects/ui/src/lib/drawer`, `master` branch of `vf-dynamic-catalog-components`).

A headless overlay shell: backdrop, manual focus trap, Escape-to-close, body scroll lock,
and a slide transition — implemented from scratch with no Angular CDK involved in the
source, so this port is a close 1:1 translation rather than a from-scratch redesign.

## Usage

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/drawer/drawer.css" />

<button type="button" data-drawer-open="my-drawer">Open drawer</button>

<div class="vf-drawer" data-component="drawer" id="my-drawer" data-side="end" data-size="md" inert>
  <div class="vf-drawer__backdrop" data-drawer-backdrop></div>
  <div class="vf-drawer__panel vf-drawer__panel--end vf-drawer__panel--md" role="dialog" aria-modal="true" aria-labelledby="my-drawer-title" tabindex="-1" data-drawer-panel>
    <header>
      <h2 id="my-drawer-title">Title</h2>
      <button type="button" data-drawer-close aria-label="Close">✕</button>
    </header>
    <div class="vf-drawer__body">
      <p>Any content goes here.</p>
    </div>
    <footer>
      <button type="button" data-drawer-close>Cancel</button>
    </footer>
  </div>
</div>
```

- `data-drawer-open="<id>"` on any element (anywhere in the document) opens the drawer with that id.
- `data-drawer-close` on any element inside the panel closes it.
- Clicking `data-drawer-backdrop` or pressing Escape also closes it (see the opt-out attributes below).
- Only content that is *not* a header/footer wrapper needs to sit inside `.vf-drawer__body` — that's the only element that scrolls.

## Classes

| Class | Description |
| --- | --- |
| `vf-drawer` | Root wrapper — starts with an `inert` attribute (removed while open) |
| `vf-drawer--open` | Applied by `drawer.js` while open (slides the panel in, fades the backdrop in) |
| `vf-drawer__backdrop` | Fixed full-screen overlay |
| `vf-drawer__panel` | The dialog panel (`role="dialog"`, `aria-modal="true"`) |
| `vf-drawer__panel--start` / `--end` | Which edge the panel is anchored to (RTL-safe via `inset-inline-start`/`-end`; the slide-in transform direction itself is physical, matching the Angular source exactly) |
| `vf-drawer__panel--sm` / `--md` / `--lg` / `--full` | Panel width (`full` spans edge-to-edge regardless of `side`) |
| `vf-drawer__body` | The only scrollable region — pin header/footer content outside of it |

`vf-drawer__header`, `vf-drawer__footer`, `vf-drawer__close`, `vf-drawer__title`,
`vf-drawer__description` are **demo-only helper classes**, not part of the Angular API —
Angular's `vfDrawerHeader`/`vfDrawerFooter` slots ship with zero built-in styling; the
Angular story applies its own inline utility classes directly in the consuming template.
Use them or replace them with your own styling entirely.

## Data attributes (read by `drawer.js`)

| Attribute | On | Purpose |
| --- | --- | --- |
| `data-component="drawer"` | root `.vf-drawer` | Marks the root for auto-init |
| `data-side="start\|end"` | root | Informational mirror of the `vf-drawer__panel--start/--end` class (styling is class-driven; this attribute isn't read by the JS) |
| `data-close-on-backdrop="false"` | root | Disables closing via backdrop click (default: enabled) |
| `data-close-on-escape="false"` | root | Disables closing via Escape (default: enabled) |
| `data-drawer-backdrop` | the backdrop `<div>` | Identifies the backdrop for click-to-close |
| `data-drawer-panel` | the panel `<div>` | Identifies the panel for the Tab focus trap |
| `data-drawer-open="<id>"` | any trigger element | Opens the drawer with that `id` on click |
| `data-drawer-close` | any element inside the panel | Closes the drawer on click |

## Accessibility

- `role="dialog"` + `aria-modal="true"` on the panel, plus an author-supplied `aria-label` or `aria-labelledby`.
- A manual Tab focus trap cycles focus between the first and last focusable elements inside the panel (mirrors Angular's own hand-rolled trap — no native `<dialog>` or CDK involved).
- Focus moves into the panel's first focusable element when opened, and returns to whatever was focused before opening once it closes.
- The whole drawer subtree gets a real `inert` attribute while closed, removed while open — matches Angular's `[attr.inert]` host binding, so closed-drawer content is unreachable by both focus and screen readers without any extra `aria-hidden` bookkeeping.
- `document.body.style.overflow` is locked to `hidden` while any drawer is open, shared across instances via a module-level counter so nested/sibling drawers don't fight over the lock (mirrors Angular's `openDrawerCount`).

## JavaScript API

```js
import { VfDrawer, initDrawers } from '@/components/drawer/drawer.js';

// Auto-init runs on DOMContentLoaded. Call manually for dynamically-added markup:
const [drawer] = initDrawers(document.getElementById('some-fragment'));

drawer.open();
drawer.close();

document.getElementById('my-drawer').addEventListener('vf-drawer:close', () => {
  console.log('closed');
});
```

## Design tokens used

`--vf-color-ink-50/100`, `--vf-color-border`, `--vf-color-overlay`, `--vf-color-focus`,
`--vf-color-text-primary/secondary`, `--vf-border-width-thin`, `--vf-border-radius-sm/lg`,
`--vf-shadow-lg` (source's `shadow-overlay`), `--vf-space-xs/sm/md`,
`--vf-transition-duration-base`, `--vf-transition-easing-smooth` (source's
`--ease-emphasized`), `--vf-z-index-modal`.

## Known deviations from the Angular source

- **RTL transform direction**: the panel's resting position (`inset-inline-start`/`-end`) is logical and flips correctly under `dir="rtl"`, but the slide-in/out `translateX` offset is a physical value, exactly matching a limitation already present in the Angular source (`drawer.ts` conditions the transform on `side()`, not on document direction). Not a regression introduced by this port.
- Everything else (backdrop, focus trap, Escape/backdrop dismissal, scroll lock counter, inert toggling) is a 1:1 behavioral port.
