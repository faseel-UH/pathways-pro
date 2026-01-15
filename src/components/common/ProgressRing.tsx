import React from 'react';
import './ProgressRing.css';

export interface ProgressRingProps {
    progress: number; // 0-100
    size?: 'sm' | 'md' | 'lg' | 'xl';
    strokeWidth?: number;
    showLabel?: boolean;
    labelType?: 'percent' | 'fraction' | 'custom';
    label?: string;
    color?: 'primary' | 'accent' | 'success' | 'warning';
    animated?: boolean;
    className?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 'md',
    strokeWidth,
    showLabel = true,
    labelType = 'percent',
    label,
    color = 'primary',
    animated = true,
    className = '',
}) => {
    // Size mappings
    const sizes = {
        sm: { diameter: 48, stroke: 4, fontSize: 'text-xs' },
        md: { diameter: 80, stroke: 6, fontSize: 'text-lg' },
        lg: { diameter: 120, stroke: 8, fontSize: 'text-2xl' },
        xl: { diameter: 160, stroke: 10, fontSize: 'text-3xl' },
    };

    const { diameter, stroke, fontSize } = sizes[size];
    const actualStroke = strokeWidth || stroke;
    const radius = (diameter - actualStroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const getLabel = () => {
        if (labelType === 'custom' && label) return label;
        if (labelType === 'fraction') return `${Math.round(progress)}%`;
        return `${Math.round(progress)}%`;
    };

    const classes = [
        'progress-ring',
        `progress-ring--${size}`,
        `progress-ring--${color}`,
        animated && 'progress-ring--animated',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} style={{ width: diameter, height: diameter }}>
            <svg viewBox={`0 0 ${diameter} ${diameter}`}>
                {/* Background Circle */}
                <circle
                    className="progress-ring__bg"
                    cx={diameter / 2}
                    cy={diameter / 2}
                    r={radius}
                    strokeWidth={actualStroke}
                />
                {/* Progress Circle */}
                <circle
                    className="progress-ring__progress"
                    cx={diameter / 2}
                    cy={diameter / 2}
                    r={radius}
                    strokeWidth={actualStroke}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                    }}
                />
            </svg>
            {showLabel && (
                <div className={`progress-ring__label ${fontSize}`}>
                    {getLabel()}
                </div>
            )}
        </div>
    );
};

export default ProgressRing;
