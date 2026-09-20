# Native Components Instructions

## Purpose
This document provides detailed guidance for implementing native web components without framework dependencies.

## Core Architecture

### HTML-First Principle

The primary component structure MUST be written as explicit HTML markup. JavaScript should enhance, not generate, the structure.

#### ✅ CORRECT Approach
```html
<!-- button.html -->
<button class="vf-button" type="button" data-component="button">
  <span class="vf-button__icon"></span>
  <span class="vf-button__label">Button Text</span>
  <span class="vf-button__badge"></span>
</button>
```

```javascript
// button.js
export class VfButton {
  constructor(element) {
    this.element = element;
    this.labelElement = element.querySelector('.vf-button__label');
    this.iconElement = element.querySelector('.vf-button__icon');
    this.init();
  }

  init() {
    this.element.addEventListener('click', this.handleClick.bind(this));
    this.updateAriaAttributes();
  }

  setLabel(text) {
    this.labelElement.textContent = text;
  }

  handleClick(event) {
    // Behavior logic
  }
}
```

#### ❌ INCORRECT Approach
```javascript
// DO NOT DO THIS
export class VfButton {
  constructor(container) {
    // DO NOT generate the entire DOM structure
    container.innerHTML = `
      <button class="vf-button">
        <span class="vf-button__icon"></span>
        <span class="vf-button__label">Button Text</span>
      </button>
    `;
  }
}
```

## Component Structure

### File Organization
```
src/components/component-name/
├── component-name.html         # Explicit markup structure
├── component-name.css          # Styles with design tokens
├── component-name.js           # Behavior and interactions
├── component-name.test.js      # Unit tests
├── component-name.stories.js   # Usage examples (optional)
└── README.md                   # Documentation
```

### HTML Template (component-name.html)

The HTML file contains the static structure with placeholder content:

```html
<!-- card.html -->
<article class="vf-card" data-component="card">
  <div class="vf-card__image-container">
    <img class="vf-card__image" src="" alt="" loading="lazy">
  </div>
  <div class="vf-card__content">
    <h3 class="vf-card__title">Card Title</h3>
    <p class="vf-card__description">Card description text goes here.</p>
    <div class="vf-card__footer">
      <button class="vf-button vf-button--primary" type="button">
        <span class="vf-button__label">Action</span>
      </button>
    </div>
  </div>
</article>
```

### CSS (component-name.css)

Use CSS custom properties from design tokens:

```css
/* card.css */
.vf-card {
  display: flex;
  flex-direction: column;
  background-color: var(--vf-color-surface);
  border-radius: var(--vf-border-radius-lg);
  box-shadow: var(--vf-shadow-md);
  overflow: hidden;
  transition: transform var(--vf-transition-duration) var(--vf-transition-easing);
}

.vf-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--vf-shadow-lg);
}

.vf-card__image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.vf-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vf-card__content {
  padding: var(--vf-space-md);
  display: flex;
  flex-direction: column;
  gap: var(--vf-space-sm);
}

.vf-card__title {
  font-size: var(--vf-font-size-lg);
  font-weight: var(--vf-font-weight-semibold);
  color: var(--vf-color-text-primary);
  margin: 0;
}

.vf-card__description {
  font-size: var(--vf-font-size-base);
  color: var(--vf-color-text-secondary);
  line-height: var(--vf-line-height-relaxed);
  margin: 0;
}

.vf-card__footer {
  margin-top: var(--vf-space-md);
}

/* RTL Support */
[dir="rtl"] .vf-card {
  /* Add RTL-specific adjustments */
}

/* Responsive */
@media (max-width: 768px) {
  .vf-card__content {
    padding: var(--vf-space-sm);
  }
}
```

### JavaScript (component-name.js)

JavaScript enhances the component with behavior, state, and accessibility:

```javascript
// card.js

/**
 * VfCard - Interactive card component
 * @class
 */
export class VfCard {
  /**
   * Initialize a card component
   * @param {HTMLElement} element - The card element
   */
  constructor(element) {
    this.element = element;
    this.imageElement = element.querySelector('.vf-card__image');
    this.titleElement = element.querySelector('.vf-card__title');
    this.descriptionElement = element.querySelector('.vf-card__description');
    this.button = element.querySelector('.vf-button');
    
    this.init();
  }

  /**
   * Initialize component behavior
   * @private
   */
  init() {
    this.setupAccessibility();
    this.attachEventListeners();
    this.handleImageLoading();
  }

  /**
   * Set up ARIA attributes for accessibility
   * @private
   */
  setupAccessibility() {
    if (!this.element.hasAttribute('role')) {
      this.element.setAttribute('role', 'article');
    }
    
    // Link image and title for screen readers
    const titleId = this.element.id ? `${this.element.id}-title` : `vf-card-title-${Date.now()}`;
    this.titleElement.id = titleId;
    this.element.setAttribute('aria-labelledby', titleId);
  }

  /**
   * Attach event listeners
   * @private
   */
  attachEventListeners() {
    if (this.button) {
      this.button.addEventListener('click', this.handleAction.bind(this));
    }

    // Handle keyboard navigation if card is interactive
    if (this.element.hasAttribute('data-clickable')) {
      this.element.setAttribute('tabindex', '0');
      this.element.addEventListener('click', this.handleCardClick.bind(this));
      this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }

  /**
   * Handle button click
   * @private
   */
  handleAction(event) {
    const customEvent = new CustomEvent('vf-card:action', {
      bubbles: true,
      detail: {
        card: this.element,
        button: event.target
      }
    });
    this.element.dispatchEvent(customEvent);
  }

  /**
   * Handle card click (if clickable)
   * @private
   */
  handleCardClick() {
    const customEvent = new CustomEvent('vf-card:click', {
      bubbles: true,
      detail: { card: this.element }
    });
    this.element.dispatchEvent(customEvent);
  }

  /**
   * Handle keyboard navigation
   * @private
   */
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleCardClick();
    }
  }

  /**
   * Handle image loading states
   * @private
   */
  handleImageLoading() {
    if (this.imageElement) {
      this.imageElement.addEventListener('load', () => {
        this.element.classList.add('vf-card--image-loaded');
      });

      this.imageElement.addEventListener('error', () => {
        this.element.classList.add('vf-card--image-error');
        // Hide image container or show placeholder
      });
    }
  }

  /**
   * Update card content
   * @param {Object} data - Card data
   * @param {string} data.title - Card title
   * @param {string} data.description - Card description
   * @param {string} data.imageUrl - Image URL
   * @param {string} data.imageAlt - Image alt text
   */
  update(data) {
    if (data.title) {
      this.titleElement.textContent = data.title;
    }

    if (data.description) {
      this.descriptionElement.textContent = data.description;
    }

    if (data.imageUrl && this.imageElement) {
      this.imageElement.src = data.imageUrl;
      this.imageElement.alt = data.imageAlt || data.title || '';
    }
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    // Remove event listeners to prevent memory leaks
    if (this.button) {
      this.button.removeEventListener('click', this.handleAction);
    }

    if (this.element.hasAttribute('data-clickable')) {
      this.element.removeEventListener('click', this.handleCardClick);
      this.element.removeEventListener('keydown', this.handleKeyDown);
    }
  }
}

// Auto-initialize all cards on the page
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('[data-component="card"]');
    cards.forEach(card => new VfCard(card));
  });
}
```

## Web Components (Optional)

For components that benefit from encapsulation, use Custom Elements:

```javascript
// button.custom-element.js

class VfButtonElement extends HTMLElement {
  constructor() {
    super();
    // Use shadow DOM for style encapsulation (optional)
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    // Clean up event listeners
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    const disabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = `
      <style>
        /* Component styles with CSS custom properties */
        :host {
          display: inline-block;
        }
        button {
          background: var(--vf-button-bg, var(--vf-color-primary));
          color: var(--vf-button-color, var(--vf-color-on-primary));
          /* ... */
        }
      </style>
      <button 
        class="vf-button vf-button--${variant} vf-button--${size}"
        ?disabled="${disabled}"
      >
        <slot name="icon-start"></slot>
        <slot></slot>
        <slot name="icon-end"></slot>
      </button>
    `;
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('vf-button:click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      }));
    });
  }
}

customElements.define('vf-button', VfButtonElement);
```

## Accessibility Requirements

### Semantic HTML
- Use proper HTML5 elements (`<button>`, `<nav>`, `<article>`, etc.)
- Don't use `<div>` when a semantic element exists
- Maintain proper heading hierarchy

### ARIA Attributes
```html
<!-- Interactive elements -->
<button 
  class="vf-button" 
  type="button"
  aria-label="Close dialog"
  aria-pressed="false"
  aria-disabled="false"
>

<!-- Landmarks -->
<nav aria-label="Main navigation">

<!-- Live regions -->
<div role="alert" aria-live="assertive">

<!-- State -->
<div 
  role="tabpanel" 
  aria-labelledby="tab-1" 
  aria-hidden="false"
  tabindex="0"
>
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Provide keyboard shortcuts where appropriate
- Handle Enter, Space, Arrow keys, Escape

```javascript
handleKeyDown(event) {
  switch(event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      this.activate();
      break;
    case 'Escape':
      this.close();
      break;
    case 'ArrowDown':
      this.focusNext();
      break;
    case 'ArrowUp':
      this.focusPrevious();
      break;
  }
}
```

### Focus Management
```javascript
// Trap focus in modal
trapFocus() {
  const focusableElements = this.element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  this.element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

## RTL/LTR Support

Use CSS logical properties:

```css
/* Instead of margin-left */
margin-inline-start: var(--vf-space-md);

/* Instead of margin-right */
margin-inline-end: var(--vf-space-md);

/* Instead of padding-left/right */
padding-inline: var(--vf-space-md);

/* Instead of text-align: left */
text-align: start;

/* Transform in RTL */
[dir="rtl"] .icon {
  transform: scaleX(-1);
}
```

## Responsive Design

Mobile-first approach:

```css
/* Base (mobile) styles */
.vf-component {
  padding: var(--vf-space-sm);
  font-size: var(--vf-font-size-sm);
}

/* Tablet and up */
@media (min-width: 768px) {
  .vf-component {
    padding: var(--vf-space-md);
    font-size: var(--vf-font-size-base);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .vf-component {
    padding: var(--vf-space-lg);
    font-size: var(--vf-font-size-lg);
  }
}
```

## Event System

Use custom events for component communication:

```javascript
// Dispatch custom event
const event = new CustomEvent('vf-component:action', {
  bubbles: true,
  cancelable: true,
  composed: true, // Cross shadow DOM boundary
  detail: {
    component: this.element,
    action: 'submit',
    data: this.getData()
  }
});
this.element.dispatchEvent(event);

// Listen for custom event
element.addEventListener('vf-component:action', (event) => {
  console.log('Component action:', event.detail);
});
```

## Testing

```javascript
// component-name.test.js
import { VfCard } from './card.js';

describe('VfCard', () => {
  let container;
  let card;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <article class="vf-card" data-component="card">
        <h3 class="vf-card__title">Test Title</h3>
        <p class="vf-card__description">Test description</p>
      </article>
    `;
    document.body.appendChild(container);
    card = new VfCard(container.querySelector('.vf-card'));
  });

  afterEach(() => {
    card.destroy();
    document.body.removeChild(container);
  });

  test('initializes with correct elements', () => {
    expect(card.titleElement).toBeDefined();
    expect(card.descriptionElement).toBeDefined();
  });

  test('updates content', () => {
    card.update({ title: 'New Title', description: 'New description' });
    expect(card.titleElement.textContent).toBe('New Title');
    expect(card.descriptionElement.textContent).toBe('New description');
  });

  test('dispatches custom event on action', () => {
    const handler = jest.fn();
    card.element.addEventListener('vf-card:action', handler);
    card.button.click();
    expect(handler).toHaveBeenCalled();
  });

  test('is accessible', () => {
    expect(card.element.getAttribute('role')).toBe('article');
    expect(card.element.hasAttribute('aria-labelledby')).toBe(true);
  });
});
```

## Performance Considerations

- Lazy load images: `loading="lazy"`
- Debounce/throttle event handlers
- Use `requestAnimationFrame` for animations
- Clean up event listeners in `destroy()` methods
- Avoid layout thrashing (batch DOM reads/writes)

```javascript
// Debounce example
debounce(func, wait) {
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
```

---

Remember: **HTML structure first, JavaScript for behavior enhancement.**
