import React from 'react';
import './Card.css';

export interface CardProps {
    variant?: 'default' | 'glass' | 'gradient' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    isInteractive?: boolean;
    isSelected?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    variant = 'default',
    padding = 'md',
    isInteractive = false,
    isSelected = false,
    className = '',
    children,
    onClick,
}) => {
    const classes = [
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        isInteractive && 'card--interactive',
        isSelected && 'card--selected',
        className,
    ].filter(Boolean).join(' ');

    const Component = isInteractive ? 'button' : 'div';

    return (
        <Component
            className={classes}
            onClick={onClick}
            {...(isInteractive && { type: 'button' })}
        >
            {variant === 'gradient' && <div className="card__gradient-bg" />}
            <div className="card__content">{children}</div>
        </Component>
    );
};

export default Card;
