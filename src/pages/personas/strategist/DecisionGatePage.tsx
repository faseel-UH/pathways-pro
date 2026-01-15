import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const DecisionGatePage = () => {
    const navigate = useNavigate();
    const { state, setStrategistChoice } = useApp();
    const [isCalculating, setIsCalculating] = useState(true);
    const [scores, setScores] = useState<[number, number]>([0, 0]);

    const [optionA, optionB] = state.strategistComparison || ['Medicine', 'Engineering'];

    useEffect(() => {
        // Simulate score calculation
        const timer = setTimeout(() => {
            // Random scores for demo (would come from real analysis)
            const scoreA = 65 + Math.floor(Math.random() * 25);
            const scoreB = 100 - scoreA + Math.floor(Math.random() * 20);
            setScores([scoreA, Math.min(scoreB, 95)]);
            setIsCalculating(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const winner = scores[0] >= scores[1] ? optionA : optionB;
    // const winnerScore = Math.max(scores[0], scores[1]);

    const handleCommit = () => {
        setStrategistChoice(winner);
        navigate('/dashboard');
    };

    const handleTestDrive = () => {
        // Would navigate to try-out options
        navigate('/dashboard');
    };

    if (isCalculating) {
        return (
            <div className="page-centered">
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto var(--space-6)' }}></div>
                    <h2 style={{ marginBottom: 'var(--space-2)' }}>Calculating your match...</h2>
                    <p className="text-secondary">Analyzing your responses</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/strategist/tie-breaker')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">4/4</span>
            </div>

            <div className="page-content">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }} className="animate-fadeIn">
                    <span style={{ fontSize: 'var(--text-6xl)', display: 'block', marginBottom: 'var(--space-4)' }}>
                        🎯
                    </span>
                    <p className="text-secondary" style={{ marginBottom: 'var(--space-2)' }}>
                        Based on your profile
                    </p>
                    <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
                        {winner}
                    </h1>
                    <p className="text-secondary">
                        is your strongest path
                    </p>
                </div>

                {/* Score comparison */}
                <div className="comparison-container" style={{ marginBottom: 'var(--space-8)' }}>
                    <div className={`comparison-card ${scores[0] >= scores[1] ? 'leading' : ''}`}>
                        <div className="comparison-header">
                            <h3 className="comparison-title">{optionA}</h3>
                            <span className="comparison-score text-gradient">{scores[0]}%</span>
                        </div>
                        <p className="text-secondary" style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
                            Suitability score
                        </p>
                    </div>

                    <div className={`comparison-card ${scores[1] > scores[0] ? 'leading' : ''}`}>
                        <div className="comparison-header">
                            <h3 className="comparison-title">{optionB}</h3>
                            <span className="comparison-score text-gradient">{scores[1]}%</span>
                        </div>
                        <p className="text-secondary" style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
                            Suitability score
                        </p>
                    </div>
                </div>

                {/* Decision actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <button
                        className="btn btn-primary btn-lg btn-full"
                        onClick={handleCommit}
                    >
                        Build my {winner} roadmap
                    </button>

                    <button
                        className="btn btn-secondary btn-lg btn-full"
                        onClick={handleTestDrive}
                    >
                        Still uncertain? Test drive first
                    </button>
                </div>

                {/* Service nudge */}
                <div className="nudge-card" style={{ marginTop: 'var(--space-6)' }}>
                    <div className="nudge-icon">💬</div>
                    <div className="nudge-content">
                        <div className="nudge-title">Need more clarity?</div>
                        <div className="nudge-description">
                            Speak to our career expert for personalized guidance
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecisionGatePage;
