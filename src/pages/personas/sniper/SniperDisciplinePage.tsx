import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const DISCIPLINES = [
    { id: 'medicine', name: 'Medicine', icon: '🩺' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'computer-science', name: 'Computer Science', icon: '💻' },
    { id: 'business', name: 'Business', icon: '📊' },
    { id: 'law', name: 'Law', icon: '⚖️' },
    { id: 'psychology', name: 'Psychology', icon: '🧠' },
    { id: 'architecture', name: 'Architecture', icon: '🏛️' },
    { id: 'arts', name: 'Arts & Design', icon: '🎨' },
    { id: 'economics', name: 'Economics', icon: '📈' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'journalism', name: 'Journalism', icon: '📝' },
];

const SniperDisciplinePage = () => {
    const navigate = useNavigate();
    const { setCareerTarget } = useApp();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (disciplineId: string) => {
        setSelected(disciplineId);
    };

    const handleContinue = () => {
        if (selected) {
            const discipline = DISCIPLINES.find(d => d.id === selected);
            setCareerTarget({ discipline: discipline?.name || selected });
            navigate('/sniper/university');
        }
    };

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/gate-zero')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '33%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">1/3</span>
            </div>

            <div className="page-content">
                <div className="page-header" style={{ textAlign: 'left', marginBottom: 'var(--space-6)' }}>
                    <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                        What do you want to study?
                    </h1>
                    <p className="text-secondary">
                        Select your target discipline
                    </p>
                </div>

                <div className="discipline-grid">
                    {DISCIPLINES.map((discipline) => (
                        <button
                            key={discipline.id}
                            className={`discipline-card ${selected === discipline.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(discipline.id)}
                        >
                            <span className="discipline-icon">{discipline.icon}</span>
                            <span className="discipline-name">{discipline.name}</span>
                        </button>
                    ))}
                </div>

                <button
                    className="btn btn-primary btn-lg btn-full"
                    onClick={handleContinue}
                    disabled={!selected}
                    style={{ marginTop: 'var(--space-6)' }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default SniperDisciplinePage;
