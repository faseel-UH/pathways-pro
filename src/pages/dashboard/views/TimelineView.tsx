import { useI18n } from '../../../i18n';
import {
    CheckIcon,
    TargetIcon,
    BookIcon,
    ClockIcon,
    GraduationCapIcon,
    CalendarIcon,
    StarIcon,
} from '../../../components/common/Icons';

interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'active' | 'upcoming';
    icon: React.FC<{ size?: number; className?: string }>;
    category?: string;
}

const TIMELINE_ITEMS: TimelineItem[] = [
    {
        id: '1',
        title: 'Profile Assessment Complete',
        description: 'Initial career assessment and pathway selection finished',
        date: 'Jan 10, 2026',
        status: 'completed',
        icon: CheckIcon,
        category: 'Foundation',
    },
    {
        id: '2',
        title: 'Academic Requirements Review',
        description: 'Confirmed subject alignment with Medicine pathway',
        date: 'Jan 12, 2026',
        status: 'completed',
        icon: BookIcon,
        category: 'Foundation',
    },
    {
        id: '3',
        title: 'UCAT Registration',
        description: 'Register for UCAT examination - deadline approaching',
        date: 'Jan 15, 2026',
        status: 'active',
        icon: TargetIcon,
        category: 'Test Prep',
    },
    {
        id: '4',
        title: 'Super-Curricular Project Start',
        description: 'Begin medical research essay or project',
        date: 'Feb 1, 2026',
        status: 'upcoming',
        icon: StarIcon,
        category: 'Experience',
    },
    {
        id: '5',
        title: 'Work Experience Week',
        description: 'Complete hospital shadowing or clinical placement',
        date: 'Mar 15, 2026',
        status: 'upcoming',
        icon: ClockIcon,
        category: 'Experience',
    },
    {
        id: '6',
        title: 'UCAS Application Opens',
        description: 'Begin drafting personal statement and gathering references',
        date: 'Sep 1, 2026',
        status: 'upcoming',
        icon: CalendarIcon,
        category: 'Application',
    },
    {
        id: '7',
        title: 'Early Application Deadline',
        description: 'Submit UCAS application for Medicine',
        date: 'Oct 15, 2026',
        status: 'upcoming',
        icon: GraduationCapIcon,
        category: 'Application',
    },
];

const TimelineView = () => {
    const { t, direction } = useI18n();

    const completedCount = TIMELINE_ITEMS.filter(item => item.status === 'completed').length;
    const progressPercent = ((completedCount + 0.5) / TIMELINE_ITEMS.length) * 100;

    return (
        <div className="timeline-view-v2" dir={direction}>
            {/* Header Section */}
            <div className="timeline-header-v2">
                <div className="timeline-header-text">
                    <h3 className="timeline-title-v2">{t('dashboard.timeline.title')}</h3>
                    <p className="timeline-subtitle-v2">
                        {t('dashboard.timeline.subtitle', { pathway: 'Medicine' })}
                    </p>
                </div>
                <div className="timeline-stats-v2">
                    <div className="timeline-stat-v2">
                        <span className="timeline-stat-number">{completedCount}</span>
                        <span className="timeline-stat-label-v2">{t('common.completed')}</span>
                    </div>
                    <div className="timeline-stat-v2">
                        <span className="timeline-stat-number accent">{TIMELINE_ITEMS.length - completedCount}</span>
                        <span className="timeline-stat-label-v2">Remaining</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar with Centered Pulse */}
            <div className="timeline-progress-v2">
                <div className="timeline-progress-track">
                    <div
                        className="timeline-progress-fill-v2"
                        style={{ width: `${progressPercent}%` }}
                    />
                    {/* Centered pulse indicator */}
                    <div
                        className="timeline-progress-dot"
                        style={{ left: `${progressPercent}%` }}
                    >
                        <span className="timeline-dot-inner" />
                        <span className="timeline-dot-pulse-ring" />
                        <span className="timeline-dot-glow" />
                    </div>
                </div>
            </div>

            {/* Timeline Items */}
            <div className="timeline-list-v2">
                {TIMELINE_ITEMS.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div
                            key={item.id}
                            className={`timeline-item-v2 ${item.status}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Connector Line */}
                            {index < TIMELINE_ITEMS.length - 1 && (
                                <div className={`timeline-connector ${item.status}`} />
                            )}

                            {/* Status Dot */}
                            <div className={`timeline-marker ${item.status}`}>
                                <div className="timeline-marker-inner">
                                    {item.status === 'completed' ? (
                                        <CheckIcon size={14} className="timeline-marker-icon" />
                                    ) : item.status === 'active' ? (
                                        <>
                                            <span className="timeline-active-core" />
                                            <span className="timeline-active-pulse" />
                                        </>
                                    ) : (
                                        <span className="timeline-upcoming-dot" />
                                    )}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="timeline-content-v2">
                                <div className="timeline-date-v2">{item.date}</div>
                                <div className={`timeline-card-v2 ${item.status}`}>
                                    <div className="timeline-card-header-v2">
                                        <div className={`timeline-icon-wrapper ${item.status}`}>
                                            <IconComponent size={18} />
                                        </div>
                                        <div className="timeline-card-text">
                                            <h4 className="timeline-card-title-v2">{item.title}</h4>
                                            {item.category && (
                                                <span className={`timeline-category ${item.status}`}>
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="timeline-card-desc-v2">{item.description}</p>

                                    {item.status === 'active' && (
                                        <button className="timeline-action-btn">
                                            <span>Take Action</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}

                                    {item.status === 'completed' && (
                                        <div className="timeline-completed-badge">
                                            <CheckIcon size={12} />
                                            <span>{t('common.completed')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TimelineView;
