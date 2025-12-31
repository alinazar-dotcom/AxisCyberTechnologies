# 🎨 CSS Variables Reference - Axis Cyber Technologies

> **Complete theming system using CSS Custom Properties**

All variables are defined in `/src/styles/globals.scss` and are available globally throughout the application.

---

## 📋 Table of Contents

- [Colors](#-colors)
- [Typography](#-typography)
- [Spacing](#-spacing)
- [Border Radius](#-border-radius)
- [Transitions](#-transitions)
- [Usage Examples](#-usage-examples)
- [Utility Classes](#-utility-classes)

---

## 🎨 Colors

### **Background Colors**

| Variable | Value | Description |
|----------|-------|-------------|
| `--bg-primary` | `#05060A` | Ultra-dark main background |
| `--bg-secondary` | `#0A0A14` | Secondary background |
| `--bg-tertiary` | `#0D0D1A` | Tertiary background |
| `--bg-black` | `#000000` | Pure black |
| `--bg-card` | `rgba(0, 0, 0, 0.4)` | Card background with transparency |
| `--bg-glass` | `rgba(255, 255, 255, 0.03)` | Glassmorphism effect |

**Usage:**
```tsx
<div className="bg-[var(--bg-primary)]">Content</div>
<div style={{ backgroundColor: 'var(--bg-card)' }}>Content</div>
```

---

### **Text Colors**

| Variable | Value | Description |
|----------|-------|-------------|
| `--text-primary` | `#FFFFFF` | Primary text (white) |
| `--text-secondary` | `rgba(255, 255, 255, 0.8)` | Secondary text (80% opacity) |
| `--text-muted` | `rgba(255, 255, 255, 0.6)` | Muted text (60% opacity) |
| `--text-disabled` | `rgba(255, 255, 255, 0.4)` | Disabled text (40% opacity) |

**Usage:**
```tsx
<h1 className="text-[var(--text-primary)]">Title</h1>
<p className="text-[var(--text-secondary)]">Description</p>
```

---

### **Neon Colors (Ultra-Premium)**

| Variable | Value | Preview |
|----------|-------|---------|
| `--neon-purple` | `#DD00FF` | ![#DD00FF](https://via.placeholder.com/50x20/DD00FF/DD00FF) |
| `--neon-cyan` | `#00FFFF` | ![#00FFFF](https://via.placeholder.com/50x20/00FFFF/00FFFF) |
| `--neon-pink` | `#FF0099` | ![#FF0099](https://via.placeholder.com/50x20/FF0099/FF0099) |
| `--neon-green` | `#00FF9D` | ![#00FF9D](https://via.placeholder.com/50x20/00FF9D/00FF9D) |
| `--neon-orange` | `#FF7A00` | ![#FF7A00](https://via.placeholder.com/50x20/FF7A00/FF7A00) |

**Usage:**
```tsx
<div className="text-[var(--neon-purple)]">Neon Purple Text</div>
<div className="border-[var(--neon-cyan)]">Neon Cyan Border</div>
```

---

### **Brand Colors (Legacy Compatibility)**

| Variable | Value | Description |
|----------|-------|-------------|
| `--accent-cyan` | `#00E5FF` | Legacy cyan |
| `--accent-magenta` | `#B900FF` | Legacy magenta |
| `--accent-orange` | `#FF7A00` | Legacy orange |
| `--accent-success` | `#00FF9D` | Success state (green) |

---

### **Border Colors**

| Variable | Value | Description |
|----------|-------|-------------|
| `--border-purple` | `rgba(221, 0, 255, 0.3)` | Purple border (30% opacity) |
| `--border-cyan` | `rgba(0, 255, 255, 0.3)` | Cyan border (30% opacity) |
| `--border-pink` | `rgba(255, 0, 153, 0.3)` | Pink border (30% opacity) |
| `--border-green` | `rgba(0, 255, 157, 0.3)` | Green border (30% opacity) |
| `--border-orange` | `rgba(255, 122, 0, 0.3)` | Orange border (30% opacity) |
| `--border-white-low` | `rgba(255, 255, 255, 0.08)` | White border (low opacity) |
| `--border-white-medium` | `rgba(255, 255, 255, 0.15)` | White border (medium opacity) |
| `--border-white-high` | `rgba(255, 255, 255, 0.3)` | White border (high opacity) |

**Usage:**
```tsx
<div className="border-2 border-[var(--border-purple)]">Content</div>
```

---

### **Glow/Shadow Colors**

| Variable | Value | Description |
|----------|-------|-------------|
| `--glow-purple` | `rgba(221, 0, 255, 0.3)` | Purple glow (normal) |
| `--glow-cyan` | `rgba(0, 255, 255, 0.3)` | Cyan glow (normal) |
| `--glow-pink` | `rgba(255, 0, 153, 0.3)` | Pink glow (normal) |
| `--glow-green` | `rgba(0, 255, 157, 0.3)` | Green glow (normal) |
| `--glow-purple-intense` | `rgba(221, 0, 255, 0.6)` | Purple glow (intense) |
| `--glow-cyan-intense` | `rgba(0, 255, 255, 0.6)` | Cyan glow (intense) |
| `--glow-pink-intense` | `rgba(255, 0, 153, 0.6)` | Pink glow (intense) |
| `--glow-green-intense` | `rgba(0, 255, 157, 0.6)` | Green glow (intense) |

---

## 📝 Typography

### **Font Families**

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-primary` | `'Inter', sans-serif` | Body text |
| `--font-heading` | `'Space Grotesk', sans-serif` | Headings (H1-H6) |
| `--font-mono` | `'Fira Code', monospace` | Code blocks |

**Usage:**
```tsx
<p className="font-[var(--font-primary)]">Body text</p>
<h1 className="font-[var(--font-heading)]">Heading</h1>
<code className="font-[var(--font-mono)]">Code</code>
```

---

## 📏 Spacing

### **Spacing Scale**

| Variable | Value | Pixels | Usage |
|----------|-------|--------|-------|
| `--spacing-xs` | `0.25rem` | 4px | Tiny gaps |
| `--spacing-sm` | `0.5rem` | 8px | Small gaps |
| `--spacing-md` | `1rem` | 16px | Medium gaps |
| `--spacing-lg` | `1.5rem` | 24px | Large gaps |
| `--spacing-xl` | `2rem` | 32px | Extra large |
| `--spacing-2xl` | `3rem` | 48px | 2x extra large |
| `--spacing-3xl` | `4rem` | 64px | 3x extra large |
| `--spacing-4xl` | `6rem` | 96px | 4x extra large |
| `--spacing-5xl` | `8rem` | 128px | 5x extra large |

**Usage:**
```tsx
<div className="p-[var(--spacing-xl)]">Content</div>
<div className="gap-[var(--spacing-md)]">Content</div>
<div style={{ marginBottom: 'var(--spacing-2xl)' }}>Content</div>
```

---

## 🔲 Border Radius

| Variable | Value | Pixels | Usage |
|----------|-------|--------|-------|
| `--radius-sm` | `0.375rem` | 6px | Small radius |
| `--radius-md` | `0.5rem` | 8px | Medium radius |
| `--radius-lg` | `0.75rem` | 12px | Large radius |
| `--radius-xl` | `1rem` | 16px | Extra large |
| `--radius-2xl` | `1.5rem` | 24px | 2x extra large |
| `--radius-3xl` | `2rem` | 32px | 3x extra large |
| `--radius-full` | `9999px` | Full | Perfect circle/pill |

**Usage:**
```tsx
<div className="rounded-[var(--radius-xl)]">Content</div>
<button className="rounded-[var(--radius-2xl)]">Button</button>
```

---

## ⚡ Transitions

| Variable | Value | Milliseconds |
|----------|-------|--------------|
| `--transition-fast` | `150ms` | 150ms |
| `--transition-base` | `300ms` | 300ms |
| `--transition-slow` | `500ms` | 500ms |
| `--transition-slower` | `700ms` | 700ms |

**Usage:**
```tsx
<div style={{ transition: `all var(--transition-base)` }}>Content</div>
```

---

## 💡 Usage Examples

### **Example 1: Neon Card**

```tsx
<div className="bg-[var(--bg-card)] border-2 border-[var(--border-purple)] rounded-[var(--radius-3xl)] p-[var(--spacing-2xl)] backdrop-blur-xl shadow-[0_0_30px_var(--glow-purple)]">
  <h3 className="text-[var(--text-primary)] font-[var(--font-heading)]">
    Card Title
  </h3>
  <p className="text-[var(--text-secondary)]">
    Card description
  </p>
</div>
```

### **Example 2: Gradient Text**

```tsx
<h1 
  className="text-transparent bg-clip-text"
  style={{
    backgroundImage: `linear-gradient(135deg, var(--neon-purple), var(--neon-cyan), var(--neon-green))`
  }}
>
  Gradient Heading
</h1>
```

### **Example 3: Neon Button**

```tsx
<button 
  className="bg-[var(--neon-purple)] text-[var(--text-primary)] px-[var(--spacing-xl)] py-[var(--spacing-lg)] rounded-[var(--radius-2xl)]"
  style={{
    boxShadow: `0 0 30px var(--glow-purple)`,
    transition: `all var(--transition-base)`,
  }}
>
  Click Me
</button>
```

### **Example 4: Glassmorphism**

```tsx
<div 
  className="bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--border-white-low)] rounded-[var(--radius-xl)] p-[var(--spacing-lg)]"
>
  Glass content
</div>
```

### **Example 5: Using Inline Styles**

```tsx
<div
  style={{
    backgroundColor: 'var(--bg-card)',
    border: `2px solid var(--border-cyan)`,
    borderRadius: 'var(--radius-2xl)',
    padding: 'var(--spacing-xl)',
    color: 'var(--text-primary)',
    boxShadow: `0 0 30px var(--glow-cyan)`,
  }}
>
  Custom styled component
</div>
```

---

## 🛠 Utility Classes

Pre-built utility classes available in `globals.scss`:

### **Text Colors**

```tsx
<p className="text-neon-purple">Purple neon text</p>
<p className="text-neon-cyan">Cyan neon text</p>
<p className="text-neon-pink">Pink neon text</p>
<p className="text-neon-green">Green neon text</p>
```

### **Gradient Text**

```tsx
<h1 className="gradient-text-cyber">Cyberpunk gradient</h1>
<h1 className="gradient-text-fire">Fire gradient</h1>
```

### **Neon Glows**

```tsx
<div className="neon-glow-purple">Purple glow</div>
<div className="neon-glow-cyan">Cyan glow</div>
<div className="neon-glow-pink">Pink glow</div>
<div className="neon-glow-green">Green glow</div>
```

### **Premium Effects**

```tsx
<div className="backdrop-blur-premium">Blurred background</div>
<div className="card-neon">Ultra-premium neon card</div>
```

### **Links**

```tsx
<a href="#" className="footer-link">Animated footer link</a>
```

---

## 🎯 Best Practices

### ✅ **DO:**

1. **Use CSS variables for theming:**
   ```tsx
   className="bg-[var(--bg-primary)] text-[var(--neon-purple)]"
   ```

2. **Combine with Tailwind utilities:**
   ```tsx
   className="bg-[var(--bg-card)] p-8 rounded-3xl shadow-lg"
   ```

3. **Use for dynamic values:**
   ```tsx
   style={{ color: isActive ? 'var(--neon-purple)' : 'var(--text-muted)' }}
   ```

### ❌ **DON'T:**

1. **Don't hardcode colors:**
   ```tsx
   // Bad
   className="bg-[#05060A]"
   
   // Good
   className="bg-[var(--bg-primary)]"
   ```

2. **Don't duplicate values:**
   ```tsx
   // Bad
   style={{ padding: '2rem', margin: '2rem' }}
   
   // Good
   style={{ padding: 'var(--spacing-xl)', margin: 'var(--spacing-xl)' }}
   ```

---

## 📊 Variable Categories Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Backgrounds** | 6 | Background colors and effects |
| **Text** | 4 | Text color variations |
| **Neon Colors** | 5 | Primary neon palette |
| **Brand Colors** | 4 | Legacy brand colors |
| **Borders** | 8 | Border color variations |
| **Glows** | 8 | Shadow/glow effects |
| **Spacing** | 9 | Spacing scale (xs to 5xl) |
| **Typography** | 3 | Font families |
| **Radius** | 7 | Border radius values |
| **Transitions** | 4 | Animation durations |
| **Total** | **58** | Complete theme system |

---

## 🚀 Quick Reference

### **Most Used Variables:**

```css
/* Colors */
--neon-purple: #DD00FF
--neon-cyan: #00FFFF
--neon-pink: #FF0099

/* Backgrounds */
--bg-primary: #05060A
--bg-card: rgba(0, 0, 0, 0.4)

/* Text */
--text-primary: #FFFFFF
--text-secondary: rgba(255, 255, 255, 0.8)

/* Spacing */
--spacing-md: 1rem
--spacing-xl: 2rem
--spacing-2xl: 3rem

/* Radius */
--radius-xl: 1rem
--radius-2xl: 1.5rem
--radius-3xl: 2rem
```

---

## 📚 Related Documentation

- [Tailwind CSS](https://tailwindcss.com/docs)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Variables Guide](https://css-tricks.com/a-complete-guide-to-custom-properties/)

---

**💡 Pro Tip:** All CSS variables are globally available. You can use them in any component, inline style, or CSS file throughout the application!

---

© 2024 Axis Cyber Technologies - **Engineering the Future. Building the Impossible.**
