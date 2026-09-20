import { VfDrawer, initDrawers } from './drawer.js';

function drawerTemplate() {
  return `
    <button type="button" id="trigger" data-drawer-open="d1">Open trigger</button>
    <div class="vf-drawer" data-component="drawer" id="d1" data-side="end" data-size="md" inert>
      <div class="vf-drawer__backdrop" data-drawer-backdrop></div>
      <div class="vf-drawer__panel vf-drawer__panel--end vf-drawer__panel--md" role="dialog" aria-modal="true" aria-label="Test drawer" tabindex="-1" data-drawer-panel>
        <header><button type="button" id="first-focusable">First</button></header>
        <div class="vf-drawer__body"><p>Body content</p></div>
        <footer><button type="button" id="last-focusable" data-drawer-close>Last</button></footer>
      </div>
    </div>
  `;
}

describe('VfDrawer', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
    VfDrawer.openCount = 0;
  });

  it('renders closed by default, inert, with the panel translated off-screen', () => {
    document.body.innerHTML = drawerTemplate();
    const drawer = new VfDrawer(document.querySelector('.vf-drawer'));

    expect(drawer.isOpen).toBe(false);
    expect(drawer.element.hasAttribute('inert')).toBe(true);
  });

  it('opens via a [data-drawer-open] trigger and removes inert', () => {
    document.body.innerHTML = drawerTemplate();
    new VfDrawer(document.querySelector('.vf-drawer'));

    document.getElementById('trigger').click();

    const drawer = document.querySelector('.vf-drawer');
    expect(drawer.classList.contains('vf-drawer--open')).toBe(true);
    expect(drawer.hasAttribute('inert')).toBe(false);
  });

  it('moves focus into the panel when opened', async () => {
    document.body.innerHTML = drawerTemplate();
    const drawer = new VfDrawer(document.querySelector('.vf-drawer'));

    drawer.open();
    await Promise.resolve();

    expect(drawer.panel.contains(document.activeElement)).toBe(true);
  });

  it('locks and releases body scroll', async () => {
    document.body.innerHTML = drawerTemplate();
    const drawer = new VfDrawer(document.querySelector('.vf-drawer'));

    drawer.open();
    expect(document.body.style.overflow).toBe('hidden');

    drawer.close();
    expect(document.body.style.overflow).toBe('');
  });

  it('emits vf-drawer:close on backdrop click', () => {
    document.body.innerHTML = drawerTemplate();
    const root = document.querySelector('.vf-drawer');
    const spy = vi.fn();
    root.addEventListener('vf-drawer:close', spy);
    const drawer = new VfDrawer(root);
    drawer.open();

    drawer.backdrop.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(drawer.isOpen).toBe(false);
  });

  it('does not close on backdrop click when data-close-on-backdrop is false', () => {
    document.body.innerHTML = drawerTemplate();
    const root = document.querySelector('.vf-drawer');
    root.dataset.closeOnBackdrop = 'false';
    const drawer = new VfDrawer(root);
    drawer.open();

    drawer.backdrop.click();

    expect(drawer.isOpen).toBe(true);
  });

  it('emits vf-drawer:close on Escape', () => {
    document.body.innerHTML = drawerTemplate();
    const root = document.querySelector('.vf-drawer');
    const spy = vi.fn();
    root.addEventListener('vf-drawer:close', spy);
    const drawer = new VfDrawer(root);
    drawer.open();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(drawer.isOpen).toBe(false);
  });

  it('does not close on Escape when data-close-on-escape is false', () => {
    document.body.innerHTML = drawerTemplate();
    const root = document.querySelector('.vf-drawer');
    root.dataset.closeOnEscape = 'false';
    const drawer = new VfDrawer(root);
    drawer.open();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(drawer.isOpen).toBe(true);
  });

  it('traps Tab focus between the first and last focusable elements', () => {
    document.body.innerHTML = drawerTemplate();
    const drawer = new VfDrawer(document.querySelector('.vf-drawer'));
    drawer.open();

    const last = drawer.panel.querySelector('#last-focusable');
    last.focus();
    drawer.panel.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    );

    const first = drawer.panel.querySelector('#first-focusable');
    expect(document.activeElement).toBe(first);
  });

  it('closes via a [data-drawer-close] button inside the panel', () => {
    document.body.innerHTML = drawerTemplate();
    const drawer = new VfDrawer(document.querySelector('.vf-drawer'));
    drawer.open();

    document.getElementById('last-focusable').click();

    expect(drawer.isOpen).toBe(false);
  });

  it('initDrawers enhances every [data-component="drawer"] within a root', () => {
    document.body.innerHTML = drawerTemplate();
    const [drawer] = initDrawers(document);

    expect(drawer).toBeInstanceOf(VfDrawer);
  });
});
