import { VfTable, initTables } from './table.js';

function tableTemplate() {
  return `
    <table class="vf-table" data-component="table" data-selection-mode="multiple">
      <thead>
        <tr class="vf-table__row">
          <th class="vf-table__cell vf-table__cell--head">
            <input type="checkbox" class="vf-table__checkbox" data-table-select-all aria-label="Select all rows" />
          </th>
          <th class="vf-table__cell vf-table__cell--head" data-sort-key="id" aria-sort="none">
            <span class="vf-table__sort-trigger" role="button" tabindex="0">Invoice</span>
          </th>
          <th class="vf-table__cell vf-table__cell--head vf-table__cell--numeric" data-sort-key="amount" aria-sort="none">
            <span class="vf-table__sort-trigger" role="button" tabindex="0">Amount</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="vf-table__row" data-value="INV-1">
          <td class="vf-table__cell"><input type="checkbox" class="vf-table__checkbox" data-table-select-row aria-label="Select INV-1" /></td>
          <td class="vf-table__cell">INV-1</td>
          <td class="vf-table__cell vf-table__cell--numeric" data-sort-value="30">30</td>
        </tr>
        <tr class="vf-table__row" data-value="INV-2">
          <td class="vf-table__cell"><input type="checkbox" class="vf-table__checkbox" data-table-select-row aria-label="Select INV-2" /></td>
          <td class="vf-table__cell">INV-2</td>
          <td class="vf-table__cell vf-table__cell--numeric" data-sort-value="10">10</td>
        </tr>
        <tr class="vf-table__row vf-table__row--disabled" data-value="INV-3" data-disabled="true">
          <td class="vf-table__cell"><input type="checkbox" class="vf-table__checkbox" data-table-select-row aria-label="Select INV-3" disabled /></td>
          <td class="vf-table__cell">INV-3</td>
          <td class="vf-table__cell vf-table__cell--numeric" data-sort-value="20">20</td>
        </tr>
      </tbody>
    </table>
  `;
}

describe('VfTable', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('cycles a sortable column ascending, descending, then unsorted', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const idHeader = table.headerCells[1];

    expect(idHeader.getAttribute('aria-sort')).toBe('none');

    idHeader.querySelector('.vf-table__sort-trigger').click();
    expect(table.currentSort).toEqual({ key: 'id', direction: 'asc' });
    expect(idHeader.getAttribute('aria-sort')).toBe('ascending');

    idHeader.querySelector('.vf-table__sort-trigger').click();
    expect(idHeader.getAttribute('aria-sort')).toBe('descending');

    idHeader.querySelector('.vf-table__sort-trigger').click();
    expect(table.currentSort).toBeNull();
    expect(idHeader.getAttribute('aria-sort')).toBe('none');
  });

  it('switching columns starts the new column ascending and resets the previous one', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const [, idHeader, amountHeader] = table.headerCells;

    idHeader.querySelector('.vf-table__sort-trigger').click();
    amountHeader.querySelector('.vf-table__sort-trigger').click();

    expect(table.currentSort).toEqual({ key: 'amount', direction: 'asc' });
    expect(idHeader.getAttribute('aria-sort')).toBe('none');
  });

  it('reorders rows numerically by data-sort-value', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const amountHeader = table.headerCells[2];

    amountHeader.querySelector('.vf-table__sort-trigger').click();

    expect(table.rows.map((row) => row.dataset.value)).toEqual(['INV-2', 'INV-3', 'INV-1']);
  });

  it('restores the original row order once sorting is cleared', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const idHeader = table.headerCells[1];
    const trigger = idHeader.querySelector('.vf-table__sort-trigger');

    trigger.click();
    trigger.click();
    trigger.click();

    expect(table.rows.map((row) => row.dataset.value)).toEqual(['INV-1', 'INV-2', 'INV-3']);
  });

  it('selects and deselects a row through its checkbox', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const checkbox = table.rows[0].querySelector('[data-table-select-row]');

    checkbox.click();
    expect(table.getSelection()).toEqual(['INV-1']);

    checkbox.click();
    expect(table.getSelection()).toEqual([]);
  });

  it('keeps only one row selected in single mode', () => {
    document.body.innerHTML = tableTemplate();
    const root = document.querySelector('.vf-table');
    root.dataset.selectionMode = 'single';
    const table = new VfTable(root);

    table.rows[0].querySelector('[data-table-select-row]').click();
    table.rows[1].querySelector('[data-table-select-row]').click();

    expect(table.getSelection()).toEqual(['INV-2']);
  });

  it('select-all toggles every selectable row and reports an indeterminate state', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const selectAll = table.selectAllInput;

    table.rows[0].querySelector('[data-table-select-row]').click();
    expect(selectAll.indeterminate).toBe(true);
    expect(selectAll.checked).toBe(false);

    selectAll.click();
    expect(table.getSelection()).toEqual(['INV-1', 'INV-2']);
    expect(selectAll.indeterminate).toBe(false);
    expect(selectAll.checked).toBe(true);

    selectAll.click();
    expect(table.getSelection()).toEqual([]);
  });

  it('excludes disabled rows from select-all', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));

    table.selectAllInput.click();

    expect(table.getSelection()).toEqual(['INV-1', 'INV-2']);
  });

  it('marks selected rows for assistive tech and styling', () => {
    document.body.innerHTML = tableTemplate();
    const table = new VfTable(document.querySelector('.vf-table'));
    const row = table.rows[0];

    expect(row.getAttribute('aria-selected')).toBeNull();

    row.querySelector('[data-table-select-row]').click();

    expect(row.getAttribute('aria-selected')).toBe('true');
    expect(row.getAttribute('data-selected')).toBe('true');
  });

  it('omits aria-selected when selection is off', () => {
    document.body.innerHTML = tableTemplate();
    const root = document.querySelector('.vf-table');
    root.dataset.selectionMode = 'none';
    const table = new VfTable(root);

    table.rows[0].querySelector('[data-table-select-row]').click();

    expect(table.rows[0].hasAttribute('aria-selected')).toBe(false);
  });

  it('dispatches vf-table:sort-change and vf-table:selection-change events', () => {
    document.body.innerHTML = tableTemplate();
    const root = document.querySelector('.vf-table');
    const sortSpy = vi.fn();
    const selectionSpy = vi.fn();
    root.addEventListener('vf-table:sort-change', sortSpy);
    root.addEventListener('vf-table:selection-change', selectionSpy);
    const table = new VfTable(root);

    table.headerCells[1].querySelector('.vf-table__sort-trigger').click();
    table.rows[0].querySelector('[data-table-select-row]').click();

    expect(sortSpy).toHaveBeenCalledTimes(1);
    expect(sortSpy.mock.calls[0][0].detail.sort).toEqual({ key: 'id', direction: 'asc' });
    expect(selectionSpy).toHaveBeenCalledTimes(1);
    expect(selectionSpy.mock.calls[0][0].detail.selection).toEqual(['INV-1']);
  });

  it('initTables enhances every [data-component="table"] within a root', () => {
    document.body.innerHTML = tableTemplate();
    const [table] = initTables(document);

    expect(table).toBeInstanceOf(VfTable);
  });
});
