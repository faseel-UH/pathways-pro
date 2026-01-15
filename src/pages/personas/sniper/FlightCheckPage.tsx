import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const MOCK_FLIGHT_CHECK = [
    { label: 'Subject Requirements', status: 'success', detail: 'Your subjects align with requirements' },
    { label: 'Grade Prediction', status: 'success', detail: 'Your predicted grades meet the threshold' },
    { label: 'Mathematics Level', status: 'warning', detail: 'Consider upgrading to Higher Level for Imperial' },
    { label: 'English Requirements', status: 'success', detail: 'Curriculum-based assessment sufficient' },
    { label: 'Extracurriculars', status: 'warning', detail: 'Add super-curricular activities to stand out' },
    { label: 'Work Experience', status: 'success', detail: 'Hospital volunteering noted' },
];

const FlightCheckPage = () => {
    const navigate = useNavigate();
    const { state } = useApp();
    const [isLoading, setIsLoading] = useState(true);
    // const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // setShowResults(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // const successCount = MOCK_FLIGHT_CHECK.filter(item => item.status === 'success').length;
    const warningCount = MOCK_FLIGHT_CHECK.filter(item => item.status === 'warning').length;
    const overallStatus = warningCount === 0 ? 'On Track' : 'Optimization Opportunity';

    const handleContinue = () => {
        navigate('/dashboard');
    };

    if (isLoading) {
        return (
            <div className="page-centered">
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto var(--space-6)' }}></div>
                    <h2 style={{ marginBottom: 'var(--space-2)' }}>Analyzing Your Profile</h2>
                    <p className="text-secondary">Running Flight Check for {state.careerTarget.discipline}...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/sniper/university')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">3/3</span>
            </div>

            <div className="flight-check-container">
                <div className="flight-check-header animate-fadeIn">
                    <span className={`flight-check-status ${warningCount > 0 ? 'warning' : ''}`}>
                        {warningCount === 0 ? '✓' : '⚡'} {overallStatus}
                    </span>
                    <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                        Flight Check Complete
                    </h1>
                    <p className="text-secondary">
                        {warningCount === 0
                            ? 'You are solid. Keep pushing!'
                            : 'Great progress! Here are opportunities to boost your chances.'}
                    </p>
                </div>

                <div className="flight-check-list">
                    {MOCK_FLIGHT_CHECK.map((item, index) => (
                        <div
                            key={item.label}
                            className="flight-check-item animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`flight-check-icon ${item.status}`}>
                                {item.status === 'success' ? '✓' : '⚡'}
                            </div>
                            <div className="flight-check-content">
                                <div className="flight-check-label">{item.label}</div>
                                <div className="flight-check-detail">{item.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {warningCount > 0 && (
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>
                            Recommended Actions
                        </h3>
                        <div className="nudge-card" style={{ marginBottom: 'var(--space-3)' }}>
                            <div className="nudge-icon">📚</div>
                            <div className="nudge-content">
                                <div className="nudge-title">UniHawk Test Prep</div>
                                <div className="nudge-description">Boost your competitive edge with UCAT preparation</div>
                            </div>
                        </div>
                        <div className="nudge-card">
                            <div className="nudge-icon">🔬</div>
                            <div className="nudge-content">
                                <div className="nudge-title">Virtual Doctor Shadowing</div>
                                <div className="nudge-description">Gain clinical exposure from A Learning Lab</div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="btn btn-primary btn-lg btn-full animate-fadeInUp"
                    onClick={handleContinue}
                    style={{ marginTop: 'var(--space-8)', animationDelay: '0.8s' }}
                >
                    Build My Roadmap
                </button>
            </div>
        </div>
    );
};

export default FlightCheckPage;
