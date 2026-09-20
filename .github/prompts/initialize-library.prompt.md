# Prompt: Initialize Native UI Library

## Context
You are initializing the Native UI Library project structure and development environment.

## Objective
Set up the complete project infrastructure for native web component development.

## Tasks

### 1. Project Structure
Create the following directory structure:

```
src/
├── components/           # Component implementations
├── utils/               # Shared utilities
│   ├── dom.js          # DOM helpers
│   ├── events.js       # Event utilities
│   ├── accessibility.js # A11y helpers
│   └── index.js        # Utility exports
└── index.js            # Main library entry point

tokens/
├── colors.css          # Color palette
├── typography.css      # Font tokens
├── spacing.css         # Spacing scale
├── borders.css         # Border styles
├── shadows.css         # Shadow definitions
├── transitions.css     # Animation tokens
└── theme.css           # Combined theme (imports all)

playground/
├── index.html          # Component showcase
├── style.css           # Playground styles
└── script.js           # Playground initialization

dist/                   # Build output (gitignored)

tests/                  # Test setup
├── setup.js           # Test configuration
└── helpers.js         # Test utilities
```

### 2. Package Configuration

Create `package.json` with:
- Project metadata
- Dependencies (minimal):
  - Dev server (e.g., `vite` or `serve`)
  - Test runner (e.g., `vitest` or `jest`)
  - Linter (e.g., `eslint`)
  - Code formatter (e.g., `prettier`)
- Scripts:
  - `dev` - Start development server
  - `build` - Build for production
  - `test` - Run tests
  - `lint` - Lint code
  - `format` - Format code
  - `playground` - Run playground

### 3. Development Tools

#### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'playground',
  build: {
    outDir: '../dist',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VodafoneUI',
      fileName: (format) => `vodafone-ui.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

#### ESLint Configuration
```javascript
// eslint.config.js
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
        CustomEvent: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  }
];
```

#### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

### 4. Base Design Tokens

Create foundational CSS custom properties in `tokens/theme.css`:

```css
/**
 * Vodafone Native UI Library - Design Tokens
 * These tokens provide the foundation for all component styles
 */

@import './colors.css';
@import './typography.css';
@import './spacing.css';
@import './borders.css';
@import './shadows.css';
@import './transitions.css';

:root {
  /* Base font size for rem calculations */
  font-size: 16px;
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    /* Override colors for dark mode */
  }
}
```

### 5. Utility Functions

Create core utilities in `src/utils/`:

**DOM Utilities:**
```javascript
// src/utils/dom.js

/**
 * Safely query an element
 */
export function querySelector(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query all elements matching selector
 */
export function querySelectorAll(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Check if element matches selector
 */
export function matches(element, selector) {
  return element.matches(selector);
}

/**
 * Find closest ancestor matching selector
 */
export function closest(element, selector) {
  return element.closest(selector);
}
```

**Event Utilities:**
```javascript
// src/utils/events.js

/**
 * Debounce function calls
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
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Dispatch custom event
 */
export function dispatch(element, eventName, detail = {}) {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail
  });
  return element.dispatchEvent(event);
}
```

**Accessibility Utilities:**
```javascript
// src/utils/accessibility.js

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  );
}

/**
 * Trap focus within a container
 */
export function trapFocus(container) {
  const focusable = getFocusableElements(container);
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => container.removeEventListener('keydown', handleKeyDown);
}

/**
 * Announce to screen readers
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
  
  setTimeout(() => {
    announcer.textContent = message;
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }, 100);
}
```

### 6. Main Entry Point

Create `src/index.js` to export all components:

```javascript
/**
 * Vodafone Native UI Library
 * Framework-independent web components
 */

// Export utilities
export * from './utils/index.js';

// Components will be exported here as they're created
// export { VfButton } from './components/button/button.js';
// export { VfCard } from './components/card/card.js';

// Version
export const VERSION = '0.1.0';

// Auto-initialize all components
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log(`Vodafone UI Library v${VERSION} loaded`);
    
    // Auto-initialize components will be added here
  });
}
```

### 7. Playground Setup

Create `playground/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vodafone Native UI Library - Playground</title>
  <link rel="stylesheet" href="../tokens/theme.css">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <header class="playground-header">
    <h1>Vodafone Native UI Library</h1>
    <p>Framework-independent web components</p>
  </header>

  <main class="playground-main">
    <section class="playground-section">
      <h2>Components</h2>
      <p>Components will appear here as they are developed.</p>
      
      <!-- Components will be added here -->
    </section>
  </main>

  <script type="module" src="./script.js"></script>
</body>
</html>
```

### 8. Documentation

Create `README.md` with:
- Project overview
- Installation instructions
- Quick start guide
- Development setup
- Contributing guidelines
- Link to component documentation

### 9. Git Configuration

Create `.gitignore`:
```
# Dependencies
node_modules/

# Build output
dist/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Test coverage
coverage/
```

## Validation

After initialization, verify:
- [ ] All directories created
- [ ] package.json configured correctly
- [ ] Dev tools installed and configured
- [ ] Design tokens created
- [ ] Utilities implemented
- [ ] Playground loads successfully
- [ ] Build script works
- [ ] Test runner configured
- [ ] Linter and formatter work
- [ ] Documentation complete

## Next Steps

After initialization:
1. Review Angular library structure
2. Extract design tokens
3. Begin component implementation
4. Set up CI/CD pipeline

---

Use this prompt to set up a clean, production-ready native UI library foundation.
