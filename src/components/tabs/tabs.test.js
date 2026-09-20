import { VfTabs, initTabs } from './tabs.js';

function tabsTemplate() {
  return `
    <div class="vf-tabs" data-component="tabs" role="tablist" aria-orientation="horizontal">
      <button type="button" class="vf-tabs__tab vf-tabs__tab--selected" role="tab" id="t-tab-a" aria-controls="t-panel-a" aria-selected="true" tabindex="0" data-value="a">A</button>
      <button type="button" class="vf-tabs__tab" role="tab" id="t-tab-b" aria-controls="t-panel-b" aria-selected="false" tabindex="-1" data-value="b">B</button>
      <button type="button" class="vf-tabs__tab" role="tab" id="t-tab-c" aria-controls="t-panel-c" aria-selected="false" tabindex="-1" data-value="c" disabled>C</button>
    </div>
    <div class="vf-tabs__panel" role="tabpanel" id="t-panel-a" aria-labelledby="t-tab-a">Panel A</div>
    <div class="vf-tabs__panel" role="tabpanel" id="t-panel-b" aria-labelledby="t-tab-b" hidden>Panel B</div>
    <div class="vf-tabs__panel" role="tabpanel" id="t-panel-c" aria-labelledby="t-tab-c" hidden>Panel C</div>
  `;
}

describe('VfTabs', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('selects a tab on click and shows/hides the matching panel', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    tabs.tabs[1].click();

    expect(tabs.tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs.tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(document.getElementById('t-panel-b').hidden).toBe(false);
    expect(document.getElementById('t-panel-a').hidden).toBe(true);
  });

  it('ignores clicks on a disabled tab', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    tabs.tabs[2].click();

    expect(tabs.tabs[2].getAttribute('aria-selected')).toBe('false');
  });

  it('auto-selects the first enabled tab when none is marked selected in markup', () => {
    document.body.innerHTML = tabsTemplate().replace('aria-selected="true"', 'aria-selected="false"');
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    expect(tabs.tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(document.getElementById('t-panel-a').hidden).toBe(false);
  });

  it('sets tabindex roving pattern (0 for selected, -1 for others)', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    tabs.tabs[1].click();

    expect(tabs.tabs[1].tabIndex).toBe(0);
    expect(tabs.tabs[0].tabIndex).toBe(-1);
  });

  it('ArrowRight moves to the next enabled tab, skipping disabled ones and wrapping', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    tabs.focusAdjacent(tabs.tabs[1], 1); // from B, skip disabled C, wrap to A
    expect(tabs.tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowLeft moves to the previous enabled tab', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    tabs.focusAdjacent(tabs.tabs[1], -1); // from B -> A
    expect(tabs.tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  it('Home/End jump to the first/last enabled tab', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);

    tabs.focusEdge('last');
    expect(tabs.tabs[1].getAttribute('aria-selected')).toBe('true'); // B is the last enabled tab (C is disabled)

    tabs.focusEdge('first');
    expect(tabs.tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  it('dispatches vf-tabs:change with the selected value', () => {
    document.body.innerHTML = tabsTemplate();
    const root = document.querySelector('.vf-tabs');
    const tabs = new VfTabs(root);
    const handler = vi.fn();
    root.addEventListener('vf-tabs:change', handler);

    tabs.tabs[1].click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 'b' });
  });
});

describe('initTabs', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes every [data-component="tabs"] tablist within a root', () => {
    document.body.innerHTML = tabsTemplate();
    const instances = initTabs();
    expect(instances).toHaveLength(1);
    expect(instances[0].tabs).toHaveLength(3);
  });
});
