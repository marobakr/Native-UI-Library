# Button (`vf-button`)

Framework-independent reimplementation of the Angular `vfButton` directive
(`projects/ui/src/lib/button`, `master` branch of `vf-dynamic-catalog-components`).

## Usage

Buttons are plain, explicit HTML — no JavaScript is required to render them.
`button.js` only adds optional programmatic control (see [JavaScript API](#javascript-api)).

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/button/button.css" />

<button class="vf-button vf-button--primary vf-button--md" data-component="button">
  Save changes
</button>
```

Anchors can be styled identically:

```html
<a href="/help" class="vf-button vf-button--outline vf-button--md" data-component="button">
  Learn more
</a>
```

## Classes

| Class | Type | Description |
| --- | --- | --- |
| `vf-button` | base | Required on every button/anchor instance |
| `vf-button--primary` \| `--secondary` \| `--outline` \| `--ghost` \| `--danger` | variant | Visual style (default: `primary`) |
| `vf-button--sm` \| `--md` \| `--lg` \| `--icon` | size | Control height/padding (default: `md`) |
| `vf-button--full-width` | layout | Stretches the button to `100%` width |

## States

| State | How to set | Effect |
| --- | --- | --- |
| Disabled | `disabled` attribute (native `<button>`) | Sets `aria-disabled="true"`, `opacity: 0.5`, `pointer-events: none` |
| Loading | `data-loading="true"` attribute | Sets `aria-busy="true"` only — matches the Angular source, which does **not** auto-disable a loading button; combine with `disabled` if that's the desired UX |
| Hover / focus-visible | native | Hover darkens per-variant background; `:focus-visible` shows the token-driven focus ring (`--vf-color-focus`) |

## Accessibility

- Icon-only buttons (`vf-button--icon`) **must** include an `aria-label` since there is no visible text content.
- `aria-disabled` and `aria-busy` are kept in sync with the `disabled` attribute / `data-loading` attribute, both on initial render and via the JS API.
- Focus is visible via `:focus-visible` (keyboard-only), not `:focus`, to avoid a focus ring on mouse clicks.

## JavaScript API

```js
import { VfButton, initButtons } from '@/components/button/button.js';

// Auto-init already runs on DOMContentLoaded for every [data-component="button"] element.
// Use initButtons(root) to enhance elements added dynamically after load (e.g. in Liferay):
const buttons = initButtons(document.getElementById('some-fragment'));

// Or construct directly:
const el = document.querySelector('#my-button');
const button = new VfButton(el);

button.setVariant('danger');   // swaps the vf-button--* variant class
button.setSize('lg');          // swaps the vf-button--* size class
button.setFullWidth(true);     // toggles vf-button--full-width
button.setDisabled(true);      // sets disabled + aria-disabled
button.setLoading(true);       // sets aria-busy (does not disable)
```

## Design tokens used

`--vf-color-primary`, `--vf-color-primary-hover`, `--vf-color-secondary`, `--vf-color-ink-50` … `--vf-color-ink-900`,
`--vf-color-error`, `--vf-color-focus`, `--vf-space-sm`, `--vf-space-md`, `--vf-space-lg`,
`--vf-font-family-base`, `--vf-font-weight-medium`, `--vf-font-size-sm`, `--vf-font-size-base`,
`--vf-border-radius-sm`, `--vf-shadow-sm`.

A few values have no dedicated semantic token yet and are used as literals with an inline
comment (`px-3` → `0.75rem`, `h-8/h-10/h-12` heights) — see
[`.migration/missing-info.json`](../../.migration/missing-info.json) for why.

## Known deviations from the Angular source

None — this is a 1:1 visual/behavioral port. The one notable nuance (loading does not imply
disabled) is intentionally preserved rather than "fixed", to stay faithful to the reference
component.
