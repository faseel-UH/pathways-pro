import { useState } from 'react';
import { useI18n } from '../../../i18n';

interface Milestone {
    id: string;
    title: string;
    description: string;
    icon: string;
    status: 'unlocked' | 'in-progress' | 'locked';
    progress?: string;
    progressPercent?: number;
    unlockedDate?: string;
    xpReward?: number;
}

const MILESTONES: Milestone[] = [
    {
        id: '1',
        title: 'Profile Pioneer',
        description: 'Completed initial profile setup',
        icon: '🚀',
        status: 'unlocked',
        unlockedDate: 'Jan 10',
        xpReward: 100,
    },
    {
        id: '2',
        title: 'Path Finder',
        description: 'Chose your career pathway',
        icon: '🧭',
        status: 'unlocked',
        unlockedDate: 'Jan 10',
        xpReward: 150,
    },
    {
        id: '3',
        title: 'First Flight',
        description: 'Passed initial feasibility check',
        icon: '✈️',
        status: 'unlocked',
        unlockedDate: 'Jan 12',
        xpReward: 200,
    },
    {
        id: '4',
        title: 'Knowledge Seeker',
        description: 'Complete 10 study sessions',
        icon: '📚',
        status: 'in-progress',
        progress: '7/10',
        progressPercent: 70,
        xpReward: 250,
    },
    {
        id: '5',
        title: 'Test Champion',
        description: 'Score 700+ on UCAT mock',
        icon: '🏆',
        status: 'locked',
        xpReward: 300,
    },
    {
        id: '6',
        title: 'Essay Master',
        description: 'Complete personal statement draft',
        icon: '✍️',
        status: 'locked',
        xpReward: 350,
    },
    {
        id: '7',
        title: 'Experience Builder',
        description: 'Log 50 hours of relevant experience',
        icon: '💼',
        status: 'locked',
        xpReward: 400,
    },
    {
        id: '8',
        title: 'Application Ready',
        description: 'All requirements met for submission',
        icon: '🎯',
        status: 'locked',
        xpReward: 500,
    },
];

const MilestonesView = () => {
    const { t, direction, formatNumber } = useI18n();
    const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

    const unlockedCount = MILESTONES.filter(m => m.status === 'unlocked').length;
    const totalCount = MILESTONES.length;
    const totalXP = MILESTONES
        .filter(m => m.status === 'unlocked')
        .reduce((acc, m) => acc + (m.xpReward || 0), 0);

    const inProgressMilestone = MILESTONES.find(m => m.status === 'in-progress');

    return (
        <div className="milestones-view" dir={direction}>
            {/* Header Section */}
            <div className="milestones-header animate-fadeInUp">
                <div className="milestones-header-content">
                    <h3 className="milestones-title">{t('dashboard.milestones.title')}</h3>
                    <p className="milestones-summary">
                        {t('dashboard.milestones.summary', {
                            unlocked: formatNumber(unlockedCount),
                            total: formatNumber(totalCount),
                        })}
                    </p>
                </div>
                <div className="milestones-xp-badge">
                    <span className="milestones-xp-icon">⚡</span>
                    <span className="milestones-xp-value">{formatNumber(totalXP)}</span>
                    <span className="milestones-xp-label">XP</span>
                </div>
            </div>

            {/* Current Progress Card */}
            {inProgressMilestone && (
                <div className="milestone-current-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="milestone-current-header">
                        <span className="milestone-current-label">{t('dashboard.milestones.nextMilestone')}</span>
                        <span className="milestone-current-xp">+{inProgressMilestone.xpReward} XP</span>
                    </div>
                    <div className="milestone-current-content">
                        <span className="milestone-current-icon">{inProgressMilestone.icon}</span>
                        <div className="milestone-current-info">
                            <h4 className="milestone-current-title">{inProgressMilestone.title}</h4>
                            <p className="milestone-current-desc">
                                {t('dashboard.milestones.sessionsToGo', { count: '3' })}
                            </p>
                        </div>
                    </div>
                    <div className="milestone-current-progress">
                        <div className="milestone-progress-bar">
                            <div
                                className="milestone-progress-fill"
                                style={{ width: `${inProgressMilestone.progressPercent}%` }}
                            />
                        </div>
                        <span className="milestone-progress-text">{inProgressMilestone.progress}</span>
                    </div>
                </div>
            )}

            {/* Milestones Grid */}
            <div className="milestones-grid">
                {MILESTONES.map((milestone, index) => (
                    <button
                        key={milestone.id}
                        className={`milestone-card ${milestone.status} animate-fadeInUp`}
                        style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                        onClick={() => setSelectedMilestone(milestone)}
                        aria-label={`${milestone.title} - ${milestone.status}`}
                    >
                        <div className="milestone-card-inner">
                            {/* Glow effect for unlocked */}
                            {milestone.status === 'unlocked' && (
                                <div className="milestone-glow" />
                            )}

                            {/* Icon */}
                            <div className="milestone-icon-wrapper">
                                <span className="milestone-icon">{milestone.icon}</span>
                                {milestone.status === 'locked' && (
                                    <span className="milestone-lock">🔒</span>
                                )}
                                {milestone.status === 'in-progress' && (
                                    <div className="milestone-progress-ring">
                                        <svg viewBox="0 0 36 36">
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                stroke="var(--color-neutral-700)"
                                                strokeWidth="2"
                                            />
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                stroke="var(--color-primary-500)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeDasharray={`${(milestone.progressPercent || 0) * 1.005} 100.5`}
                                                transform="rotate(-90 18 18)"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h4 className="milestone-title">{milestone.title}</h4>

                            {/* Status */}
                            <div className="milestone-status">
                                {milestone.status === 'unlocked' && (
                                    <span className="milestone-status-badge unlocked">
                                        ✓ {t('common.unlocked')}
                                    </span>
                                )}
                                {milestone.status === 'in-progress' && (
                                    <span className="milestone-status-badge in-progress">
                                        {milestone.progress}
                                    </span>
                                )}
                                {milestone.status === 'locked' && (
                                    <span className="milestone-status-badge locked">
                                        {t('common.locked')}
                                    </span>
                                )}
                            </div>

                            {/* XP Reward Preview */}
                            <div className="milestone-xp">
                                <span className="milestone-xp-icon">⚡</span>
                                <span className="milestone-xp-value">+{milestone.xpReward}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Milestone Detail Modal */}
            {selectedMilestone && (
                <>
                    <div
                        className="milestone-modal-backdrop"
                        onClick={() => setSelectedMilestone(null)}
                    />
                    <div className="milestone-modal animate-scaleIn">
                        <button
                            className="milestone-modal-close"
                            onClick={() => setSelectedMilestone(null)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <div className="milestone-modal-icon">{selectedMilestone.icon}</div>
                        <h3 className="milestone-modal-title">{selectedMilestone.title}</h3>
                        <p className="milestone-modal-desc">{selectedMilestone.description}</p>

                        {selectedMilestone.status === 'unlocked' && selectedMilestone.unlockedDate && (
                            <div className="milestone-modal-info">
                                <span className="milestone-modal-date">
                                    Unlocked on {selectedMilestone.unlockedDate}
                                </span>
                            </div>
                        )}

                        {selectedMilestone.status === 'in-progress' && (
                            <div className="milestone-modal-progress">
                                <div className="milestone-progress-bar large">
                                    <div
                                        className="milestone-progress-fill"
                                        style={{ width: `${selectedMilestone.progressPercent}%` }}
                                    />
                                </div>
                                <span className="milestone-modal-progress-text">
                                    {selectedMilestone.progress}
                                </span>
                            </div>
                        )}

                        <div className="milestone-modal-xp">
                            <span className="milestone-modal-xp-icon">⚡</span>
                            <span className="milestone-modal-xp-value">
                                {selectedMilestone.status === 'unlocked' ? '' : '+'}
                                {selectedMilestone.xpReward} XP
                            </span>
                            {selectedMilestone.status === 'unlocked' && (
                                <span className="milestone-modal-xp-label">Earned</span>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MilestonesView;
