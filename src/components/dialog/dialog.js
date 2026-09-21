/**
 * vf-dialog
 *
 * Verified against: projects/ui/src/lib/dialog/dialog.ts + modal-surface.ts (Angular
 * source, `master` branch, vf-dynamic-catalog-components). Angular's real behavior goes
 * through Angular CDK's Dialog/Overlay (focus trap, scroll lock, positioning, Escape/
 * backdrop dismissal all delegated to CDK) - there is no native web equivalent, so this
 * is hand-built following the exact pattern already used by drawer.js (drawer.ts is
 * itself CDK-free in the Angular source).
 *
 * Angular's CDK also destroys and recreates the dialog's DOM on every open/close, which
 * is why its `@starting-style` enter animation replays every time. This port keeps a
 * single static element in the DOM (no dynamic DOM generation, per this library's
 * HTML-first architecture) and instead toggles `display: none` <-> `block` on open/close
 * so `@starting-style` in dialog.css still replays correctly on every open.
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

export class VfDialog {
  /** Shared across instances so nested/sibling dialogs don't fight over body scroll lock. */
  static openCount = 0;

  /** @param {HTMLElement} element - the `.vf-dialog` root */
  constructor(element) {
    this.element = element;
    this.panel = element.querySelector('[data-dialog-panel]');
    this.backdrop = element.querySelector('[data-dialog-backdrop]');
    this.dismissible = element.dataset.dismissible !== 'false';
    this.autoFocus = element.dataset.autofocus || 'first-tabbable';
    this.previouslyFocused = null;

    this.backdrop?.addEventListener('click', () => {
      if (this.dismissible) {
        this.close();
      }
    });

    this.panel?.addEventListener('keydown', (event) => this.handlePanelKeydown(event));

    element.querySelectorAll('[data-dialog-close]').forEach((button) => {
      button.addEventListener('click', () => {
        const result = button.dataset.dialogResult;
        this.close(result === '' ? undefined : result);
      });
    });

    this.handleDocumentKeydown = (event) => {
      if (event.key === 'Escape' && this.isOpen && this.dismissible) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.handleDocumentKeydown);

    if (element.id) {
      document.querySelectorAll(`[data-dialog-open="${element.id}"]`).forEach((trigger) => {
        trigger.addEventListener('click', () => this.open());
      });
    }

    this.syncInert();
  }

  get isOpen() {
    return this.element.classList.contains('vf-dialog--open');
  }

  open() {
    if (this.isOpen) {
      return;
    }
    this.previouslyFocused = document.activeElement;
    this.element.classList.add('vf-dialog--open');
    this.syncInert();
    VfDialog.openCount += 1;
    document.body.style.overflow = 'hidden';
    queueMicrotask(() => this.focusPanel());
    dispatch(this.element, 'vf-dialog:open', {});
  }

  /** @param {unknown} [result] - the value the dialog was "closed with" (undefined for Escape/backdrop) */
  close(result) {
    if (!this.isOpen) {
      return;
    }
    this.element.classList.remove('vf-dialog--open');
    this.syncInert();
    this.releaseScrollLock();
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
    dispatch(this.element, 'vf-dialog:close', { result });
  }

  syncInert() {
    if (this.isOpen) {
      this.element.removeAttribute('inert');
    } else {
      this.element.setAttribute('inert', '');
    }
  }

  releaseScrollLock() {
    VfDialog.openCount = Math.max(0, VfDialog.openCount - 1);
    if (VfDialog.openCount === 0) {
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
    if (this.autoFocus === 'dialog') {
      this.panel.focus();
      return;
    }
    if (this.autoFocus === 'first-heading') {
      const heading = this.panel.querySelector('h1, h2, h3, h4, h5, h6, [data-dialog-title]');
      if (heading) {
        if (!heading.hasAttribute('tabindex')) {
          heading.setAttribute('tabindex', '-1');
        }
        heading.focus();
        return;
      }
    }
    const target = this.panel.querySelector(FOCUSABLE_SELECTOR) ?? this.panel;
    target.focus();
  }
}

/**
 * Enhance every `[data-component="dialog"]` within a root.
 * @param {ParentNode} [root=document]
 * @returns {VfDialog[]}
 */
export function initDialogs(root = document) {
  return Array.from(root.querySelectorAll('[data-component="dialog"]')).map(
    (element) => new VfDialog(element),
  );
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initDialogs());
}
