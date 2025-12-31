import React from 'react';
import { LucideIcon } from 'lucide-react';

export type BadgeColor = 'cyan' | 'purple' | 'pink' | 'green';

export interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  variant?: string;
  size?: string;
  icon?: LucideIcon;
  className?: string;
}

export function Badge({
  children,
  color = 'cyan',
  icon: Icon,
  className = '',
}: BadgeProps) {
  const colorClass = `badge-${color}`;
  const combinedClassName = `${colorClass} ${className}`.trim();

  return (
    <span className={combinedClassName}>
      {Icon && <Icon className="w-3 h-3 sm:w-4 sm:h-4" />}
      {children}
    </span>
  );
}
