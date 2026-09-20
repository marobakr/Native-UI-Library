/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation and queries
 */

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {Element|Document} context - Context to search within
 * @returns {Element|null} The found element or null
 */
export function querySelector(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query all elements matching selector
 * @param {string} selector - CSS selector
 * @param {Element|Document} context - Context to search within
 * @returns {Array<Element>} Array of found elements
 */
export function querySelectorAll(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Check if element matches selector
 * @param {Element} element - Element to test
 * @param {string} selector - CSS selector
 * @returns {boolean} True if element matches selector
 */
export function matches(element, selector) {
  return element.matches(selector);
}

/**
 * Find closest ancestor matching selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector
 * @returns {Element|null} Matching ancestor or null
 */
export function closest(element, selector) {
  return element.closest(selector);
}

/**
 * Get all siblings of an element
 * @param {Element} element - The element
 * @param {string} [selector] - Optional filter selector
 * @returns {Array<Element>} Array of sibling elements
 */
export function getSiblings(element, selector) {
  const siblings = Array.from(element.parentNode.children).filter((child) => child !== element);
  return selector ? siblings.filter((sibling) => sibling.matches(selector)) : siblings;
}

/**
 * Get the next sibling matching selector
 * @param {Element} element - Starting element
 * @param {string} [selector] - Optional selector
 * @returns {Element|null} Next matching sibling or null
 */
export function getNextSibling(element, selector) {
  let sibling = element.nextElementSibling;
  if (!selector) return sibling;
  
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
  return null;
}

/**
 * Get the previous sibling matching selector
 * @param {Element} element - Starting element
 * @param {string} [selector] - Optional selector
 * @returns {Element|null} Previous matching sibling or null
 */
export function getPreviousSibling(element, selector) {
  let sibling = element.previousElementSibling;
  if (!selector) return sibling;
  
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
  return null;
}

/**
 * Check if element is visible
 * @param {Element} element - Element to check
 * @returns {boolean} True if visible
 */
export function isVisible(element) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

/**
 * Get element's offset from document
 * @param {Element} element - The element
 * @returns {Object} Object with top and left properties
 */
export function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  };
}

/**
 * Set multiple attributes on an element
 * @param {Element} element - The element
 * @param {Object} attributes - Object of attribute key-value pairs
 */
export function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === false) {
      element.removeAttribute(key);
    } else if (value === true) {
      element.setAttribute(key, '');
    } else {
      element.setAttribute(key, value);
    }
  });
}
