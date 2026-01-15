import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

// Enhanced comparison data with difficulty score (0-100) and specific metrics
const COMPARISON_DATA: Record<string, any> = {
    'Medicine': {
        icon: '🩺',
        salary: '$208k',
        education: '5-6 Yrs',
        growth: '+3%',
        difficulty: 95,
        difficultyLabel: 'Very High',
        analysis: 'Medicine offers high stability and impact but requires the longest training path and highest entry grades.',
    },
    'Engineering': {
        icon: '⚙️',
        salary: '$120k',
        education: '4 Yrs',
        growth: '+22%',
        difficulty: 85,
        difficultyLabel: 'High',
        analysis: 'Engineering provides strong starting salaries and adaptability across industries, with a moderate academic load.',
    },
    'Computer Science': {
        icon: '💻',
        salary: '$130k',
        education: '3-4 Yrs',
        growth: '+25%',
        difficulty: 80,
        difficultyLabel: 'High',
        analysis: 'Rapid career progression and remote flexibility, but requires continuous learning of new technologies.',
    },
    'Business': {
        icon: '📊',
        salary: '$95k',
        education: '3-4 Yrs',
        growth: '+9%',
        difficulty: 65,
        difficultyLabel: 'Medium',
        analysis: 'Broad career options and lower entry barriers, but highly competitive at top levels.',
    },
    'Law': {
        icon: '⚖️',
        salary: '$140k',
        education: '5-6 Yrs',
        growth: '+10%',
        difficulty: 90,
        difficultyLabel: 'Very High',
        analysis: 'Prestigious and lucrative, but involves intense academic rigor and long working hours.',
    },
    'Psychology': {
        icon: '🧠',
        salary: '$90k',
        education: '4-6 Yrs',
        growth: '+14%',
        difficulty: 75,
        difficultyLabel: 'Medium-High',
        analysis: 'Growing demand in mental health and corporate sectors, requiring strong analytical and empathy skills.',
    },
    'Architecture': {
        icon: '🏛️',
        salary: '$100k',
        education: '5 Yrs',
        growth: '+5%',
        difficulty: 85,
        difficultyLabel: 'High',
        analysis: 'Combines creativity with engineering, requiring a long study period and portfolio development.',
    },
    'Arts & Design': {
        icon: '🎨',
        salary: '$70k',
        education: '3-4 Yrs',
        growth: '+6%',
        difficulty: 60,
        difficultyLabel: 'Medium',
        analysis: 'Highly creative and flexible, but income stability can vary significantly based on portfolio.',
    },
    'Economics': {
        icon: '📈',
        salary: '$110k',
        education: '3-4 Yrs',
        growth: '+13%',
        difficulty: 80,
        difficultyLabel: 'High',
        analysis: 'Strong analytical foundation applicable to finance and policy, with excellent earning potential.',
    },
    'Biology': {
        icon: '🧬',
        salary: '$85k',
        education: '4 Yrs',
        growth: '+7%',
        difficulty: 85,
        difficultyLabel: 'High',
        analysis: 'Essential for research and biotech roles, often requiring postgraduate degrees for higher salaries.',
    },
    'Physics': {
        icon: '⚛️',
        salary: '$115k',
        education: '4 Yrs',
        growth: '+8%',
        difficulty: 95,
        difficultyLabel: 'Very High',
        analysis: 'Opening doors to research, data science, and engineering, but mathematically demanding.',
    },
    'Journalism': {
        icon: '📝',
        salary: '$60k',
        education: '3-4 Yrs',
        growth: '-2%',
        difficulty: 60,
        difficultyLabel: 'Medium',
        analysis: 'Fast-paced and impactful, but faces industry disruption and lower starting salaries.',
    },
};

const DEFAULT_DATA = {
    icon: '❓',
    salary: '$75k',
    education: '4 Yrs',
    growth: '+5%',
    difficulty: 50,
    difficultyLabel: 'Medium',
    analysis: 'A viable career path with balanced requirements and rewards.',
};

const HeadToHeadPage = () => {
    const navigate = useNavigate();
    const { state } = useApp();

    const [optionA, optionB] = state.strategistComparison || ['Engineering', 'Finance'];

    // Handle case where Finance might be Business in our data map
    const keyA = optionA === 'Finance' ? 'Business' : optionA;
    const keyB = optionB === 'Finance' ? 'Business' : optionB;

    const dataA = COMPARISON_DATA[keyA] || DEFAULT_DATA;
    const dataB = COMPARISON_DATA[keyB] || DEFAULT_DATA;

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/strategist/comparison-setup')}>
                    ←
                </button>
                <div style={{ flex: 1, textAlign: 'center', fontWeight: 'var(--font-bold)' }}>
                    Strategist View
                </div>
                <div style={{ width: '40px' }}></div> {/* Spacer for balance */}
            </div>

            <div className="page-content" style={{ paddingBottom: '100px' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
                        Head-to-Head
                    </h1>
                    <p className="text-secondary" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-success-400)' }}>
                        Career Comparison
                    </p>
                    <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                        Analyze salary, growth, and requirements side-by-side.
                    </p>
                </div>

                <div className="h2h-container">
                    {/* Hero VS Section */}
                    <div className="h2h-hero">
                        <div className="h2h-option">
                            <div className="h2h-icon">{dataA.icon}</div>
                            <div className="h2h-title">{optionA}</div>
                            <div className="h2h-subtitle">Career Path A</div>
                        </div>

                        <div className="h2h-vs-badge">VS</div>

                        <div className="h2h-option">
                            <div className="h2h-icon">{dataB.icon}</div>
                            <div className="h2h-title">{optionB}</div>
                            <div className="h2h-subtitle">Career Path B</div>
                        </div>
                    </div>

                    {/* Metric Cards - Salary */}
                    <div className="metric-grid">
                        <div className="metric-card animate-fadeInUp stagger-1">
                            <span className="metric-label">Avg Salary</span>
                            <span className="metric-value">{dataA.salary}</span>
                            <span className="metric-label">/yr</span>
                        </div>
                        <div className="metric-card animate-fadeInUp stagger-1">
                            <span className="metric-label">Avg Salary</span>
                            <span className="metric-value">{dataB.salary}</span>
                            <span className="metric-label">/yr</span>
                        </div>
                    </div>

                    {/* Metric Cards - Education */}
                    <div className="metric-grid" style={{ marginTop: '-12px' }}>
                        <div className="metric-card animate-fadeInUp stagger-2">
                            <span className="metric-label">Education</span>
                            <span className="metric-value">{dataA.education}</span>
                        </div>
                        <div className="metric-card animate-fadeInUp stagger-2">
                            <span className="metric-label">Education</span>
                            <span className="metric-value">{dataB.education}</span>
                        </div>
                    </div>

                    {/* Metric Cards - Growth */}
                    <div className="metric-grid" style={{ marginTop: '-12px' }}>
                        <div className="metric-card animate-fadeInUp stagger-3">
                            <span className="metric-label">Job Growth</span>
                            <div className="metric-trend trend-up">
                                {dataA.growth} ↗
                            </div>
                        </div>
                        <div className="metric-card animate-fadeInUp stagger-3">
                            <span className="metric-label">Job Growth</span>
                            <div className="metric-trend trend-up">
                                {dataB.growth} ↗
                            </div>
                        </div>
                    </div>

                    {/* Detailed Analysis - Difficulty Curve */}
                    <div className="analysis-section animate-fadeInUp stagger-4">
                        <div className="analysis-title">
                            <span>Difficulty Curve</span>
                            <span style={{ fontSize: 'var(--text-lg)' }}>🎓</span>
                        </div>

                        {/* Option A Bar */}
                        <div className="diff-bar-container">
                            <div className="diff-bar-label">
                                <span>{optionA}</span>
                                <span className={dataA.difficulty > 80 ? 'text-error' : 'text-warning'}>
                                    {dataA.difficultyLabel}
                                </span>
                            </div>
                            <div className="diff-bar-track">
                                <div
                                    className="diff-bar-fill"
                                    style={{
                                        width: `${dataA.difficulty}%`,
                                        background: dataA.difficulty > 80 ? 'var(--color-error-400)' : 'var(--color-warning-400)'
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Option B Bar */}
                        <div className="diff-bar-container" style={{ marginBottom: 0 }}>
                            <div className="diff-bar-label">
                                <span>{optionB}</span>
                                <span className={dataB.difficulty > 80 ? 'text-error' : 'text-warning'}>
                                    {dataB.difficultyLabel}
                                </span>
                            </div>
                            <div className="diff-bar-track">
                                <div
                                    className="diff-bar-fill"
                                    style={{
                                        width: `${dataB.difficulty}%`,
                                        background: dataB.difficulty > 80 ? 'var(--color-error-400)' : 'var(--color-warning-400)'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <div>
                        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                            AI Strategist Insight
                        </h3>
                        <div className="ai-insight-card animate-fadeInUp stagger-5">
                            <div className="ai-icon">✨</div>
                            <div className="ai-text">
                                <span className="ai-highlight">{optionA}</span> {dataA.analysis.toLowerCase()}
                                <br /><br />
                                <span className="ai-highlight">{optionB}</span>, in comparison, {dataB.analysis.toLowerCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Footer Action */}
                <div className="floating-action-bar animate-fadeInUp delay-500">
                    <button
                        className="btn btn-primary btn-lg btn-full"
                        onClick={() => navigate('/strategist/tie-breaker')}
                        style={{ boxShadow: 'var(--shadow-xl)' }}
                    >
                        View Full Roadmap →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeadToHeadPage;
