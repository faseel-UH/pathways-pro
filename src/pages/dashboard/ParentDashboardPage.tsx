import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ChecklistView from './views/ChecklistView';
import TimelineView from './views/TimelineView';
import MilestonesView from './views/MilestonesView';

type DashboardTab = 'checklist' | 'timeline' | 'milestones';

const ParentDashboardPage = () => {
    const navigate = useNavigate();
    const { state } = useApp();
    const [activeTab, setActiveTab] = useState<DashboardTab>('timeline');

    const tabs: { id: DashboardTab; label: string; icon: string }[] = [
        { id: 'timeline', label: 'Timeline', icon: '📅' },
        { id: 'checklist', label: 'Tasks', icon: '✓' },
        { id: 'milestones', label: 'Milestones', icon: '🏆' },
    ];

    const pathway = state.careerTarget.discipline
        || state.strategistChoice
        || state.explorerDomains[0]
        || 'Medicine'; // Fallback for demo

    // Mock approval items
    const approvalItems = [
        { id: 1, title: 'Set Career Target: ' + pathway, date: 'Today' },
        { id: 2, title: 'Book UCAT Assessment', date: 'Yesterday' },
    ];

    const renderView = () => {
        // In a real app, we'd pass a "readOnly" prop to these views
        switch (activeTab) {
            case 'checklist':
                return <ChecklistView />;
            case 'timeline':
                return <TimelineView />;
            case 'milestones':
                return <MilestonesView />;
            default:
                return <TimelineView />;
        }
    };

    return (
        <div className="dashboard parent-mode">
            {/* Header */}
            <header className="dashboard-header" style={{ borderBottom: '2px solid var(--color-accent-500)' }}>
                <div className="dashboard-user">
                    <div className="dashboard-avatar" style={{ background: 'var(--gradient-accent)' }}>
                        P
                    </div>
                    <div className="dashboard-greeting">
                        <div className="dashboard-name">
                            Parent View <span className="badge badge-accent">Shadow Mode</span>
                        </div>
                        <div className="dashboard-pathway">
                            Viewing: {state.userProfile.name || 'Student'}
                        </div>
                    </div>
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate('/dashboard')}
                        style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)' }}
                    >
                        Switch to Student
                    </button>
                </div>

                {/* Pending Approvals Card */}
                <div className="card" style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--color-accent-500)' }}>
                    <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--color-accent-400)' }}>
                        ⚠️ Action Required
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {approvalItems.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 'var(--space-2)',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <span style={{ fontSize: 'var(--text-sm)' }}>{item.title}</span>
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <button className="btn btn-sm" style={{ padding: '4px 8px', fontSize: '12px', background: 'rgba(255,255,255,0.1)' }}>Reject</button>
                                    <button className="btn btn-sm btn-primary" style={{ padding: '4px 8px', fontSize: '12px' }}>Approve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <nav className="dashboard-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span style={{ marginRight: 'var(--space-2)' }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Content */}
            <main className="dashboard-content" style={{ opacity: 0.9 }}>
                {renderView()}
            </main>
        </div>
    );
};

export default ParentDashboardPage;
