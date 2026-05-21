# Carbonform Design System

Extracted from `carbonform-main-fe`. Reference for keeping the canvas app visually consistent with the main platform.

---

## Typography

**Font:** IBM Plex Sans Thai (Google Fonts)

```ts
IBM_Plex_Sans_Thai({ weight: ["400", "500", "600", "700"], subsets: ["thai", "latin"] })
```

Weight usage:
- `400` — body, labels
- `500` — table rows, menu items
- `600` — section headings
- `700` — card titles, node labels

---

## Color Palette

### Primary (Blue)
| Token | Hex | Usage |
|-------|-----|-------|
| `primary.10` | `#F3F8FD` | Page background tint |
| `primary.50` | `#E2F1FF` | Selected state background |
| `primary.100` | `#B9D3F9` | Hover state background |
| `primary.400` | `#3A7CDE` | Active accents |
| `primary.500` | `#2162C5` | **Main brand color** |
| `primary.600` | `#164C9A` | Dark accent, active borders |

> Canvas currently uses `#1a56db` for primary — closest is between `primary.400` and `primary.500`. Standardize to `primary.500` (`#2162C5`) or `primary.400` (`#3A7CDE`).

### Gray
| Token | Hex | Usage |
|-------|-----|-------|
| `gray.50` | `#F0F3F9` | Canvas background |
| `gray.100` | `#E2E7EE` | Dividers, borders |
| `gray.200` | `#D2D8DF` | Input borders |
| `gray.500` | `#647081` | Placeholder text |
| `gray.700` | `#373E4A` | Secondary text |
| `gray.800` | `#1E252F` | Heading text |

### Semantic
| Token | 500 Hex | Usage |
|-------|---------|-------|
| `error` | `#F04438` | Validation errors, destructive |
| `warning` | `#F79009` | Caution states |
| `success` | `#12B76A` | Confirmed/approved |

### Status Badge Colors
| Status | BG | Text |
|--------|----|------|
| New | `#F04438` | `#FFFFFF` |
| Checked | `#E1FCEF` | `#14804A` |
| Closed | `#FCF2E6` | `#AA5B00` |
| Rejected | `#E4E7EC` | `#475467` |
| Approved | `#E2F1FF` | `#3785FA` |
| Pending | `#FFF4E5` | `#B54708` |

---

## Shadows

```
xs  → 0px 1px 2px rgba(16,24,40,0.05)
sm  → 0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06)
md  → 0px 4px 8px -2px rgba(16,24,40,0.1), 0px 2px 4px -2px rgba(16,24,40,0.06)
lg  → 0px 12px 16px -4px rgba(16,24,40,0.1), 0px 4px 6px -2px rgba(16,24,40,0.05)
```

Cards use `sm`. Modals use `lg`.

---

## Spacing & Sizing

- Input height: `44px`
- Menu item height: `56px`
- Border radius — card: `8px`, pill badge: `full`, icon box: `8px`
- Border color default: `gray.200` (`#D2D8DF`)
- Border color active/focus: `primary.600` (`#164C9A`)

---

## Component Patterns

### Buttons
```tsx
// Primary
<Button bg="primary.500" color="white" _hover={{ bg: "primary.600" }} height="44px" />

// Outline
<Button variant="outline" bgColor="white" borderColor="gray.200" _hover={{ bgColor: "primary.100" }} />
```

### Dropdown / Select
- Trigger height `44px`, `fontWeight="400"`, `fontSize="1rem"`
- Selected item bg: `primary.50`, hover bg: `primary.100`
- Max list height `250px` with `overflow="scroll"`

### Node Cards (canvas-specific)
- Background: `white`
- Border: `1.5px solid` — default `#e2e8f0`, selected `primary.500`
- Border radius: `12px`
- Shadow: `sm`
- Icon box: `32px × 32px`, `bg="#eff6ff"`, `borderRadius="8px"`
- Label: `fontWeight="700"`, `fontSize="13px"`, `color="#111827"`
- Subtitle: `fontSize="10px"`, `color="#6b7280"`

---

## Assets (now in `public/`)

### Logos
- `public/carbonform-logo.svg` — main Carbonform wordmark
- `public/carbonmice-logo.svg` — Carbonmice variant
- `public/logo.png` — icon-only logo mark

### Icons (`public/icons/`)
All SVG. Key icons for canvas use:

| File | Use |
|------|-----|
| `layers.svg` | Lifecycle / stages |
| `plus-circle.svg` | Add node |
| `list.svg` | View list |
| `bar-chart.svg` | Emissions chart |
| `report.svg` | Report action |
| `tick.svg` | Completed state |
| `trash.svg` | Delete node |
| `arrow-up-right.svg` | Navigate out |
| `warning-icon.svg` | Alert state |

Usage in Next.js: `<Image src="/icons/layers.svg" alt="layers" width={20} height={20} />`

---

## Breakpoints

| Token | em | px equiv |
|-------|----|----------|
| `base` | 0em | 0 |
| `sm` | 30em | 480px |
| `md` | 48em | 768px |
| `lg` | 62em | 992px |
| `xl` | 90em | 1440px |

---

## Notes

- Main-fe uses **Chakra UI v2** (`extendTheme`). Canvas uses **Chakra UI v3** — API differs. Color tokens and shadow values are portable; component props may need adjustment.
- `primary.500` (`#2162C5`) is the true brand blue. Canvas nodes currently hardcode `#1a56db` — can migrate when needed.
