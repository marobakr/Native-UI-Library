# Dialog (`vf-dialog`)

Framework-independent reimplementation of the Angular `vf-dialog` API (`VfDialog` service
+ `ng-template[vfDialog]` directive + `vf-dialog-header`/`vfDialogTitle`/`vfDialogDescription`/
`vf-dialog-body`/`vf-dialog-footer`/`vfDialogClose`/`vfDialogCloseIcon`) from
`projects/ui/src/lib/dialog` (`master` branch of `vf-dynamic-catalog-components`).

Angular's dialog is built entirely on **Angular CDK** (`@angular/cdk/dialog` + `overlay` +
`portal`) — there is no native web equivalent, so this port hand-builds the same behavior
from scratch, following the exact pattern established by `drawer.js` (drawer's own Angular
source is already CDK-free, making it the closest reference implementation available).

A `vf-dialog` is **always centered** — unlike `vf-drawer` (anchored to an edge), `size`
only ever controls max-width (`sm`/`md`/`lg`/`xl`), matching `VfDialog.open()`'s hardcoded
`placement: 'center'`.

## Usage

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/dialog/dialog.css" />

<button type="button" data-dialog-open="my-dialog">Suspend line</button>

<div class="vf-dialog" data-component="dialog" id="my-dialog" data-dismissible="true" data-autofocus="dialog" inert>
  <div class="vf-dialog__backdrop" data-dialog-backdrop></div>
  <div class="vf-dialog__panel vf-dialog__panel--sm" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-description" tabindex="-1" data-dialog-panel>
    <div class="vf-dialog__header">
      <h2 class="vf-dialog__title" id="my-dialog-title">Suspend 010 1234 5678?</h2>
      <button type="button" class="vf-dialog__close-icon" data-dialog-close aria-label="Close">✕</button>
    </div>
    <div class="vf-dialog__body">
      <p class="vf-dialog__description" id="my-dialog-description">Calls, SMS and data stop right away.</p>
    </div>
    <div class="vf-dialog__footer">
      <button type="button" data-dialog-close>Keep line active</button>
      <button type="button" data-dialog-close data-dialog-result="true">Suspend line</button>
    </div>
  </div>
</div>
```

- `data-dialog-open="<id>"` on any element opens the dialog with that id.
- `data-dialog-close` closes it; add `data-dialog-result="..."` to pass a result value through the `vf-dialog:close` event (bare `data-dialog-close` closes with `undefined`, matching Angular's `<button vfDialogClose>` vs `[vfDialogClose]="true"`).
- Use `role="dialog"` for regular content, `role="alertdialog"` for confirmations that interrupt the user (matches Angular's `role` option).

## Classes

| Class | Description |
| --- | --- |
| `vf-dialog` | Root wrapper — `display: none` until `vf-dialog--open` is applied; starts with an `inert` attribute |
| `vf-dialog--open` | Applied by `dialog.js` while open — fades the backdrop in and scales/fades the panel in via `@starting-style` |
| `vf-dialog__backdrop` | Fixed full-screen overlay |
| `vf-dialog__panel` | The centered dialog panel (`role="dialog"`/`"alertdialog"`, `aria-modal="true"`) |
| `vf-dialog__panel--sm` / `--md` / `--lg` / `--xl` | Panel max-width (24rem / 32rem / 44rem / 60rem) |
| `vf-dialog__header` / `__title` / `__close-icon` | Header row, accessible-name heading, and a ready-made "×" close button |
| `vf-dialog__body` / `__description` | The only scrollable region, and supporting/description text |
| `vf-dialog__footer` | Action buttons — stacked on narrow screens, right-aligned in a row from 40rem up |

## Data attributes (read by `dialog.js`)

| Attribute | On | Purpose |
| --- | --- | --- |
| `data-component="dialog"` | root `.vf-dialog` | Marks the root for auto-init |
| `data-dismissible="false"` | root | Disables **both** Escape and backdrop-click dismissal together (matches Angular's single `dismissible`/`disableClose` flag — unlike drawer, which has two separate opt-outs) |
| `data-autofocus="first-tabbable\|first-heading\|dialog"` | root | Where focus lands on open (default: `first-tabbable`) |
| `data-dialog-backdrop` | the backdrop `<div>` | Identifies the backdrop for click-to-close |
| `data-dialog-panel` | the panel `<div>` | Identifies the panel for the Tab focus trap and `dialog`-mode autofocus |
| `data-dialog-open="<id>"` | any trigger element | Opens the dialog with that `id` on click |
| `data-dialog-close` | any element inside the panel | Closes the dialog on click |
| `data-dialog-result="..."` | a `[data-dialog-close]` element | String result value passed through `vf-dialog:close`'s `detail.result` |

## Accessibility

- `role="dialog"` or `role="alertdialog"` + `aria-modal="true"` on the panel, labelled via `aria-labelledby` (point it at your `vf-dialog__title` heading's id) and optionally described via `aria-describedby`.
- A manual Tab focus trap cycles focus between the first and last focusable elements inside the panel (same hand-rolled implementation as `drawer.js`).
- `autoFocus` supports the same three modes as Angular: `first-tabbable` (default), `first-heading` (focuses the first heading, adding `tabindex="-1"` if needed), or `dialog` (focuses the panel itself via its own `tabindex="-1"`).
- The whole subtree gets a real `inert` attribute while closed, removed while open.
- `document.body.style.overflow` is locked to `hidden` while any dialog is open, shared across instances via a module-level counter (mirrors drawer's `openDrawerCount` pattern) — dialog and drawer track **separate** counters from each other, a known simplification documented below.

## JavaScript API

```js
import { VfDialog, initDialogs } from '@/components/dialog/dialog.js';

// Auto-init runs on DOMContentLoaded. Call manually for dynamically-added markup:
const [dialog] = initDialogs(document.getElementById('some-fragment'));

dialog.open();
dialog.close('some-result');

document.getElementById('my-dialog').addEventListener('vf-dialog:close', (e) => {
  console.log(e.detail.result); // string result, or undefined for Escape/backdrop/plain close
});
```

## Design tokens used

`--vf-color-surface`, `--vf-color-overlay`, `--vf-color-focus`,
`--vf-color-text-primary/secondary`, `--vf-border-radius-md`, `--vf-space-sm/md/lg`,
`--vf-transition-duration-base`, `--vf-transition-easing-smooth`, `--vf-z-index-modal`.

`shadow-xl` (panel shadow) is a literal value with an inline comment — Tailwind's own
default `shadow-xl`, not a Vodafone token (`theme.css` only defines `shadow-control` and
`shadow-overlay`; see `.migration/missing-info.json`).

## Known deviations from the Angular source

- **Result value is always a string (or undefined)**: Angular's `[vfDialogClose]="value"` can pass any typed value (boolean, object, etc.) through `DialogRef.close()`. Native HTML `data-*` attributes are string-only, so `data-dialog-result` can only carry string results. Document this at the integration layer if a consuming app needs richer result types.
- **Separate scroll-lock counters**: Angular's `ModalSurface` funnels dialog *and* drawer through the same underlying CDK `Dialog`/`Overlay` service, so they'd share one global lock if both were open simultaneously. This port keeps `VfDialog.openCount` and `VfDrawer.openCount` independent (each component stays 100% standalone, consistent with how every other component in this library is self-contained) — a rare edge case (a drawer and a dialog open at the same time) could theoretically unlock scroll early. Not expected to matter in practice.
- **Repeated enter animation via a `display:none` toggle**: Angular's CDK literally destroys and recreates the dialog's DOM on every open/close, which is why its `@starting-style` entrance animation naturally replays every time. This port keeps one static element in the DOM (no dynamic DOM generation) and toggles `display: none` ↔ `block` instead, so `@starting-style` still replays correctly on every open — functionally equivalent, different mechanism.
