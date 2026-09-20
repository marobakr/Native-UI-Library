# Design Tokens - Extraction Guide

## ⚠️ Current Status: PLACEHOLDERS ONLY

**The token files in `tokens/` are currently empty placeholders.**

All token values must be extracted from the Angular UI Library:
- **Repository:**https://git.vf-eg.internal.vodafone.com/WEB/vf-dynamic-catalog-components/-/tree/master
- **Location:** `projects/ui/src/lib/foundations/` or theme configuration files

## Why Tokens Are Empty

We do NOT assume or invent Vodafone design values.

The Angular UI Library is the **source of truth** for:
- ✅ Vodafone brand colors (reds, grays, etc.)
- ✅ Typography scale (font families, sizes, weights)
- ✅ Spacing system (4px, 8px, 16px, etc.)
- ✅ Border radii (small, medium, large)
- ✅ Shadows (elevation levels)
- ✅ Animation durations and easing functions

## Token Files Structure

```
tokens/
├── theme.css          # Imports all token files
├── colors.css         # Brand and semantic colors
├── typography.css     # Font families, sizes, weights, line heights
├── spacing.css        # Spacing scale for margin, padding, gap
├── borders.css        # Border widths and radii
├── shadows.css        # Box shadow definitions
└── transitions.css    # Animation durations and easings
```

## How to Extract Tokens

### Method 1: Manual Extraction (Current)

**Step 1: Locate Token Files in Angular Repository**

Visit:https://git.vf-eg.internal.vodafone.com/WEB/vf-dynamic-catalog-components/-/tree/master

Look for token definitions in:
- `projects/ui/src/lib/foundations/`
- `projects/ui/styles/theme.css`
- `projects/ui/styles/_variables.scss`
- `tailwind.config.js`
- `angular.json` (theme configuration)

**Step 2: Extract Color Values**

Find color definitions like:
```scss
// SCSS variables
$color-primary: #e60000;
$color-secondary: #333333;
```

Or Tailwind config:
```javascript
colors: {
  primary: '#e60000',
  secondary: '#333333',
}
```

Convert to CSS custom properties in `tokens/colors.css`:
```css
:root {
  --vf-color-primary: #e60000;
  --vf-color-secondary: #333333;
}
```

**Step 3: Extract Typography**

Find typography values:
```scss
$font-family-base: 'Vodafone', sans-serif;
$font-size-base: 16px;
$font-weight-regular: 400;
```

Convert to `tokens/typography.css`:
```css
:root {
  --vf-font-family-base: 'Vodafone', sans-serif;
  --vf-font-size-base: 1rem; /* 16px */
  --vf-font-weight-regular: 400;
}
```

**Step 4: Extract Spacing**

Find spacing scale:
```scss
$space-xs: 4px;
$space-sm: 8px;
$space-md: 16px;
```

Convert to `tokens/spacing.css`:
```css
:root {
  --vf-space-xs: 0.25rem; /* 4px */
  --vf-space-sm: 0.5rem;  /* 8px */
  --vf-space-md: 1rem;    /* 16px */
}
```

**Step 5: Repeat for All Token Categories**

- Borders → `tokens/borders.css`
- Shadows → `tokens/shadows.css`
- Transitions → `tokens/transitions.css`

### Method 2: Using GitHub Copilot (Recommended)

**Ask Copilot to extract tokens:**

```
@native-ui-engineer extract design tokens from the Angular library at
https://github.com/Mohamed-Adel-Web/vf-UI-components.git

Please fetch the theme files and populate:
- tokens/colors.css
- tokens/typography.css
- tokens/spacing.css
- tokens/borders.css
- tokens/shadows.css
- tokens/transitions.css
```

Copilot will:
1. Read the Angular repository theme files
2. Extract all token values
3. Convert to CSS custom properties
4. Update the token files

### Method 3: Automated Script (Future)

```bash
npm run tokens:extract
```

This script is planned but not yet implemented. It will:
- Fetch theme files from Angular repository
- Parse SCSS variables or Tailwind config
- Generate CSS custom properties
- Write to token files

## Token Naming Convention

We use the `--vf-` prefix for all Vodafone tokens:

```css
/* ✅ Correct */
--vf-color-primary
--vf-space-md
--vf-font-size-base

/* ❌ Wrong */
--primary-color
--spacing-medium
--base-font-size
```

## Token Categories

### Colors

**Brand Colors:**
- Primary (Vodafone red)
- Secondary
- Tertiary

**Semantic Colors:**
- Success (green)
- Warning (yellow/orange)
- Error (red)
- Info (blue)

**Text Colors:**
- Primary text
- Secondary text
- Disabled text
- Inverse text

**Surface Colors:**
- Background
- Surface
- Elevated surface

### Typography

**Font Families:**
- Base (body text)
- Headings
- Monospace (code)

**Font Sizes:**
- xs, sm, base, md, lg, xl, 2xl, 3xl, 4xl

**Font Weights:**
- light (300)
- regular/normal (400)
- medium (500)
- semibold (600)
- bold (700)

**Line Heights:**
- tight (1.25)
- base (1.5)
- relaxed (1.75)
- loose (2)

### Spacing

**Scale:**
- xs (4px)
- sm (8px)
- md (16px)
- lg (24px)
- xl (32px)
- 2xl, 3xl, 4xl, 5xl...

### Borders

**Widths:**
- thin (1px)
- base (2px)
- thick (4px)

**Radii:**
- none (0)
- sm (4px)
- md (8px)
- lg (12px)
- xl (16px)
- full (9999px)

### Shadows

**Elevation Levels:**
- none
- sm (subtle)
- md (moderate)
- lg (pronounced)
- xl (dramatic)

**Special:**
- inner (inset shadow)
- focus (focus ring)

### Transitions

**Durations:**
- fast (150ms)
- base (200ms)
- slow (300ms)
- slower (500ms)

**Easings:**
- linear
- ease
- ease-in
- ease-out
- ease-in-out
- Custom cubic-bezier curves

## Validation

After extracting tokens, validate by:

1. **Visual Comparison:**
   - Run Angular Storybook
   - Run native playground
   - Compare colors, spacing, typography side-by-side

2. **Token Usage:**
   - Build a simple component using tokens
   - Verify it matches Angular component styling

3. **Documentation:**
   - Document any tokens not found in Angular library
   - Note any assumptions made

## Example: Complete Color Extraction

**From Angular (example):**
```scss
// projects/ui/styles/_variables.scss
$vf-red: #e60000;
$vf-gray-900: #1a1a1a;
$vf-gray-600: #666666;
$vf-success: #00a550;
$vf-warning: #ffb300;
$vf-error: #cc0000;
```

**To Native:**
```css
/* tokens/colors.css */
:root {
  /* Brand Colors - Extracted from Angular */
  --vf-color-primary: #e60000;
  --vf-color-text-primary: #1a1a1a;
  --vf-color-text-secondary: #666666;
  
  /* Semantic Colors - Extracted from Angular */
  --vf-color-success: #00a550;
  --vf-color-warning: #ffb300;
  --vf-color-error: #cc0000;
}
```

## Placeholder Notice

Until tokens are extracted, component development should:

1. **Reference token variables** in CSS:
   ```css
   .vf-button {
     background: var(--vf-color-primary);
     padding: var(--vf-space-md);
   }
   ```

2. **Not hard-code values** in components:
   ```css
   /* ❌ Don't do this */
   .vf-button {
     background: #e60000;
     padding: 16px;
   }
   ```

3. **Know that tokens will be populated** during discovery phase

## Next Steps

1. **Run component discovery:**
   ```bash
   npm run discover
   ```

2. **Analyze Angular library for tokens:**
   ```
   @native-ui-engineer analyze the foundations directory for design tokens
   ```

3. **Extract and populate token files**

4. **Validate tokens match Angular library**

5. **Begin component development with real tokens**

---

**Current Status:** ⚠️ Tokens are placeholders  
**Next Action:** Extract actual values from Angular library  
**Source:**https://git.vf-eg.internal.vodafone.com/WEB/vf-dynamic-catalog-components/-/tree/master
