import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DISCOVERY_CARDS = [
    {
        id: 1,
        title: 'Working with People',
        description: 'Helping others, teaching, or counseling',
        image: '👥'
    },
    {
        id: 2,
        title: 'Solving Complex Problems',
        description: 'Analyzing data and finding solutions',
        image: '🧩'
    },
    {
        id: 3,
        title: 'Creative Expression',
        description: 'Art, design, writing, or performing',
        image: '🎨'
    },
    {
        id: 4,
        title: 'Building Things',
        description: 'Engineering, construction, or making',
        image: '🔧'
    },
    {
        id: 5,
        title: 'Scientific Research',
        description: 'Experimenting and discovering new things',
        image: '🔬'
    },
    {
        id: 6,
        title: 'Business & Leadership',
        description: 'Managing teams and making strategic decisions',
        image: '📊'
    },
    {
        id: 7,
        title: 'Technology & Coding',
        description: 'Building apps, websites, and digital solutions',
        image: '💻'
    },
    {
        id: 8,
        title: 'Healthcare & Medicine',
        description: 'Caring for patients and improving health',
        image: '🏥'
    },
];

const SwipeDiscoveryPage = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [likes, setLikes] = useState<number[]>([]);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

    const currentCard = DISCOVERY_CARDS[currentIndex];
    const progress = ((currentIndex) / DISCOVERY_CARDS.length) * 100;

    const handleSwipe = (liked: boolean) => {
        setSwipeDirection(liked ? 'right' : 'left');

        if (liked) {
            // setLikes(prev => [...prev, currentCard.id]);
        }

        setTimeout(() => {
            setSwipeDirection(null);
            if (currentIndex < DISCOVERY_CARDS.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // Navigate to archetype reveal
                navigate('/explorer/archetype');
            }
        }, 300);
    };

    return (
        <div className="flow-page">
            <div className="flow-header">
                <button className="flow-back-btn" onClick={() => navigate('/explorer/assessment-gate')}>
                    ←
                </button>
                <div className="flow-progress">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <span className="flow-step-indicator">{currentIndex + 1}/{DISCOVERY_CARDS.length}</span>
            </div>

            <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'var(--space-8)' }}>
                <h2 style={{ marginBottom: 'var(--space-2)', textAlign: 'center' }}>
                    What interests you?
                </h2>
                <p className="text-secondary" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
                    Swipe right if it excites you, left if not
                </p>

                <div className="swipe-container">
                    <div
                        className="swipe-card"
                        style={{
                            transform: swipeDirection === 'right'
                                ? 'translateX(150%) rotate(20deg)'
                                : swipeDirection === 'left'
                                    ? 'translateX(-150%) rotate(-20deg)'
                                    : 'translateX(0)',
                            opacity: swipeDirection ? 0 : 1,
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                        }}
                    >
                        <div style={{
                            height: '60%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--gradient-primary)',
                            fontSize: 'var(--text-7xl)'
                        }}>
                            {currentCard.image}
                        </div>
                        <div className="swipe-card-content">
                            <h3 className="swipe-card-title">{currentCard.title}</h3>
                            <p className="swipe-card-desc">{currentCard.description}</p>
                        </div>
                    </div>
                </div>

                <div className="swipe-actions">
                    <button
                        className="swipe-btn swipe-btn-pass"
                        onClick={() => handleSwipe(false)}
                    >
                        ✕
                    </button>
                    <button
                        className="swipe-btn swipe-btn-like"
                        onClick={() => handleSwipe(true)}
                    >
                        ♥
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SwipeDiscoveryPage;
