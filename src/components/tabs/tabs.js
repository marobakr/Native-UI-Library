/**
 * vf-tabs / button[vfTab] / vf-tab-panel
 *
 * Verified against: projects/ui/src/lib/tabs/tabs.ts (Angular source, `master` branch,
 * vf-dynamic-catalog-components). Tabs and panels are linked purely by
 * id <-> aria-controls/aria-labelledby (matches Angular - panels aren't required to be
 * DOM descendants of the tablist).
 */

import { dispatch } from '../../utils/events.js';

const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown']);
const PREV_KEYS = new Set(['ArrowLeft', 'ArrowUp']);

export class VfTabs {
  /** @param {HTMLElement} element - the `[role="tablist"]` root */
  constructor(element) {
    this.element = element;
    this.tabs = Array.from(element.querySelectorAll(':scope > [role="tab"]'));

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => this.selectTab(tab));
      tab.addEventListener('keydown', (event) => this.handleKeydown(event, tab));
    });

    // Mirrors Angular's effect(): auto-select the first enabled tab only if none is
    // already marked selected in markup, then force-sync every panel's hidden state.
    const initiallySelected =
      this.tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? this.enabledTabs[0];
    this.tabs.forEach((tab) => this.setSelected(tab, tab === initiallySelected));
  }

  get enabledTabs() {
    return this.tabs.filter((tab) => !tab.disabled);
  }

  selectTab(tab) {
    if (tab.disabled) {
      return;
    }
    this.tabs.forEach((t) => this.setSelected(t, t === tab));
    dispatch(this.element, 'vf-tabs:change', { value: tab.dataset.value ?? null });
  }

  setSelected(tab, selected) {
    tab.classList.toggle('vf-tabs__tab--selected', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) {
      panel.hidden = !selected;
    }
  }

  handleKeydown(event, tab) {
    if (NEXT_KEYS.has(event.key)) {
      event.preventDefault();
      this.focusAdjacent(tab, 1);
    } else if (PREV_KEYS.has(event.key)) {
      event.preventDefault();
      this.focusAdjacent(tab, -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.focusEdge('first');
    } else if (event.key === 'End') {
      event.preventDefault();
      this.focusEdge('last');
    }
  }

  focusAdjacent(current, delta) {
    const enabled = this.enabledTabs;
    if (enabled.length === 0) {
      return;
    }
    const index = enabled.indexOf(current);
    const next = enabled[(index + delta + enabled.length) % enabled.length];
    this.activate(next);
  }

  focusEdge(edge) {
    const enabled = this.enabledTabs;
    if (enabled.length === 0) {
      return;
    }
    this.activate(edge === 'first' ? enabled[0] : enabled[enabled.length - 1]);
  }

  activate(tab) {
    this.selectTab(tab);
    tab.focus();
  }
}

/**
 * Enhance every `[data-component="tabs"]` tablist within a root.
 * @param {ParentNode} [root=document]
 * @returns {VfTabs[]}
 */
export function initTabs(root = document) {
  return Array.from(root.querySelectorAll('[data-component="tabs"]')).map(
    (element) => new VfTabs(element),
  );
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initTabs());
}
