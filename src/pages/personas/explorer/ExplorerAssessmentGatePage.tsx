import { useNavigate } from 'react-router-dom';

const ExplorerAssessmentGatePage = () => {
    const navigate = useNavigate();

    const handleYes = () => {
        // Would normally route to UniHawk assessment booking
        // For now, show a confirmation and continue to discovery
        navigate('/explorer/discovery');
    };

    const handleNo = () => {
        navigate('/explorer/discovery');
    };

    return (
        <div className="page-centered">
            <div style={{ textAlign: 'center', maxWidth: '420px' }}>
                <span style={{ fontSize: 'var(--text-6xl)', display: 'block', marginBottom: 'var(--space-6)' }} className="animate-float">
                    🎯
                </span>

                <h1 className="animate-fadeInUp" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
                    Would you like a career assessment?
                </h1>

                <p className="text-secondary animate-fadeInUp stagger-1" style={{ marginBottom: 'var(--space-8)' }}>
                    Our expert counsellors can help you discover your strengths and ideal career paths through a comprehensive assessment.
                </p>

                <div className="animate-fadeInUp stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <button
                        className="btn btn-primary btn-lg btn-full"
                        onClick={handleYes}
                    >
                        Yes, book assessment
                    </button>

                    <button
                        className="btn btn-secondary btn-lg btn-full"
                        onClick={handleNo}
                    >
                        No, explore on my own
                    </button>
                </div>

                <div className="nudge-card animate-fadeInUp stagger-3" style={{ marginTop: 'var(--space-8)', textAlign: 'left' }}>
                    <div className="nudge-icon">💡</div>
                    <div className="nudge-content">
                        <div className="nudge-title">UniHawk Career Assessment</div>
                        <div className="nudge-description">
                            1-on-1 session with an expert counsellor to discover your ideal path
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorerAssessmentGatePage;
