import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  dot?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant = 'primary', size = 'md', icon, dot, children, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center font-medium rounded-full transition-smooth';

    const variants = {
      primary: 'bg-primary-100 text-primary-700 border border-primary-200',
      success: 'bg-green-100 text-green-700 border border-green-200',
      warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      info: 'bg-blue-100 text-blue-700 border border-blue-200',
      secondary: 'bg-gray-100 text-gray-700 border border-gray-200',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
      lg: 'px-3 py-1.5 text-base gap-2',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              variant === 'primary' && 'bg-primary-500',
              variant === 'success' && 'bg-green-500',
              variant === 'warning' && 'bg-yellow-500',
              variant === 'info' && 'bg-blue-500',
              variant === 'secondary' && 'bg-gray-500'
            )}
          />
        )}
        {icon}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
