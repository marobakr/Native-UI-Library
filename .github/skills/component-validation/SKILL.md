# Skill: Component Validation

## Overview

This skill provides expertise in thoroughly testing and validating native components to ensure they meet all quality standards.

## When to Use This Skill

Use this skill when you need to:
- Validate a converted component before release
- Ensure quality standards are met
- Test accessibility compliance
- Verify cross-browser compatibility
- Check performance characteristics

## Prerequisites

- Component implemented and ready for testing
- Test environment set up
- Access to testing tools (browsers, screen readers, etc.)

## Validation Dimensions

1. **Code Quality** - Clean, maintainable code
2. **Functionality** - Works as expected
3. **Visual Accuracy** - Matches design
4. **Responsiveness** - Works at all sizes
5. **Accessibility** - WCAG AA compliant
6. **RTL/LTR** - Bidirectional support
7. **Browser Compatibility** - Works across browsers
8. **Performance** - Fast and efficient
9. **Integration** - Works with other components
10. **Documentation** - Complete and accurate

## Comprehensive Validation Process

### Dimension 1: Code Quality

**Goal:** Ensure code is clean and maintainable

**HTML Validation:**
```bash
# Use W3C HTML Validator or html-validate
npm install -D html-validate
npx html-validate src/components/**/**.html
```

**Checklist:**
- [ ] Valid HTML (no errors)
- [ ] Semantic elements used
- [ ] Proper element nesting
- [ ] Meaningful class names
- [ ] No inline styles
- [ ] ARIA attributes appropriate
- [ ] Data attributes consistent

**CSS Validation:**
```bash
# Use stylelint
npm install -D stylelint stylelint-config-standard
npx stylelint "src/**/*.css"
```

**Checklist:**
- [ ] Uses design tokens exclusively
- [ ] No hard-coded values
- [ ] Logical properties for RTL
- [ ] BEM naming convention
- [ ] No !important (except where necessary)
- [ ] Organized and commented
- [ ] No unused styles

**JavaScript Validation:**
```bash
# Use ESLint
npx eslint src/components/
```

**Checklist:**
- [ ] ES6+ modern syntax
- [ ] Clear function names
- [ ] JSDoc comments complete
- [ ] No console.logs in production
- [ ] No unused variables
- [ ] Proper error handling
- [ ] Event listeners cleaned up
- [ ] No memory leaks

### Dimension 2: Functionality Testing

**Goal:** Verify all features work correctly

**Manual Testing Script:**
```markdown
## Functionality Test Script

### Initialization
1. Load component in browser
2. Verify component renders
3. Check console for errors
4. Verify initial state correct

### Interactions
For each interactive feature:
1. Trigger the interaction
2. Verify expected behavior
3. Check console for errors
4. Verify state updates

### Edge Cases
Test boundary conditions:
- Empty state
- Maximum values
- Minimum values
- Invalid input
- Rapid interactions
```

**Automated Testing:**
```javascript
// Run unit tests
npm test

// Check coverage
npm run test:coverage
```

**Checklist:**
- [ ] All features work
- [ ] Edge cases handled
- [ ] Error states work
- [ ] Loading states work
- [ ] Events dispatch correctly
- [ ] Public API works
- [ ] State management correct
- [ ] No console errors
- [ ] Tests passing (≥80% coverage)

### Dimension 3: Visual Accuracy

**Goal:** Match Angular component design

**Visual Comparison:**
1. Screenshot Angular component (all variants)
2. Screenshot native component (all variants)
3. Compare side-by-side

**Checklist per Variant:**
- [ ] Colors match
- [ ] Spacing matches
- [ ] Typography matches
- [ ] Borders match
- [ ] Shadows match
- [ ] Alignment correct
- [ ] Sizing correct

**State Testing:**
- [ ] Default state correct
- [ ] Hover state correct
- [ ] Focus state correct
- [ ] Active state correct
- [ ] Disabled state correct
- [ ] Loading state correct
- [ ] Error state correct

**Tools:**
- Browser DevTools for measurement
- Color picker for color verification
- Ruler for spacing verification

### Dimension 4: Responsive Testing

**Goal:** Works perfectly at all viewport sizes

**Test Viewports:**
1. **Mobile Small:** 320px - 374px
2. **Mobile Standard:** 375px - 767px
3. **Tablet Portrait:** 768px - 1023px
4. **Desktop Small:** 1024px - 1279px
5. **Desktop Large:** 1280px - 1919px
6. **Desktop XL:** 1920px+

**For Each Viewport:**
```markdown
## Responsive Test: [Viewport Name]

### Layout
- [ ] Component fits viewport
- [ ] No horizontal scroll
- [ ] Spacing appropriate
- [ ] Text readable

### Typography
- [ ] Font size appropriate
- [ ] Line height comfortable
- [ ] Text doesn't overflow

### Interactions
- [ ] Touch targets ≥ 44x44px (mobile)
- [ ] Hover works (desktop)
- [ ] Click/tap works
- [ ] Scrolling smooth

### Visual
- [ ] Images scale correctly
- [ ] Icons visible
- [ ] Alignment correct
```

**Testing Tools:**
- Browser DevTools device emulation
- Real devices (iOS, Android)
- BrowserStack or similar

**Orientation Testing:**
- [ ] Portrait orientation works
- [ ] Landscape orientation works

### Dimension 5: Accessibility Testing

**Goal:** WCAG 2.1 AA compliance

**Automated Testing:**
```bash
# Use axe-core
npm install -D @axe-core/cli
npx axe http://localhost:3000/playground

# Use pa11y
npm install -D pa11y
npx pa11y http://localhost:3000/playground
```

**Lighthouse Audit:**
```bash
# Run Lighthouse
lighthouse http://localhost:3000/playground --view
```

**Manual Testing:**

**1. Keyboard Navigation:**
```markdown
## Keyboard Test Script

1. **Tab Key:**
   - [ ] Tab moves focus to component
   - [ ] Tab order is logical
   - [ ] All interactive elements reachable
   - [ ] No keyboard traps

2. **Enter/Space:**
   - [ ] Activates component
   - [ ] Works on all focusable elements

3. **Escape:**
   - [ ] Closes modals/dropdowns
   - [ ] Returns focus appropriately

4. **Arrow Keys:**
   - [ ] Navigate options (if applicable)
   - [ ] Move focus correctly

5. **Home/End:**
   - [ ] Jump to start/end (if applicable)

6. **Shift+Tab:**
   - [ ] Reverse focus order works
```

**2. Screen Reader Testing:**

Test with:
- **NVDA** (Windows, free)
- **JAWS** (Windows)
- **VoiceOver** (Mac/iOS)
- **TalkBack** (Android)

```markdown
## Screen Reader Test Script

1. **Component Discovery:**
   - [ ] Component announced correctly
   - [ ] Component type clear
   - [ ] Component purpose clear

2. **Content:**
   - [ ] All text read
   - [ ] Labels associated correctly
   - [ ] Instructions clear

3. **State:**
   - [ ] Current state announced
   - [ ] State changes announced
   - [ ] Expanded/collapsed state clear
   - [ ] Selected/unselected clear

4. **Interactions:**
   - [ ] How to interact is clear
   - [ ] Actions announced
   - [ ] Results announced

5. **Live Regions:**
   - [ ] Dynamic updates announced
   - [ ] Error messages read
   - [ ] Success messages read

6. **Forms (if applicable):**
   - [ ] Labels associated with inputs
   - [ ] Required fields indicated
   - [ ] Validation errors clear
```

**3. Visual Testing:**
```markdown
## Visual Accessibility Test

1. **Color Contrast:**
   - [ ] Text contrast ≥ 4.5:1 (normal)
   - [ ] Large text contrast ≥ 3:1
   - [ ] UI component contrast ≥ 3:1
   - [ ] Focus indicator contrast ≥ 3:1
   
   Tool: https://webaim.org/resources/contrastchecker/

2. **Color Independence:**
   - [ ] Information not conveyed by color alone
   - [ ] Alternative indicators provided (icons, text)

3. **Focus Visible:**
   - [ ] Focus outline visible
   - [ ] Focus outline meets contrast
   - [ ] Focus outline not covered

4. **Text Resize:**
   - [ ] Component works at 200% zoom
   - [ ] Text doesn't overlap
   - [ ] No content loss

5. **High Contrast Mode:**
   - [ ] Component visible in high contrast
   - [ ] Borders visible
   - [ ] Focus visible
```

**Accessibility Checklist:**
- [ ] Semantic HTML used
- [ ] ARIA attributes correct
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Focus management correct
- [ ] Color contrast sufficient
- [ ] Touch targets ≥ 44x44px
- [ ] Text resizable to 200%
- [ ] No keyboard traps
- [ ] Form labels associated
- [ ] Error messages clear
- [ ] Animations respect prefers-reduced-motion

### Dimension 6: RTL/LTR Testing

**Goal:** Perfect mirroring in RTL languages

**Test Setup:**
```html
<!-- Switch to RTL -->
<html dir="rtl" lang="ar">
```

**LTR Testing:**
```markdown
## LTR Test (English)

- [ ] Text aligns left
- [ ] Layout flows left-to-right
- [ ] Icons positioned left
- [ ] Margins/padding correct
- [ ] Navigation forward →
```

**RTL Testing:**
```markdown
## RTL Test (Arabic)

- [ ] Text aligns right
- [ ] Layout flows right-to-left  
- [ ] Layout mirrors correctly
- [ ] Icons positioned right
- [ ] Directional icons flip
- [ ] Margins/padding flip
- [ ] Navigation forward ←
- [ ] No layout breaking
- [ ] Scroll behavior correct
- [ ] Animations mirror
```

**Dynamic Switching:**
```javascript
// Test direction switching
function switchDirection() {
  const html = document.documentElement;
  html.dir = html.dir === 'rtl' ? 'ltr' : 'rtl';
}
```

**Checklist:**
- [ ] Uses logical properties
- [ ] Layout mirrors in RTL
- [ ] Text aligns correctly
- [ ] Directional icons flip
- [ ] Non-directional icons stay
- [ ] Margins/padding correct
- [ ] No hard-coded directions
- [ ] Dynamic switching works

### Dimension 7: Browser Compatibility

**Goal:** Works in all major browsers

**Test Browsers:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Chrome Android (latest)
- Safari iOS (latest)

**For Each Browser:**
```markdown
## Browser Test: [Browser Name]

### Rendering
- [ ] Component renders correctly
- [ ] Layout correct
- [ ] Colors correct
- [ ] Fonts load

### Functionality
- [ ] All features work
- [ ] Events fire correctly
- [ ] Animations smooth
- [ ] No console errors

### Performance
- [ ] Loads quickly
- [ ] Interactions responsive
- [ ] No lag or jank
```

**Compatibility Checklist:**
- [ ] Chrome/Edge ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Chrome Android ✓
- [ ] Safari iOS ✓
- [ ] No browser-specific issues
- [ ] Fallbacks work
- [ ] Polyfills loaded if needed

**Tools:**
- BrowserStack for cross-browser testing
- LambdaTest
- Local virtual machines

### Dimension 8: Performance Testing

**Goal:** Fast and efficient

**Lighthouse Performance:**
```bash
lighthouse http://localhost:3000/playground \
  --only-categories=performance \
  --view
```

**Performance Metrics:**
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TBT** (Total Blocking Time): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Manual Performance Testing:**

**1. Rendering Performance:**
```javascript
// Measure render time
const start = performance.now();
const component = new VfComponent(element);
const end = performance.now();
console.log(`Init time: ${end - start}ms`);
// Should be < 100ms
```

**2. Memory Leaks:**
```javascript
// Create and destroy multiple times
for (let i = 0; i < 100; i++) {
  const comp = new VfComponent(element);
  comp.destroy();
}
// Check memory in DevTools
// Memory should stabilize
```

**3. Event Listener Cleanup:**
```javascript
// Verify listeners removed
const listeners = getEventListeners(element);
component.destroy();
const afterListeners = getEventListeners(element);
// afterListeners should be empty
```

**Performance Checklist:**
- [ ] Initial render < 100ms
- [ ] No layout thrashing
- [ ] Animations smooth (60fps)
- [ ] No memory leaks
- [ ] Event listeners cleaned up
- [ ] Bundle size reasonable
- [ ] No unnecessary reflows
- [ ] Debouncing/throttling used
- [ ] Images optimized
- [ ] Code minifies well

### Dimension 9: Integration Testing

**Goal:** Works with other components and contexts

**Component Composition:**
```html
<!-- Test components together -->
<div class="vf-card">
  <div class="vf-card__content">
    <button class="vf-button">
      <span class="vf-button__label">Action</span>
    </button>
  </div>
</div>
```

**Checklist:**
- [ ] Styles don't conflict
- [ ] JavaScript doesn't interfere
- [ ] Events propagate correctly
- [ ] z-index layering correct
- [ ] Focus order logical
- [ ] Multiple instances work

**Context Testing:**
```markdown
## Integration Tests

### Different Containers
- [ ] Works in div
- [ ] Works in article
- [ ] Works in section
- [ ] Works in modal
- [ ] Works in sidebar

### Different Layouts
- [ ] Works in flexbox
- [ ] Works in grid
- [ ] Works in float layout
- [ ] Works with position: relative parent
- [ ] Works with position: fixed parent

### Dynamic Usage
- [ ] Can be added via JavaScript
- [ ] Can be removed cleanly
- [ ] Multiple instances work
- [ ] Re-initialization works
```

### Dimension 10: Documentation Validation

**Goal:** Complete and accurate documentation

**Documentation Checklist:**
- [ ] README.md exists
- [ ] Component description clear
- [ ] Usage examples provided
- [ ] All props documented
- [ ] All events documented
- [ ] All methods documented
- [ ] Code examples work
- [ ] Accessibility notes included
- [ ] Browser support documented
- [ ] Known issues documented
- [ ] JSDoc comments complete
- [ ] Examples in playground

**Test Documentation:**
1. Follow README instructions
2. Copy/paste code examples
3. Verify examples work
4. Check for typos/errors

## Validation Report

Create a comprehensive report:

```markdown
# Validation Report: [Component Name]

**Date:** [Date]
**Version:** [Version]
**Validator:** [Name]

## Summary
- Total Checks: [Number]
- Passed: [Number]
- Failed: [Number]
- Warnings: [Number]

## Results

### Code Quality: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Functionality: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Visual Accuracy: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Responsiveness: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Accessibility: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### RTL/LTR: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Browser Compatibility: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Performance: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Integration: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

### Documentation: ✅ PASS / ⚠️ WARNING / ❌ FAIL
[Details and notes]

## Issues Found
[List all issues with severity and status]

## Recommendations
[Any improvement suggestions]

## Conclusion
✅ Ready for production
⚠️ Ready with minor issues
❌ Needs significant work
```

## Quick Validation Checklist

Use this for rapid validation:

```markdown
## Quick Validation

- [ ] Code linted and formatted
- [ ] Tests passing (≥80% coverage)
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile
- [ ] Keyboard accessible
- [ ] Screen reader tested
- [ ] RTL works
- [ ] No console errors
- [ ] No memory leaks
- [ ] Documentation complete
- [ ] Matches design visually
- [ ] No accessibility issues
- [ ] Performance acceptable
```

## Tools Reference

### Automated Testing
- **html-validate:** HTML validation
- **stylelint:** CSS linting
- **ESLint:** JavaScript linting
- **Vitest/Jest:** Unit testing
- **axe-core:** Accessibility testing
- **Lighthouse:** Performance audit

### Manual Testing
- **Browser DevTools:** All-purpose
- **Screen Readers:** Accessibility
- **BrowserStack:** Cross-browser
- **Color Contrast Analyzer:** WCAG
- **Wave:** Accessibility evaluation

## Next Steps

After validation:
1. Fix critical issues
2. Document known issues
3. Create pull request
4. Request code review
5. Merge to main branch

## Related Resources

- Prompt: `.github/prompts/validate-component.prompt.md`
- Instructions: `.github/instructions/native-components.instructions.md`
- Previous Skill: `.github/skills/angular-to-native/`

---

This skill ensures every component meets the highest quality standards before release.
