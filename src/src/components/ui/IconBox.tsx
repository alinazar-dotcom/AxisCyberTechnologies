import React from 'react';
import { LucideIcon } from 'lucide-react';

export type IconBoxColor = 'cyan' | 'purple' | 'pink' | 'green';
export type IconBoxSize = 'sm' | 'md' | 'lg';

export interface IconBoxProps {
  icon: LucideIcon;
  color?: IconBoxColor;
  size?: IconBoxSize;
  className?: string;
}

export function IconBox({
  icon: Icon,
  color = 'cyan',
  size = 'md',
  className = '',
}: IconBoxProps) {
  const colorClass = `icon-box-${color}`;
  
  // Size overrides (the default md size is in the CSS class)
  const sizeClasses = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: '', // Default is already in icon-box-* classes
    lg: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
  };
  
  const sizeOverride = size !== 'md' ? sizeClasses[size] : '';
  const combinedClassName = `${colorClass} ${sizeOverride} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
    </div>
  );
}
