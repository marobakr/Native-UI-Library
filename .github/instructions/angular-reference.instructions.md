# Angular Reference Library Instructions

## Purpose
This document provides guidance for analyzing and understanding the Angular UI Library (`https://github.com/Mohamed-Adel-Web/vf-UI-components.git`) to inform native implementations, without copying Angular code.

## Core Principle: Reference, Not Translation

The Angular library is a **design reference**, not a code template.

```
Angular Library (Reference)          Native Library (Implementation)
├── Component structure       →      Component structure
├── Visual design            →      Visual design
├── Variants & states        →      Variants & states
├── Behavior patterns        →      Behavior patterns
├── Accessibility           →      Accessibility
├── Design tokens           →      Design tokens
└── Documentation           →      Documentation

    ❌ Angular code            ✅ Native reimplementation
```

## What to Extract from Angular Components

### 1. Component Structure

Understand the component's anatomy:

**Angular Component:**
```typescript
// button.component.ts
@Component({
  selector: 'vf-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class VfButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() icon?: string;
  @Output() clicked = new EventEmitter<void>();
}
```

**Extract:**
- Component name: "Button"
- Props/attributes: variant, size, disabled, icon
- Prop types and defaults
- Events: clicked
- Variants: primary, secondary, outline
- Sizes: small, medium, large

**Native Implementation:**
```html
<!-- button.html -->
<button 
  class="vf-button vf-button--primary vf-button--medium" 
  data-component="button"
  type="button"
>
  <span class="vf-button__icon"></span>
  <span class="vf-button__label">Button</span>
</button>
```

```javascript
// button.js
export class VfButton {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'primary';
    this.size = element.dataset.size || 'medium';
    this.disabled = element.hasAttribute('disabled');
    // ...
  }
}
```

### 2. Visual Design

Analyze the rendered output and styles:

**Angular Template:**
```html
<!-- button.component.html -->
<button 
  [class]="'vf-button vf-button--' + variant + ' vf-button--' + size"
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

**Angular Styles:**
```scss
// button.component.scss
.vf-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;

  &--primary {
    background: var(--color-primary);
    color: var(--color-on-primary);
  }

  &--secondary {
    background: var(--color-secondary);
    color: var(--color-on-secondary);
  }

  &--small {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
  }

  &--medium {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-base);
  }
}
```

**Extract:**
- Layout: inline-flex, centered items
- Spacing: gap, padding values (from tokens)
- Border radius (from tokens)
- Color variants and their token references
- Size modifiers and their values
- Transitions and animations
- State styles (hover, active, disabled)

**Native Implementation:**
```css
/* button.css */
.vf-button {
  display: inline-flex;
  align-items: center;
  gap: var(--vf-space-sm);
  padding: var(--vf-space-md) var(--vf-space-lg);
  border-radius: var(--vf-border-radius-md);
  font-weight: var(--vf-font-weight-medium);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.vf-button--primary {
  background: var(--vf-color-primary);
  color: var(--vf-color-on-primary);
}

.vf-button--primary:hover {
  background: var(--vf-color-primary-hover);
}

.vf-button--secondary {
  background: var(--vf-color-secondary);
  color: var(--vf-color-on-secondary);
}

.vf-button--small {
  padding: var(--vf-space-sm) var(--vf-space-md);
  font-size: var(--vf-font-size-sm);
}

.vf-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 3. Component Behavior

Understand interactions and state management:

**Angular Component:**
```typescript
export class VfModalComponent implements OnInit {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  ngOnInit() {
    document.addEventListener('keydown', this.handleEscape);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  open() {
    this.open = true;
    this.openChange.emit(true);
    this.trapFocus();
  }

  private trapFocus() {
    // Focus trap implementation
  }
}
```

**Extract:**
- Lifecycle: initialization, cleanup
- Event handling: keyboard (Escape), click
- State management: open/closed
- Side effects: focus trapping
- Public API: open(), close() methods
- Events emitted: openChange, closed

**Native Implementation:**
```javascript
// modal.js
export class VfModal {
  constructor(element) {
    this.element = element;
    this.isOpen = element.hasAttribute('open');
    this.init();
  }

  init() {
    this.handleEscape = this.handleEscape.bind(this);
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', this.handleEscape);
    
    const closeButtons = this.element.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
  }

  handleEscape(event) {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  open() {
    this.isOpen = true;
    this.element.setAttribute('open', '');
    this.element.classList.add('vf-modal--open');
    this.trapFocus();
    
    this.element.dispatchEvent(new CustomEvent('vf-modal:opened', {
      bubbles: true,
      detail: { modal: this.element }
    }));
  }

  close() {
    this.isOpen = false;
    this.element.removeAttribute('open');
    this.element.classList.remove('vf-modal--open');
    
    this.element.dispatchEvent(new CustomEvent('vf-modal:closed', {
      bubbles: true,
      detail: { modal: this.element }
    }));
  }

  trapFocus() {
    // Focus trap implementation
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    firstElement?.focus();
  }

  destroy() {
    document.removeEventListener('keydown', this.handleEscape);
  }
}
```

### 4. Accessibility Patterns

Extract ARIA attributes and keyboard navigation:

**Angular Template:**
```html
<div 
  role="dialog" 
  [attr.aria-labelledby]="titleId"
  [attr.aria-modal]="true"
  [attr.aria-hidden]="!open"
  tabindex="-1"
>
  <div role="document">
    <h2 [id]="titleId">{{ title }}</h2>
    <div>
      <ng-content></ng-content>
    </div>
    <button 
      type="button" 
      aria-label="Close dialog"
      (click)="close()"
    >
      Close
    </button>
  </div>
</div>
```

**Extract:**
- Roles: dialog, document
- ARIA attributes: aria-labelledby, aria-modal, aria-hidden
- Focus management: tabindex
- Button labels: aria-label
- Keyboard support: Escape to close

**Native Implementation:**
```html
<!-- modal.html -->
<div 
  class="vf-modal" 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-hidden="true"
  tabindex="-1"
  data-component="modal"
>
  <div class="vf-modal__overlay" data-modal-close></div>
  <div class="vf-modal__container" role="document">
    <div class="vf-modal__header">
      <h2 id="modal-title" class="vf-modal__title">Modal Title</h2>
      <button 
        class="vf-modal__close" 
        type="button"
        aria-label="Close dialog"
        data-modal-close
      >
        ×
      </button>
    </div>
    <div class="vf-modal__content">
      <!-- Content -->
    </div>
    <div class="vf-modal__footer">
      <!-- Actions -->
    </div>
  </div>
</div>
```

### 5. Design Tokens

Map Angular's design tokens to native CSS custom properties:

**Angular Tokens (might be in a theme file):**
```scss
// _tokens.scss
$color-primary: #e60000;
$color-secondary: #333333;
$space-base: 8px;
$space-sm: $space-base / 2;
$space-md: $space-base;
$space-lg: $space-base * 2;
$font-size-base: 16px;
$border-radius-md: 8px;
```

Or in Tailwind config:
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#e60000',
      secondary: '#333333',
    },
    spacing: {
      'xs': '4px',
      'sm': '8px',
      'md': '16px',
      'lg': '24px',
    }
  }
}
```

**Extract and map to CSS custom properties:**
```css
/* tokens/theme.css */
:root {
  /* Colors */
  --vf-color-primary: #e60000;
  --vf-color-primary-hover: #cc0000;
  --vf-color-secondary: #333333;
  --vf-color-text-primary: #1a1a1a;
  --vf-color-text-secondary: #666666;
  --vf-color-surface: #ffffff;
  --vf-color-on-primary: #ffffff;
  
  /* Spacing */
  --vf-space-xs: 4px;
  --vf-space-sm: 8px;
  --vf-space-md: 16px;
  --vf-space-lg: 24px;
  --vf-space-xl: 32px;
  
  /* Typography */
  --vf-font-size-xs: 12px;
  --vf-font-size-sm: 14px;
  --vf-font-size-base: 16px;
  --vf-font-size-lg: 18px;
  --vf-font-size-xl: 24px;
  --vf-font-weight-normal: 400;
  --vf-font-weight-medium: 500;
  --vf-font-weight-semibold: 600;
  --vf-line-height-tight: 1.25;
  --vf-line-height-base: 1.5;
  --vf-line-height-relaxed: 1.75;
  
  /* Border Radius */
  --vf-border-radius-sm: 4px;
  --vf-border-radius-md: 8px;
  --vf-border-radius-lg: 12px;
  --vf-border-radius-full: 9999px;
  
  /* Shadows */
  --vf-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --vf-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --vf-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --vf-transition-duration: 200ms;
  --vf-transition-easing: ease-in-out;
}
```

### 6. Component Variants and States

Document all variants and states:

**Angular Component:**
```typescript
export class VfButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
}
```

**Extract:**
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: small, medium, large
- **States**: default, hover, active, focus, disabled, loading
- **Modifiers**: fullWidth

**Document in component README:**
```markdown
# Button Component

## Variants
- `primary` - Main call-to-action (default)
- `secondary` - Secondary actions
- `outline` - Low-emphasis actions
- `ghost` - Minimal emphasis

## Sizes
- `small` - Compact button (32px height)
- `medium` - Standard button (40px height, default)
- `large` - Prominent button (48px height)

## States
- Default
- Hover - Darker background
- Active - Even darker background
- Focus - Outline ring
- Disabled - 50% opacity, no pointer
- Loading - Spinner, disabled interaction

## Modifiers
- `fullWidth` - Button stretches to container width
```

### 7. Responsive Behavior

Check media queries and responsive patterns:

**Angular Styles:**
```scss
.vf-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);

  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }

  @media (min-width: 1024px) {
    gap: var(--space-lg);
  }
}
```

**Extract:**
- Breakpoints: 768px (tablet), 1024px (desktop)
- Mobile: single column
- Tablet+: two columns (300px + flex)
- Desktop+: larger gap

**Native Implementation:**
```css
/* card.css */
.vf-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--vf-space-md);
}

@media (min-width: 768px) {
  .vf-card {
    grid-template-columns: 300px 1fr;
  }
}

@media (min-width: 1024px) {
  .vf-card {
    gap: var(--vf-space-lg);
  }
}
```

### 8. RTL Support

Identify RTL patterns:

**Angular Styles:**
```scss
.vf-menu {
  text-align: left;
  margin-left: var(--space-md);

  [dir="rtl"] & {
    text-align: right;
    margin-left: 0;
    margin-right: var(--space-md);
  }
}
```

**Extract:**
- RTL directive detection: `[dir="rtl"]`
- Properties to mirror: text-align, margins, padding
- Icons that need flipping

**Native Implementation (using logical properties):**
```css
/* Better approach with logical properties */
.vf-menu {
  text-align: start; /* Automatically switches in RTL */
  margin-inline-start: var(--vf-space-md); /* Auto-adjusts */
}

/* Icons that need flipping */
[dir="rtl"] .vf-icon--directional {
  transform: scaleX(-1);
}
```

## Analysis Workflow

### Step 1: Component Discovery
```bash
# Clone Angular library (READ ONLY)
git clone https://github.com/Mohamed-Adel-Web/vf-UI-components.git vf-angular-reference

# Explore structure
ls -la projects/ui/src/lib/
```

### Step 2: Component Documentation
Create a document for each component:

```markdown
# Component Analysis: Button

## Angular Implementation
- **Location**: `projects/ui/src/lib/button/`
- **Selector**: `vf-button`
- **Type**: Component

## Structure
- Main button element
- Optional icon (start/end)
- Label text (ng-content)

## Props/Inputs
| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Button style variant |
| size | string | 'medium' | Button size |
| disabled | boolean | false | Disabled state |
| icon | string | undefined | Icon class |

## Variants
- primary
- secondary
- outline
- ghost

## Sizes
- small (32px)
- medium (40px)
- large (48px)

## Design Tokens Used
- `--color-primary`
- `--color-secondary`
- `--space-md`
- `--space-lg`
- `--border-radius-md`
- `--font-weight-medium`

## Accessibility
- Proper button element
- aria-label support
- Keyboard accessible
- Focus visible

## Responsive
- No specific responsive behavior
- Works at all viewport sizes

## RTL Support
- Icon position flips
- Padding adjusts automatically

## Native Implementation Notes
- Use explicit HTML structure
- CSS classes for variants
- JavaScript for enhanced interactions
- Custom events for button clicks
```

### Step 3: Design Token Extraction
Create a comprehensive token mapping:

```
tokens/
├── colors.css       # Color palette from Angular
├── typography.css   # Font sizes, weights, line heights
├── spacing.css      # Spacing scale
├── borders.css      # Border radius, widths
├── shadows.css      # Box shadows
├── transitions.css  # Animation durations, easings
└── theme.css        # Combined theme
```

### Step 4: Component Inventory
List all components with priorities:

```markdown
# Component Inventory

## High Priority (Core UI)
- [ ] Button
- [ ] Input
- [ ] Checkbox
- [ ] Radio
- [ ] Select/Dropdown

## Medium Priority (Common)
- [ ] Card
- [ ] Modal/Dialog
- [ ] Tabs
- [ ] Accordion
- [ ] Alert/Toast

## Low Priority (Advanced)
- [ ] Data Table
- [ ] Date Picker
- [ ] File Upload
- [ ] Carousel
```

## Tools for Analysis

### Visual Inspection
- Run Angular Storybook: `npm run storybook`
- Inspect rendered components in DevTools
- Screenshot variants and states
- Note spacing, colors, interactions

### Code Reading
- Read TypeScript component classes
- Read HTML templates
- Read SCSS styles
- Read Storybook stories

### Token Extraction
- Check `styles/theme.css` or similar
- Check Tailwind config if used
- Check SCSS variables
- Map to CSS custom properties

## Anti-Patterns

### ❌ DON'T
- Copy-paste Angular code
- Use Angular syntax in native components
- Include Angular dependencies
- Convert TypeScript decorators to JavaScript
- Copy Angular file structure exactly

### ✅ DO
- Understand component purpose and behavior
- Recreate design with native technologies
- Map concepts, not code
- Simplify where possible
- Improve accessibility
- Use modern web standards

## Summary

The Angular library provides:
- **Visual design reference** - Colors, spacing, typography
- **Component structure** - Layout and hierarchy
- **Behavior patterns** - Interactions and state
- **Accessibility patterns** - ARIA, keyboard nav
- **Design tokens** - Consistent values
- **Variants and states** - All possible configurations

Use this information to build **better** native components, not translated ones.

---

**Remember**: The goal is to understand what the component does and how it looks, then build it natively from scratch.
