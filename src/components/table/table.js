/**
 * vf-table / vf-table__row / vf-table__cell
 *
 * Verified against: projects/ui/src/lib/table/table.ts (Angular source, `master` branch,
 * vf-dynamic-catalog-components). Angular leaves sorting the underlying data to the
 * consumer (the table only reports the requested `sort` key/direction); since there is no
 * framework here to re-render rows from data, `VfTable` additionally reorders the existing
 * `<tr>` DOM nodes in place (no new markup is created) so sorting works out of the box.
 */

import { dispatch } from '../../utils/events.js';

export class VfTable {
  /** @param {HTMLTableElement} element - the `.vf-table` element */
  constructor(element) {
    this.element = element;
    this.selectionMode = element.dataset.selectionMode ?? 'none';
    this.tbody = element.querySelector(':scope > tbody');
    this.headerRow = element.querySelector(':scope > thead > tr');
    this.headerCells = this.headerRow ? Array.from(this.headerRow.children) : [];
    this.sortHeaders = this.headerCells.filter((th) => th.dataset.sortKey);
    this.selectAllInput = element.querySelector('[data-table-select-all]');
    this.currentSort = null;
    this.originalRowOrder = this.tbody ? Array.from(this.tbody.children) : [];

    this.sortHeaders.forEach((th) => {
      const trigger = th.querySelector('.vf-table__sort-trigger');
      trigger?.addEventListener('click', () => this.toggleSort(th.dataset.sortKey));
      trigger?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          // Space would scroll the page, Enter would submit an enclosing form.
          event.preventDefault();
          this.toggleSort(th.dataset.sortKey);
        }
      });
    });

    this.selectAllInput?.addEventListener('change', (event) => {
      this.toggleAll(event.target.checked);
    });

    this.rows.forEach((row) => {
      const checkbox = row.querySelector('[data-table-select-row]');
      checkbox?.addEventListener('change', () => this.toggleRow(row));
    });

    this.syncSelectAll();
  }

  /** @returns {HTMLTableRowElement[]} every data row currently in `tbody` (any sort order) */
  get rows() {
    return this.tbody ? Array.from(this.tbody.querySelectorAll(':scope > tr[data-value]')) : [];
  }

  get selectableRows() {
    return this.rows.filter((row) => row.dataset.disabled !== 'true');
  }

  isSelected(row) {
    return row.classList.contains('vf-table__row--selected');
  }

  getSelection() {
    return this.rows.filter((row) => this.isSelected(row)).map((row) => row.dataset.value);
  }

  setRowSelected(row, selected) {
    row.classList.toggle('vf-table__row--selected', selected);
    if (selected) {
      row.setAttribute('data-selected', 'true');
    } else {
      row.removeAttribute('data-selected');
    }
    if (this.selectionMode !== 'none') {
      row.setAttribute('aria-selected', String(selected));
    }
    const checkbox = row.querySelector('[data-table-select-row]');
    if (checkbox) {
      checkbox.checked = selected;
    }
  }

  toggleRow(row) {
    if (this.selectionMode === 'none' || row.dataset.disabled === 'true') {
      return;
    }
    if (this.selectionMode === 'single') {
      const wasSelected = this.isSelected(row);
      this.rows.forEach((other) => this.setRowSelected(other, false));
      this.setRowSelected(row, !wasSelected);
    } else {
      this.setRowSelected(row, !this.isSelected(row));
    }
    this.syncSelectAll();
    dispatch(this.element, 'vf-table:selection-change', { selection: this.getSelection() });
  }

  toggleAll(checked) {
    this.selectableRows.forEach((row) => this.setRowSelected(row, checked));
    this.syncSelectAll();
    dispatch(this.element, 'vf-table:selection-change', { selection: this.getSelection() });
  }

  syncSelectAll() {
    if (!this.selectAllInput) {
      return;
    }
    const selectable = this.selectableRows;
    const allSelected = selectable.length > 0 && selectable.every((row) => this.isSelected(row));
    const someSelected = !allSelected && selectable.some((row) => this.isSelected(row));
    this.selectAllInput.checked = allSelected;
    this.selectAllInput.indeterminate = someSelected;
  }

  directionFor(key) {
    return this.currentSort?.key === key ? this.currentSort.direction : null;
  }

  /** Cycles ascending -> descending -> unsorted, mirroring TableComponent.toggleSort(). */
  toggleSort(key) {
    const direction = this.directionFor(key);
    if (direction === null) {
      this.currentSort = { key, direction: 'asc' };
    } else if (direction === 'asc') {
      this.currentSort = { key, direction: 'desc' };
    } else {
      this.currentSort = null;
    }
    this.updateSortAttributes();
    this.applySort();
    dispatch(this.element, 'vf-table:sort-change', { sort: this.currentSort });
  }

  updateSortAttributes() {
    this.sortHeaders.forEach((th) => {
      const direction = this.directionFor(th.dataset.sortKey);
      th.setAttribute(
        'aria-sort',
        direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none',
      );
    });
  }

  sortValue(row, th) {
    const index = this.headerCells.indexOf(th);
    const cell = row.children[index];
    if (!cell) {
      return '';
    }
    const raw = cell.dataset.sortValue ?? cell.textContent.trim();
    const numeric = Number(raw);
    return raw !== '' && !Number.isNaN(numeric) ? numeric : raw;
  }

  applySort() {
    if (!this.tbody) {
      return;
    }
    if (!this.currentSort) {
      this.originalRowOrder.forEach((row) => this.tbody.appendChild(row));
      return;
    }
    const th = this.sortHeaders.find((header) => header.dataset.sortKey === this.currentSort.key);
    if (!th) {
      return;
    }
    const factor = this.currentSort.direction === 'asc' ? 1 : -1;
    const sorted = [...this.rows].sort((a, b) => {
      const left = this.sortValue(a, th);
      const right = this.sortValue(b, th);
      if (typeof left === 'number' && typeof right === 'number') {
        return (left - right) * factor;
      }
      return String(left).localeCompare(String(right)) * factor;
    });
    sorted.forEach((row) => this.tbody.appendChild(row));
  }
}

/**
 * Enhance every `[data-component="table"]` within a root.
 * @param {ParentNode} [root=document]
 * @returns {VfTable[]}
 */
export function initTables(root = document) {
  return Array.from(root.querySelectorAll('[data-component="table"]')).map(
    (element) => new VfTable(element),
  );
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initTables());
}
