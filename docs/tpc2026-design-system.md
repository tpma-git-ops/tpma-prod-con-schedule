# TPC2026 Conference Schedule App - Design System

A lightweight design system for the Toronto Product Con 2026 schedule app. All tokens derive from the TPMA Brand Style Guide (v2, 2025/26).

---

## Colors

### Core Palette

| Token                | Hex       | Usage                                          |
|----------------------|-----------|-------------------------------------------------|
| `--color-blue`       | `#5A5BF5` | Primary actions, links, active states, tab indicators |
| `--color-dark`       | `#29303E` | App header, nav bar, section backgrounds        |
| `--color-white`      | `#FFFFFF` | Page backgrounds, card surfaces, body text on dark |
| `--color-black`      | `#262626` | Headlines, body text, icons on light backgrounds |

### Accents

| Token                | Hex       | Usage                                          |
|----------------------|-----------|-------------------------------------------------|
| `--color-gold`       | `#FFCF60` | Badges (e.g. "Keynote"), highlights, star/favorite icons |
| `--color-coral`      | `#FF6B60` | Alerts, "Happening Now" indicator, capacity warnings |

### Neutrals (extended for UI)

| Token                | Hex       | Usage                                          |
|----------------------|-----------|-------------------------------------------------|
| `--color-gray-100`   | `#F5F6F8` | Screen background, divider fills               |
| `--color-gray-200`   | `#E8EAF0` | Card borders, input borders                    |
| `--color-gray-400`   | `#9CA3B0` | Secondary text, timestamps, meta labels        |
| `--color-gray-600`   | `#5A6170` | Subheadings, supporting copy                   |

### Semantic

| Token                  | Value              | Usage                           |
|------------------------|--------------------|----------------------------------|
| `--color-success`      | `#2ECC71`          | Confirmed, available             |
| `--color-warning`      | `--color-gold`     | Limited seats, starting soon     |
| `--color-error`        | `--color-coral`    | Full, cancelled, conflict        |
| `--color-info`         | `--color-blue`     | General informational states     |

---

## Typography

**Font Family:** Poppins (Google Fonts)

```
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Scale

| Level      | Size   | Weight    | Line Height | Use Case                          |
|------------|--------|-----------|-------------|-----------------------------------|
| Display    | 28px   | 700 (Bold)| 1.2         | Conference title, hero text       |
| H1         | 22px   | 700       | 1.3         | Day headers ("Day 1 - May 28")   |
| H2         | 18px   | 600       | 1.3         | Track names, time block headers   |
| H3         | 16px   | 600       | 1.4         | Session titles in cards           |
| Body       | 14px   | 400       | 1.5         | Session descriptions, speaker bio |
| Caption    | 12px   | 400       | 1.4         | Timestamps, room labels, tags    |
| Overline   | 11px   | 500       | 1.3         | Category labels, uppercase tags   |

---

## Spacing

Base unit: **4px**

| Token   | Value | Common Use                        |
|---------|-------|-----------------------------------|
| `xs`    | 4px   | Inline icon gaps, tag padding     |
| `sm`    | 8px   | Inner card padding, chip gaps     |
| `md`    | 16px  | Card padding, section spacing     |
| `lg`    | 24px  | Between card groups, section gaps  |
| `xl`    | 32px  | Page-level vertical rhythm        |
| `2xl`   | 48px  | Major section breaks              |

---

## Border Radius

| Token          | Value | Use Case                   |
|----------------|-------|----------------------------|
| `--radius-sm`  | 4px   | Chips, tags, small badges   |
| `--radius-md`  | 8px   | Cards, inputs, buttons      |
| `--radius-lg`  | 12px  | Modal sheets, bottom sheets |
| `--radius-full`| 9999px| Avatars, dot indicators     |

---

## Shadows

| Token            | Value                                  | Use Case            |
|------------------|----------------------------------------|----------------------|
| `--shadow-card`  | `0 1px 3px rgba(41, 48, 62, 0.08)`    | Session cards        |
| `--shadow-raised`| `0 4px 12px rgba(41, 48, 62, 0.12)`   | Modals, popovers     |
| `--shadow-nav`   | `0 -1px 4px rgba(41, 48, 62, 0.06)`   | Bottom nav bar       |

---

## Components

### Session Card

```
┌─────────────────────────────────────┐
│ [Room · Type]            [★ Saved]  │
│                                     │
│ Session Title (H3, Bold)            │  ← --color-black
│ Speaker Name · Company              │  ← --color-gray-400, Caption
│                                     │
│ Description / expanded details      │
│                        [★ Bookmark] │  ← --color-gold when saved
└─────────────────────────────────────┘
  radius: --radius-md
  padding: --md
  shadow: --shadow-card
  border-left: 3px solid (room color)
  top accent: 2px solid --color-gold when saved
```

### Room Color Coding

| Room         | Dot / Left Accent | Surface Tint |
|--------------|-------------------|--------------|
| Auditorium   | `--color-blue`    | Indigo 50    |
| Room 2       | `--color-coral`   | Red 50       |
| Room 3       | `--color-gold`    | Amber 50     |
| Room 4       | `#10B981`         | Emerald 50   |
| Lunch Room   | `--color-dark`    | Slate 50     |

- Session type is secondary metadata, not the primary card accent.
- Keynote uses a filled gold badge in the meta row plus larger title treatment, while still inheriting the room accent.

### Time Block Divider

```
── 10:00 AM ────────────────────────
```
- Horizontal rule: 1px `--color-gray-200`
- Time label: Overline style, `--color-gray-400`

### Bottom Navigation

```
┌──────┬──────┬──────┬──────┐
│ 📋   │ 🗺   │ ⭐   │ ℹ️   │
│Sched │ Map  │ Saved│ Info │
└──────┴──────┴──────┴──────┘
  bg: --color-white
  shadow: --shadow-nav
  active icon: --color-blue
  inactive icon: --color-gray-400
```

### "Happening Now" Badge

```
bg: --color-coral (10% opacity)
text: --color-coral
border: 1px solid --color-coral (20% opacity)
radius: --radius-sm
font: Overline, uppercase
```

---

## Accessibility

- Minimum contrast ratio: **4.5:1** for body text, **3:1** for large text (WCAG AA)
- Safe pairings: `--color-blue` on `--color-white`, `--color-white` on `--color-dark`
- Touch targets: minimum **44x44px**
- Focus states: 2px `--color-blue` outline with 2px offset
- Reduced motion: respect `prefers-reduced-motion` for transitions

---

## CSS Custom Properties (Copy-Paste Starter)

```css
:root {
  /* Core */
  --color-blue: #5A5BF5;
  --color-dark: #29303E;
  --color-white: #FFFFFF;
  --color-black: #262626;

  /* Accents */
  --color-gold: #FFCF60;
  --color-coral: #FF6B60;

  /* Neutrals */
  --color-gray-100: #F5F6F8;
  --color-gray-200: #E8EAF0;
  --color-gray-400: #9CA3B0;
  --color-gray-600: #5A6170;

  /* Typography */
  --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(41, 48, 62, 0.08);
  --shadow-raised: 0 4px 12px rgba(41, 48, 62, 0.12);
  --shadow-nav: 0 -1px 4px rgba(41, 48, 62, 0.06);
}
```
