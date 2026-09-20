import { VfSidebarNav, initSidebarNavs } from './sidebar-nav.js';

function sidebarNavTemplate() {
  return `
    <nav class="vf-sidebar-nav" data-component="sidebar-nav" role="navigation" aria-label="Primary">
      <div class="vf-sidebar-nav__header">
        <button type="button" class="vf-sidebar-nav__toggle" data-sidebar-nav-toggle aria-expanded="true" aria-label="Collapse sidebar">»</button>
      </div>
      <div class="vf-sidebar-nav__body">
        <div class="vf-sidebar-nav__section">
          <div class="vf-sidebar-nav__section-label">Resources</div>
          <div class="vf-sidebar-nav__section-items">
            <a class="vf-sidebar-nav__item vf-sidebar-nav__item--active" href="#" aria-current="page">
              <span class="vf-sidebar-nav__item-label">Home</span>
              <span class="vf-sidebar-nav__item-badge">2</span>
            </a>
            <button type="button" class="vf-sidebar-nav__item" disabled>
              <span class="vf-sidebar-nav__item-label">Disabled</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;
}

describe('VfSidebarNav', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('exposes a navigation landmark with the given aria-label', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const nav = document.querySelector('.vf-sidebar-nav');

    expect(nav.getAttribute('role')).toBe('navigation');
    expect(nav.getAttribute('aria-label')).toBe('Primary');
  });

  it('marks the active item with aria-current="page"', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const item = document.querySelector('.vf-sidebar-nav__item--active');

    expect(item.getAttribute('aria-current')).toBe('page');
  });

  it('disables a nav item via the disabled attribute', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const disabledItem = document.querySelectorAll('.vf-sidebar-nav__item')[1];

    expect(disabledItem.hasAttribute('disabled')).toBe(true);
  });

  it('renders the badge value on an active item', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const item = document.querySelector('.vf-sidebar-nav__item--active');

    expect(item.textContent).toContain('2');
  });

  it('starts expanded and syncs the toggle aria attributes on init', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const nav = new VfSidebarNav(document.querySelector('.vf-sidebar-nav'));

    expect(nav.collapsed).toBe(false);
    expect(nav.toggle.getAttribute('aria-expanded')).toBe('true');
    expect(nav.toggle.getAttribute('aria-label')).toBe('Collapse sidebar');
  });

  it('toggles the collapsed state on click and updates its own aria attributes', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const nav = new VfSidebarNav(document.querySelector('.vf-sidebar-nav'));

    nav.toggle.click();

    expect(nav.collapsed).toBe(true);
    expect(nav.element.classList.contains('vf-sidebar-nav--collapsed')).toBe(true);
    expect(nav.toggle.getAttribute('aria-expanded')).toBe('false');
    expect(nav.toggle.getAttribute('aria-label')).toBe('Expand sidebar');

    nav.toggle.click();

    expect(nav.collapsed).toBe(false);
    expect(nav.toggle.getAttribute('aria-expanded')).toBe('true');
    expect(nav.toggle.getAttribute('aria-label')).toBe('Collapse sidebar');
  });

  it('does not dispatch vf-sidebar-nav:change during initial construction', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const root = document.querySelector('.vf-sidebar-nav');
    const spy = vi.fn();
    root.addEventListener('vf-sidebar-nav:change', spy);

    new VfSidebarNav(root);

    expect(spy).not.toHaveBeenCalled();
  });

  it('dispatches vf-sidebar-nav:change with the new collapsed state on toggle', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const root = document.querySelector('.vf-sidebar-nav');
    const spy = vi.fn();
    root.addEventListener('vf-sidebar-nav:change', spy);
    const nav = new VfSidebarNav(root);

    nav.toggle.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ collapsed: true });
  });

  it('leaves a custom data-aria-label untouched when toggling', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const root = document.querySelector('.vf-sidebar-nav');
    const toggle = root.querySelector('[data-sidebar-nav-toggle]');
    toggle.setAttribute('data-aria-label', 'true');
    toggle.setAttribute('aria-label', 'Menu');
    const nav = new VfSidebarNav(root);

    nav.toggle.click();

    expect(nav.toggle.getAttribute('aria-label')).toBe('Menu');
  });

  it('initSidebarNavs enhances every [data-component="sidebar-nav"] within a root', () => {
    document.body.innerHTML = sidebarNavTemplate();
    const [nav] = initSidebarNavs(document);

    expect(nav).toBeInstanceOf(VfSidebarNav);
  });
});
