# Prompt: Validate Native Component

## Context
You are validating a converted native component to ensure it meets all quality standards before considering it complete.

## Objective
Thoroughly test and validate the component across functionality, accessibility, performance, and compatibility dimensions.

## Input Required
- Component name: `[COMPONENT_NAME]`
- Component location: `src/components/[component-name]/`

## Validation Checklist

### 1. Code Quality

```markdown
## Code Quality Review

### HTML
- [ ] Uses semantic HTML5 elements
- [ ] Structure is explicit (not JS-generated)
- [ ] Valid HTML (no errors in validator)
- [ ] Proper element nesting
- [ ] Meaningful class names (BEM)
- [ ] No inline styles
- [ ] Appropriate ARIA attributes
- [ ] Proper attribute values

### CSS
- [ ] Uses CSS custom properties (design tokens)
- [ ] No hard-coded values (colors, sizes, etc.)
- [ ] Uses logical properties for RTL
- [ ] Mobile-first responsive design
- [ ] All states styled (hover, focus, active, disabled)
- [ ] Transitions and animations smooth
- [ ] Reduced motion support
- [ ] No !important unless necessary
- [ ] BEM naming convention
- [ ] Organized and commented

### JavaScript
- [ ] ES6+ modern syntax
- [ ] Clear function names
- [ ] Proper JSDoc comments
- [ ] No console.logs
- [ ] No unused variables
- [ ] Proper error handling
- [ ] Event listeners cleaned up
- [ ] No memory leaks
- [ ] Defensive programming (null checks)
- [ ] Custom events properly dispatched
```

### 2. Functionality Testing

```markdown
## Functionality Tests

### Core Behavior
Test each piece of functionality:

#### [Function 1]
- [ ] Works as expected
- [ ] Edge cases handled
- [ ] Error states handled
- [ ] Returns correct values

#### [Function 2]
- [ ] Works as expected
- [ ] Edge cases handled

### State Management
- [ ] Initial state correct
- [ ] State updates correctly
- [ ] State changes reflect in UI
- [ ] No state bugs

### Events
- [ ] All events dispatch correctly
- [ ] Event payloads contain correct data
- [ ] Events bubble appropriately
- [ ] Event listeners don't leak

### Props/Options
- [ ] Default values work
- [ ] Custom values work
- [ ] Invalid values handled gracefully
- [ ] Dynamic updates work

### Public API
Test each public method:
- [ ] Method 1 works correctly
- [ ] Method 2 works correctly
- [ ] Methods handle errors gracefully
- [ ] Methods return expected types
```

### 3. Visual Testing

```markdown
## Visual Testing

### Variants
Test each variant:
- [ ] Primary variant looks correct
- [ ] Secondary variant looks correct
- [ ] [Other variants] look correct

### Sizes
- [ ] Small size correct
- [ ] Medium size correct
- [ ] Large size correct

### States
- [ ] Default state correct
- [ ] Hover state correct
- [ ] Focus state correct
- [ ] Active state correct
- [ ] Disabled state correct
- [ ] Loading state correct (if applicable)
- [ ] Error state correct (if applicable)

### Spacing
- [ ] Padding correct
- [ ] Margin correct
- [ ] Gap correct
- [ ] Consistent with design tokens

### Typography
- [ ] Font family correct
- [ ] Font size correct
- [ ] Font weight correct
- [ ] Line height correct
- [ ] Text color correct

### Colors
- [ ] Background colors correct
- [ ] Text colors correct
- [ ] Border colors correct
- [ ] Color contrast sufficient (WCAG AA)

### Borders & Shadows
- [ ] Border radius correct
- [ ] Border width correct
- [ ] Box shadow correct

### Animations
- [ ] Transitions smooth
- [ ] Animation timing correct
- [ ] No jarring movements
```

### 4. Responsive Testing

Test at multiple viewport sizes:

```markdown
## Responsive Testing

### Mobile (320px - 767px)
- [ ] Layout correct
- [ ] Typography readable
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scroll
- [ ] All features accessible

### Tablet (768px - 1023px)
- [ ] Layout adapts correctly
- [ ] Spacing appropriate
- [ ] Content readable

### Desktop (1024px+)
- [ ] Layout optimal
- [ ] Spacing correct
- [ ] Hover states work

### Edge Cases
- [ ] Very small screens (320px)
- [ ] Very large screens (1920px+)
- [ ] Landscape orientation
- [ ] Portrait orientation
```

### 5. Accessibility Testing

```markdown
## Accessibility Testing

### Semantic HTML
- [ ] Proper element types used
- [ ] Heading hierarchy correct
- [ ] Landmarks used appropriately
- [ ] Form controls labeled correctly

### ARIA
- [ ] Roles appropriate
- [ ] States correct (aria-expanded, aria-pressed, etc.)
- [ ] Properties correct (aria-label, aria-describedby, etc.)
- [ ] Live regions work correctly
- [ ] No redundant ARIA (don't add role="button" to <button>)

### Keyboard Navigation
Test keyboard accessibility:
- [ ] Tab - moves focus correctly
- [ ] Shift+Tab - reverse focus order
- [ ] Enter - activates correctly
- [ ] Space - activates correctly (where appropriate)
- [ ] Escape - closes/cancels correctly
- [ ] Arrow keys - navigate options (if applicable)
- [ ] Home/End - jump to start/end (if applicable)
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Skip links work (if applicable)

### Focus Management
- [ ] Focus visible (outline/ring)
- [ ] Focus states styled
- [ ] Focus trap works (modals, etc.)
- [ ] Focus restoration works
- [ ] Initial focus correct
- [ ] Focus not lost unexpectedly

### Screen Reader Testing
Test with screen readers (NVDA, JAWS, VoiceOver):
- [ ] Component announced correctly
- [ ] Purpose clear from announcement
- [ ] State changes announced
- [ ] Instructions clear
- [ ] Error messages read
- [ ] Success messages read
- [ ] Dynamic content updates announced
- [ ] No duplicate announcements

### Color & Contrast
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] Large text contrast ≥ 3:1 (WCAG AA)
- [ ] UI component contrast ≥ 3:1
- [ ] Focus indicator contrast ≥ 3:1
- [ ] Information not conveyed by color alone
- [ ] Visible in high contrast mode

### Motion
- [ ] Respects prefers-reduced-motion
- [ ] No auto-playing animations
- [ ] Animations can be paused
```

### 6. RTL/LTR Testing

```markdown
## RTL/LTR Testing

### LTR (Left-to-Right)
- [ ] Text aligns left
- [ ] Layout flows left-to-right
- [ ] Icons positioned correctly

### RTL (Right-to-Left)
- [ ] Text aligns right
- [ ] Layout mirrors correctly
- [ ] Margins/padding flip
- [ ] Directional icons flip
- [ ] Logical properties work
- [ ] No layout breaking

### Dynamic Switching
- [ ] Switches between LTR/RTL correctly
- [ ] No visual glitches during switch
- [ ] State preserved
```

### 7. Browser Compatibility

Test in multiple browsers:

```markdown
## Browser Testing

### Chrome/Edge (Chromium)
- [ ] Renders correctly
- [ ] All features work
- [ ] No console errors
- [ ] Performance good

### Firefox
- [ ] Renders correctly
- [ ] All features work
- [ ] No console errors
- [ ] Performance good

### Safari
- [ ] Renders correctly
- [ ] All features work
- [ ] No console errors
- [ ] Performance good

### Mobile Browsers
- [ ] iOS Safari works
- [ ] Chrome Android works
- [ ] Touch events work
- [ ] Responsive design works

### Issues Found
Document any browser-specific issues:
- Browser: [issue description and workaround]
```

### 8. Performance Testing

```markdown
## Performance Testing

### Rendering Performance
- [ ] Initial render fast (< 100ms)
- [ ] No layout thrashing
- [ ] Repaints minimized
- [ ] Reflows minimized

### JavaScript Performance
- [ ] Event handlers efficient
- [ ] No performance bottlenecks
- [ ] Debouncing/throttling used where needed
- [ ] No unnecessary re-renders

### Memory
- [ ] No memory leaks
- [ ] Event listeners cleaned up
- [ ] References cleared on destroy
- [ ] Memory usage reasonable

### Bundle Size
- [ ] Component size reasonable
- [ ] No unnecessary dependencies
- [ ] Code can be tree-shaken
- [ ] Minifies well

### Metrics
Measure and document:
- Bundle size: [KB]
- Gzipped size: [KB]
- Initial render time: [ms]
- Time to interactive: [ms]
```

### 9. Integration Testing

```markdown
## Integration Testing

### With Other Components
- [ ] Works alongside other components
- [ ] Styles don't conflict
- [ ] JavaScript doesn't interfere
- [ ] Events propagate correctly

### In Different Contexts
- [ ] Works in different containers
- [ ] Works with different parent styles
- [ ] Works in flexbox layouts
- [ ] Works in grid layouts

### Dynamic Usage
- [ ] Can be added dynamically
- [ ] Can be removed dynamically
- [ ] Multiple instances work
- [ ] Cleanup works correctly
```

### 10. Documentation Validation

```markdown
## Documentation Review

- [ ] README complete and accurate
- [ ] Usage examples work
- [ ] All props documented
- [ ] All events documented
- [ ] All methods documented
- [ ] Accessibility notes included
- [ ] Browser support documented
- [ ] Known issues documented
- [ ] Code comments clear
- [ ] JSDoc complete
```

### 11. Test Suite Validation

```markdown
## Test Suite Review

### Coverage
- [ ] All functionality tested
- [ ] Edge cases covered
- [ ] Error cases tested
- [ ] Accessibility tested
- [ ] Integration scenarios tested

### Test Quality
- [ ] Tests are clear
- [ ] Tests are maintainable
- [ ] Tests don't test implementation details
- [ ] Tests document expected behavior
- [ ] Mocks used appropriately

### Test Results
- [ ] All tests passing
- [ ] No skipped tests
- [ ] Coverage ≥ 80%
- [ ] No flaky tests
```

## Automated Testing Tools

Use these tools for validation:

```bash
# Run unit tests
npm test

# Check coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Build component
npm run build

# Validate HTML
# Use W3C Validator or html-validate

# Check accessibility
# Use axe-core, lighthouse, or pa11y

# Check performance
# Use Lighthouse
```

## Manual Testing Script

Follow this testing script:

```markdown
## Manual Testing Steps

1. **Visual Inspection**
   - Open playground in browser
   - Verify component renders correctly
   - Check all variants
   - Check all sizes
   - Check all states

2. **Interaction Testing**
   - Click component
   - Type in component (if applicable)
   - Verify interactions work
   - Check event handlers

3. **Keyboard Testing**
   - Tab to component
   - Use Enter/Space
   - Use Arrow keys
   - Use Escape
   - Verify all keyboard interactions

4. **Screen Reader Testing**
   - Enable screen reader
   - Navigate to component
   - Interact with component
   - Verify announcements

5. **Responsive Testing**
   - Resize browser window
   - Test on mobile device
   - Test on tablet
   - Verify responsive behavior

6. **Browser Testing**
   - Test in Chrome
   - Test in Firefox
   - Test in Safari
   - Test in Edge

7. **RTL Testing**
   - Add dir="rtl" to HTML element
   - Verify layout mirrors
   - Verify text aligns right
```

## Issue Tracking

Document any issues found:

```markdown
## Issues Found

### Issue 1: [Title]
- **Severity**: Critical / High / Medium / Low
- **Description**: [Detailed description]
- **Steps to Reproduce**:
  1. Step 1
  2. Step 2
- **Expected**: [Expected behavior]
- **Actual**: [Actual behavior]
- **Browser**: [Browser/version]
- **Fix**: [How to fix]

[Repeat for each issue]
```

## Validation Report

Create a validation report:

```markdown
# Validation Report: [Component Name]

**Date**: [Date]
**Component Version**: [Version]
**Validated By**: [Name]

## Summary
- Total Tests: [Number]
- Passed: [Number]
- Failed: [Number]
- Issues Found: [Number]

## Results

### Code Quality: ✅ PASS / ❌ FAIL
[Notes]

### Functionality: ✅ PASS / ❌ FAIL
[Notes]

### Visual: ✅ PASS / ❌ FAIL
[Notes]

### Responsive: ✅ PASS / ❌ FAIL
[Notes]

### Accessibility: ✅ PASS / ❌ FAIL
[Notes]

### RTL/LTR: ✅ PASS / ❌ FAIL
[Notes]

### Browser Compatibility: ✅ PASS / ❌ FAIL
[Notes]

### Performance: ✅ PASS / ❌ FAIL
[Notes]

### Integration: ✅ PASS / ❌ FAIL
[Notes]

### Documentation: ✅ PASS / ❌ FAIL
[Notes]

### Tests: ✅ PASS / ❌ FAIL
[Notes]

## Issues
[List all issues]

## Recommendations
[Any recommendations for improvement]

## Conclusion
✅ Component ready for production
⚠️ Component ready with minor issues
❌ Component needs work
```

## Next Steps

### If Component Passes
- [ ] Create pull request
- [ ] Request code review
- [ ] Update CHANGELOG
- [ ] Tag version
- [ ] Deploy to production

### If Component Fails
- [ ] Fix critical issues
- [ ] Re-test
- [ ] Document known issues
- [ ] Plan future improvements

---

Use this prompt to ensure components meet all quality standards before release.
