/**
 * Playground Script
 * Interactive features for the component playground
 */

// Import library (components will be imported as they're created)
import '../src/index.js';

/**
 * Initialize playground controls
 */
function initPlayground() {
  console.log('Playground initialized');

  // Direction toggle (LTR/RTL)
  const directionToggle = document.getElementById('toggle-direction');
  if (directionToggle) {
    directionToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const currentDir = html.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      
      html.setAttribute('dir', newDir);
      html.setAttribute('lang', newDir === 'rtl' ? 'ar' : 'en');
      
      directionToggle.textContent = newDir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
      
      console.log(`Direction switched to: ${newDir}`);
    });
  }

  // Theme toggle (Light/Dark) - Future implementation
  const themeToggle = document.getElementById('toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      alert('Dark mode coming soon!');
      // TODO: Implement dark mode toggle
      // document.documentElement.setAttribute('data-theme', 'dark');
    });
  }

  // Button component demo - verifies native click still fires through VfButton enhancement
  const demoButton = document.getElementById('demo-toggle-button');
  if (demoButton) {
    let clicks = 0;
    demoButton.addEventListener('click', () => {
      clicks += 1;
      demoButton.textContent = `Clicked ${clicks}x`;
    });
  }
}

/**
 * Log component initialization
 */
function logComponentInit() {
  const components = document.querySelectorAll('[data-component]');
  console.log(`Found ${components.length} components in playground`);
  
  components.forEach((component) => {
    const type = component.dataset.component;
    console.log(`Component: ${type}`, component);
  });
}

/**
 * Initialize on DOM ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPlayground();
    logComponentInit();
  });
} else {
  initPlayground();
  logComponentInit();
}

/**
 * Hot module reload support (for Vite)
 */
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('Playground hot reloaded');
  });
}
