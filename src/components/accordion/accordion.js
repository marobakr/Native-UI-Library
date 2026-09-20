/**
 * vf-accordion / vf-accordion-item
 *
 * Verified against: projects/ui/src/lib/accordion/accordion.ts (Angular source, `master`
 * branch, vf-dynamic-catalog-components). Angular drives expand/collapse through a
 * `value` model (group) or a local `expanded` model (standalone item) - this mirrors
 * that with DOM classes/attributes instead of signals.
 */

import { dispatch } from '../../utils/events.js';

export class VfAccordionItem {
  /** @param {HTMLElement} element - the `.vf-accordion__item` element */
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector(':scope > .vf-accordion__trigger');
    this.value = element.dataset.value ?? null;
    this.trigger?.addEventListener('click', () => this.handleTriggerClick());
  }

  get disabled() {
    return this.trigger?.disabled ?? false;
  }

  get expanded() {
    return this.element.classList.contains('vf-accordion__item--expanded');
  }

  /** @param {boolean} expanded */
  setExpanded(expanded) {
    this.element.classList.toggle('vf-accordion__item--expanded', expanded);
    this.trigger?.setAttribute('aria-expanded', String(expanded));
  }

  handleTriggerClick() {
    if (this.disabled) {
      return;
    }
    const next = !this.expanded;
    this.setExpanded(next);
    dispatch(this.element, 'vf-accordion-item:toggle', { value: this.value, expanded: next });
  }
}

export class VfAccordion {
  /** @param {HTMLElement} element - the `.vf-accordion` group root */
  constructor(element) {
    this.element = element;
    this.multiple = element.dataset.multiple === 'true';
    this.items = Array.from(element.querySelectorAll(':scope > .vf-accordion__item')).map(
      (itemEl) => new VfAccordionItem(itemEl),
    );
    element.addEventListener('vf-accordion-item:toggle', (event) => this.handleItemToggle(event));
  }

  handleItemToggle(event) {
    const { value, expanded } = event.detail;
    if (expanded && !this.multiple) {
      this.items.forEach((item) => {
        if (item.value !== value) {
          item.setExpanded(false);
        }
      });
    }
    dispatch(this.element, 'vf-accordion:change', { value: this.getExpandedValues() });
  }

  getExpandedValues() {
    return this.items.filter((item) => item.expanded).map((item) => item.value);
  }
}

/**
 * Enhance every `[data-component="accordion"]` group and any `[data-component="accordion-item"]`
 * used standalone (i.e. not nested inside a group) within a root.
 * @param {ParentNode} [root=document]
 * @returns {{ groups: VfAccordion[], standaloneItems: VfAccordionItem[] }}
 */
export function initAccordions(root = document) {
  const groups = Array.from(root.querySelectorAll('[data-component="accordion"]')).map(
    (element) => new VfAccordion(element),
  );
  const standaloneItems = Array.from(
    root.querySelectorAll('[data-component="accordion-item"]'),
  )
    .filter((element) => !element.closest('[data-component="accordion"]'))
    .map((element) => new VfAccordionItem(element));

  return { groups, standaloneItems };
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initAccordions());
}
