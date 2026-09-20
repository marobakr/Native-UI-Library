/**
 * vf-button
 *
 * Verified against: projects/ui/src/lib/button/button.ts (Angular source, `master` branch,
 * vf-dynamic-catalog-components). Angular only reacts to `disabled`/`loading` input changes
 * by toggling the `disabled`/`aria-disabled`/`aria-busy` attributes - it does not emit a
 * custom click event and does not auto-disable on `loading` alone, so this class mirrors
 * that exactly rather than adding new behavior.
 */

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
const SIZES = ['sm', 'md', 'lg', 'icon'];

export class VfButton {
  /**
   * @param {HTMLButtonElement|HTMLAnchorElement} element
   */
  constructor(element) {
    this.element = element;
    this.syncDisabled(element.hasAttribute('disabled'));
    this.syncLoading(element.dataset.loading === 'true');
  }

  /** @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} variant */
  setVariant(variant) {
    VARIANTS.forEach((v) => this.element.classList.remove(`vf-button--${v}`));
    this.element.classList.add(`vf-button--${variant}`);
  }

  /** @param {'sm'|'md'|'lg'|'icon'} size */
  setSize(size) {
    SIZES.forEach((s) => this.element.classList.remove(`vf-button--${s}`));
    this.element.classList.add(`vf-button--${size}`);
  }

  /** @param {boolean} fullWidth */
  setFullWidth(fullWidth) {
    this.element.classList.toggle('vf-button--full-width', fullWidth);
  }

  /** @param {boolean} disabled */
  setDisabled(disabled) {
    this.syncDisabled(disabled);
  }

  /** @param {boolean} loading */
  setLoading(loading) {
    this.syncLoading(loading);
  }

  syncDisabled(disabled) {
    if (disabled) {
      this.element.setAttribute('disabled', '');
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.removeAttribute('disabled');
      this.element.removeAttribute('aria-disabled');
    }
  }

  syncLoading(loading) {
    this.element.dataset.loading = String(loading);
    if (loading) {
      this.element.setAttribute('aria-busy', 'true');
    } else {
      this.element.removeAttribute('aria-busy');
    }
  }
}

/**
 * Enhance every `[data-component="button"]` element within a root (defaults to the whole document).
 * @param {ParentNode} [root=document]
 * @returns {VfButton[]}
 */
export function initButtons(root = document) {
  return Array.from(root.querySelectorAll('[data-component="button"]')).map(
    (element) => new VfButton(element),
  );
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initButtons());
}
