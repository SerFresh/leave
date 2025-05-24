import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden transition-all duration-200',
        variant === 'default'
          ? 'shadow-md hover:shadow-lg'
          : 'border border-gray-200 hover:border-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-4 bg-gray-50 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };