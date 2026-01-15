import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../i18n';
import {
    GlobeIcon,
    BellIcon,
    SunIcon,
    MoonIcon,
    ChevronRightIcon,
    TargetIcon,
    BookIcon,
    TrophyIcon,
    StarIcon,
} from '../../components/common/Icons';
import './ProfilePage.css';

const ProfilePage = () => {
    const { state } = useApp();
    const { theme, toggleTheme } = useTheme();
    const { t, direction } = useI18n();

    const userName = state.userProfile.name || 'Student';
    const userInitial = userName.charAt(0).toUpperCase();
    const pathway = state.careerTarget.discipline
        || state.strategistChoice
        || state.explorerDomains[0]
        || 'Your Pathway';

    const profileData = {
        email: state.userProfile.email || 'student@pathways.pro',
        school: state.userProfile.school || 'Not Set',
        grade: state.userProfile.grade || 'Not Set',
        curriculum: state.userProfile.curriculum || 'Not Set',
        location: state.userProfile.location || 'Not Set',
    };

    // Mock achievements with proper icons
    const achievements = [
        { id: 1, icon: TargetIcon, label: 'Persona Discovered', unlocked: true },
        { id: 2, icon: BookIcon, label: 'First Sprint Complete', unlocked: false },
        { id: 3, icon: TrophyIcon, label: 'Milestone Reached', unlocked: false },
        { id: 4, icon: StarIcon, label: 'Perfect Week', unlocked: false },
    ];

    return (
        <div className="profile-page" dir={direction}>
            {/* User Header */}
            <div className="profile-header">
                <div className="profile-avatar-large">
                    <span className="profile-avatar-text">{userInitial}</span>
                </div>
                <h1 className="profile-name">{userName}</h1>
                <p className="profile-pathway">{pathway}</p>
            </div>

            {/* Info Section */}
            <section className="profile-section">
                <h2 className="profile-section-title">{t('profile.personalInfo')}</h2>
                <div className="profile-card">
                    <div className="profile-info-item">
                        <span className="profile-info-label">{t('profile.email')}</span>
                        <span className="profile-info-value">{profileData.email}</span>
                    </div>
                    <div className="profile-info-item">
                        <span className="profile-info-label">{t('profile.school')}</span>
                        <span className="profile-info-value">{profileData.school}</span>
                    </div>
                    <div className="profile-info-item">
                        <span className="profile-info-label">{t('profile.grade')}</span>
                        <span className="profile-info-value">{profileData.grade}</span>
                    </div>
                    <div className="profile-info-item">
                        <span className="profile-info-label">{t('profile.curriculum')}</span>
                        <span className="profile-info-value">{profileData.curriculum}</span>
                    </div>
                    <div className="profile-info-item">
                        <span className="profile-info-label">{t('profile.location')}</span>
                        <span className="profile-info-value">{profileData.location}</span>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="profile-section">
                <h2 className="profile-section-title">{t('profile.achievements')}</h2>
                <div className="achievements-grid">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                        >
                            <div className="achievement-icon">
                                <achievement.icon size={24} />
                            </div>
                            <div className="achievement-label">{achievement.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Settings */}
            <section className="profile-section">
                <h2 className="profile-section-title">{t('profile.settings')}</h2>
                <div className="profile-card">
                    <button className="profile-setting-item">
                        <span className="profile-setting-icon">
                            <GlobeIcon size={20} />
                        </span>
                        <span className="profile-setting-label">{t('profile.language')}</span>
                        <span className="profile-setting-value">English</span>
                        <ChevronRightIcon size={16} className="profile-setting-arrow" />
                    </button>
                    <button className="profile-setting-item">
                        <span className="profile-setting-icon">
                            <BellIcon size={20} />
                        </span>
                        <span className="profile-setting-label">{t('profile.notifications')}</span>
                        <span className="profile-setting-value">Enabled</span>
                        <ChevronRightIcon size={16} className="profile-setting-arrow" />
                    </button>
                    <button
                        className="profile-setting-item"
                        onClick={toggleTheme}
                    >
                        <span className="profile-setting-icon">
                            {theme === 'dark' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                        </span>
                        <span className="profile-setting-label">{t('profile.theme')}</span>
                        <span className="profile-setting-value">
                            {theme === 'dark' ? 'Dark' : 'Light'}
                        </span>
                        <ChevronRightIcon size={16} className="profile-setting-arrow" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
