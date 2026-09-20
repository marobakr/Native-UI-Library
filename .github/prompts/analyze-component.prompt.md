# Prompt: Analyze Angular Component

## Context
You are performing a deep analysis of a specific Angular component to understand its structure, behavior, and design before converting it to native web component.

## Objective
Extract all necessary information from an Angular component to inform the native implementation.

## Input Required
- Component name: `[COMPONENT_NAME]`
- Angular library path: `https://github.com/Mohamed-Adel-Web/vf-UI-components.git`
- Component location: `projects/ui/src/lib/[component-name]/`

## Tasks

### 1. Component Overview

```markdown
# Component Analysis: [COMPONENT_NAME]

## Basic Information
- **Name**: [Component Name]
- **Selector**: [Angular selector, e.g., vf-button]
- **Type**: [Presentation/Container/Utility]
- **Category**: [Forms/Layout/Feedback/Navigation/etc.]
- **Complexity**: [Low/Medium/High]
```

### 2. Visual Design Analysis

Extract visual characteristics:

```markdown
## Visual Design

### Layout
- Display type: [block/inline/flex/grid]
- Dimensions: [fixed/fluid/responsive]
- Alignment: [start/center/end]

### Colors
List all colors used:
- Primary: [token/value]
- Secondary: [token/value]
- Text: [token/value]
- Background: [token/value]
- Border: [token/value]

### Typography
- Font family: [token/value]
- Font size: [token/value for each variant]
- Font weight: [token/value]
- Line height: [token/value]

### Spacing
- Padding: [token/value]
- Margin: [token/value]
- Gap: [token/value]

### Borders
- Width: [token/value]
- Radius: [token/value]
- Style: [solid/dashed/etc.]

### Shadows
- Box shadow: [token/value]
- Text shadow: [token/value]

### Transitions
- Property: [all/specific]
- Duration: [token/value]
- Easing: [token/value]
```

### 3. Structure Analysis

Document the component's HTML structure:

```markdown
## Structure

### Template Hierarchy
```html
<!-- Angular template structure -->
<element class="main-class">
  <child-element class="child-class">
    <grandchild />
  </child-element>
</element>
```

### Element Breakdown
- Root element: [type, role, purpose]
- Child elements: [list with purposes]
- Conditional elements: [what renders when]
- Slotted content: [ng-content locations]

### Class Names
- Base class: [class name]
- Modifier classes: [list all modifiers]
- State classes: [active, disabled, etc.]
- BEM structure: [if applicable]
```

### 4. Props/Inputs Analysis

```markdown
## Props/Inputs

| Name | Type | Default | Required | Description | Validation |
|------|------|---------|----------|-------------|------------|
| variant | string | 'primary' | No | Visual variant | enum: ['primary', 'secondary'] |
| size | string | 'medium' | No | Component size | enum: ['small', 'medium', 'large'] |
| disabled | boolean | false | No | Disabled state | - |

### Prop Details

#### variant
- **Type**: `'primary' | 'secondary' | 'outline' | 'ghost'`
- **Default**: `'primary'`
- **Purpose**: Controls the visual style of the component
- **Effect**: Changes background color, text color, border
- **CSS classes**: `.vf-[component]--primary`, `.vf-[component]--secondary`

[Repeat for each prop]
```

### 5. Outputs/Events Analysis

```markdown
## Events

| Name | Payload | When Fired | Cancelable |
|------|---------|-----------|------------|
| clicked | void | Button clicked | No |
| valueChange | string | Value changes | Yes |

### Event Details

#### clicked
- **Type**: `EventEmitter<void>`
- **Trigger**: User clicks the component
- **Payload**: None
- **Use case**: Handle user interaction
- **Native equivalent**: Custom event 'vf-[component]:click'

[Repeat for each event]
```

### 6. Variants and States

```markdown
## Variants

### Visual Variants
- **primary**: Main call-to-action style
  - Colors: [list]
  - Use case: [when to use]
  
- **secondary**: Secondary action style
  - Colors: [list]
  - Use case: [when to use]

[Repeat for all variants]

### Size Variants
- **small**: 32px height
  - Padding: [value]
  - Font size: [value]
  - Use case: Compact UIs
  
- **medium**: 40px height (default)
  - Padding: [value]
  - Font size: [value]
  - Use case: Standard UIs

[Repeat for all sizes]

### State Variants
- **Default**: Normal appearance
- **Hover**: [describe changes]
- **Active**: [describe changes]
- **Focus**: [describe changes]
- **Disabled**: [describe changes]
- **Loading**: [describe changes, if applicable]
- **Error**: [describe changes, if applicable]
```

### 7. Behavior Analysis

```markdown
## Behavior

### Lifecycle
- **Initialization**: [what happens on init]
- **Updates**: [what happens when props change]
- **Cleanup**: [what cleanup is needed]

### Interactions
- **Click**: [describe click behavior]
- **Keyboard**: [describe keyboard interactions]
- **Focus**: [describe focus behavior]
- **Hover**: [describe hover effects]

### Side Effects
- [List any side effects like DOM manipulation, focus management, etc.]

### Internal State
- [List internal state variables]
- [Describe state management approach]

### Methods/API
Public methods exposed:
- `open()`: [description]
- `close()`: [description]
- [List all public methods]
```

### 8. Accessibility Analysis

```markdown
## Accessibility

### Semantic HTML
- Root element: [button/div/section/etc.]
- Why this element: [reasoning]

### ARIA Attributes
- `role`: [value and purpose]
- `aria-label`: [when/how set]
- `aria-labelledby`: [when/how set]
- `aria-describedby`: [when/how set]
- `aria-expanded`: [when/how set]
- `aria-hidden`: [when/how set]
- `aria-pressed`: [when/how set]
[List all ARIA attributes]

### Keyboard Navigation
- **Tab**: [behavior]
- **Enter**: [behavior]
- **Space**: [behavior]
- **Escape**: [behavior]
- **Arrow keys**: [behavior]

### Focus Management
- Initial focus: [where/when]
- Focus trap: [yes/no, how implemented]
- Focus restoration: [yes/no, how]

### Screen Reader Support
- Announcements: [what's announced, when]
- Live regions: [if used, how]
- Label associations: [how labels connect]

### WCAG Compliance
- Color contrast: [meets AA/AAA]
- Focus visible: [yes/no]
- Keyboard accessible: [yes/no]
- Screen reader accessible: [yes/no]
```

### 9. Responsive Behavior

```markdown
## Responsive Design

### Breakpoints Used
- Mobile: [0-767px] - [behavior]
- Tablet: [768px-1023px] - [behavior]
- Desktop: [1024px+] - [behavior]

### Responsive Changes
- Layout: [changes per breakpoint]
- Typography: [changes per breakpoint]
- Spacing: [changes per breakpoint]
- Visibility: [elements hidden/shown]

### Touch Considerations
- Touch target size: [min 44x44px?]
- Hover states on touch: [how handled]
- Gestures: [swipe, pinch, etc.]
```

### 10. RTL Support

```markdown
## RTL Support

### Text Direction
- Affects alignment: [yes/no, how]
- Affects text-align: [yes/no, how]

### Layout Mirroring
- Elements that flip: [list]
- Margins/padding: [how handled]
- Icons: [which ones flip]

### Implementation
- Uses logical properties: [yes/no]
- Manual RTL styles: [list]
- Direction detection: [how component knows]
```

### 11. Design Tokens Used

```markdown
## Design Tokens

List all design tokens referenced:

### Colors
- `--color-primary`: #e60000
- `--color-secondary`: #333333
[List all color tokens]

### Spacing
- `--space-sm`: 8px
- `--space-md`: 16px
[List all spacing tokens]

### Typography
- `--font-size-base`: 16px
[List all typography tokens]

### Other
[List any other tokens]
```

### 12. Dependencies

```markdown
## Dependencies

### Component Dependencies
- Uses Icon component: [yes/no, how]
- Uses Button component: [yes/no, how]
- Uses other components: [list]

### Utility Dependencies
- Uses class-variance-authority: [yes/no]
- Uses tailwind-merge: [yes/no]
- Uses other utilities: [list]

### External Dependencies
- Third-party libraries: [list]
- Why needed: [explanation]
- Can be removed?: [yes/no]
```

### 13. Edge Cases and Challenges

```markdown
## Edge Cases

### Known Issues
- [Issue 1]: [description and handling]
- [Issue 2]: [description and handling]

### Browser Compatibility
- Works in: [list browsers]
- Issues in: [list browsers and issues]
- Fallbacks: [list fallback strategies]

### Performance
- Rendering performance: [notes]
- Memory usage: [notes]
- Large data sets: [how handled]

### Conversion Challenges
- [Challenge 1]: [description and approach]
- [Challenge 2]: [description and approach]
```

### 14. Testing Strategy

```markdown
## Testing

### Current Tests
- Unit tests: [what's tested]
- Integration tests: [what's tested]
- Accessibility tests: [what's tested]

### Test Scenarios
- [Scenario 1]: [what to test]
- [Scenario 2]: [what to test]

### Native Testing Approach
- Similar test coverage needed
- Focus on [specific areas]
- Tools: [Jest/Vitest, Testing Library]
```

### 15. Documentation and Examples

```markdown
## Documentation

### Storybook Stories
- [Story 1]: [what it demonstrates]
- [Story 2]: [what it demonstrates]

### Usage Examples
```typescript
// Angular usage example
<vf-button variant="primary" size="large" (clicked)="handleClick()">
  Click me
</vf-button>
```

### Native Equivalent Plan
```html
<!-- Native HTML -->
<button 
  class="vf-button vf-button--primary vf-button--large" 
  data-component="button"
  type="button"
>
  <span class="vf-button__label">Click me</span>
</button>
```

```javascript
// Native JavaScript
const button = document.querySelector('[data-component="button"]');
new VfButton(button);
button.addEventListener('vf-button:click', handleClick);
```
```

### 16. Conversion Recommendations

```markdown
## Conversion Plan

### Approach
- [Recommended approach for this component]

### Implementation Order
1. Create HTML structure
2. Implement CSS styles
3. Add JavaScript behavior
4. Implement accessibility
5. Add tests
6. Create documentation

### Simplifications
- [Thing to simplify]: [how and why]

### Enhancements
- [Thing to enhance]: [how and why]

### Time Estimate
- HTML: [time]
- CSS: [time]
- JavaScript: [time]
- Tests: [time]
- Docs: [time]
- **Total**: [time]
```

## Deliverable

Create a comprehensive analysis document: `docs/component-analysis/[component-name].md`

## Validation

Analysis is complete when:
- [ ] All visual aspects documented
- [ ] All props/inputs cataloged
- [ ] All events documented
- [ ] Accessibility patterns understood
- [ ] Responsive behavior noted
- [ ] RTL support documented
- [ ] Design tokens extracted
- [ ] Dependencies identified
- [ ] Edge cases noted
- [ ] Conversion plan created

## Next Steps

After analysis:
1. Review analysis document
2. Validate understanding with Angular implementation
3. Use **convert-component.prompt.md** to implement native version

---

Use this prompt to deeply understand a component before attempting conversion.
