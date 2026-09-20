# Skill: Angular to Native Conversion

## Overview

This skill provides expertise in converting analyzed Angular components to clean, native web components using HTML, CSS, and JavaScript.

## When to Use This Skill

Use this skill when you:
- Have completed component analysis
- Are ready to implement the native version
- Need guidance on the conversion process
- Want to ensure best practices

## Prerequisites

- Component analysis completed (`docs/component-analysis/[component-name].md`)
- Design tokens extracted and available
- Understanding of native component architecture
- Familiarity with Web APIs

## Core Conversion Principles

### 1. HTML-First
**Structure is explicit, not generated**

```html
<!-- ✅ CORRECT: Explicit HTML -->
<button class="vf-button" data-component="button">
  <span class="vf-button__icon"></span>
  <span class="vf-button__label">Click me</span>
</button>

<!-- ❌ WRONG: JavaScript-generated -->
<div id="button-container"></div>
<script>
  container.innerHTML = '<button>...</button>'; // NO!
</script>
```

### 2. CSS Token-Driven
**All values come from design tokens**

```css
/* ✅ CORRECT: Design tokens */
.vf-button {
  background: var(--vf-color-primary);
  padding: var(--vf-space-md);
}

/* ❌ WRONG: Hard-coded values */
.vf-button {
  background: #e60000;
  padding: 16px;
}
```

### 3. Progressive Enhancement
**JavaScript enhances, doesn't create**

```javascript
// ✅ CORRECT: Enhancement
const button = document.querySelector('.vf-button');
button.addEventListener('click', handleClick);

// ❌ WRONG: Creation
const button = document.createElement('button');
button.innerHTML = '...';
container.appendChild(button);
```

## Step-by-Step Conversion Process

### Step 1: Create Component Directory

**Action:** Set up file structure

```bash
src/components/[component-name]/
├── [component-name].html          # Component markup
├── [component-name].css           # Component styles
├── [component-name].js            # Component behavior
├── [component-name].test.js       # Unit tests
└── README.md                      # Component documentation
```

### Step 2: Implement HTML Structure

**Goal:** Create semantic, accessible markup

**Process:**
1. Start with the semantic element (button, article, nav, etc.)
2. Add all child elements explicitly
3. Include ARIA attributes
4. Add data attributes for JavaScript hooks
5. Use BEM class naming

**Example Conversion:**

**Angular Template:**
```html
<button 
  [class]="'vf-button vf-button--' + variant"
  [disabled]="disabled"
  (click)="handleClick()"
>
  <span class="vf-button__icon" *ngIf="icon">
    <i [class]="icon"></i>
  </span>
  <span class="vf-button__label">
    <ng-content></ng-content>
  </span>
</button>
```

**Native HTML:**
```html
<!--
  Vodafone Button Component
  Usage: Include this template and initialize with VfButton class
-->
<button 
  class="vf-button vf-button--primary vf-button--medium" 
  data-component="button"
  type="button"
>
  <span class="vf-button__icon" hidden>
    <i class="icon-placeholder"></i>
  </span>
  <span class="vf-button__label">Button Text</span>
</button>
```

**Key Changes:**
- Explicit variant classes (will be managed by JavaScript)
- `data-component` for JavaScript targeting
- `hidden` attribute for optional elements
- Placeholder content

**Checklist:**
- [ ] Semantic HTML element
- [ ] All child elements present
- [ ] ARIA attributes included
- [ ] BEM class naming
- [ ] Data attributes for JS
- [ ] Valid HTML

### Step 3: Implement CSS Styles

**Goal:** Replicate visual design with design tokens

**Process:**
1. Start with base component styles
2. Add child element styles
3. Implement all variants
4. Implement all sizes
5. Implement all states
6. Add responsive styles
7. Add RTL support

**Example Conversion:**

**Angular Styles:**
```scss
.vf-button {
  display: inline-flex;
  align-items: center;
  gap: $space-sm;
  padding: $space-md $space-lg;
  background: $color-primary;
  color: $color-on-primary;
  border: none;
  border-radius: $border-radius-md;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  transition: all 0.2s ease;
  cursor: pointer;

  &--secondary {
    background: $color-secondary;
    color: $color-on-secondary;
  }

  &:hover {
    background: darken($color-primary, 10%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

**Native CSS:**
```css
/**
 * Vodafone Button Component
 * Framework-independent button styles
 */

/* Base styles */
.vf-button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--vf-space-sm);
  
  /* Spacing */
  padding: var(--vf-space-md) var(--vf-space-lg);
  
  /* Colors */
  background-color: var(--vf-color-primary);
  color: var(--vf-color-on-primary);
  
  /* Borders */
  border: none;
  border-radius: var(--vf-border-radius-md);
  
  /* Typography */
  font-family: inherit;
  font-size: var(--vf-font-size-base);
  font-weight: var(--vf-font-weight-medium);
  line-height: var(--vf-line-height-base);
  text-decoration: none;
  white-space: nowrap;
  
  /* Interaction */
  cursor: pointer;
  user-select: none;
  
  /* Transitions */
  transition: 
    background-color var(--vf-transition-duration) var(--vf-transition-easing),
    transform var(--vf-transition-duration) var(--vf-transition-easing),
    box-shadow var(--vf-transition-duration) var(--vf-transition-easing);
}

/* Child elements */
.vf-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25em;
}

.vf-button__label {
  display: inline-block;
}

/* Variants */
.vf-button--primary {
  background-color: var(--vf-color-primary);
  color: var(--vf-color-on-primary);
}

.vf-button--secondary {
  background-color: var(--vf-color-secondary);
  color: var(--vf-color-on-secondary);
}

.vf-button--outline {
  background-color: transparent;
  color: var(--vf-color-primary);
  border: 2px solid var(--vf-color-primary);
}

.vf-button--ghost {
  background-color: transparent;
  color: var(--vf-color-primary);
}

/* Sizes */
.vf-button--small {
  padding: var(--vf-space-sm) var(--vf-space-md);
  font-size: var(--vf-font-size-sm);
  min-height: 32px;
}

.vf-button--medium {
  padding: var(--vf-space-md) var(--vf-space-lg);
  font-size: var(--vf-font-size-base);
  min-height: 40px;
}

.vf-button--large {
  padding: var(--vf-space-lg) var(--vf-space-xl);
  font-size: var(--vf-font-size-lg);
  min-height: 48px;
}

/* States */
.vf-button:hover {
  background-color: var(--vf-color-primary-hover);
  transform: translateY(-1px);
}

.vf-button:focus {
  outline: 2px solid var(--vf-color-focus);
  outline-offset: 2px;
}

.vf-button:focus:not(:focus-visible) {
  outline: none;
}

.vf-button:active {
  transform: translateY(0);
}

.vf-button:disabled,
.vf-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Full width modifier */
.vf-button--full-width {
  width: 100%;
}

/* Loading state */
.vf-button--loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.vf-button--loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  margin: -0.5em 0 0 -0.5em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: vf-button-spin 0.6s linear infinite;
}

@keyframes vf-button-spin {
  to { transform: rotate(360deg); }
}

/* RTL Support */
[dir="rtl"] .vf-button__icon:first-child {
  /* Icons might need to flip in RTL */
}

/* Responsive */
@media (max-width: 767px) {
  .vf-button {
    min-height: 44px; /* Larger touch target on mobile */
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .vf-button {
    transition: none;
  }
  
  .vf-button--loading::after {
    animation: none;
    border: 2px solid currentColor;
  }
}
```

**Checklist:**
- [ ] Uses design tokens exclusively
- [ ] All variants implemented
- [ ] All sizes implemented
- [ ] All states (hover, focus, active, disabled)
- [ ] Logical properties for RTL
- [ ] Responsive adjustments
- [ ] Reduced motion support
- [ ] BEM naming convention

### Step 4: Implement JavaScript Behavior

**Goal:** Add interactivity and state management

**Process:**
1. Create class with constructor
2. Find and store element references
3. Set up initial state
4. Add accessibility attributes
5. Attach event listeners
6. Implement public API
7. Handle cleanup

**Example Conversion:**

**Angular Component:**
```typescript
@Component({
  selector: 'vf-button',
  templateUrl: './button.component.html'
})
export class VfButtonComponent {
  @Input() variant = 'primary';
  @Input() size = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
```

**Native JavaScript:**
```javascript
/**
 * Vodafone Button Component
 * Framework-independent button with variants and states
 * 
 * @example
 * const button = document.querySelector('[data-component="button"]');
 * const vfButton = new VfButton(button, { variant: 'primary', size: 'medium' });
 * button.addEventListener('vf-button:click', (e) => console.log('Clicked!'));
 */

import { dispatch } from '../../utils/events.js';

export class VfButton {
  /**
   * Create a VfButton instance
   * @param {HTMLElement} element - The button element
   * @param {Object} options - Configuration options
   * @param {string} options.variant - Button variant (primary|secondary|outline|ghost)
   * @param {string} options.size - Button size (small|medium|large)
   */
  constructor(element, options = {}) {
    if (!element) {
      throw new Error('VfButton requires an element');
    }

    this.element = element;
    this.options = {
      variant: element.dataset.variant || 'primary',
      size: element.dataset.size || 'medium',
      ...options
    };

    // Get child elements
    this.iconElement = element.querySelector('.vf-button__icon');
    this.labelElement = element.querySelector('.vf-button__label');

    // State
    this.state = {
      disabled: element.hasAttribute('disabled'),
      loading: element.classList.contains('vf-button--loading')
    };

    // Bind methods
    this.handleClick = this.handleClick.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Initialize the button
   * @private
   */
  init() {
    this.applyVariant();
    this.applySize();
    this.setupAccessibility();
    this.attachEventListeners();
  }

  /**
   * Apply variant class
   * @private
   */
  applyVariant() {
    // Remove existing variant classes
    this.element.classList.remove(
      'vf-button--primary',
      'vf-button--secondary',
      'vf-button--outline',
      'vf-button--ghost'
    );

    // Add new variant class
    this.element.classList.add(`vf-button--${this.options.variant}`);
  }

  /**
   * Apply size class
   * @private
   */
  applySize() {
    // Remove existing size classes
    this.element.classList.remove(
      'vf-button--small',
      'vf-button--medium',
      'vf-button--large'
    );

    // Add new size class
    this.element.classList.add(`vf-button--${this.options.size}`);
  }

  /**
   * Set up accessibility attributes
   * @private
   */
  setupAccessibility() {
    // Ensure button type is set
    if (!this.element.hasAttribute('type')) {
      this.element.setAttribute('type', 'button');
    }

    // Set aria-disabled if needed
    if (this.state.disabled) {
      this.element.setAttribute('aria-disabled', 'true');
    }

    // Set aria-busy if loading
    if (this.state.loading) {
      this.element.setAttribute('aria-busy', 'true');
    }
  }

  /**
   * Attach event listeners
   * @private
   */
  attachEventListeners() {
    this.element.addEventListener('click', this.handleClick);
  }

  /**
   * Handle click events
   * @param {Event} event - The click event
   * @private
   */
  handleClick(event) {
    // Prevent action if disabled or loading
    if (this.state.disabled || this.state.loading) {
      event.preventDefault();
      return;
    }

    // Dispatch custom event
    dispatch(this.element, 'vf-button:click', {
      button: this.element,
      variant: this.options.variant,
      size: this.options.size,
      originalEvent: event
    });
  }

  /**
   * Set the button variant
   * @param {string} variant - The variant name
   */
  setVariant(variant) {
    this.options.variant = variant;
    this.applyVariant();
  }

  /**
   * Set the button size
   * @param {string} size - The size name
   */
  setSize(size) {
    this.options.size = size;
    this.applySize();
  }

  /**
   * Set the button label text
   * @param {string} text - The label text
   */
  setLabel(text) {
    if (this.labelElement) {
      this.labelElement.textContent = text;
    }
  }

  /**
   * Set the icon class
   * @param {string} iconClass - The icon class name
   */
  setIcon(iconClass) {
    if (this.iconElement) {
      const icon = this.iconElement.querySelector('i');
      if (icon) {
        icon.className = iconClass;
        this.iconElement.hidden = false;
      }
    }
  }

  /**
   * Enable the button
   */
  enable() {
    this.state.disabled = false;
    this.element.removeAttribute('disabled');
    this.element.removeAttribute('aria-disabled');
  }

  /**
   * Disable the button
   */
  disable() {
    this.state.disabled = true;
    this.element.setAttribute('disabled', '');
    this.element.setAttribute('aria-disabled', 'true');
  }

  /**
   * Set loading state
   * @param {boolean} loading - Whether button is loading
   */
  setLoading(loading) {
    this.state.loading = loading;

    if (loading) {
      this.element.classList.add('vf-button--loading');
      this.element.setAttribute('aria-busy', 'true');
      this.element.setAttribute('disabled', '');
    } else {
      this.element.classList.remove('vf-button--loading');
      this.element.removeAttribute('aria-busy');
      if (!this.state.disabled) {
        this.element.removeAttribute('disabled');
      }
    }
  }

  /**
   * Destroy the button and clean up
   */
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    delete this.element._vfButton;
  }
}

/**
 * Auto-initialize all buttons on page load
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-component="button"]');
    buttons.forEach(button => {
      if (!button._vfButton) {
        button._vfButton = new VfButton(button);
      }
    });
  });
}

export default VfButton;
```

**Checklist:**
- [ ] Constructor accepts element and options
- [ ] Finds and stores child elements
- [ ] Initializes state
- [ ] Sets up accessibility
- [ ] Attaches event listeners
- [ ] Dispatches custom events
- [ ] Public API methods
- [ ] Cleanup/destroy method
- [ ] Auto-initialization
- [ ] JSDoc comments

### Step 5: Implement Tests

**Goal:** Ensure component quality

**Process:**
1. Test initialization
2. Test props/options
3. Test events
4. Test public API
5. Test accessibility
6. Test cleanup

**Example Test:**
```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VfButton } from './button.js';

describe('VfButton', () => {
  let container;
  let element;
  let button;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button class="vf-button" data-component="button">
        <span class="vf-button__label">Click me</span>
      </button>
    `;
    document.body.appendChild(container);
    element = container.querySelector('[data-component="button"]');
    button = new VfButton(element);
  });

  afterEach(() => {
    button.destroy();
    document.body.removeChild(container);
  });

  it('should initialize with correct variant', () => {
    expect(element.classList.contains('vf-button--primary')).toBe(true);
  });

  it('should dispatch custom event on click', () => {
    const handler = vi.fn();
    element.addEventListener('vf-button:click', handler);
    element.click();
    expect(handler).toHaveBeenCalled();
  });

  it('should not dispatch event when disabled', () => {
    const handler = vi.fn();
    element.addEventListener('vf-button:click', handler);
    button.disable();
    element.click();
    expect(handler).not.toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    expect(element.getAttribute('type')).toBe('button');
  });

  it('should clean up on destroy', () => {
    const handler = vi.fn();
    element.addEventListener('vf-button:click', handler);
    button.destroy();
    element.click();
    expect(handler).not.toHaveBeenCalled();
  });
});
```

### Step 6: Create Documentation

**Goal:** Provide clear usage guide

Create `README.md` with:
- Component description
- Usage examples
- Props/attributes
- Events
- Public API
- Accessibility notes
- Browser support

### Step 7: Integration

**Actions:**
1. Add component export to `src/index.js`
2. Add styles import to main CSS
3. Add component to playground
4. Update main README

## Common Conversion Patterns

### Pattern: Conditional Rendering

**Angular:**
```html
<span *ngIf="icon">Icon here</span>
```

**Native:**
```html
<!-- Always in HTML -->
<span class="icon" hidden>Icon here</span>
```

```javascript
// Show/hide with JavaScript
if (hasIcon) {
  iconElement.hidden = false;
}
```

### Pattern: Loops/Lists

**Angular:**
```html
<li *ngFor="let item of items">{{item}}</li>
```

**Native:**
```html
<!-- Template -->
<ul class="list">
  <li>Item</li>
</ul>
```

```javascript
// JavaScript handles dynamic items
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
});
```

### Pattern: Two-way Binding

**Angular:**
```html
<input [(ngModel)]="value">
```

**Native:**
```html
<input class="input" value="">
```

```javascript
// Dispatch change events
input.addEventListener('input', (e) => {
  dispatch(element, 'vf-input:change', {
    value: e.target.value
  });
});
```

## Checklist: Conversion Complete

- [ ] HTML structure explicit and semantic
- [ ] CSS uses design tokens exclusively
- [ ] JavaScript enhances, doesn't generate
- [ ] All variants implemented
- [ ] All states implemented
- [ ] Accessibility preserved
- [ ] Responsive behavior correct
- [ ] RTL support implemented
- [ ] Tests written and passing
- [ ] Documentation complete
- [ ] Playground example added
- [ ] No Angular dependencies

## Next Steps

After conversion:
1. Use **component-validation skill** to test thoroughly
2. Create pull request
3. Update project documentation

## Related Resources

- Prompt: `.github/prompts/convert-component.prompt.md`
- Instructions: `.github/instructions/native-components.instructions.md`
- Previous Skill: `.github/skills/component-analysis/`
- Next Skill: `.github/skills/component-validation/`

---

This skill ensures you create clean, maintainable native components that match the Angular design while being framework-independent.
