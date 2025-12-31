import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'wide' | 'full';
}

export function Container({
  children,
  className = '',
  maxWidth = 'default',
}: ContainerProps) {
  const widthClass = 
    maxWidth === 'wide' ? 'max-w-[1600px]' :
    maxWidth === 'full' ? 'max-w-full' :
    'max-w-[1400px]';

  return (
    <div className={`${widthClass} mx-auto container-padding ${className}`.trim()}>
      {children}
    </div>
  );
}
