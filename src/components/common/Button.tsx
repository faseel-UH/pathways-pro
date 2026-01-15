import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    isFullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    className = '',
    ...props
}) => {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        isFullWidth && 'btn--full-width',
        isLoading && 'btn--loading',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading && (
                <span className="btn__spinner" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="32"
                            strokeDashoffset="32"
                        />
                    </svg>
                </span>
            )}
            {leftIcon && !isLoading && (
                <span className="btn__icon btn__icon--left">{leftIcon}</span>
            )}
            <span className="btn__text">{children}</span>
            {rightIcon && !isLoading && (
                <span className="btn__icon btn__icon--right">{rightIcon}</span>
            )}
        </button>
    );
};

export default Button;
