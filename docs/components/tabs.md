# Tabs (`vf-tabs`)

Framework-independent reimplementation of the Angular `vf-tabs` / `button[vfTab]` /
`vf-tab-panel` components (`projects/ui/src/lib/tabs`, `master` branch of
`vf-dynamic-catalog-components`).

## Usage

Tabs and panels are linked purely by id (`aria-controls` on the tab ↔ `id` on the panel,
`aria-labelledby` on the panel ↔ `id` on the tab) — panels do **not** need to be nested
inside the tablist, matching the Angular source.

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/tabs/tabs.css" />

<div class="vf-tabs" data-component="tabs" role="tablist" aria-orientation="horizontal" aria-label="Account settings">
  <button type="button" class="vf-tabs__tab vf-tabs__tab--selected" role="tab"
          id="tabs-1-tab-profile" aria-controls="tabs-1-panel-profile" aria-selected="true"
          tabindex="0" data-value="profile">Profile</button>
  <button type="button" class="vf-tabs__tab" role="tab"
          id="tabs-1-tab-billing" aria-controls="tabs-1-panel-billing" aria-selected="false"
          tabindex="-1" data-value="billing">Billing</button>
</div>

<div class="vf-tabs__panel" role="tabpanel" id="tabs-1-panel-profile" aria-labelledby="tabs-1-tab-profile" tabindex="0">
  Profile content…
</div>
<div class="vf-tabs__panel" role="tabpanel" id="tabs-1-panel-billing" aria-labelledby="tabs-1-tab-billing" tabindex="0" hidden>
  Billing content…
</div>
```

Add `vf-tabs--vertical` + `aria-orientation="vertical"` on the root for a vertical tablist
(uses `border-inline-end`, so it's RTL-safe automatically).

## Classes

| Class | Description |
| --- | --- |
| `vf-tabs` | Tablist root (`role="tablist"`) |
| `vf-tabs--vertical` | Vertical layout (default: horizontal) |
| `vf-tabs__tab` | A tab button (`role="tab"`) |
| `vf-tabs__tab--selected` | Applied to the active tab |
| `vf-tabs__panel` | A tab panel (`role="tabpanel"`), hidden via the native `hidden` attribute when inactive |

## Accessibility

- Roving `tabindex` pattern: the selected tab gets `tabindex="0"`, all others `tabindex="-1"` — kept in sync automatically by `tabs.js`.
- Keyboard navigation (mirrors Angular exactly, all 4 arrows work regardless of orientation): `ArrowRight`/`ArrowDown` → next enabled tab, `ArrowLeft`/`ArrowUp` → previous enabled tab (wraps), `Home`/`End` → first/last enabled tab. Disabled tabs are skipped.
- If no tab has `aria-selected="true"` in the initial markup, the first enabled tab is auto-selected on init (mirrors Angular's effect that auto-selects when `value` is empty).
- Use a real `disabled` attribute on a tab button to disable it — it will be skipped by keyboard navigation and clicks.

## JavaScript API

```js
import { VfTabs, initTabs } from '@/components/tabs/tabs.js';

// Auto-init runs on DOMContentLoaded. Call manually for dynamically-added markup:
const [tabs] = initTabs(document.getElementById('some-fragment'));

document.querySelector('[role="tablist"]').addEventListener('vf-tabs:change', (e) => {
  console.log(e.detail.value); // the selected tab's data-value
});
```

## Design tokens used

`--vf-color-border`, `--vf-color-ink-200/950`, `--vf-color-focus`, `--vf-border-width-base`
(1.5px, matches the source's `border-b-[1.5px]`/`border-e-[1.5px]`), `--vf-space-xs/sm`,
`--vf-font-size-base`, `--vf-font-weight-medium`.

`rounded-t-lg` (tab corner radius) uses Tailwind's own default border-radius scale, not
Vodafone's `--radius-control/surface/overlay` tokens — used as a literal `0.5rem` with an
inline comment (same treatment as other undocumented Tailwind defaults, see
`.migration/missing-info.json`).

## Known deviations from the Angular source

None — this is a 1:1 structural/behavioral port, including the (slightly unusual) choice
to respond to all 4 arrow keys regardless of `orientation`.
