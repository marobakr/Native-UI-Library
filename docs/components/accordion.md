# Accordion (`vf-accordion`)

Framework-independent reimplementation of the Angular `vf-accordion` / `vf-accordion-item`
components (`projects/ui/src/lib/accordion`, `master` branch of `vf-dynamic-catalog-components`).

## Usage

Markup is fully explicit — no JS-generated structure. `accordion.js` only wires up
click behavior and (for groups) single/multiple-open exclusivity.

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/accordion/accordion.css" />

<div class="vf-accordion" data-component="accordion" data-multiple="false">
  <div class="vf-accordion__item" data-value="shipping">
    <button type="button" class="vf-accordion__trigger" aria-expanded="false" aria-controls="shipping-panel">
      <span class="vf-accordion__header">
        <span class="vf-accordion__title-row">
          <span class="vf-accordion__title">Shipping details</span>
        </span>
      </span>
      <span class="vf-accordion__chevron"><svg><!-- chevron icon --></svg></span>
    </button>
    <div class="vf-accordion__content">
      <div class="vf-accordion__content-inner">
        <div class="vf-accordion__divider"></div>
        <div class="vf-accordion__panel" id="shipping-panel" role="region">Panel content…</div>
      </div>
    </div>
  </div>
</div>
```

To start an item expanded, include `vf-accordion__item--expanded` on the item and
`aria-expanded="true"` on its trigger directly in the markup.

### Standalone item (no group)

```html
<div class="vf-accordion__item" data-component="accordion-item" data-value="standalone">
  <!-- same trigger/content structure -->
</div>
```

## Classes

| Class | Description |
| --- | --- |
| `vf-accordion` | Group root. `data-multiple="true"` allows more than one item open at once (default: single-open) |
| `vf-accordion__item` | One collapsible card |
| `vf-accordion__item--expanded` | Applied when the item is open (drives the chevron rotation + content reveal) |
| `vf-accordion__item--disabled` | Visual disabled state (also set `disabled` + `aria-disabled="true"` on the trigger) |
| `vf-accordion__trigger` | The clickable header button |
| `vf-accordion__header`, `__title-row`, `__title`, `__badge`, `__description` | Header content layout (badge/description are optional) |
| `vf-accordion__chevron` | Icon wrapper, rotates 180° when expanded |
| `vf-accordion__content` / `__content-inner` | Animated wrapper (`grid-template-rows: 0fr → 1fr`) |
| `vf-accordion__divider` | Optional rule between the trigger and panel body (only include it if the item should have one) |
| `vf-accordion__panel` | The actual body content (`role="region"`, labelled by the trigger id) |

## Accessibility

- Trigger is a real `<button>` with `aria-expanded` kept in sync by `accordion.js`.
- `aria-controls` on the trigger and `aria-labelledby` on the panel must reference each other's ids (set these explicitly in markup, they are not auto-generated).
- Disabled items must set both the `disabled` attribute (blocks the native click) and `aria-disabled="true"` on the trigger.
- Panel is `role="region"` per WAI-ARIA disclosure/accordion pattern.

## JavaScript API

```js
import { VfAccordion, VfAccordionItem, initAccordions } from '@/components/accordion/accordion.js';

// Auto-init runs on DOMContentLoaded. Call manually for dynamically-added markup:
const { groups, standaloneItems } = initAccordions(document.getElementById('some-fragment'));

groups[0].items[0].setExpanded(true);   // open the first item programmatically
groups[0].getExpandedValues();          // ['shipping'] - mirrors Angular's `value` model

// Events (bubble, cancelable, composed):
document.querySelector('.vf-accordion').addEventListener('vf-accordion:change', (e) => {
  console.log(e.detail.value); // string[] of currently-expanded item values
});
```

## Design tokens used

`--vf-color-ink-50/600/950`, `--vf-color-border`, `--vf-color-focus`, `--vf-color-text-primary`,
`--vf-space-sm`, `--vf-space-md`, `--vf-font-size-base/sm`, `--vf-font-weight-medium`,
`--vf-border-radius-sm/md`, `--vf-transition-duration-base`, `--vf-transition-easing-smooth`.

`gap-3` (the root's item spacing) has no matching semantic token in the xs–xl scale and is
used as a literal `0.75rem` with an inline comment, same treatment as `button.css`'s `px-3`.

## Known deviations from the Angular source

None — this is a 1:1 structural/behavioral port. Angular measures nothing in JS either
(`grid-template-rows: 0fr/1fr` handles the open/close animation in pure CSS), so the native
version has no height-measurement logic to replicate.
