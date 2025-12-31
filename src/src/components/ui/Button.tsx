import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline-cyan'
  | 'outline-purple'
  | 'outline-pink';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  iconPosition?: 'left' | 'right';
  as?: any;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon: Icon,
  iconRight: IconRight,
  iconPosition = 'left',
  disabled = false,
  className = '',
  type = 'button',
  as: Component,
  ...props
}: ButtonProps) {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size classes
  const sizeClasses = {
    sm: 'text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2',
    md: 'text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-3.5',
    lg: 'text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5',
  };

  // Variant classes
  const variantClasses = {
    primary: 'relative overflow-hidden',
    secondary: 'bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/40 text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/20 hover:border-[var(--neon-purple)]/60 hover:shadow-[0_0_30px_rgba(221,0,255,0.4)]',
    ghost: 'bg-white/5 border-2 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white',
    'outline-cyan': 'bg-transparent border-2 border-[var(--neon-cyan)]/40 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 hover:border-[var(--neon-cyan)]/60 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    'outline-purple': 'bg-transparent border-2 border-[var(--neon-purple)]/40 text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10 hover:border-[var(--neon-purple)]/60 hover:shadow-[0_0_20px_rgba(221,0,255,0.3)]',
    'outline-pink': 'bg-transparent border-2 border-[var(--neon-pink)]/40 text-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/10 hover:border-[var(--neon-pink)]/60 hover:shadow-[0_0_20px_rgba(255,0,153,0.3)]',
  };

  const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  const content = (
    <>
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] group-hover:from-[var(--neon-purple)] group-hover:to-[var(--neon-cyan)] group-hover:shadow-[0_0_30px_var(--glow-cyan-intense)] transition-all duration-300"></div>
          <div className="absolute inset-[2px] rounded-[6px] bg-[var(--bg-primary)]"></div>
        </>
      )}
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
      )}
      {IconRight && (
        <IconRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  // Render as Link if href is provided
  if (href) {
    return (
      <Link to={href} className={`${combinedClassName} group`}>
        {content}
      </Link>
    );
  }

  // Render as custom component
  if (Component) {
    return (
      <Component
        onClick={onClick}
        className={`${combinedClassName} group`}
      >
        {content}
      </Component>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClassName} group`}
      {...props}
    >
      {content}
    </button>
  );
}
