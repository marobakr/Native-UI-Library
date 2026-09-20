# Table (`vf-table`)

Framework-independent reimplementation of the Angular `table[vfTable]` /
`tr[vfTableRow]` / `th[vfTableHead]` / `td[vfTableCell]` / `input[vfTableSelectAll]` /
`input[vfTableSelectRow]` components (`projects/ui/src/lib/table`, `master` branch of
`vf-dynamic-catalog-components`).

## Usage

Plain semantic `<table>`/`<tr>`/`<th>`/`<td>` map 1:1 onto Angular's directives — no extra
ARIA roles are needed beyond `aria-sort` (sortable headers) and `aria-selected`
(selectable rows), since the native elements already imply table/row/columnheader/cell
roles.

```html
<link rel="stylesheet" href="/tokens/theme.css" />
<link rel="stylesheet" href="/src/components/table/table.css" />

<div class="vf-table__container">
  <table class="vf-table vf-table--striped" data-component="table" data-selection-mode="multiple">
    <thead>
      <tr class="vf-table__row">
        <th class="vf-table__cell vf-table__cell--head">
          <input type="checkbox" class="vf-table__checkbox" data-table-select-all aria-label="Select all rows" />
        </th>
        <th class="vf-table__cell vf-table__cell--head" data-sort-key="id" aria-sort="none">
          <span class="vf-table__sort-trigger" role="button" tabindex="0">
            Invoice
            <svg class="vf-table__sort-icon" viewBox="0 0 10 6" aria-hidden="true" focusable="false">
              <path d="M5 0 10 6H0z" fill="currentColor" />
            </svg>
          </span>
        </th>
        <th class="vf-table__cell vf-table__cell--head vf-table__cell--numeric" data-sort-key="amount" aria-sort="none">
          <span class="vf-table__sort-trigger" role="button" tabindex="0">Amount</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="vf-table__row vf-table__row--hoverable" data-value="INV-1042">
        <td class="vf-table__cell"><input type="checkbox" class="vf-table__checkbox" data-table-select-row aria-label="Select INV-1042" /></td>
        <td class="vf-table__cell">INV-1042</td>
        <td class="vf-table__cell vf-table__cell--numeric" data-sort-value="12480.50">€12,480.50</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Classes

| Class | Description |
| --- | --- |
| `vf-table__container` | Scrolling wrapper (`div[vfTableContainer]`) — required for `vf-table--sticky-header` |
| `vf-table` | Table root |
| `vf-table--striped` | Odd body rows get a background tint (light-mode value is a same-as-base no-op — see below) |
| `vf-table--sticky-header` | Header cells stick to the top of `vf-table__container` while scrolling |
| `vf-table--density-compact` / `vf-table--density-spacious` | Row padding (default: comfortable) |
| `vf-table__row` | A `<tr>` |
| `vf-table__row--hoverable` | Hover background — applied to data rows only, never the header row |
| `vf-table__row--selected` | Applied to a selected row |
| `vf-table__row--disabled` | Inert row (`pointer-events: none`, dimmed) — pair with a `disabled` row checkbox |
| `vf-table__cell` | A `<th>` or `<td>` |
| `vf-table__cell--head` | Header-only styling (background, weight, sticky) |
| `vf-table__cell--align-center` / `--align-end` | Column alignment |
| `vf-table__cell--numeric` | Right-aligned, tabular numerals — wins over align modifiers if both are present |
| `vf-table__sort-trigger` / `vf-table__sort-icon` | Clickable header label + triangle indicator |
| `vf-table__checkbox` | Custom-styled checkbox (select-all / select-row) |
| `vf-table__badge` + `--success` / `--warning` / `--error` | Status tag (demo-only helper, not part of the Angular API) |

## Data attributes (read by `table.js`)

| Attribute | On | Purpose |
| --- | --- | --- |
| `data-component="table"` | `<table>` | Marks the root for auto-init |
| `data-selection-mode="none\|single\|multiple"` | `<table>` | Selection behavior (default: `none`) |
| `data-sort-key="..."` | `<th>` | Enables sorting for that column |
| `data-value="..."` | `<tr>` | Identifies a data row (rows without it, e.g. the header row, are ignored for sort/selection) |
| `data-disabled="true"` | `<tr>` | Excludes the row from selection and select-all |
| `data-sort-value="..."` | `<td>` | Optional explicit sort value (e.g. a raw number) when the cell's text isn't directly sortable (currency, formatted dates, etc.) |
| `data-table-select-all` | `<input type="checkbox">` | Header select-all checkbox |
| `data-table-select-row` | `<input type="checkbox">` | Row checkbox |

## Accessibility

- `aria-sort` (`none`/`ascending`/`descending`) is kept in sync on every sortable `<th>`.
- The sort trigger is a focusable `role="button"` `<span>` (matches Angular exactly — a
  real `<button>` isn't used because it lives inside a `<th>` alongside plain content) and
  responds to `Enter`/`Space` in addition to click.
- `aria-selected` is only set on rows while `data-selection-mode` isn't `none` (matches
  Angular's `ariaSelected` computed).
- Disabled rows are excluded from `select-all` and can't be toggled — pair
  `vf-table__row--disabled` with a `disabled` attribute on that row's checkbox.

## JavaScript API

```js
import { VfTable, initTables } from '@/components/table/table.js';

// Auto-init runs on DOMContentLoaded. Call manually for dynamically-added markup:
const [table] = initTables(document.getElementById('some-fragment'));

document.querySelector('.vf-table').addEventListener('vf-table:sort-change', (e) => {
  console.log(e.detail.sort); // { key, direction } | null
});
document.querySelector('.vf-table').addEventListener('vf-table:selection-change', (e) => {
  console.log(e.detail.selection); // array of selected rows' data-value
});
```

Unlike Angular (which only *reports* the requested sort and leaves reordering the data to
the consumer), `table.js` also reorders the existing `<tr>` DOM nodes in place when a
sortable header is clicked — there's no framework here to re-render rows from a data
model, so this keeps the demo functional out of the box without generating any new markup.

## Design tokens used

`--vf-color-ink-50/100/300/900`, `--vf-color-border`, `--vf-color-brand-50/600`,
`--vf-color-success/warning/error`, `--vf-color-surface`, `--vf-color-focus`,
`--vf-border-width-thin`, `--vf-border-radius-sm/md/full`, `--vf-space-sm`.

## Known deviations from the Angular source

- **Checkbox dark-mode colors**: Angular's unchecked checkbox uses raw `border-ink-700` /
  `bg-ink-950` in dark mode. This port uses the existing `--vf-color-border` /
  `--vf-color-surface` aliases instead (which resolve to `ink-800` / `ink-900`) to stay
  consistent with how every other component in this library sources dark-mode colors,
  rather than introducing one-off raw-scale dark overrides for a single component. Visually
  equivalent, not pixel-identical.
- **Row/DOM sorting**: see the JavaScript API note above — Angular only reports the sort
  request; this port also reorders rows since there's no consumer-side data layer here.
