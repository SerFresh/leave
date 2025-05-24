import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  rows = 4,
  ...props
}) => {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-3 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 transition duration-200',
          error
            ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
            : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextArea;