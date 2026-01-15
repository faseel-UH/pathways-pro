import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const GateZeroPage = () => {
    const navigate = useNavigate();
    const { setPersona, state } = useApp();

    const handlePersonaSelect = (persona: 'sniper' | 'explorer' | 'strategist') => {
        setPersona(persona);

        switch (persona) {
            case 'sniper':
                navigate('/sniper/discipline');
                break;
            case 'explorer':
                navigate('/explorer/assessment-gate');
                break;
            case 'strategist':
                navigate('/strategist/comparison-setup');
                break;
        }
    };

    return (
        <div className="page-centered gate-zero-page">
            <div className="page-header">
                <p className="text-secondary animate-fadeInUp" style={{ marginBottom: 'var(--space-2)' }}>
                    Welcome, {state.userProfile.name || 'Student'}
                </p>
                <h1 className="page-title animate-fadeInUp stagger-1">
                    Do you know your path?
                </h1>
                <p className="page-subtitle animate-fadeInUp stagger-2">
                    Let's figure out the best way to guide you
                </p>
            </div>

            <div className="gate-zero-cards">
                <button
                    className="persona-card sniper animate-fadeInUp stagger-2"
                    onClick={() => handlePersonaSelect('sniper')}
                >
                    <span className="persona-icon">🎯</span>
                    <h2 className="persona-title">The Sniper</h2>
                    <p className="persona-quote">"Yes, I know what I want"</p>
                    <p className="persona-description">
                        You have a clear goal in mind. You know what you want to study or become,
                        and you need a roadmap to get there.
                    </p>
                </button>

                <button
                    className="persona-card explorer animate-fadeInUp stagger-3"
                    onClick={() => handlePersonaSelect('explorer')}
                >
                    <span className="persona-icon">🧭</span>
                    <h2 className="persona-title">The Explorer</h2>
                    <p className="persona-quote">"No, I'm just exploring"</p>
                    <p className="persona-description">
                        You're still discovering your interests and passions.
                        Let's help you find the right direction through guided exploration.
                    </p>
                </button>

                <button
                    className="persona-card strategist animate-fadeInUp stagger-4"
                    onClick={() => handlePersonaSelect('strategist')}
                >
                    <span className="persona-icon">⚖️</span>
                    <h2 className="persona-title">The Strategist</h2>
                    <p className="persona-quote">"I have ideas / I need to be sure"</p>
                    <p className="persona-description">
                        You're torn between options and need help deciding.
                        Let's compare your choices side-by-side.
                    </p>
                </button>
            </div>
        </div>
    );
};

export default GateZeroPage;
