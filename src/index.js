/**
 * Vodafone Native UI Library
 * Framework-independent web components for Liferay and other CMS platforms
 * 
 * @version 0.1.0
 */

// Export utilities
export * from './utils/index.js';

// Components
export { VfButton, initButtons } from './components/button/button.js';
export { VfAccordion, VfAccordionItem, initAccordions } from './components/accordion/accordion.js';
export { VfTabs, initTabs } from './components/tabs/tabs.js';

// Components will be exported here as they are created
// Example:
// export { VfCard } from './components/card/card.js';
// export { VfModal } from './components/modal/modal.js';

/**
 * Library version
 */
export const VERSION = '0.1.0';

/**
 * Initialize all components on page load
 * This is called automatically when the library loads
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log(`Vodafone Native UI Library v${VERSION} loaded`);
    
    // Auto-initialize components will be added here as they're created
    // Example:
    // const buttons = document.querySelectorAll('[data-component="button"]');
    // buttons.forEach(btn => new VfButton(btn));
  });
}
