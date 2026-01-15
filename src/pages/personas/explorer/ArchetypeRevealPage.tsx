import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const ARCHETYPES = [
    {
        id: 'architect-of-change',
        title: 'Architect of Change',
        description: 'You thrive on solving complex problems and creating systems that make a difference. You combine analytical thinking with a desire to improve the world around you.',
        traits: ['Strategic Thinker', 'Problem Solver', 'Innovative', 'Systems-Oriented'],
        domains: ['Engineering', 'Architecture', 'Urban Planning', 'Environmental Science'],
        color: '#8b5cf6',
    },
    {
        id: 'pioneer-of-discovery',
        title: 'Pioneer of Discovery',
        description: 'Your curiosity knows no bounds. You love exploring the unknown and pushing the boundaries of human knowledge through research and experimentation.',
        traits: ['Curious', 'Analytical', 'Detail-Oriented', 'Persistent'],
        domains: ['Medicine', 'Scientific Research', 'Biotechnology', 'Physics'],
        color: '#10b981',
    },
    {
        id: 'catalyst-of-connection',
        title: 'Catalyst of Connection',
        description: 'You understand people deeply and excel at bringing them together. Your strength lies in communication, empathy, and building meaningful relationships.',
        traits: ['Empathetic', 'Communicative', 'Collaborative', 'Inspiring'],
        domains: ['Psychology', 'Marketing', 'Human Resources', 'Social Work'],
        color: '#f43f5e',
    },
];

const ArchetypeRevealPage = () => {
    const navigate = useNavigate();
    const { setExplorerArchetype, setExplorerDomains } = useApp();
    const [isRevealing, setIsRevealing] = useState(true);
    const [archetype, setArchetype] = useState<typeof ARCHETYPES[0] | null>(null);

    useEffect(() => {
        // Simulate analysis
        const timer = setTimeout(() => {
            // Random selection for demo
            const selected = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
            setArchetype(selected);
            setExplorerArchetype(selected.title);
            setExplorerDomains(selected.domains.slice(0, 2));
            setIsRevealing(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [setExplorerArchetype, setExplorerDomains]);

    if (isRevealing) {
        return (
            <div className="page-centered">
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto var(--space-6)' }}></div>
                    <h2 style={{ marginBottom: 'var(--space-2)' }}>Analyzing your interests...</h2>
                    <p className="text-secondary">Discovering your unique archetype</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-centered" style={{ padding: 'var(--space-6)' }}>
            <div style={{ textAlign: 'center', maxWidth: '500px' }} className="animate-scaleIn">
                <span style={{
                    fontSize: 'var(--text-7xl)',
                    display: 'block',
                    marginBottom: 'var(--space-6)',
                }} className="animate-float">
                    ✨
                </span>

                <p className="text-secondary" style={{ marginBottom: 'var(--space-2)' }}>
                    Your archetype is
                </p>

                <h1 style={{
                    fontSize: 'var(--text-4xl)',
                    marginBottom: 'var(--space-4)',
                    background: `linear-gradient(135deg, ${archetype?.color} 0%, var(--color-neutral-0) 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    {archetype?.title}
                </h1>

                <p className="text-secondary" style={{ marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-relaxed)' }}>
                    {archetype?.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
                    {archetype?.traits.map((trait) => (
                        <span key={trait} className="badge badge-primary">{trait}</span>
                    ))}
                </div>

                <div style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-5)',
                    marginBottom: 'var(--space-6)',
                    textAlign: 'left',
                }}>
                    <p className="text-secondary" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                        Recommended domains for you:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        {archetype?.domains.slice(0, 2).map((domain, index) => (
                            <div
                                key={domain}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: 'var(--space-3)',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: 'var(--radius-md)',
                                }}
                            >
                                <span style={{
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontWeight: 'var(--font-bold)',
                                }}>
                                    {index + 1}
                                </span>
                                <span style={{ fontWeight: 'var(--font-medium)' }}>{domain}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-lg btn-full"
                    onClick={() => navigate('/explorer/domain-choice')}
                >
                    Explore My Domains
                </button>
            </div>
        </div>
    );
};

export default ArchetypeRevealPage;
