# 🎨 AXIS CYBER DESIGN SYSTEM

## **Complete Component & Utility Library**

This is the comprehensive design system for Axis Cyber Technologies. Use these components and utilities throughout the application for consistency.

---

## 📦 **GLOBAL CSS UTILITIES**

All utilities are located in `/src/styles/globals.scss` and are responsive by default.

### **1. SPACING UTILITIES**

#### **Container Padding:**
```tsx
<div className="container-padding">
  {/* Responsive padding: 16px → 24px → 32px → 48px → 64px */}
</div>
```

#### **Section Spacing:**
```tsx
<div className="section-spacing">
  {/* Standard: 48px → 64px → 80px → 96px → 128px */}
</div>

<div className="section-spacing-sm">
  {/* Small: 32px → 40px → 48px → 64px */}
</div>

<div className="section-spacing-lg">
  {/* Large: 64px → 80px → 96px → 128px → 160px */}
</div>
```

#### **Grid Gaps:**
```tsx
<div className="grid grid-gap">
  {/* Standard gap: 16px → 24px → 32px → 40px → 48px */}
</div>

<div className="grid grid-gap-sm">
  {/* Small gap: 12px → 16px → 20px → 24px */}
</div>

<div className="grid grid-gap-lg">
  {/* Large gap: 24px → 32px → 40px → 48px → 64px */}
</div>
```

---

### **2. TYPOGRAPHY UTILITIES**

#### **Title Classes (Responsive):**
```tsx
<h1 className="title-hero">
  {/* Hero: 30px → 36px → 48px → 60px → 72px → 96px */}
  Engineering the Future
</h1>

<h2 className="title-section">
  {/* Section: 24px → 30px → 36px → 48px → 60px */}
  Our Services
</h2>

<h3 className="title-component">
  {/* Component: 20px → 24px → 30px → 36px */}
  AI/ML Development
</h3>

<h4 className="title-card">
  {/* Card: 18px → 20px → 24px → 30px */}
  Card Heading
</h4>

<h5 className="title-small">
  {/* Small: 16px → 18px → 20px → 24px */}
  Small Title
</h5>
```

#### **Body Text Classes:**
```tsx
<p className="text-body-large">
  {/* Large: 16px → 18px → 20px → 24px */}
</p>

<p className="text-body">
  {/* Standard: 14px → 16px → 18px → 20px */}
</p>

<p className="text-body-small">
  {/* Small: 12px → 14px → 16px → 18px */}
</p>
```

#### **Gradient Text:**
```tsx
<span className="gradient-text-cyan-purple">Cyan to Purple</span>
<span className="gradient-text-purple-pink">Purple to Pink</span>
<span className="gradient-text-pink-cyan">Pink to Cyan</span>
<span className="gradient-text-rainbow">Rainbow Effect</span>
```

---

### **3. BUTTON UTILITIES**

#### **Button Variants:**
```tsx
{/* Primary - Gradient border with glow */}
<button className="btn-primary">Primary Button</button>

{/* Secondary - Purple neon */}
<button className="btn-secondary">Secondary Button</button>

{/* Ghost - Minimal */}
<button className="btn-ghost">Ghost Button</button>

{/* Outline variants */}
<button className="btn-outline-cyan">Outline Cyan</button>
<button className="btn-outline-purple">Outline Purple</button>
<button className="btn-outline-pink">Outline Pink</button>
```

#### **Button Sizes:**
```tsx
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary btn-md">Medium</button>
<button className="btn-primary btn-lg">Large</button>
```

---

### **4. CARD UTILITIES**

#### **Card Variants:**
```tsx
{/* Neon color variants */}
<div className="card-neon-cyan">Cyan Card</div>
<div className="card-neon-purple">Purple Card</div>
<div className="card-neon-pink">Pink Card</div>
<div className="card-neon-green">Green Card</div>

{/* Glass effect */}
<div className="card-glass">Glass Card</div>

{/* Gradient background */}
<div className="card-gradient-cyber">Gradient Card</div>
```

#### **Card Padding:**
```tsx
<div className="card-neon-cyan card-padding-sm">Small Padding</div>
<div className="card-neon-cyan card-padding">Default Padding</div>
<div className="card-neon-cyan card-padding-lg">Large Padding</div>
```

---

### **5. ICON BOX UTILITIES**

#### **Icon Box Variants:**
```tsx
<div className="icon-box-cyan">
  <Icon className="w-6 h-6" />
</div>

<div className="icon-box-purple">
  <Icon className="w-6 h-6" />
</div>

<div className="icon-box-pink">
  <Icon className="w-6 h-6" />
</div>

<div className="icon-box-green">
  <Icon className="w-6 h-6" />
</div>
```

#### **Icon Box Sizes:**
```tsx
<div className="icon-box-cyan icon-box-sm">Small</div>
<div className="icon-box-cyan icon-box-md">Medium</div>
<div className="icon-box-cyan icon-box-lg">Large</div>
```

---

### **6. BADGE UTILITIES**

```tsx
<span className="badge-cyan">Cyan Badge</span>
<span className="badge-purple">Purple Badge</span>
<span className="badge-pink">Pink Badge</span>
<span className="badge-green">Green Badge</span>
```

---

## ⚛️ **REACT COMPONENTS**

All components are located in `/src/components/ui/` and are fully typed with TypeScript.

### **1. Button Component**

```tsx
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

// Basic usage
<Button>Click Me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline-cyan">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icon
<Button icon={ArrowRight} iconPosition="right">
  Next Step
</Button>

// As link
<Button href="/contact" variant="primary">
  Contact Us
</Button>

// With onClick
<Button onClick={() => console.log('clicked')}>
  Click Handler
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'outline-cyan' | 'outline-purple' | 'outline-pink'
- `size`: 'sm' | 'md' | 'lg'
- `href`: string (renders as Next.js Link)
- `onClick`: () => void
- `icon`: LucideIcon component
- `iconPosition`: 'left' | 'right'
- `disabled`: boolean
- `className`: string
- `type`: 'button' | 'submit' | 'reset'

---

### **2. Card Component**

```tsx
import { Card } from '@/components/ui';

// Basic usage
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// With variants
<Card variant="neon-cyan">Cyan Card</Card>
<Card variant="neon-purple">Purple Card</Card>
<Card variant="neon-pink">Pink Card</Card>
<Card variant="neon-green">Green Card</Card>
<Card variant="glass">Glass Card</Card>
<Card variant="gradient-cyber">Gradient Card</Card>

// With padding
<Card padding="sm">Small Padding</Card>
<Card padding="md">Default Padding</Card>
<Card padding="lg">Large Padding</Card>

// Clickable card
<Card onClick={() => console.log('clicked')}>
  Click me
</Card>
```

**Props:**
- `variant`: 'neon-cyan' | 'neon-purple' | 'neon-pink' | 'neon-green' | 'glass' | 'gradient-cyber'
- `padding`: 'sm' | 'md' | 'lg'
- `className`: string
- `onClick`: () => void

---

### **3. IconBox Component**

```tsx
import { IconBox } from '@/components/ui';
import { Zap } from 'lucide-react';

// Basic usage
<IconBox icon={Zap} />

// With colors
<IconBox icon={Zap} color="cyan" />
<IconBox icon={Zap} color="purple" />
<IconBox icon={Zap} color="pink" />
<IconBox icon={Zap} color="green" />

// With sizes
<IconBox icon={Zap} size="sm" />
<IconBox icon={Zap} size="md" />
<IconBox icon={Zap} size="lg" />
```

**Props:**
- `icon`: LucideIcon (required)
- `color`: 'cyan' | 'purple' | 'pink' | 'green'
- `size`: 'sm' | 'md' | 'lg'
- `className`: string

---

### **4. GradientText Component**

```tsx
import { GradientText } from '@/components/ui';

// Basic usage
<GradientText>Gradient Text</GradientText>

// With variants
<GradientText variant="cyan-purple">Cyan to Purple</GradientText>
<GradientText variant="purple-pink">Purple to Pink</GradientText>
<GradientText variant="pink-cyan">Pink to Cyan</GradientText>
<GradientText variant="rainbow">Rainbow</GradientText>

// As different elements
<GradientText as="h1">Hero Gradient</GradientText>
<GradientText as="h2">Section Gradient</GradientText>
<GradientText as="span">Inline Gradient</GradientText>
```

**Props:**
- `variant`: 'cyan-purple' | 'purple-pink' | 'pink-cyan' | 'rainbow'
- `as`: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
- `className`: string

---

### **5. Badge Component**

```tsx
import { Badge } from '@/components/ui';
import { Zap } from 'lucide-react';

// Basic usage
<Badge>100% Success</Badge>

// With colors
<Badge color="cyan">AI/ML</Badge>
<Badge color="purple">Blockchain</Badge>
<Badge color="pink">Cloud</Badge>
<Badge color="green">Cybersecurity</Badge>

// With icon
<Badge color="cyan" icon={Zap}>Featured</Badge>
```

**Props:**
- `color`: 'cyan' | 'purple' | 'pink' | 'green'
- `icon`: LucideIcon
- `className`: string

---

### **6. SectionHeading Component**

```tsx
import { SectionHeading } from '@/components/ui';

// Basic usage
<SectionHeading title="Our Services" />

// With subtitle
<SectionHeading 
  title="Engineering Excellence" 
  subtitle="Building the impossible with cutting-edge technology"
/>

// Different levels
<SectionHeading title="Hero Title" level="hero" />
<SectionHeading title="Section Title" level="section" />
<SectionHeading title="Component Title" level="component" />
<SectionHeading title="Card Title" level="card" />

// With gradient
<SectionHeading 
  title="Gradient Title" 
  gradientTitle={true} 
/>

// Centered
<SectionHeading 
  title="Centered Title" 
  subtitle="With centered alignment"
  centered={true} 
/>
```

**Props:**
- `title`: string (required)
- `subtitle`: string
- `level`: 'hero' | 'section' | 'component' | 'card' | 'small'
- `gradientTitle`: boolean
- `centered`: boolean
- `className`: string

---

### **7. Container Component**

```tsx
import { Container } from '@/components/ui';

// Basic usage - 1400px max width
<Container>
  Content here
</Container>

// Wide container - 1600px max width
<Container maxWidth="wide">
  Wide content
</Container>

// Full width container
<Container maxWidth="full">
  Full width content
</Container>
```

**Props:**
- `maxWidth`: 'default' | 'wide' | 'full'
- `className`: string

---

### **8. Section Component**

```tsx
import { Section } from '@/components/ui';

// Basic usage - includes Container and section spacing
<Section>
  <h2>Section Content</h2>
</Section>

// With spacing variants
<Section spacing="sm">Small Spacing</Section>
<Section spacing="md">Default Spacing</Section>
<Section spacing="lg">Large Spacing</Section>

// With max width
<Section maxWidth="wide">Wide Section</Section>

// Custom classes
<Section 
  className="bg-gradient-to-b from-transparent to-purple-500/5"
  containerClassName="relative z-10"
>
  Content
</Section>
```

**Props:**
- `spacing`: 'sm' | 'md' | 'lg'
- `maxWidth`: 'default' | 'wide' | 'full'
- `className`: string (section wrapper)
- `containerClassName`: string (inner container)

---

## 🎯 **USAGE EXAMPLES**

### **Example 1: Service Card**

```tsx
import { Card, IconBox, GradientText } from '@/components/ui';
import { Brain } from 'lucide-react';

export function ServiceCard() {
  return (
    <Card variant="neon-cyan" padding="lg">
      <IconBox icon={Brain} color="cyan" size="lg" />
      <h3 className="title-card mt-4">
        <GradientText variant="cyan-purple">
          AI/ML Development
        </GradientText>
      </h3>
      <p className="text-body mt-3">
        Advanced artificial intelligence and machine learning solutions.
      </p>
    </Card>
  );
}
```

---

### **Example 2: Hero Section**

```tsx
import { Section, SectionHeading, Button } from '@/components/ui';
import { ArrowRight, Mail } from 'lucide-react';

export function HeroSection() {
  return (
    <Section spacing="lg" maxWidth="wide">
      <SectionHeading
        title="Engineering the Future"
        subtitle="Building the impossible with next-generation software"
        level="hero"
        gradientTitle={true}
        centered={true}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
        <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
          Get Started
        </Button>
        <Button variant="outline-cyan" size="lg" icon={Mail}>
          Contact Us
        </Button>
      </div>
    </Section>
  );
}
```

---

### **Example 3: Service Grid**

```tsx
import { Section, SectionHeading, Card, IconBox } from '@/components/ui';
import { Brain, Blocks, Cloud, Shield } from 'lucide-react';

const services = [
  { icon: Brain, title: 'AI/ML', color: 'cyan' as const },
  { icon: Blocks, title: 'Blockchain', color: 'purple' as const },
  { icon: Cloud, title: 'Cloud', color: 'pink' as const },
  { icon: Shield, title: 'Security', color: 'green' as const },
];

export function ServicesSection() {
  return (
    <Section>
      <SectionHeading 
        title="Our Services" 
        subtitle="Comprehensive software engineering solutions"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-gap">
        {services.map((service) => (
          <Card key={service.title} variant={`neon-${service.color}`}>
            <IconBox icon={service.icon} color={service.color} />
            <h3 className="title-card mt-4">{service.title}</h3>
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

---

## 📱 **RESPONSIVE BREAKPOINTS**

All components and utilities are responsive by default:

| Breakpoint | Width | Tailwind | Example |
|------------|-------|----------|---------|
| Mobile | 320px - 640px | `sm:` | `text-sm sm:text-base` |
| Tablet | 640px - 1024px | `md:` | `md:grid-cols-2` |
| Laptop | 1024px - 1280px | `lg:` | `lg:text-xl` |
| Desktop | 1280px - 1536px | `xl:` | `xl:px-12` |
| Large | 1536px+ | `2xl:` | `2xl:text-8xl` |

---

## ✅ **BEST PRACTICES**

1. **Always use components over raw CSS utilities when possible**
   ```tsx
   ✅ <Button variant="primary">Click Me</Button>
   ❌ <button className="btn-base btn-primary btn-md">Click Me</button>
   ```

2. **Use Section component for consistent spacing**
   ```tsx
   ✅ <Section><Content /></Section>
   ❌ <div className="py-12 sm:py-16 lg:py-20"><Content /></div>
   ```

3. **Use title classes instead of font size utilities**
   ```tsx
   ✅ <h2 className="title-section">Title</h2>
   ❌ <h2 className="text-3xl lg:text-5xl font-black">Title</h2>
   ```

4. **Combine utilities for custom styling**
   ```tsx
   <Card variant="neon-cyan" className="hover:scale-105">
     Custom behavior
   </Card>
   ```

5. **Import from index for cleaner code**
   ```tsx
   ✅ import { Button, Card, Badge } from '@/components/ui';
   ❌ import { Button } from '@/components/ui/Button';
   ❌ import { Card } from '@/components/ui/Card';
   ```

---

## 🚀 **NEXT STEPS**

Now that we have this complete design system:

1. ✅ **DONE:** Created comprehensive CSS utilities
2. ✅ **DONE:** Created reusable React components  
3. ⏭️ **NEXT:** Refactor existing components to use this system
4. ⏭️ **NEXT:** Fix responsiveness section by section using these tools

---

**This design system ensures:**
- ✅ Consistency across all components
- ✅ Responsive by default
- ✅ Easy to maintain and update
- ✅ Type-safe with TypeScript
- ✅ Follows our neon cyberpunk aesthetic
- ✅ All success rates maintained at 100%
