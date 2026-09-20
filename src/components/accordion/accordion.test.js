import { VfAccordion, VfAccordionItem, initAccordions } from './accordion.js';

function itemTemplate(value, { expanded = false, disabled = false } = {}) {
  return `
    <div class="vf-accordion__item${expanded ? ' vf-accordion__item--expanded' : ''}${disabled ? ' vf-accordion__item--disabled' : ''}" data-value="${value}">
      <button type="button" class="vf-accordion__trigger" aria-expanded="${expanded}" ${disabled ? 'disabled aria-disabled="true"' : ''}>
        <span class="vf-accordion__header"><span class="vf-accordion__title-row"><span class="vf-accordion__title">${value}</span></span></span>
        <span class="vf-accordion__chevron"></span>
      </button>
      <div class="vf-accordion__content">
        <div class="vf-accordion__content-inner">
          <div class="vf-accordion__panel">${value} content</div>
        </div>
      </div>
    </div>
  `;
}

function groupTemplate(multiple = false) {
  return `
    <div class="vf-accordion" data-component="accordion" data-multiple="${multiple}">
      ${itemTemplate('a')}
      ${itemTemplate('b')}
      ${itemTemplate('c', { disabled: true })}
    </div>
  `;
}

describe('VfAccordionItem', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('toggles expanded state and aria-expanded on trigger click', () => {
    document.body.innerHTML = itemTemplate('solo');
    const el = document.querySelector('.vf-accordion__item');
    const item = new VfAccordionItem(el);

    item.trigger.click();
    expect(item.expanded).toBe(true);
    expect(item.trigger.getAttribute('aria-expanded')).toBe('true');

    item.trigger.click();
    expect(item.expanded).toBe(false);
    expect(item.trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not toggle when disabled', () => {
    document.body.innerHTML = itemTemplate('solo', { disabled: true });
    const el = document.querySelector('.vf-accordion__item');
    const item = new VfAccordionItem(el);

    item.trigger.click();
    expect(item.expanded).toBe(false);
  });

  it('dispatches vf-accordion-item:toggle with value/expanded detail', () => {
    document.body.innerHTML = itemTemplate('solo');
    const el = document.querySelector('.vf-accordion__item');
    const item = new VfAccordionItem(el);
    const handler = vi.fn();
    el.addEventListener('vf-accordion-item:toggle', handler);

    item.trigger.click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 'solo', expanded: true });
  });
});

describe('VfAccordion', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('enforces single-open exclusivity by default', () => {
    document.body.innerHTML = groupTemplate(false);
    const root = document.querySelector('.vf-accordion');
    const accordion = new VfAccordion(root);

    accordion.items[0].trigger.click();
    expect(accordion.items[0].expanded).toBe(true);

    accordion.items[1].trigger.click();
    expect(accordion.items[1].expanded).toBe(true);
    expect(accordion.items[0].expanded).toBe(false);
  });

  it('allows multiple open items when data-multiple="true"', () => {
    document.body.innerHTML = groupTemplate(true);
    const root = document.querySelector('.vf-accordion');
    const accordion = new VfAccordion(root);

    accordion.items[0].trigger.click();
    accordion.items[1].trigger.click();

    expect(accordion.items[0].expanded).toBe(true);
    expect(accordion.items[1].expanded).toBe(true);
  });

  it('ignores clicks on a disabled item', () => {
    document.body.innerHTML = groupTemplate(false);
    const root = document.querySelector('.vf-accordion');
    const accordion = new VfAccordion(root);

    accordion.items[2].trigger.click();
    expect(accordion.items[2].expanded).toBe(false);
  });

  it('dispatches vf-accordion:change with the current expanded values', () => {
    document.body.innerHTML = groupTemplate(false);
    const root = document.querySelector('.vf-accordion');
    const accordion = new VfAccordion(root);
    const handler = vi.fn();
    root.addEventListener('vf-accordion:change', handler);

    accordion.items[0].trigger.click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ value: ['a'] });
  });
});

describe('initAccordions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes groups and standalone items separately', () => {
    document.body.innerHTML = `
      ${groupTemplate(false)}
      <div class="vf-accordion__item" data-component="accordion-item" data-value="standalone">
        <button type="button" class="vf-accordion__trigger" aria-expanded="false"></button>
        <div class="vf-accordion__content"><div class="vf-accordion__content-inner"><div class="vf-accordion__panel">x</div></div></div>
      </div>
    `;

    const { groups, standaloneItems } = initAccordions();

    expect(groups).toHaveLength(1);
    expect(groups[0].items).toHaveLength(3);
    expect(standaloneItems).toHaveLength(1);
  });
});
