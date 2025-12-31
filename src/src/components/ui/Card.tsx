import React from 'react';

export type CardVariant = 
  | 'neon-cyan' 
  | 'neon-purple' 
  | 'neon-pink' 
  | 'neon-green' 
  | 'glass' 
  | 'gradient-cyber';

export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'neon-cyan',
  padding = 'md',
  className = '',
  onClick,
}: CardProps) {
  // Override padding if specified
  const paddingClasses = {
    sm: 'p-3 sm:p-4 lg:p-5 xl:p-6',
    md: '', // Default is already in card variant classes
    lg: 'p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-16',
  };

  const variantClass = `card-${variant}`;
  const paddingOverride = padding !== 'md' ? paddingClasses[padding] : '';
  
  // If custom padding, remove default padding from variant
  const combinedClassName = padding !== 'md' 
    ? `${variantClass} ${paddingOverride} ${className}`.trim()
    : `${variantClass} ${className}`.trim();

  return (
    <div className={combinedClassName} onClick={onClick}>
      {children}
    </div>
  );
}
