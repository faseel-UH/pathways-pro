import { ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import './DashboardPage.css';

interface DashboardPageProps {
    children: ReactNode;
}

const DashboardPage = ({ children }: DashboardPageProps) => {
    const { state } = useApp();
    const { t, direction } = useI18n();

    const pathway = state.careerTarget.discipline
        || state.strategistChoice
        || state.explorerDomains[0]
        || 'Your Pathway';

    const progressPercent = 35; // Mock progress
    const userName = state.userProfile.name?.split(' ')[0] || 'Student';

    return (
        <div className="dashboard-page" dir={direction}>
            {/* Skip to content for accessibility */}
            <a href="#main-content" className="sr-only">
                {t('accessibility.skipToContent')}
            </a>

            {/* Dashboard Header */}
            <header className="dashboard-header">
                <div className="dashboard-header-content">
                    <div className="dashboard-greeting">
                        <h1 className="dashboard-title">
                            {t('dashboard.greeting', { name: userName })} 👋
                        </h1>
                        <p className="dashboard-subtitle">
                            {t('dashboard.pathwayLabel', { pathway })}
                        </p>
                    </div>
                    <div className="dashboard-header-actions">
                        <LanguageSwitcher variant="compact" />
                    </div>
                </div>

                {/* Progress Card */}
                <div className="progress-card">
                    <div className="progress-card-header">
                        <span className="progress-label">
                            {t('dashboard.journeyProgress')}
                        </span>
                        <span className="progress-value">{progressPercent}%</span>
                    </div>
                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercent}%` }}
                            role="progressbar"
                            aria-valuenow={progressPercent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                    <div className="progress-milestones">
                        <div className="milestone" data-complete="true" style={{ left: '25%' }}>
                            <span className="milestone-dot" />
                            <span className="milestone-label">Profile</span>
                        </div>
                        <div className="milestone" style={{ left: '50%' }}>
                            <span className="milestone-dot" />
                            <span className="milestone-label">Prep</span>
                        </div>
                        <div className="milestone" style={{ left: '75%' }}>
                            <span className="milestone-dot" />
                            <span className="milestone-label">Apply</span>
                        </div>
                        <div className="milestone" style={{ left: '100%' }}>
                            <span className="milestone-dot" />
                            <span className="milestone-label">Success</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main id="main-content" className="dashboard-content">
                <div className="dashboard-content-inner animate-fadeIn">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
