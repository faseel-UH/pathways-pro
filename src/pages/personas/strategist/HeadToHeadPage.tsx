import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

// Mock comparison data
const COMPARISON_DATA: Record<string, Record<string, string>> = {
    'Medicine': {
        'Academic Requirements': 'AAA / 40+ IB',
        'Study Duration': '5-6 years',
        'Average Salary': '$85,000 - $300,000',
        'Job Competition': 'Very High',
        'Key Subjects': 'Biology, Chemistry',
        'Work-Life Balance': 'Challenging',
    },
    'Engineering': {
        'Academic Requirements': 'AAB / 36+ IB',
        'Study Duration': '4 years',
        'Average Salary': '$70,000 - $150,000',
        'Job Competition': 'Medium',
        'Key Subjects': 'Math, Physics',
        'Work-Life Balance': 'Moderate',
    },
    'Computer Science': {
        'Academic Requirements': 'AAB / 36+ IB',
        'Study Duration': '3-4 years',
        'Average Salary': '$80,000 - $200,000',
        'Job Competition': 'Medium-High',
        'Key Subjects': 'Math, Further Math',
        'Work-Life Balance': 'Flexible',
    },
    'Business': {
        'Academic Requirements': 'ABB / 34+ IB',
        'Study Duration': '3-4 years',
        'Average Salary': '$50,000 - $150,000',
        'Job Competition': 'High',
        'Key Subjects': 'Economics, Math',
        'Work-Life Balance': 'Variable',
    },
};

const DEFAULT_DATA = {
    'Academic Requirements': 'AAB / 36+ IB',
    'Study Duration': '3-4 years',
    'Average Salary': '$60,000 - $120,000',
    'Job Competition': 'Medium',
    'Key Subjects': 'Varies',
    'Work-Life Balance': 'Moderate',
};

const HeadToHeadPage = () => {
    const navigate = useNavigate();
    const { state } = useApp();

    const [optionA, optionB] = state.strategistComparison || ['Medicine', 'Engineering'];
    const dataA = COMPARISON_DATA[optionA] || DEFAULT_DATA;
    const dataB = COMPARISON_DATA[optionB] || DEFAULT_DATA;

    const metrics = Object.keys(dataA);

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/strategist/comparison-setup')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '50%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">2/4</span>
            </div>

            <div className="page-content">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                        Head to Head
                    </h1>
                    <p className="text-secondary">
                        Compare key factors side by side
                    </p>
                </div>

                <div className="comparison-container" style={{ marginBottom: 'var(--space-6)' }}>
                    {/* Option A */}
                    <div className="comparison-card">
                        <div className="comparison-header">
                            <h3 className="comparison-title">{optionA}</h3>
                        </div>
                        {metrics.map((metric) => (
                            <div key={metric} className="comparison-row">
                                <span className="comparison-label">{metric}</span>
                                <span className="comparison-value">{dataA[metric]}</span>
                            </div>
                        ))}
                    </div>

                    {/* Option B */}
                    <div className="comparison-card">
                        <div className="comparison-header">
                            <h3 className="comparison-title">{optionB}</h3>
                        </div>
                        {metrics.map((metric) => (
                            <div key={metric} className="comparison-row">
                                <span className="comparison-label">{metric}</span>
                                <span className="comparison-value">{dataB[metric]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-lg btn-full"
                    onClick={() => navigate('/strategist/tie-breaker')}
                >
                    Help Me Decide
                </button>

                <p className="text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                    Still not sure? Let's dig deeper with some key questions.
                </p>
            </div>
        </div>
    );
};

export default HeadToHeadPage;
