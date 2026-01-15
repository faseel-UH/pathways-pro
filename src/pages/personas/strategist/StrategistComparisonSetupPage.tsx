import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const CAREER_OPTIONS = [
    { id: 'medicine', name: 'Medicine', icon: '🩺' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'computer-science', name: 'Computer Science', icon: '💻' },
    { id: 'business', name: 'Business', icon: '📊' },
    { id: 'law', name: 'Law', icon: '⚖️' },
    { id: 'psychology', name: 'Psychology', icon: '🧠' },
    { id: 'economics', name: 'Economics', icon: '📈' },
    { id: 'architecture', name: 'Architecture', icon: '🏛️' },
];

const POPULAR_COMPARISONS = [
    { a: 'medicine', b: 'engineering', label: 'Medicine vs Engineering' },
    { a: 'computer-science', b: 'business', label: 'CS vs Business' },
    { a: 'law', b: 'economics', label: 'Law vs Economics' },
];

const StrategistComparisonSetupPage = () => {
    const navigate = useNavigate();
    const { setStrategistComparison } = useApp();
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (optionId: string) => {
        if (selected.includes(optionId)) {
            setSelected(selected.filter(id => id !== optionId));
        } else if (selected.length < 2) {
            setSelected([...selected, optionId]);
        } else {
            // Replace the second selection
            setSelected([selected[0], optionId]);
        }
    };

    const handleQuickSelect = (a: string, b: string) => {
        setSelected([a, b]);
    };

    const handleContinue = () => {
        const names = selected.map(id => CAREER_OPTIONS.find(o => o.id === id)?.name || id);
        setStrategistComparison([names[0], names[1]]);
        navigate('/strategist/head-to-head');
    };

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/gate-zero')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '25%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">1/4</span>
            </div>

            <div className="page-content">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                        What are you torn between?
                    </h1>
                    <p className="text-secondary">
                        Select 2 options you're considering
                    </p>
                </div>

                {/* Quick selection */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <p className="text-secondary" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                        Popular comparisons:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        {POPULAR_COMPARISONS.map((comp) => (
                            <button
                                key={comp.label}
                                className="badge badge-primary"
                                onClick={() => handleQuickSelect(comp.a, comp.b)}
                                style={{ cursor: 'pointer', padding: 'var(--space-2) var(--space-3)' }}
                            >
                                {comp.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Option grid */}
                <div className="discipline-grid" style={{ marginBottom: 'var(--space-6)' }}>
                    {CAREER_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            className={`discipline-card ${selected.includes(option.id) ? 'selected' : ''}`}
                            onClick={() => handleToggle(option.id)}
                            style={{ position: 'relative' }}
                        >
                            {selected.includes(option.id) && (
                                <span style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '24px',
                                    height: '24px',
                                    background: 'var(--color-primary-500)',
                                    borderRadius: 'var(--radius-full)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 'var(--text-sm)',
                                }}>
                                    {selected.indexOf(option.id) + 1}
                                </span>
                            )}
                            <span className="discipline-icon">{option.icon}</span>
                            <span className="discipline-name">{option.name}</span>
                        </button>
                    ))}
                </div>

                <button
                    className="btn btn-primary btn-lg btn-full"
                    onClick={handleContinue}
                    disabled={selected.length !== 2}
                >
                    Compare {selected.length === 2 ? '→' : `(${selected.length}/2)`}
                </button>
            </div>
        </div>
    );
};

export default StrategistComparisonSetupPage;
