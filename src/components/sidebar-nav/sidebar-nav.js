/**
 * vf-sidebar-nav
 *
 * Verified against: projects/ui/src/lib/sidebar-nav/sidebar-nav.ts (Angular source,
 * `master` branch, vf-dynamic-catalog-components). `collapsed` is Angular's single
 * source of truth (a `model()` on SidebarNavComponent); every descendant just reads it
 * via `inject()`. VfSidebarNav mirrors that with one class toggled on the root - it never
 * reaches into section/item/user markup, matching how those Angular children have no
 * collapsed input of their own.
 */

import { dispatch } from '../../utils/events.js';

export class VfSidebarNav {
  /** @param {HTMLElement} element - the `.vf-sidebar-nav` root */
  constructor(element) {
    this.element = element;
    this.toggle = element.querySelector('[data-sidebar-nav-toggle]');
    this.toggle?.addEventListener('click', () => this.toggleCollapsed());
    // Sync the toggle button's aria attributes to whatever collapsed state is already
    // in the markup, without dispatching a change event for this initial sync.
    this.syncToggleAttrs();
  }

  get collapsed() {
    return this.element.classList.contains('vf-sidebar-nav--collapsed');
  }

  setCollapsed(collapsed) {
    this.element.classList.toggle('vf-sidebar-nav--collapsed', collapsed);
    this.syncToggleAttrs();
    dispatch(this.element, 'vf-sidebar-nav:change', { collapsed });
  }

  toggleCollapsed() {
    this.setCollapsed(!this.collapsed);
  }

  syncToggleAttrs() {
    if (!this.toggle) {
      return;
    }
    const collapsed = this.collapsed;
    this.toggle.setAttribute('aria-expanded', String(!collapsed));
    // A consumer-supplied `data-aria-label` is a fixed custom label (mirrors Angular's
    // `ariaLabel` input) - leave it alone instead of overwriting with the default swap.
    if (!this.toggle.hasAttribute('data-aria-label')) {
      this.toggle.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    }
  }
}

/**
 * Enhance every `[data-component="sidebar-nav"]` within a root.
 * @param {ParentNode} [root=document]
 * @returns {VfSidebarNav[]}
 */
export function initSidebarNavs(root = document) {
  return Array.from(root.querySelectorAll('[data-component="sidebar-nav"]')).map(
    (element) => new VfSidebarNav(element),
  );
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initSidebarNavs());
}
