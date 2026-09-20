# Skill: Component Analysis

## Overview

This skill provides expertise in deeply analyzing a specific Angular component to extract all information needed for native conversion.

## When to Use This Skill

Use this skill when you need to:
- Analyze a specific Angular component before conversion
- Extract component structure and behavior
- Document props, events, and variants
- Understand accessibility patterns
- Plan the native implementation approach

## Prerequisites

- Component identified from library discovery
- Access to Angular repository
- Understanding of Angular component architecture
- Knowledge of web accessibility patterns

## Step-by-Step Process

### Step 1: Initial Component Review

**Goal:** Get familiar with the component

**Actions:**
1. Locate component files in Angular repository
2. Identify all related files:
   - Component class (`.ts`)
   - Template (`.html`)
   - Styles (`.scss` / `.css`)
   - Tests (`.spec.ts`)
   - Stories (`.stories.ts`)
   - Variants (`.variants.ts` if using CVA)
3. Read component purpose from README or comments

**Output:** Component file inventory

### Step 2: Visual Design Extraction

**Goal:** Document how the component looks

**Actions:**
1. Run Angular Storybook if available, or inspect rendered component
2. Screenshot all variants and states
3. Measure spacing, sizes, colors
4. Note typography choices
5. Identify design tokens used

**What to Document:**
```markdown
## Visual Design

### Layout
- Display type: flex
- Direction: row
- Alignment: center
- Gap: 8px (--space-sm)

### Colors
- Background: --color-primary (#e60000)
- Text: --color-on-primary (#ffffff)
- Border: transparent

### Typography
- Font: --font-family-base
- Size: --font-size-base (16px)
- Weight: --font-weight-medium (500)
- Line height: --line-height-base (1.5)

### Spacing
- Padding: --space-md (16px) --space-lg (24px)
- Margin: 0

### Borders
- Radius: --border-radius-md (8px)
- Width: 0

### Shadows
- Box shadow: --shadow-sm

### Transitions
- Duration: --transition-duration (200ms)
- Easing: --transition-easing (ease-in-out)
- Properties: background-color, transform
```

**Output:** Visual design specification

### Step 3: Structure Analysis

**Goal:** Understand the HTML hierarchy

**Actions:**
1. Examine Angular template (`.html` file)
2. Document element structure
3. Identify semantic elements
4. Note conditional elements (`*ngIf`)
5. Note repeated elements (`*ngFor`)
6. Identify content projection slots (`<ng-content>`)

**Example Angular Template:**
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
  <span class="vf-button__badge" *ngIf="badge">
    {{badge}}
  </span>
</button>
```

**Native Equivalent Plan:**
```html
<button class="vf-button vf-button--primary" data-component="button">
  <span class="vf-button__icon">
    <i class="icon-class"></i>
  </span>
  <span class="vf-button__label">Button Text</span>
  <span class="vf-button__badge">3</span>
</button>
```

**Output:** Structure mapping document

### Step 4: Props/Inputs Analysis

**Goal:** Document all component inputs

**Actions:**
1. Find all `@Input()` decorators in component class
2. For each input, document:
   - Name
   - Type
   - Default value
   - Required or optional
   - Purpose
   - Validation rules
   - Effect on component

**Template:**
```markdown
## Props/Inputs

### variant
- **Type:** `'primary' | 'secondary' | 'outline' | 'ghost'`
- **Default:** `'primary'`
- **Required:** No
- **Purpose:** Controls the visual style of the button
- **Effect:** 
  - `primary`: Red background, white text
  - `secondary`: Gray background, dark text
  - `outline`: Transparent background, red border
  - `ghost`: Transparent background, no border
- **CSS Class:** `.vf-button--{variant}`

### size
- **Type:** `'small' | 'medium' | 'large'`
- **Default:** `'medium'`
- **Required:** No
- **Purpose:** Controls the button size
- **Effect:**
  - `small`: 32px height, small padding
  - `medium`: 40px height, medium padding
  - `large`: 48px height, large padding
- **CSS Class:** `.vf-button--{size}`

### disabled
- **Type:** `boolean`
- **Default:** `false`
- **Required:** No
- **Purpose:** Disables the button
- **Effect:** Adds disabled attribute, 50% opacity
- **HTML Attribute:** `disabled`
```

**Output:** Props documentation

### Step 5: Events/Outputs Analysis

**Goal:** Document all component events

**Actions:**
1. Find all `@Output()` decorators
2. For each event, document:
   - Name
   - Payload type
   - When it fires
   - Use cases

**Template:**
```markdown
## Events/Outputs

### clicked
- **Angular:** `@Output() clicked = new EventEmitter<void>()`
- **Native Equivalent:** Custom event `'vf-button:click'`
- **Payload:** `{ button: HTMLElement, originalEvent: Event }`
- **Fires When:** User clicks the button
- **Cancelable:** Yes
- **Use Case:** Handle button click actions

### valueChange
- **Angular:** `@Output() valueChange = new EventEmitter<string>()`
- **Native Equivalent:** Custom event `'vf-input:change'`
- **Payload:** `{ value: string, input: HTMLElement }`
- **Fires When:** Input value changes
- **Cancelable:** No
- **Use Case:** Sync with parent state
```

**Output:** Events documentation

### Step 6: Behavior Analysis

**Goal:** Understand component logic and interactions

**Actions:**
1. Read component class methods
2. Document lifecycle hooks
3. Document state management
4. Document side effects
5. Document public API

**What to Document:**
```markdown
## Behavior

### Lifecycle
- **ngOnInit:** Sets up event listeners for Escape key
- **ngOnDestroy:** Cleans up event listeners, restores focus
- **ngOnChanges:** Updates internal state when props change

### State Management
- **Internal State:**
  - `isOpen: boolean` - Whether component is open
  - `focusedIndex: number` - Currently focused item index
- **State Updates:** Trigger re-render when state changes

### Public Methods
- `open()`: Opens the component, traps focus
- `close()`: Closes the component, restores focus
- `toggle()`: Toggles open/closed state

### Side Effects
- Manages focus trap when open
- Listens for Escape key to close
- Prevents body scroll when open
- Manages ARIA attributes dynamically

### Interactions
- **Click:** Toggles component or triggers action
- **Keyboard:**
  - Enter/Space: Activate
  - Escape: Close
  - Arrow keys: Navigate options
  - Tab: Move focus
```

**Output:** Behavior specification

### Step 7: Accessibility Analysis

**Goal:** Extract accessibility patterns

**Actions:**
1. Examine ARIA attributes in template
2. Note semantic HTML elements
3. Document keyboard navigation
4. Check focus management
5. Review screen reader considerations

**Template:**
```markdown
## Accessibility

### Semantic HTML
- **Root Element:** `<button>` - Native button for click interaction
- **Why:** Provides keyboard support and screen reader announcements automatically

### ARIA Attributes
- `role="dialog"` - Identifies as modal dialog
- `aria-modal="true"` - Indicates modal behavior
- `aria-labelledby="modal-title"` - Links to title for label
- `aria-describedby="modal-desc"` - Links to description
- `aria-expanded="false"` - Indicates collapsed state
- `aria-controls="dropdown-menu"` - Links to controlled element

### Keyboard Navigation
- **Tab:** Move focus to button
- **Enter/Space:** Activate button
- **Escape:** Close dialog/dropdown
- **Arrow Down:** Move to next option
- **Arrow Up:** Move to previous option
- **Home:** Move to first option
- **End:** Move to last option

### Focus Management
- **Initial Focus:** First focusable element in dialog
- **Focus Trap:** Focus cycles within modal
- **Focus Restoration:** Returns to trigger element on close
- **Visible Focus:** Outline ring on focused elements

### Screen Reader
- **Announcements:**
  - Component type and state announced
  - State changes announced to live region
  - Error messages announced assertively
- **Navigation:**
  - Logical tab order
  - Proper labels for all controls
  - Context provided for dynamic content
```

**Output:** Accessibility specification

### Step 8: Responsive Behavior Analysis

**Goal:** Document responsive patterns

**Actions:**
1. Find media queries in styles
2. Note breakpoints used
3. Document layout changes
4. Note mobile-specific behavior

**Template:**
```markdown
## Responsive Behavior

### Breakpoints
- **Mobile:** 0-767px
- **Tablet:** 768px-1023px
- **Desktop:** 1024px+

### Layout Changes

#### Mobile (0-767px)
- Single column layout
- Full width buttons
- Smaller padding: --space-sm
- Font size: --font-size-sm
- Stack elements vertically

#### Tablet (768px-1023px)
- Two column layout possible
- Standard button width
- Medium padding: --space-md
- Font size: --font-size-base

#### Desktop (1024px+)
- Multi-column layout
- Max width container
- Larger padding: --space-lg
- Font size: --font-size-base

### Mobile-Specific
- Touch targets ≥ 44x44px
- Larger tap areas
- Bottom sheet instead of dropdown
- Simplified navigation
```

**Output:** Responsive specification

### Step 9: RTL Support Analysis

**Goal:** Document bidirectional text support

**Actions:**
1. Find `[dir="rtl"]` selectors
2. Note properties that change
3. Identify icons that flip
4. Check text alignment

**Template:**
```markdown
## RTL Support

### Text Direction
- Text aligns to the right
- Reading order: right to left

### Layout Mirroring
- **Margins:** 
  - `margin-left` becomes `margin-right`
  - Better: Use `margin-inline-start`
- **Padding:**
  - Similar mirroring
  - Better: Use `padding-inline-start/end`
- **Alignment:**
  - `text-align: left` becomes `text-align: right`
  - Better: Use `text-align: start`

### Elements That Mirror
- Navigation arrows (← becomes →)
- Breadcrumb separators
- Dropdown indicators
- Progress indicators
- Timeline flows

### Icons
- **Flip:** Directional icons (arrows, chevrons)
- **Don't Flip:** Symbolic icons (checkmarks, close, search)

### Implementation
```css
/* Angular approach */
[dir="rtl"] .component {
  margin-left: 0;
  margin-right: 16px;
}

/* Better native approach */
.component {
  margin-inline-start: 16px;
}
```
```

**Output:** RTL specification

### Step 10: Conversion Planning

**Goal:** Create implementation strategy

**Actions:**
1. Summarize component complexity
2. Identify challenges
3. Plan HTML structure
4. Plan CSS approach
5. Plan JavaScript approach
6. Estimate effort

**Template:**
```markdown
## Conversion Plan

### Complexity Assessment
- **Overall:** Medium
- **HTML:** Low - Simple structure
- **CSS:** Medium - Multiple variants
- **JavaScript:** Medium - State management needed
- **Accessibility:** High - Focus trap required

### Challenges
1. **Focus Trap:** Need robust focus management
2. **Body Scroll Lock:** Prevent background scroll
3. **Portal/Teleport:** Modal needs to render at body level
4. **Animation:** Smooth enter/exit transitions

### Implementation Approach

#### HTML
- Use `<dialog>` element for native modal behavior
- Or use `<div role="dialog">` with manual management
- Explicit structure with all elements
- Use semantic elements throughout

#### CSS
- Leverage design tokens for all values
- CSS transitions for animations
- Use logical properties for RTL
- Mobile-first responsive approach
- Layer for overlay backdrop

#### JavaScript
- Constructor initializes component
- Event listeners for interactions
- Focus trap utility
- Body scroll lock utility
- ARIA attribute management
- Public API: open(), close(), toggle()

### Time Estimate
- **HTML:** 1 hour
- **CSS:** 3 hours
- **JavaScript:** 4 hours
- **Tests:** 2 hours
- **Documentation:** 1 hour
- **Total:** ~11 hours (~1.5 days)

### Dependencies
- **Requires:** FocusTrap utility, Portal utility
- **Used By:** None (top-level component)
- **Uses:** Button (for close button)
```

**Output:** Implementation plan

## Deliverables

Create a comprehensive analysis document:

**File:** `docs/component-analysis/[component-name].md`

**Sections:**
1. Component Overview
2. Visual Design
3. Structure
4. Props/Inputs
5. Events/Outputs
6. Variants and States
7. Behavior
8. Accessibility
9. Responsive Design
10. RTL Support
11. Design Tokens Used
12. Dependencies
13. Conversion Plan

## Tips and Best Practices

### Reading Angular Code

**Component Class (.ts):**
- `@Input()` → Props to support
- `@Output()` → Events to dispatch
- Public methods → API to implement
- Private methods → Internal logic to recreate

**Template (.html):**
- Element hierarchy → HTML structure
- `[attr]` → Dynamic attributes
- `(event)` → Event handlers
- `*ngIf` → Conditional rendering
- `*ngFor` → Loops (handle with JavaScript)
- `<ng-content>` → Content slots

**Styles (.scss):**
- Selectors → Class names to use
- Variables → Design tokens
- Mixins → Reusable patterns
- Media queries → Responsive breakpoints

### What Makes a Component Complex?

**Low Complexity:**
- Few or no props
- No state management
- Simple structure
- Static appearance
- No animations

**Medium Complexity:**
- Multiple props
- Some internal state
- Conditional rendering
- Some animations
- Basic interactions

**High Complexity:**
- Many props with validation
- Complex state management
- Dynamic structure
- Advanced animations
- Complex interactions
- Advanced accessibility patterns

## Validation

Analysis is complete when you can answer:

- [ ] What does the component do?
- [ ] What are all its props?
- [ ] What events does it emit?
- [ ] How does it look (all variants)?
- [ ] How does it behave?
- [ ] What accessibility features does it have?
- [ ] How does it respond to different screen sizes?
- [ ] How does it support RTL?
- [ ] What design tokens does it use?
- [ ] What are the conversion challenges?
- [ ] How long will conversion take?

## Next Steps

After analysis:
1. Review analysis document
2. Validate understanding
3. Use **angular-to-native skill** to implement
4. Reference analysis during implementation

## Related Resources

- Prompt: `.github/prompts/analyze-component.prompt.md`
- Instructions: `.github/instructions/angular-reference.instructions.md`
- Previous Skill: `.github/skills/angular-library-discovery/`
- Next Skill: `.github/skills/angular-to-native/`

---

This skill ensures you thoroughly understand an Angular component before attempting to convert it, leading to better native implementations.
