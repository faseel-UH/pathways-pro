import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useApp } from '../../../context/AppContext';

const KILLER_QUESTIONS = [
    {
        id: 1,
        question: 'What excites you more?',
        optionA: 'Diagnosing problems and finding solutions',
        optionB: 'Building and creating new things',
        iconA: '🔍',
        iconB: '🔧',
    },
    {
        id: 2,
        question: 'How do you prefer to work?',
        optionA: 'Directly with people, face-to-face',
        optionB: 'With systems, data, or technology',
        iconA: '👥',
        iconB: '💻',
    },
    {
        id: 3,
        question: 'What matters more to you?',
        optionA: 'Making a direct impact on individuals',
        optionB: 'Creating lasting change at scale',
        iconA: '❤️',
        iconB: '🌍',
    },
];

const TieBreakerPage = () => {
    const navigate = useNavigate();
    // const { state } = useApp();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<('A' | 'B')[]>([]);

    // const [optionA, optionB] = state.strategistComparison || ['Medicine', 'Engineering'];

    const handleAnswer = (choice: 'A' | 'B') => {
        const newAnswers = [...answers, choice];
        setAnswers(newAnswers);

        if (currentQuestion < KILLER_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Calculate and navigate
            navigate('/strategist/decision');
        }
    };

    const question = KILLER_QUESTIONS[currentQuestion];
    // const progress = ((currentQuestion + 1) / KILLER_QUESTIONS.length) * 100;

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/strategist/head-to-head')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">3/4</span>
            </div>

            <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                    <span className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>
                        Question {currentQuestion + 1} of {KILLER_QUESTIONS.length}
                    </span>
                </div>

                <h1 style={{
                    fontSize: 'var(--text-2xl)',
                    marginBottom: 'var(--space-8)',
                    textAlign: 'center',
                    maxWidth: '400px'
                }} className="animate-fadeIn">
                    {question.question}
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%', maxWidth: '500px' }}>
                    <button
                        className="card card-interactive animate-fadeInUp"
                        onClick={() => handleAnswer('A')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-4)',
                            padding: 'var(--space-5)',
                            textAlign: 'left',
                        }}
                    >
                        <span style={{ fontSize: 'var(--text-3xl)' }}>{question.iconA}</span>
                        <span style={{ fontWeight: 'var(--font-medium)' }}>{question.optionA}</span>
                    </button>

                    <button
                        className="card card-interactive animate-fadeInUp stagger-1"
                        onClick={() => handleAnswer('B')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-4)',
                            padding: 'var(--space-5)',
                            textAlign: 'left',
                        }}
                    >
                        <span style={{ fontSize: 'var(--text-3xl)' }}>{question.iconB}</span>
                        <span style={{ fontWeight: 'var(--font-medium)' }}>{question.optionB}</span>
                    </button>
                </div>

                <div className="progress-steps" style={{ marginTop: 'var(--space-8)' }}>
                    {KILLER_QUESTIONS.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-step ${index < currentQuestion ? 'completed' : ''} ${index === currentQuestion ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TieBreakerPage;
