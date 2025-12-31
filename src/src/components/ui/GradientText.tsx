import React from 'react';

export type GradientVariant =
  | 'cyan'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'green'
  | 'cyan-purple'
  | 'purple-pink'
  | 'pink-cyan'
  | 'purple-orange-cyan'
  | 'cyan-green'
  | 'orange-pink'
  | 'purple-cyan'
  | 'rainbow';

export interface GradientTextProps {
  children: React.ReactNode;
  variant?: GradientVariant;
  gradient?: GradientVariant;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  style?: React.CSSProperties;
}

export function GradientText({
  children,
  variant,
  gradient,
  className = '',
  as: Component = 'span',
  style,
}: GradientTextProps) {
  const activeVariant = variant || gradient || 'cyan-purple';
  const gradientClass = `gradient-text-${activeVariant}`;
  const combinedClassName = `${gradientClass} ${className}`.trim();

  return (
    <Component className={combinedClassName} style={style}>
      {children}
    </Component>
  );
}
