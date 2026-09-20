/**
 * vf-drawer
 *
 * Verified against: projects/ui/src/lib/drawer/drawer.ts (Angular source, `master`
 * branch, vf-dynamic-catalog-components). Angular implements its own focus trap and
 * body-scroll-lock manually (no Angular CDK involved) - ported near line-for-line,
 * including the module-level open-drawer counter so nested/sibling drawers share one
 * scroll lock instead of fighting over `document.body.style.overflow`.
 */

import { dispatch } from '../../utils/events.js';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export class VfDrawer {
  /** Shared across instances so nested/sibling drawers don't fight over body scroll lock. */
  static openCount = 0;

  /** @param {HTMLElement} element - the `.vf-drawer` root */
  constructor(element) {
    this.element = element;
    this.panel = element.querySelector('[data-drawer-panel]');
    this.backdrop = element.querySelector('[data-drawer-backdrop]');
    this.closeOnBackdrop = element.dataset.closeOnBackdrop !== 'false';
    this.closeOnEscape = element.dataset.closeOnEscape !== 'false';
    this.previouslyFocused = null;

    this.backdrop?.addEventListener('click', () => {
      if (this.closeOnBackdrop) {
        this.close();
      }
    });

    this.panel?.addEventListener('keydown', (event) => this.handlePanelKeydown(event));

    element.querySelectorAll('[data-drawer-close]').forEach((button) => {
      button.addEventListener('click', () => this.close());
    });

    this.handleDocumentKeydown = (event) => {
      if (event.key === 'Escape' && this.isOpen && this.closeOnEscape) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.handleDocumentKeydown);

    if (element.id) {
      document.querySelectorAll(`[data-drawer-open="${element.id}"]`).forEach((trigger) => {
        trigger.addEventListener('click', () => this.open());
      });
    }

    this.syncInert();
  }

  get isOpen() {
    return this.element.classList.contains('vf-drawer--open');
  }

  open() {
    if (this.isOpen) {
      return;
    }
    this.previouslyFocused = document.activeElement;
    this.element.classList.add('vf-drawer--open');
    this.syncInert();
    VfDrawer.openCount += 1;
    document.body.style.overflow = 'hidden';
    queueMicrotask(() => this.focusPanel());
    dispatch(this.element, 'vf-drawer:open', {});
  }

  close() {
    if (!this.isOpen) {
      return;
    }
    this.element.classList.remove('vf-drawer--open');
    this.syncInert();
    this.releaseScrollLock();
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
    dispatch(this.element, 'vf-drawer:close', {});
  }

  syncInert() {
    if (this.isOpen) {
      this.element.removeAttribute('inert');
    } else {
      this.element.setAttribute('inert', '');
    }
  }

  releaseScrollLock() {
    VfDrawer.openCount = Math.max(0, VfDrawer.openCount - 1);
    if (VfDrawer.openCount === 0) {
      document.body.style.overflow = '';
    }
  }

  handlePanelKeydown(event) {
    if (event.key !== 'Tab') {
      return;
    }
    const focusables = Array.from(this.panel.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  focusPanel() {
    const target = this.panel.querySelector(FOCUSABLE_SELECTOR) ?? this.panel;
    target.focus();
  }
}

/**
 * Enhance every `[data-component="drawer"]` within a root.
 * @param {ParentNode} [root=document]
 * @returns {VfDrawer[]}
 */
export function initDrawers(root = document) {
  return Array.from(root.querySelectorAll('[data-component="drawer"]')).map(
    (element) => new VfDrawer(element),
  );
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initDrawers());
}
