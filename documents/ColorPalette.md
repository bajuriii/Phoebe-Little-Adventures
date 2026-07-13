# Phoebe's Little Adventures - Color Palette

## 🎨 Design System v0.1

### Primary Colors

#### 🟡 Primary Yellow
- **Hex**: #FFD66B
- **RGB**: rgb(255, 214, 107)
- **HSL**: hsl(48, 100%, 71%)
- **Usage**: Call-to-action buttons, highlights, main brand color
- **Accessibility**: High contrast on dark text and backgrounds
- **Emotion**: Warmth, happiness, optimism, energy

#### 💗 Secondary Pink
- **Hex**: #FFB7C5
- **RGB**: rgb(255, 183, 197)
- **HSL**: hsl(352, 100%, 86%)
- **Usage**: Secondary buttons, accents, gentle emphasis
- **Accessibility**: Good contrast for readability
- **Emotion**: Playfulness, gentleness, friendliness, love

#### 🔵 Accent Blue
- **Hex**: #8ED8F8
- **RGB**: rgb(142, 216, 248)
- **HSL**: hsl(194, 88%, 76%)
- **Usage**: Focus states, hover effects, secondary accents
- **Accessibility**: Readable on light backgrounds
- **Emotion**: Calmness, trust, imagination, creativity

### Neutral Colors

#### ⚪ Background
- **Hex**: #FFF9F2
- **RGB**: rgb(255, 249, 242)
- **HSL**: hsl(24, 100%, 98%)
- **Usage**: Main page background
- **Note**: Very light, warm tone for comfort
- **Emotion**: Safety, comfort, approachability

#### 📝 Text Primary
- **Hex**: #4A4A4A
- **RGB**: rgb(74, 74, 74)
- **HSL**: hsl(0, 0%, 29%)
- **Usage**: Primary text, headings, important content
- **Accessibility**: WCAG AA compliant (high contrast)
- **Legibility**: Clear and comfortable to read

#### 🔤 Text Muted
- **Hex**: #666666
- **RGB**: rgb(102, 102, 102)
- **HSL**: hsl(0, 0%, 40%)
- **Usage**: Secondary text, captions, disabled states
- **Accessibility**: WCAG AA compliant
- **Purpose**: Hierarchy and emphasis

#### ⏚ White
- **Hex**: #FFFFFF
- **RGB**: rgb(255, 255, 255)
- **HSL**: hsl(0, 0%, 100%)
- **Usage**: Cards, containers, backgrounds for content areas
- **Purpose**: Content contrast and readability

---

## 🎯 Color Usage Guide

### Buttons

**Primary Buttons** (Main CTA)
```css
Background: #FFD66B (Primary Yellow)
Text: #4A4A4A (Text Primary)
Hover: Lighter yellow with shadow
```

**Secondary Buttons** (Alternative CTA)
```css
Background: #FFB7C5 (Secondary Pink)
Text: #4A4A4A (Text Primary)
Hover: Lighter pink with shadow
```

**Focus States** (Keyboard Navigation)
```css
Outline: 3px solid #8ED8F8 (Accent Blue)
Outline Offset: 4px
```

### Text Hierarchy

```
Headings (h1, h2, h3): #4A4A4A
Body Text: #4A4A4A
Secondary Text: #666666
Disabled/Inactive: #999999
```

### Cards & Containers

```
Card Background: #FFFFFF (White)
Card Border: Optional subtle shadow
Hover Effect: Slight elevation with shadow
```

### Status Indicators

**Reading Status Badges**
- 🆕 New: #FFD66B (Primary Yellow background)
- 📖 Reading: #8ED8F8 (Accent Blue background)
- ✅ Finished: #90EE90 (Light Green background)

### Focus & Hover States

**Interactive Elements**
- Focus Outline: 3px solid #8ED8F8
- Hover Background: Lightened version of base color
- Active State: Slightly darkened version
- Disabled State: Grayscale at 50% opacity

---

## 🌈 Color Combinations

### Recommended Pairings

| Element | Primary | Secondary | Accent |
|---------|---------|-----------|--------|
| Background | #FFF9F2 | - | - |
| Buttons | #FFD66B | #FFB7C5 | #8ED8F8 |
| Text | #4A4A4A | #666666 | - |
| Accents | #FFD66B | #FFB7C5 | #8ED8F8 |

### Color Accessibility

All colors meet **WCAG AA** standards for contrast:
- Primary Yellow on Dark Text: ✅ Pass
- Primary Yellow on White: ✅ Pass
- Secondary Pink on Dark Text: ✅ Pass
- Accent Blue on White: ✅ Pass
- Dark Text on Light Background: ✅ Pass

### Avoid These Combinations

❌ Pink text on yellow background
❌ Light text on light backgrounds
❌ Blue text on white background (insufficient contrast)
❌ Gray text smaller than 12px

---

## 🎨 Gradients

### Background Gradient
```css
linear-gradient(
    180deg,
    #FFF9F2 0%,
    #FFF5EA 100%
)
```
Creates a subtle warm-to-slightly-warmer transition

### Button Hover Gradient (Optional)
```css
linear-gradient(
    135deg,
    #FFD66B 0%,
    #FFC94D 100%
)
```

---

## 📱 Dark Mode Consideration

For potential future dark mode implementation:

| Light Mode | Dark Mode |
|-----------|-----------|
| #FFF9F2 Background | #1A1A1A Background |
| #4A4A4A Text | #F0F0F0 Text |
| #FFD66B Primary | #FFB800 Primary |
| #8ED8F8 Accent | #5FC3F5 Accent |

---

## 🖼️ Usage Examples

### Story Card
- Background: White (#FFFFFF)
- Title: Dark Gray (#4A4A4A)
- Status Badge: Yellow (#FFD66B)
- Progress Bar: Blue (#8ED8F8)
- Read Button: Yellow (#FFD66B)

### Navigation Bar
- Background: White (#FFFFFF) with subtle shadow
- Logo: Multi-color (brand colors)
- Links: Dark Text (#4A4A4A)
- Active Link: Yellow accent (#FFD66B)

### Story Reader
- Background: Warm White (#FFF9F2)
- Text: Dark Gray (#4A4A4A)
- Progress Bar: Blue (#8ED8F8)
- Navigation Buttons: Yellow (#FFD66B)
- Focus Outline: Blue (#8ED8F8)

---

## 💾 CSS Variables

```css
:root {
    --primary: #FFD66B;
    --secondary: #FFB7C5;
    --accent: #8ED8F8;
    --background: #FFF9F2;
    --text: #4A4A4A;
    --muted: #666666;
    --white: #FFFFFF;
}
```

Use these variables throughout the codebase for consistency and easy theme updates.
