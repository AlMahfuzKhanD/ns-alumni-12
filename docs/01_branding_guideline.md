# Alumni Association of NS - 12
## 01 — Branding Guideline & UI Design System

---

# 1. Purpose

This document defines the branding direction and UI design system for the Alumni Association of NS - 12 platform.

The goal is to create a system that feels:

- Professional
- Trustworthy
- Community focused
- Modern
- Clean
- Transparent
- Easy to use for all age groups

Including:

- Students
- Professionals
- Teachers
- Senior advisors
- Committee members

---

# 2. Brand Personality

The system branding should represent:

| Attribute | Description |
|---|---|
| Trust | Financial transparency and community trust |
| Respect | Respect for teachers and alumni |
| Unity | Alumni connection and collaboration |
| Professionalism | Organized digital management |
| Charity | Helping members and society |
| Simplicity | Easy-to-use interface |

---

# 3. Visual Identity Direction

The UI should NOT look like:

- Corporate ERP
- Banking software
- Heavy government system
- Old style admin template

The UI SHOULD feel like:

- Modern NGO platform
- Alumni community portal
- Charity transparency platform
- Modern dashboard application

---

# 4. Recommended Color Palette

## Primary Brand Color

Deep Blue

Purpose:

- Trust
- Stability
- Professionalism

Recommended:

```css
Primary: #1D4ED8
Primary Hover: #1E40AF
Primary Light: #DBEAFE
```

---

## Secondary Color

Emerald Green

Purpose:

- Charity
- Growth
- Positive contribution

Recommended:

```css
Secondary: #10B981
Secondary Hover: #059669
Secondary Light: #D1FAE5
```

---

## Accent Color

Amber / Gold

Purpose:

- Recognition
- Important statistics
- Awards
- Committee highlights

Recommended:

```css
Accent: #F59E0B
Accent Light: #FEF3C7
```

---

## Danger Color

```css
Danger: #EF4444
```

Used for:

- Delete actions
- Failed payments
- Rejected requests
- Warnings

---

## Neutral Colors

```css
Background: #F8FAFC
Card Background: #FFFFFF
Border: #E2E8F0
Text Primary: #0F172A
Text Secondary: #475569
```

---

# 5. Typography System

## Recommended Font

Primary Font:

```text
Inter
```

Fallback:

```text
sans-serif
```

---

## Typography Style

| Type | Size | Weight |
|---|---|---|
| Page Title | 30px | Bold |
| Section Title | 24px | Semi Bold |
| Card Title | 18px | Semi Bold |
| Normal Text | 14px–16px | Regular |
| Small Text | 12px | Regular |

---

# 6. Layout Philosophy

The application should follow:

- Spacious layout
- Soft shadows
- Rounded corners
- Minimal borders
- Clean spacing
- Easy navigation
- Mobile-friendly responsiveness

---

# 7. Dashboard Design Direction

## Admin Dashboard

Dashboard should display:

- Total members
- Active members
- Monthly collection
- Donation summary
- Running charity projects
- Recent transactions
- Pending approvals
- Current balance

---

## Member Dashboard

Dashboard should display:

- My pending chada
- My total contribution
- Donation history
- Recent notices
- Running charity projects
- Upcoming events

---

# 8. Card Design Guidelines

Cards should have:

```css
Border Radius: 16px
Soft Shadow
Clean Padding
Minimal Border
```

Card structure:

- Icon
- Title
- Value
- Small description
- Optional progress indicator

---

# 9. Sidebar Design

## Sidebar Style

- Fixed sidebar
- Collapsible on tablet/mobile
- Icon + text navigation
- Active menu highlighting
- Smooth hover animation

---

## Sidebar Color

```css
Sidebar Background: #0F172A
Sidebar Text: #CBD5E1
Sidebar Active: #1D4ED8
```

---

# 10. Header Design

Header should contain:

- Application logo
- Search bar
- Notification icon
- User profile dropdown
- Dark/light mode toggle (future)

---

# 11. Table Design Guidelines

Tables should be:

- Clean
- Readable
- Responsive
- Searchable
- Paginated
- Filterable

---

## Table UI Rules

- Zebra striping optional
- Sticky header for large tables
- Rounded container
- Soft hover effect
- Compact but readable spacing

---

# 12. Form Design Guidelines

Forms should feel:

- Simple
- Friendly
- Modern
- Easy to complete

---

## Input Style

```css
Height: 44px–48px
Border Radius: 10px
Soft Border
Focus Ring using Primary Color
```

---

## Form Rules

- Always show validation errors clearly
- Required fields should be visible
- Group related fields
- Avoid extremely long forms
- Use step-based forms where needed

---

# 13. Button Design System

## Primary Button

Used for:

- Save
- Submit
- Create
- Confirm

---

## Secondary Button

Used for:

- Cancel
- Back
- Reset

---

## Success Button

Used for:

- Approve
- Payment success
- Donation success

---

## Danger Button

Used for:

- Delete
- Reject
- Remove

---

# 14. Image Display Guidelines

## Member Image

Rules:

- Circular profile image
- Consistent aspect ratio
- Default avatar fallback
- Compression before upload

---

## Beneficiary Images

Rules:

- Clear visibility
- Respectful presentation
- Multiple gallery support
- Lightbox preview
- Mobile responsive

---

# 15. File Upload UI

Upload system should support:

- Drag and drop
- Preview before upload
- Progress indicator
- Multiple image upload
- PDF upload

---

# 16. Notification System Design

Notifications should support:

- Success alerts
- Error alerts
- Warning alerts
- Info alerts

Recommended style:

- Toast notifications
- Top-right placement
- Auto dismiss

---

# 17. Mobile UI Strategy

Mobile usability is extremely important.

Many members will use:

- Android devices
- Facebook browser
- Low-end mobile devices

---

## Mobile UI Rules

- Large touch targets
- Responsive tables
- Stacked layouts
- Mobile sidebar drawer
- Simple navigation
- Fast loading

---

# 18. Accessibility Considerations

The platform should support:

- High readability
- Proper contrast ratio
- Keyboard navigation
- Large clickable areas
- Screen reader-friendly labels

---

# 19. Tailwind CSS Strategy

Use:

- Tailwind utility-first approach
- Reusable UI classes
- Shared design tokens
- Centralized color config

---

## Recommended Tailwind Structure

```text
resources/
 └── js/
      ├── components/
      ├── layouts/
      ├── pages/
      ├── composables/
      ├── services/
      ├── stores/
      └── utils/
```

---

# 20. Recommended UI Libraries

Optional:

| Purpose | Library |
|---|---|
| Icons | Lucide Icons |
| Modal | Headless UI |
| Date Picker | Flatpickr |
| Data Table | Custom/Table component |
| Charts | ApexCharts |
| Notification | Vue Toastification |

---

# 21. Public Website Direction

Public website should contain:

- Alumni introduction
- Mission & vision
- Committee members
- Running projects
- Donation transparency
- Events
- Notices
- Contact information

---

# 22. Design Philosophy Summary

The platform should feel:

- Human
- Transparent
- Community-driven
- Modern
- Trustworthy
- Emotionally warm
- Professional but not corporate-heavy

---

# 23. Important UI Principle

The system must prioritize:

1. Transparency
2. Simplicity
3. Mobile usability
4. Fast navigation
5. Easy accounting visibility
6. Charity project trust building

---

# 24. Next Document

## 02-system-architecture

Will define:

- Complete system architecture
- Backend architecture
- Frontend architecture
- Module boundaries
- Service layer strategy
- Database interaction flow
- API strategy
- Authentication flow
- File storage architecture
- Queue/event structure
- Scalability preparation

