/**
 * Accessibility Utility Functions
 * Helper functions for accessibility features
 */

/**
 * Selector for focusable elements
 */
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Get all focusable elements within a container
 * @param {Element} container - Container element
 * @returns {Array<Element>} Array of focusable elements
 */
export function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.disabled && element.offsetParent !== null
  );
}

/**
 * Get the first focusable element in a container
 * @param {Element} container - Container element
 * @returns {Element|null} First focusable element or null
 */
export function getFirstFocusable(container) {
  const focusable = getFocusableElements(container);
  return focusable.length > 0 ? focusable[0] : null;
}

/**
 * Get the last focusable element in a container
 * @param {Element} container - Container element
 * @returns {Element|null} Last focusable element or null
 */
export function getLastFocusable(container) {
  const focusable = getFocusableElements(container);
  return focusable.length > 0 ? focusable[focusable.length - 1] : null;
}

/**
 * Trap focus within a container
 * @param {Element} container - Container to trap focus in
 * @returns {Function} Cleanup function to remove focus trap
 */
export function trapFocus(container) {
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) return () => {};

  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => container.removeEventListener('keydown', handleKeyDown);
}

/**
 * Move focus to an element
 * @param {Element} element - Element to focus
 * @param {Object} [options] - Focus options
 * @param {boolean} [options.preventScroll=false] - Prevent scrolling to element
 */
export function focus(element, options = {}) {
  if (!element) return;
  element.focus(options);
}

/**
 * Store current focus and return function to restore it
 * @returns {Function} Function to restore focus
 */
export function storeFocus() {
  const previouslyFocused = document.activeElement;
  return () => {
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
  };
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} [priority='polite'] - Announcement priority ('polite' or 'assertive')
 */
export function announce(message, priority = 'polite') {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.position = 'absolute';
  announcer.style.left = '-10000px';
  announcer.style.width = '1px';
  announcer.style.height = '1px';
  announcer.style.overflow = 'hidden';

  document.body.appendChild(announcer);

  // Slight delay to ensure screen reader picks it up
  setTimeout(() => {
    announcer.textContent = message;
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    }, 1000);
  }, 100);
}

/**
 * Check if an element is focusable
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is focusable
 */
export function isFocusable(element) {
  if (element.disabled || element.offsetParent === null) return false;
  return element.matches(FOCUSABLE_SELECTOR);
}

/**
 * Get next focusable element
 * @param {Element} element - Current element
 * @param {Element} [container] - Container to search within
 * @returns {Element|null} Next focusable element or null
 */
export function getNextFocusable(element, container = document.body) {
  const focusable = getFocusableElements(container);
  const currentIndex = focusable.indexOf(element);
  if (currentIndex === -1) return null;
  return focusable[currentIndex + 1] || focusable[0];
}

/**
 * Get previous focusable element
 * @param {Element} element - Current element
 * @param {Element} [container] - Container to search within
 * @returns {Element|null} Previous focusable element or null
 */
export function getPreviousFocusable(element, container = document.body) {
  const focusable = getFocusableElements(container);
  const currentIndex = focusable.indexOf(element);
  if (currentIndex === -1) return null;
  return focusable[currentIndex - 1] || focusable[focusable.length - 1];
}

/**
 * Add accessible name to element
 * @param {Element} element - Element to add name to
 * @param {string} name - Accessible name
 * @param {string} [method='aria-label'] - Method to use ('aria-label' or 'aria-labelledby')
 */
export function setAccessibleName(element, name, method = 'aria-label') {
  if (method === 'aria-label') {
    element.setAttribute('aria-label', name);
  } else if (method === 'aria-labelledby') {
    // Create hidden label element
    const labelId = `label-${Math.random().toString(36).substr(2, 9)}`;
    const label = document.createElement('span');
    label.id = labelId;
    label.textContent = name;
    label.style.position = 'absolute';
    label.style.left = '-10000px';
    element.parentNode.insertBefore(label, element);
    element.setAttribute('aria-labelledby', labelId);
  }
}

/**
 * Set ARIA expanded state
 * @param {Element} element - Element to update
 * @param {boolean} expanded - Whether element is expanded
 */
export function setExpanded(element, expanded) {
  element.setAttribute('aria-expanded', expanded.toString());
}

/**
 * Set ARIA hidden state
 * @param {Element} element - Element to update
 * @param {boolean} hidden - Whether element is hidden
 */
export function setHidden(element, hidden) {
  if (hidden) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

/**
 * Set ARIA pressed state
 * @param {Element} element - Element to update
 * @param {boolean|'mixed'} pressed - Pressed state
 */
export function setPressed(element, pressed) {
  element.setAttribute('aria-pressed', pressed.toString());
}

/**
 * Set ARIA selected state
 * @param {Element} element - Element to update
 * @param {boolean} selected - Whether element is selected
 */
export function setSelected(element, selected) {
  element.setAttribute('aria-selected', selected.toString());
}

/**
 * Set ARIA disabled state
 * @param {Element} element - Element to update
 * @param {boolean} disabled - Whether element is disabled
 */
export function setDisabled(element, disabled) {
  if (disabled) {
    element.setAttribute('aria-disabled', 'true');
  } else {
    element.removeAttribute('aria-disabled');
  }
}

/**
 * Create unique ID for accessibility
 * @param {string} [prefix='vf'] - ID prefix
 * @returns {string} Unique ID
 */
export function createId(prefix = 'vf') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
