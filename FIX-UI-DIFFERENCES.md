# Fixing UI and Icon Differences

## Problem Summary

The migrated components have small UI and icon differences because:

1. **No icon assets extracted** - Using placeholder inline SVG
2. **Tailwind defaults approximated** - Couldn't verify against actual package
3. **Typography/spacing not measured** - Based on documentation, not actual Angular values

## Missing Information Found

See `.migration/missing-info.json` for complete details. Key items:

- Font size/weight/line-height scale (approximated from Tailwind docs)
- Spacing scale (approximated from Tailwind docs)
- Border radius values (approximated)
- Icon assets (not extracted)
- Shadow definitions incomplete
- Z-index scale incomplete

## Fix Strategy

### Step 1: Extract Icon Assets from Angular

**Find Angular Icons:**

```bash
# In the Angular repository
cd .temp/angular-ui-library/

# Find all icon files
find . -name "*.svg" -type f
find . -path "*/icons/*" -type f
find . -path "*/assets/*" -name "*.svg"

# Check for icon component
grep -r "icon" src/components/
grep -r "IconComponent" src/
```

**Copy to Native Library:**

```bash
# Create icons directory
mkdir -p src/assets/icons/

# Copy icon files (adjust path based on what you find)
cp .temp/angular-ui-library/src/assets/icons/*.svg src/assets/icons/
```

**Update Components to Use Real Icons:**

Replace placeholder SVG with actual icon references.

---

### Step 2: Verify Tailwind Values

**With Network Access:**

```bash
# Install Tailwind to verify defaults
npm install -D tailwindcss@4.1.12

# Extract actual theme values
npx tailwindcss --help theme
```

**Or Measure from Angular:**

```bash
# Run Angular app in dev mode
cd .temp/angular-ui-library/
npm install
npm start

# Open browser DevTools
# Inspect components and measure:
# - Computed font sizes
# - Computed padding/margins
# - Computed border radius
# - Computed shadows
```

---

### Step 3: Audit Actual Typography Usage

**Extract Real Values from Angular:**

```bash
cd .temp/angular-ui-library/

# Find all font-size usages
grep -r "text-sm\|text-base\|text-lg\|text-xl" src/components/
grep -r "font-size" src/styles/

# Find all font-weight usages
grep -r "font-medium\|font-semibold\|font-bold" src/components/
grep -r "font-weight" src/styles/

# Find all line-height usages
grep -r "leading-\|line-height" src/
```

**Measure Computed Values:**

1. Run Angular app
2. Inspect each component type (button, heading, body text, caption)
3. Copy computed CSS values from DevTools
4. Update `tokens/typography.css` with real values

---

### Step 4: Fix Spacing Scale

**Extract Real Spacing from Angular:**

```bash
# Find all padding usages
grep -r "px-\|py-\|p-\|pl-\|pr-\|pt-\|pb-" src/components/ | sort -u

# Find all margin usages
grep -r "mx-\|my-\|m-\|ml-\|mr-\|mt-\|mb-" src/components/ | sort -u

# Find all gap usages
grep -r "gap-\|space-x-\|space-y-" src/components/ | sort -u
```

**Create Accurate Scale:**

Based on actual usage, create the spacing tokens in `tokens/spacing.css`.

---

### Step 5: Update Border Radius

**From Angular Source:**

```bash
# Find all rounded classes
grep -r "rounded-\|border-radius" src/
```

**Measure Computed Values:**

Inspect Angular components and copy computed `border-radius` values.

---

### Step 6: Extract Complete Shadow System

**From Angular:**

```bash
# Find shadow usages
grep -r "shadow-\|box-shadow" src/
```

Update `tokens/shadows.css` with real values.

---

## Quick Fix Commands

### 1. Find and Copy Icons

```bash
# Run this in native-ui-library directory
cd .temp/angular-ui-library/

# Find icon location
find . -name "*.svg" | grep -i icon

# Example: if icons are in src/assets/icons/
cd ../../
cp -r .temp/angular-ui-library/src/assets/icons src/assets/

# Or if using icon font
cp .temp/angular-ui-library/src/assets/fonts/* src/assets/fonts/
```

### 2. Extract Computed CSS Values

```bash
# In Angular repo
cd .temp/angular-ui-library/
npm install
npm start

# Open http://localhost:4200
# Open DevTools
# For each component, copy:
# - Computed font-size
# - Computed padding
# - Computed border-radius
# - Computed box-shadow
# - Computed colors (if different)
```

### 3. Update Native Components

Once you have real values, update:

- `tokens/typography.css` - Real font sizes
- `tokens/spacing.css` - Real spacing values
- `tokens/borders.css` - Real border-radius values
- `tokens/shadows.css` - Real shadow values
- `src/components/*/` - Replace placeholder SVG with real icons

---

## Verification Checklist

After fixes, verify:

- [ ] Icons match Angular visually
- [ ] Font sizes match exactly
- [ ] Spacing (padding/margins) matches exactly
- [ ] Border radius matches exactly
- [ ] Shadows match exactly
- [ ] Colors match (already verified)
- [ ] Hover states match
- [ ] Focus states match

---

## Prevention for Future Components

To avoid this in future component migrations:

1. **Always extract assets first** - Icons, images, fonts
2. **Always measure computed values** - Don't rely on documentation
3. **Run Angular app** - Inspect with DevTools for accurate values
4. **Visual regression test** - Compare screenshots side-by-side
5. **Network access needed** - For npm packages and verification

---

## Contact

If you need help:
1. Check `.migration/missing-info.json` for details
2. Review `.migration/verification-log.json` for what was verified
3. See component CSS comments for source references

---

## Summary

The differences exist because:
- ❌ **Icons:** Not extracted (using placeholders)
- ❌ **Typography:** Approximated from docs (not measured)
- ❌ **Spacing:** Approximated from docs (not measured)
- ❌ **Borders:** Approximated from docs (not measured)
- ✅ **Colors:** Extracted correctly (verified)

**Next Steps:**
1. Extract icon assets from Angular
2. Run Angular app and measure computed values
3. Update tokens with real values
4. Replace placeholder icons
5. Visual regression test
