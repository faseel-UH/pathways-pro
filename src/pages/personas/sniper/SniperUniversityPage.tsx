import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const UNIVERSITIES = [
    { id: 'imperial', name: 'Imperial College London', location: 'UK', ranking: '#6 World' },
    { id: 'ucl', name: 'University College London', location: 'UK', ranking: '#9 World' },
    { id: 'kings', name: "King's College London", location: 'UK', ranking: '#37 World' },
    { id: 'oxford', name: 'University of Oxford', location: 'UK', ranking: '#3 World' },
    { id: 'cambridge', name: 'University of Cambridge', location: 'UK', ranking: '#2 World' },
    { id: 'edinburgh', name: 'University of Edinburgh', location: 'UK', ranking: '#22 World' },
    { id: 'manchester', name: 'University of Manchester', location: 'UK', ranking: '#32 World' },
    { id: 'lse', name: 'London School of Economics', location: 'UK', ranking: '#45 World' },
];

const SniperUniversityPage = () => {
    const navigate = useNavigate();
    const { state, setCareerTarget } = useApp();
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (universityId: string) => {
        setSelected(prev =>
            prev.includes(universityId)
                ? prev.filter(id => id !== universityId)
                : [...prev, universityId]
        );
    };

    const handleContinue = () => {
        const universityNames = selected
            .map(id => UNIVERSITIES.find(u => u.id === id)?.name)
            .filter(Boolean) as string[];
        setCareerTarget({ universities: universityNames });
        navigate('/sniper/flight-check');
    };

    const handleSkip = () => {
        navigate('/sniper/flight-check');
    };

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/sniper/discipline')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '66%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">2/3</span>
            </div>

            <div className="page-content">
                <div className="page-header" style={{ textAlign: 'left', marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                        Target Universities
                    </h1>
                    <p className="text-secondary">
                        Select universities you're interested in for {state.careerTarget.discipline || 'your chosen field'}
                    </p>
                    <span className="badge badge-primary" style={{ marginTop: 'var(--space-2)' }}>Optional</span>
                </div>

                <div className="university-list">
                    {UNIVERSITIES.map((university) => (
                        <button
                            key={university.id}
                            className={`university-item ${selected.includes(university.id) ? 'selected' : ''}`}
                            onClick={() => handleToggle(university.id)}
                        >
                            <div className="university-checkbox">
                                {selected.includes(university.id) && '✓'}
                            </div>
                            <div className="university-info">
                                <div className="university-name">{university.name}</div>
                                <div className="university-meta">{university.location}</div>
                            </div>
                            <div className="university-ranking">{university.ranking}</div>
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={handleSkip}
                        style={{ flex: 1 }}
                    >
                        Skip
                    </button>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleContinue}
                        style={{ flex: 2 }}
                    >
                        Continue {selected.length > 0 && `(${selected.length})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SniperUniversityPage;
