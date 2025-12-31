import React from 'react';
import { Container } from './Container';

export type SectionSpacing = 'sm' | 'md' | 'lg';

export interface SectionProps {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  maxWidth?: 'default' | 'wide' | 'full';
  className?: string;
  containerClassName?: string;
}

export function Section({
  children,
  spacing = 'md',
  maxWidth = 'default',
  className = '',
  containerClassName = '',
}: SectionProps) {
  const spacingClass = 
    spacing === 'sm' ? 'section-spacing-sm' :
    spacing === 'lg' ? 'section-spacing-lg' :
    'section-spacing';

  return (
    <section className={`${spacingClass} ${className}`.trim()}>
      <Container maxWidth={maxWidth} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
