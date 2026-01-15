import { useState } from 'react';
import { useI18n } from '../../../i18n';

interface DayPlan {
    name: string;
    nameKey: string;
    date: string;
    tasks: {
        id: string;
        title: string;
        duration?: string;
        type: 'academic' | 'test-prep' | 'profile' | 'personal';
        completed?: boolean;
    }[];
    isToday: boolean;
}

const WEEK_DAYS: DayPlan[] = [
    {
        name: 'Monday',
        nameKey: 'Monday',
        date: 'Jan 13',
        tasks: [
            { id: '1', title: 'Chemistry HL revision', duration: '2 hrs', type: 'academic' },
            { id: '2', title: 'UCAT practice - QR section', duration: '1 hr', type: 'test-prep' },
        ],
        isToday: true,
    },
    {
        name: 'Tuesday',
        nameKey: 'Tuesday',
        date: 'Jan 14',
        tasks: [
            { id: '3', title: 'Biology lab prep', duration: '1.5 hrs', type: 'academic' },
            { id: '4', title: 'Extended Essay research', duration: '2 hrs', type: 'academic' },
        ],
        isToday: false,
    },
    {
        name: 'Wednesday',
        nameKey: 'Wednesday',
        date: 'Jan 15',
        tasks: [
            { id: '5', title: 'UCAT Registration deadline', type: 'test-prep' },
            { id: '6', title: 'Math tutoring session', duration: '1 hr', type: 'academic' },
        ],
        isToday: false,
    },
    {
        name: 'Thursday',
        nameKey: 'Thursday',
        date: 'Jan 16',
        tasks: [
            { id: '7', title: 'UCAT Practice Test - Verbal', duration: '2 hrs', type: 'test-prep' },
            { id: '8', title: 'Review super-curricular ideas', duration: '30 min', type: 'profile' },
        ],
        isToday: false,
    },
    {
        name: 'Friday',
        nameKey: 'Friday',
        date: 'Jan 17',
        tasks: [
            { id: '9', title: 'Biology HL revision', duration: '1.5 hrs', type: 'academic' },
            { id: '10', title: 'Hospital volunteering', duration: '3 hrs', type: 'profile' },
        ],
        isToday: false,
    },
    {
        name: 'Weekend',
        nameKey: 'Weekend',
        date: 'Jan 18-19',
        tasks: [
            { id: '11', title: 'Extended Essay writing block', duration: '4 hrs', type: 'academic' },
            { id: '12', title: 'Rest & recharge', type: 'personal' },
        ],
        isToday: false,
    },
];

const WeeklyPlanView = () => {
    const { t, direction, formatNumber } = useI18n();
    const [weekOffset, setWeekOffset] = useState(0);
    const [expandedDay, setExpandedDay] = useState<string | null>('Monday');

    // Calculate weekly stats
    const totalTasks = WEEK_DAYS.reduce((acc, day) => acc + day.tasks.length, 0);
    const completedTasks = 8; // Mock completed count
    const weekProgress = Math.round((completedTasks / totalTasks) * 100);

    // Calculate hours by type
    const studyHours = { academic: 12, testPrep: 6, profile: 4 };
    const totalHours = Object.values(studyHours).reduce((a, b) => a + b, 0);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'academic': return 'var(--color-primary-500)';
            case 'test-prep': return 'var(--color-accent-500)';
            case 'profile': return 'var(--color-success-500)';
            case 'personal': return 'var(--color-warning-500)';
            default: return 'var(--color-neutral-500)';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'academic': return '📚';
            case 'test-prep': return '📝';
            case 'profile': return '⭐';
            case 'personal': return '☕';
            default: return '📌';
        }
    };

    return (
        <div className="weekly-view" dir={direction}>
            {/* Header with Week Navigation */}
            <div className="weekly-header animate-fadeInUp">
                <div className="weekly-header-left">
                    <h3 className="weekly-title">
                        {t('dashboard.weekly.title', { date: 'Jan 13' })}
                    </h3>
                    <p className="weekly-summary">
                        {t('dashboard.weekly.tasksSummary', {
                            completed: formatNumber(completedTasks),
                            total: formatNumber(totalTasks),
                            percent: formatNumber(weekProgress),
                        })}
                    </p>
                </div>
                <div className="weekly-nav">
                    <button
                        className="weekly-nav-btn"
                        onClick={() => setWeekOffset(prev => prev - 1)}
                        aria-label="Previous week"
                    >
                        <span className="weekly-nav-icon">←</span>
                    </button>
                    <button
                        className="weekly-nav-btn weekly-nav-today"
                        onClick={() => setWeekOffset(0)}
                        disabled={weekOffset === 0}
                    >
                        {t('common.today')}
                    </button>
                    <button
                        className="weekly-nav-btn"
                        onClick={() => setWeekOffset(prev => prev + 1)}
                        aria-label="Next week"
                    >
                        <span className="weekly-nav-icon">→</span>
                    </button>
                </div>
            </div>

            {/* Progress Bar with Animation */}
            <div className="weekly-progress animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <div className="weekly-progress-bar">
                    <div
                        className="weekly-progress-fill"
                        style={{ width: `${weekProgress}%` }}
                    />
                </div>
            </div>

            {/* Hours Distribution */}
            <div className="weekly-hours-card animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
                <div className="weekly-hours-header">
                    <span className="weekly-hours-title">Study Hours Distribution</span>
                    <span className="weekly-hours-total">{totalHours} hrs total</span>
                </div>
                <div className="weekly-hours-chart">
                    {Object.entries(studyHours).map(([type, hours]) => (
                        <div
                            key={type}
                            className="weekly-hours-segment"
                            style={{
                                flex: hours,
                                background: getTypeColor(type),
                            }}
                            title={`${type}: ${hours} hours`}
                        />
                    ))}
                </div>
                <div className="weekly-hours-legend">
                    <span className="weekly-hours-item">
                        <span className="weekly-hours-dot" style={{ background: 'var(--color-primary-500)' }} />
                        Academic
                    </span>
                    <span className="weekly-hours-item">
                        <span className="weekly-hours-dot" style={{ background: 'var(--color-accent-500)' }} />
                        Test Prep
                    </span>
                    <span className="weekly-hours-item">
                        <span className="weekly-hours-dot" style={{ background: 'var(--color-success-500)' }} />
                        Profile
                    </span>
                </div>
            </div>

            {/* Days List */}
            <div className="weekly-days">
                {WEEK_DAYS.map((day, index) => (
                    <div
                        key={day.name}
                        className={`weekly-day ${day.isToday ? 'today' : ''} ${expandedDay === day.name ? 'expanded' : ''} animate-fadeInUp`}
                        style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                    >
                        <button
                            className="weekly-day-header"
                            onClick={() => setExpandedDay(expandedDay === day.name ? null : day.name)}
                            aria-expanded={expandedDay === day.name}
                        >
                            <div className="weekly-day-left">
                                <span className="weekly-day-name">
                                    {day.name}
                                    {day.isToday && (
                                        <span className="weekly-today-badge">{t('common.today')}</span>
                                    )}
                                </span>
                                <span className="weekly-day-date">{day.date}</span>
                            </div>
                            <div className="weekly-day-right">
                                <span className="weekly-day-count">{day.tasks.length} tasks</span>
                                <span className={`weekly-day-chevron ${expandedDay === day.name ? 'open' : ''}`}>
                                    ▼
                                </span>
                            </div>
                        </button>

                        {expandedDay === day.name && (
                            <div className="weekly-tasks">
                                {day.tasks.map((task) => (
                                    <div key={task.id} className="weekly-task">
                                        <span
                                            className="weekly-task-indicator"
                                            style={{ background: getTypeColor(task.type) }}
                                        />
                                        <span className="weekly-task-icon">{getTypeIcon(task.type)}</span>
                                        <span className="weekly-task-title">{task.title}</span>
                                        {task.duration && (
                                            <span className="weekly-task-duration">{task.duration}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyPlanView;
