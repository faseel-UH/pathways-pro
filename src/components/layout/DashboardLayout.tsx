// Design System v2.0 - Updated 2026-01-14 14:10
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import AIChatModal from '../ai/AIChatModal';
import {
    HomeIcon,
    CheckSquareIcon,
    CalendarIcon,
    ListIcon,
    TrophyIcon,
    CompassIcon,
    GraduationCapIcon,
    UserIcon,
    LogOutIcon,
    MenuIcon,
    XIcon,
    SunIcon,
    MoonIcon,
    SparklesIcon,
    PanelLeftIcon,
} from '../common/Icons';
import './DashboardLayout.css';

interface NavItem {
    path: string;
    label: string;
    icon: React.FC<{ size?: number; className?: string }>;
    end?: boolean;
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

const DashboardLayout = () => {
    const { direction } = useI18n();
    const navigate = useNavigate();
    const location = useLocation();
    const { resetState, state } = useApp();
    const { theme, toggleTheme } = useTheme();
    const [chatOpen, setChatOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on navigation
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const navGroups: NavGroup[] = [
        {
            title: 'Dashboard',
            items: [
                { path: '/dashboard', label: 'Home', icon: HomeIcon, end: true },
            ],
        },
        {
            title: 'Views',
            items: [
                { path: '/dashboard/checklist', label: 'Tasks', icon: CheckSquareIcon },
                { path: '/dashboard/timeline', label: 'Timeline', icon: CalendarIcon },
                { path: '/dashboard/weekly', label: 'This Week', icon: ListIcon },
                { path: '/dashboard/milestones', label: 'Milestones', icon: TrophyIcon },
            ],
        },
        {
            title: 'Discover',
            items: [
                { path: '/dashboard/explore', label: 'Explore', icon: CompassIcon },
                { path: '/dashboard/universities', label: 'Universities', icon: GraduationCapIcon },
            ],
        },
        {
            title: 'Account',
            items: [
                { path: '/dashboard/profile', label: 'Profile', icon: UserIcon },
            ],
        },
    ];

    const handleLogout = () => {
        resetState();
        navigate('/login');
    };

    const userName = state.userProfile.name?.split(' ')[0] || 'Student';
    const userInitial = (state.userProfile.name || 'S').charAt(0).toUpperCase();

    return (
        <div className={`dashboard-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} dir={direction}>
            {/* Mobile Header */}
            <header className="mobile-header">
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <MenuIcon size={24} />
                </button>
                <div className="mobile-logo">
                    <span className="logo-icon">P</span>
                    <span className="logo-text">Pathways</span>
                </div>
                <button
                    className="mobile-theme-btn"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span className="logo-icon">P</span>
                        {!sidebarCollapsed && <span className="logo-text">Pathways Pro</span>}
                    </div>
                    <button
                        className="sidebar-close-btn mobile-only"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <XIcon size={20} />
                    </button>
                    <button
                        className="sidebar-collapse-btn desktop-only"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <PanelLeftIcon size={18} />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="sidebar-user">
                    <div className="user-avatar">
                        <span className="user-avatar-text">{userInitial}</span>
                    </div>
                    {!sidebarCollapsed && (
                        <div className="user-info">
                            <span className="user-name">{userName}</span>
                            <span className="user-role">Student</span>
                        </div>
                    )}
                </div>

                {/* Navigation Groups */}
                <nav className="sidebar-nav">
                    {navGroups.map((group) => (
                        <div key={group.title} className="nav-group">
                            {!sidebarCollapsed && (
                                <span className="nav-group-title">{group.title}</span>
                            )}
                            <ul className="nav-group-items">
                                {group.items.map((item) => (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `nav-item ${isActive ? 'active' : ''}`
                                            }
                                            end={item.end}
                                            title={sidebarCollapsed ? item.label : undefined}
                                        >
                                            <item.icon size={20} className="nav-icon" />
                                            {!sidebarCollapsed && (
                                                <span className="nav-label">{item.label}</span>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="sidebar-footer">
                    <button
                        className="nav-item theme-toggle"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <SunIcon size={20} className="nav-icon" />
                        ) : (
                            <MoonIcon size={20} className="nav-icon" />
                        )}
                        {!sidebarCollapsed && (
                            <span className="nav-label">
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        )}
                    </button>
                    <button
                        className="nav-item logout-btn"
                        onClick={handleLogout}
                        title="Log out"
                    >
                        <LogOutIcon size={20} className="nav-icon" />
                        {!sidebarCollapsed && <span className="nav-label">Log Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <Outlet />
            </main>

            {/* AI Chat FAB */}
            <button
                className="ai-chat-fab"
                onClick={() => setChatOpen(true)}
                aria-label="Open AI Assistant"
            >
                <SparklesIcon size={24} className="ai-fab-icon" />
                <span className="ai-fab-pulse" />
            </button>

            {/* AI Chat Modal */}
            <AIChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
