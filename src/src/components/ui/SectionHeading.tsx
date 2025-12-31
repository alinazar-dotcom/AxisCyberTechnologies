import React from 'react';
import { GradientText } from './GradientText';

export type HeadingLevel = 'hero' | 'section' | 'component' | 'card' | 'small';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  level?: HeadingLevel;
  gradientTitle?: boolean;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  level = 'section',
  gradientTitle = false,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  const levelClass = `title-${level}`;
  const alignClass = centered ? 'text-center' : '';
  const combinedClassName = `${levelClass} ${alignClass} ${className}`.trim();

  // Determine heading tag based on level
  const HeadingTag = level === 'hero' ? 'h1' : level === 'section' ? 'h2' : level === 'component' ? 'h3' : 'h4';

  return (
    <div className={`${centered ? 'flex flex-col items-center' : ''} mb-8 sm:mb-10 lg:mb-12 xl:mb-16`}>
      <HeadingTag className={combinedClassName}>
        {gradientTitle ? (
          <GradientText variant="cyan-purple">{title}</GradientText>
        ) : (
          title
        )}
      </HeadingTag>
      {subtitle && (
        <p className="text-body mt-3 sm:mt-4 text-white/70 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
