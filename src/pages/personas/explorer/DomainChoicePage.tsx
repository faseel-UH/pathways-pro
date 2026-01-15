import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import '../../../styles/cards.css';

interface DomainMetadata {
    icon: string;
    description: string;
    difficulty: 'High' | 'Medium' | 'Variable';
    outlook: 'Growing' | 'Stable' | 'Competitive';
    salary: '$$$' | '$$' | '$';
}

const DOMAIN_DATA: Record<string, DomainMetadata> = {
    'Healthcare & Medicine': {
        icon: '🩺',
        description: 'A rigorous journey combining biology, chemistry, and clinical skills to save lives.',
        difficulty: 'High',
        outlook: 'Growing',
        salary: '$$$'
    },
    'Engineering & Tech': {
        icon: '🚀',
        description: 'Design the future through innovation, coding, and problem-solving.',
        difficulty: 'High',
        outlook: 'Growing',
        salary: '$$$'
    },
    'Business & Economics': {
        icon: '💼',
        description: 'Navigate the corporate world, markets, and entrepreneurship.',
        difficulty: 'Medium',
        outlook: 'Stable',
        salary: '$$'
    },
    'Law & Politics': {
        icon: '⚖️',
        description: 'Advocate for justice and shape society through policy and debate.',
        difficulty: 'High',
        outlook: 'Competitive',
        salary: '$$$'
    },
    // Fallback for others
    'default': {
        icon: '🎓',
        description: 'Explore this exciting field and discover new opportunities.',
        difficulty: 'Medium',
        outlook: 'Stable',
        salary: '$$'
    }
};

const DomainChoicePage = () => {
    const navigate = useNavigate();
    const { state } = useApp();
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [choice, setChoice] = useState<'explore' | 'commit' | null>(null);

    const domains = state.explorerDomains.length > 0
        ? state.explorerDomains
        : ['Healthcare & Medicine', 'Engineering & Tech', 'Business & Economics', 'Law & Politics'];

    const handleContinue = () => {
        navigate('/dashboard');
    };

    const getMetadata = (domain: string) => DOMAIN_DATA[domain] || DOMAIN_DATA['default'];

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/explorer/archetype')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>

            <div className="page-content">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }} className="animate-fadeIn">
                    <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
                        Choose your path
                    </h1>
                    <p className="text-secondary">
                        Select a domain to dive deeper into
                    </p>
                </div>

                <div className="domain-grid animate-fadeInUp stagger-1">
                    {domains.map((domain) => {
                        const meta = getMetadata(domain);
                        const isSelected = selectedDomain === domain;

                        return (
                            <div
                                key={domain}
                                className={`career-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedDomain(domain)}
                                data-domain={domain}
                            >
                                <div className="card-header">
                                    <div className="selection-overlay">✓</div>
                                </div>

                                <div className="card-icon-wrapper">
                                    {meta.icon}
                                </div>

                                <div className="card-body">
                                    <h3 className="card-title">{domain}</h3>
                                    <p className="card-description">
                                        {meta.description}
                                    </p>

                                    <div className="card-tags">
                                        <span className="tag difficulty">{meta.difficulty} Difficulty</span>
                                        <span className="tag outlook">{meta.outlook} Outlook</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedDomain && (
                    <div className="animate-fadeInUp" style={{ marginTop: 'var(--space-8)' }}>
                        <div style={{
                            background: '#1a1a1a',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <p className="text-secondary" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
                                How would you like to proceed with {selectedDomain}?
                            </p>

                            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                                <button
                                    className={`btn ${choice === 'explore' ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                                    onClick={() => setChoice('explore')}
                                    style={{ flex: 1 }}
                                >
                                    🔍 Try-out Sprint
                                </button>
                                <button
                                    className={`btn ${choice === 'commit' ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                                    onClick={() => setChoice('commit')}
                                    style={{ flex: 1 }}
                                >
                                    ✓ Commit Now
                                </button>
                            </div>

                            <button
                                className="btn btn-primary btn-lg btn-full"
                                onClick={handleContinue}
                                disabled={!choice}
                            >
                                {choice === 'explore' ? 'Start My Sprint' : 'Build My Roadmap'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DomainChoicePage;
