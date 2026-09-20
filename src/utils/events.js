/**
 * Event Utility Functions
 * Helper functions for event handling and dispatching
 */

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Dispatch custom event from element
 * @param {Element} element - Element to dispatch from
 * @param {string} eventName - Name of the custom event
 * @param {Object} [detail={}] - Event detail data
 * @param {Object} [options={}] - Additional event options
 * @returns {boolean} False if event was cancelled, true otherwise
 */
export function dispatch(element, eventName, detail = {}, options = {}) {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail,
    ...options,
  });
  return element.dispatchEvent(event);
}

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Element to listen on
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object|boolean} [options] - Event listener options
 * @returns {Function} Cleanup function to remove listener
 */
export function listen(element, event, handler, options) {
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
}

/**
 * Add event listener that fires once
 * @param {Element} element - Element to listen on
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @returns {Function} Cleanup function to remove listener
 */
export function listenOnce(element, event, handler) {
  const cleanup = listen(
    element,
    event,
    function onceHandler(e) {
      handler(e);
      cleanup();
    }
  );
  return cleanup;
}

/**
 * Delegate event handling to parent element
 * @param {Element} parent - Parent element to listen on
 * @param {string} selector - Selector for target elements
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @returns {Function} Cleanup function to remove listener
 */
export function delegate(parent, selector, event, handler) {
  const wrappedHandler = (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  };
  return listen(parent, event, wrappedHandler);
}

/**
 * Wait for animation/transition to complete
 * @param {Element} element - Element with animation/transition
 * @param {string} [property] - Specific transition property to wait for
 * @returns {Promise} Resolves when animation/transition completes
 */
export function waitForTransition(element, property) {
  return new Promise((resolve) => {
    const handleTransitionEnd = (e) => {
      if (!property || e.propertyName === property) {
        element.removeEventListener('transitionend', handleTransitionEnd);
        resolve(e);
      }
    };
    element.addEventListener('transitionend', handleTransitionEnd);
  });
}

/**
 * Wait for animation to complete
 * @param {Element} element - Element with animation
 * @returns {Promise} Resolves when animation completes
 */
export function waitForAnimation(element) {
  return new Promise((resolve) => {
    const handleAnimationEnd = (e) => {
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve(e);
    };
    element.addEventListener('animationend', handleAnimationEnd);
  });
}

/**
 * Prevent default and stop propagation
 * @param {Event} event - Event to handle
 */
export function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
