# Prompt: Convert Angular Component to Native

## Context
You are converting an analyzed Angular component to a native web component using HTML, CSS, and JavaScript.

## Objective
Create a clean, native reimplementation that preserves the component's design, behavior, and accessibility without Angular dependencies.

## Prerequisites
- Component analysis document completed
- Design tokens extracted
- Understanding of component structure and behavior

## Input Required
- Component name: `[COMPONENT_NAME]`
- Analysis document: `docs/component-analysis/[component-name].md`

## Tasks

### 1. Create Component Directory

```bash
src/components/[component-name]/
├── [component-name].html          # Component markup
├── [component-name].css           # Component styles
├── [component-name].js            # Component behavior
├── [component-name].test.js       # Unit tests
├── [component-name].stories.js    # Usage examples (optional)
└── README.md                      # Component documentation
```

### 2. Implement HTML Structure

Create `[component-name].html` with explicit, semantic markup:

```html
<!--
  [Component Name]
  [Brief description]
  
  Usage:
  Include this HTML template in your page and initialize with JavaScript.
-->

<[semantic-element] 
  class="vf-[component-name]" 
  data-component="[component-name]"
  [semantic-attributes]
>
  <!-- Explicit component structure -->
  <!-- NO dynamic innerHTML generation -->
  <!-- Each element serves a clear purpose -->
  
  <div class="vf-[component-name]__[element]">
    <!-- Child elements -->
  </div>
  
</[semantic-element]>
```

#### HTML Guidelines:
- Use semantic HTML5 elements (`<button>`, `<nav>`, `<article>`, etc.)
- Add `data-component="[name]"` for JavaScript targeting
- Include all structural elements (no JavaScript-generated structure)
- Add placeholder content/text
- Ensure valid, accessible markup
- Include ARIA attributes where needed

### 3. Implement CSS Styles

Create `[component-name].css` using design tokens:

```css
/**
 * [Component Name]
 * [Brief description]
 */

/* Base component styles */
.vf-[component-name] {
  /* Layout */
  display: [value];
  [layout-properties]: [token-or-value];
  
  /* Spacing */
  padding: var(--vf-space-[size]);
  margin: var(--vf-space-[size]);
  gap: var(--vf-space-[size]);
  
  /* Colors */
  background-color: var(--vf-color-[name]);
  color: var(--vf-color-[name]);
  border-color: var(--vf-color-[name]);
  
  /* Typography */
  font-size: var(--vf-font-size-[size]);
  font-weight: var(--vf-font-weight-[weight]);
  line-height: var(--vf-line-height-[height]);
  
  /* Borders */
  border-radius: var(--vf-border-radius-[size]);
  border-width: var(--vf-border-width-[size]);
  
  /* Shadows */
  box-shadow: var(--vf-shadow-[size]);
  
  /* Transitions */
  transition: all var(--vf-transition-duration) var(--vf-transition-easing);
}

/* Child elements */
.vf-[component-name]__[element] {
  /* Element-specific styles */
}

/* Variants */
.vf-[component-name]--[variant] {
  /* Variant-specific overrides */
}

/* Size modifiers */
.vf-[component-name]--small {
  /* Small size styles */
}

.vf-[component-name]--medium {
  /* Medium size styles */
}

.vf-[component-name]--large {
  /* Large size styles */
}

/* State styles */
.vf-[component-name]:hover {
  /* Hover state */
}

.vf-[component-name]:focus {
  /* Focus state */
  outline: 2px solid var(--vf-color-focus);
  outline-offset: 2px;
}

.vf-[component-name]:active {
  /* Active state */
}

.vf-[component-name]:disabled,
.vf-[component-name][disabled] {
  /* Disabled state */
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.vf-[component-name]--loading {
  /* Loading state */
}

.vf-[component-name]--error {
  /* Error state */
}

/* RTL support */
[dir="rtl"] .vf-[component-name] {
  /* RTL-specific adjustments */
  /* Use logical properties where possible instead */
}

/* Responsive styles */
@media (max-width: 767px) {
  .vf-[component-name] {
    /* Mobile styles */
  }
}

@media (min-width: 768px) {
  .vf-[component-name] {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .vf-[component-name] {
    /* Desktop styles */
  }
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .vf-[component-name] {
    /* Dark mode overrides */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .vf-[component-name] {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .vf-[component-name] {
    /* High contrast adjustments */
  }
}
```

#### CSS Guidelines:
- Use CSS custom properties (design tokens) for all values
- Use logical properties for RTL support (`margin-inline-start` instead of `margin-left`)
- Include all states (hover, focus, active, disabled)
- Mobile-first responsive design
- Support reduced motion preferences
- No hard-coded values

### 4. Implement JavaScript Behavior

Create `[component-name].js`:

```javascript
/**
 * [Component Name]
 * [Brief description]
 * 
 * @example
 * const element = document.querySelector('[data-component="[component-name]"]');
 * const component = new Vf[ComponentName](element);
 */

import { dispatch, debounce, throttle } from '../../utils/events.js';
import { getFocusableElements, trapFocus } from '../../utils/accessibility.js';

export class Vf[ComponentName] {
  /**
   * Create a [Component Name] instance
   * @param {HTMLElement} element - The component element
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    if (!element) {
      throw new Error('Vf[ComponentName] requires an element');
    }
    
    this.element = element;
    this.options = {
      // Default options
      variant: 'primary',
      size: 'medium',
      ...options
    };
    
    // Get child elements
    this.[childElement] = element.querySelector('.vf-[component-name]__[child]');
    
    // State
    this.state = {
      [property]: false,
    };
    
    // Bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    // Initialize
    this.init();
  }
  
  /**
   * Initialize the component
   * @private
   */
  init() {
    this.setupAccessibility();
    this.attachEventListeners();
    this.applyVariant();
  }
  
  /**
   * Set up accessibility attributes
   * @private
   */
  setupAccessibility() {
    // Set ARIA attributes
    if (!this.element.hasAttribute('role')) {
      this.element.setAttribute('role', '[role]');
    }
    
    // Set aria-label if needed
    // Set other ARIA attributes
  }
  
  /**
   * Attach event listeners
   * @private
   */
  attachEventListeners() {
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('keydown', this.handleKeyDown);
    
    // Add more event listeners as needed
  }
  
  /**
   * Handle click events
   * @param {Event} event - The click event
   * @private
   */
  handleClick(event) {
    // Handle click logic
    
    // Dispatch custom event
    dispatch(this.element, 'vf-[component-name]:click', {
      [component-name]: this.element,
      originalEvent: event
    });
  }
  
  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event - The keyboard event
   * @private
   */
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
  
  /**
   * Apply variant styles
   * @private
   */
  applyVariant() {
    const variant = this.options.variant || this.element.dataset.variant || 'primary';
    const size = this.options.size || this.element.dataset.size || 'medium';
    
    // Remove existing variant classes
    this.element.classList.remove(
      'vf-[component-name]--primary',
      'vf-[component-name]--secondary'
    );
    
    // Add new variant class
    this.element.classList.add(`vf-[component-name]--${variant}`);
    this.element.classList.add(`vf-[component-name]--${size}`);
  }
  
  /**
   * Public method: [description]
   * @param {Type} param - Parameter description
   * @returns {Type} Return value description
   */
  [publicMethod](param) {
    // Public method implementation
    
    // Dispatch event
    dispatch(this.element, 'vf-[component-name]:[event]', {
      [component-name]: this.element,
      [data]: param
    });
  }
  
  /**
   * Update component state
   * @param {Object} newState - New state values
   */
  update(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  
  /**
   * Render/update the component
   * @private
   */
  render() {
    // Update DOM based on state
    // Remember: Don't recreate structure, just update content/attributes
  }
  
  /**
   * Destroy the component and clean up
   */
  destroy() {
    // Remove event listeners
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('keydown', this.handleKeyDown);
    
    // Clean up any other resources
    
    // Remove component reference
    delete this.element._vf[ComponentName];
  }
}

/**
 * Auto-initialize all [component-name] components
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-component="[component-name]"]');
    elements.forEach(element => {
      if (!element._vf[ComponentName]) {
        element._vf[ComponentName] = new Vf[ComponentName](element);
      }
    });
  });
}

/**
 * Export for manual initialization
 */
export default Vf[ComponentName];
```

#### JavaScript Guidelines:
- ES6+ modern syntax
- Clear, documented functions
- Proper event handling and cleanup
- No memory leaks
- Progressive enhancement
- Defensive programming (check for elements)
- Custom events for component communication
- Avoid recreating DOM structure

### 5. Implement Tests

Create `[component-name].test.js`:

```javascript
/**
 * Tests for [Component Name]
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Vf[ComponentName] } from './[component-name].js';

describe('Vf[ComponentName]', () => {
  let container;
  let element;
  let component;
  
  beforeEach(() => {
    // Create test fixture
    container = document.createElement('div');
    container.innerHTML = `
      <[element] class="vf-[component-name]" data-component="[component-name]">
        <!-- Component structure -->
      </[element]>
    `;
    document.body.appendChild(container);
    element = container.querySelector('[data-component="[component-name]"]');
    component = new Vf[ComponentName](element);
  });
  
  afterEach(() => {
    // Clean up
    component.destroy();
    document.body.removeChild(container);
  });
  
  describe('Initialization', () => {
    it('should initialize with element', () => {
      expect(component.element).toBe(element);
    });
    
    it('should set up accessibility attributes', () => {
      expect(element.getAttribute('role')).toBe('[role]');
    });
    
    it('should apply default variant', () => {
      expect(element.classList.contains('vf-[component-name]--primary')).toBe(true);
    });
  });
  
  describe('Props/Options', () => {
    it('should accept variant option', () => {
      const el = document.createElement('[element]');
      const comp = new Vf[ComponentName](el, { variant: 'secondary' });
      expect(el.classList.contains('vf-[component-name]--secondary')).toBe(true);
      comp.destroy();
    });
  });
  
  describe('Events', () => {
    it('should dispatch custom event on click', () => {
      const handler = vi.fn();
      element.addEventListener('vf-[component-name]:click', handler);
      element.click();
      expect(handler).toHaveBeenCalled();
    });
  });
  
  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      const handler = vi.fn();
      element.addEventListener('vf-[component-name]:activate', handler);
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      element.dispatchEvent(event);
      
      expect(handler).toHaveBeenCalled();
    });
    
    it('should have proper ARIA attributes', () => {
      expect(element.hasAttribute('role')).toBe(true);
      expect(element.hasAttribute('aria-label')).toBe(true);
    });
  });
  
  describe('Public API', () => {
    it('should expose [method] method', () => {
      expect(typeof component.[method]).toBe('function');
    });
  });
  
  describe('Cleanup', () => {
    it('should remove event listeners on destroy', () => {
      const handler = vi.fn();
      element.addEventListener('vf-[component-name]:click', handler);
      component.destroy();
      element.click();
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
```

### 6. Create Documentation

Create `README.md`:

```markdown
# [Component Name]

[Brief description of the component]

## Usage

### HTML

```html
<[element] class="vf-[component-name]" data-component="[component-name]">
  <!-- Component structure -->
</[element]>
```

### JavaScript

```javascript
import { Vf[ComponentName] } from './components/[component-name]/[component-name].js';

// Auto-initialized via data-component attribute
// Or manually initialize:
const element = document.querySelector('.vf-[component-name]');
const component = new Vf[ComponentName](element, {
  variant: 'primary',
  size: 'medium'
});
```

### CSS

```css
@import 'components/[component-name]/[component-name].css';
```

## Props/Attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Visual variant |
| size | string | 'medium' | Component size |

## Variants

### Visual Variants
- `primary` - [description]
- `secondary` - [description]

### Sizes
- `small` - [description]
- `medium` - [description]
- `large` - [description]

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| vf-[component-name]:click | `{ [component-name], originalEvent }` | Fired on click |

## API Methods

### `[method](param)`
[Description]

**Parameters:**
- `param` (Type): [description]

**Returns:** [description]

## Accessibility

- Uses semantic `<[element]>` element
- Includes proper ARIA attributes
- Keyboard accessible (Enter, Space, Arrow keys, Escape)
- Focus visible
- Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Examples

### Basic Usage
```html
<button class="vf-button vf-button--primary" data-component="button">
  <span class="vf-button__label">Click me</span>
</button>
```

### With Icon
[Example]

### Disabled State
[Example]

## Notes

- [Important note 1]
- [Important note 2]
```

### 7. Update Main Exports

Add to `src/index.js`:

```javascript
export { Vf[ComponentName] } from './components/[component-name]/[component-name].js';
```

### 8. Add to Playground

Update `playground/index.html`:

```html
<section class="playground-section">
  <h2>[Component Name]</h2>
  
  <!-- Component examples -->
  <div class="playground-example">
    <h3>Primary</h3>
    <!-- Component markup -->
  </div>
  
  <div class="playground-example">
    <h3>Secondary</h3>
    <!-- Component markup -->
  </div>
</section>
```

Update `playground/script.js`:

```javascript
import { Vf[ComponentName] } from '../src/components/[component-name]/[component-name].js';
```

## Validation Checklist

Before marking the component complete:

### Structure
- [ ] HTML structure is explicit and semantic
- [ ] All elements are properly nested
- [ ] No dynamic structure generation in JavaScript
- [ ] Proper BEM class naming

### Styles
- [ ] Uses design tokens (no hard-coded values)
- [ ] All variants implemented
- [ ] All sizes implemented
- [ ] All states styled (hover, focus, active, disabled)
- [ ] Responsive behavior correct
- [ ] RTL support implemented
- [ ] Reduced motion supported

### Behavior
- [ ] JavaScript enhances, doesn't generate structure
- [ ] All interactions work
- [ ] Custom events dispatched correctly
- [ ] Public API matches requirements
- [ ] No memory leaks
- [ ] Cleanup method works

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] Focus management correct
- [ ] Screen reader tested
- [ ] WCAG AA compliant

### Testing
- [ ] Unit tests written
- [ ] Tests passing
- [ ] Edge cases covered
- [ ] Accessibility tested

### Documentation
- [ ] README complete
- [ ] Code commented
- [ ] Examples provided
- [ ] API documented

### Integration
- [ ] Added to main exports
- [ ] Added to playground
- [ ] CSS imported correctly
- [ ] No Angular dependencies

## Next Steps

After conversion:
1. Run tests: `npm test`
2. Test in playground: `npm run playground`
3. Validate accessibility
4. Use **validate-component.prompt.md** for thorough testing
5. Create pull request

---

Use this prompt to create clean, native component implementations.
