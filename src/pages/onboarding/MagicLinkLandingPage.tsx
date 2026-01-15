import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const MagicLinkLandingPage = () => {
    const navigate = useNavigate();
    const { updateUserProfile, setAuthenticated } = useApp();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [studentName, setStudentName] = useState('');
    const [studentGrade, setStudentGrade] = useState('');

    useEffect(() => {
        // Simulate magic link authentication
        const timer = setTimeout(() => {
            setIsAuthenticating(false);
            // Mock data from the magic link token
            setStudentName('Sarah Ahmed');
            setStudentGrade('Grade 11 / Year 12');
            updateUserProfile({
                name: 'Sarah Ahmed',
                school: 'GEMS Wellington Academy',
                curriculum: 'British',
                location: 'Dubai, UAE',
                grade: 'Grade 11 / Year 12',
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [updateUserProfile]);

    const handleConfirm = () => {
        setAuthenticated(true);
        navigate('/gate-zero');
    };

    if (isAuthenticating) {
        return (
            <div className="page-centered">
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto var(--space-6)' }}></div>
                    <h2 style={{ marginBottom: 'var(--space-2)' }}>Authenticating...</h2>
                    <p className="text-secondary">Verifying your secure link</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-centered">
            <div className="school-code-success animate-scaleIn" style={{ maxWidth: '400px' }}>
                <span className="school-code-success-icon">👋</span>

                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: 'var(--space-2)' }}>
                        Welcome, {studentName}!
                    </h2>
                    <p className="text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                        Please confirm your details to continue
                    </p>
                </div>

                <div className="school-info-card" style={{ width: '100%' }}>
                    <div className="school-info-row">
                        <span className="school-info-label">Name</span>
                        <span className="school-info-value">{studentName}</span>
                    </div>
                    <div className="school-info-row">
                        <span className="school-info-label">Grade</span>
                        <span className="school-info-value">{studentGrade}</span>
                    </div>
                    <div className="school-info-row">
                        <span className="school-info-label">School</span>
                        <span className="school-info-value">GEMS Wellington Academy</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
                    <button
                        className="btn btn-primary btn-lg btn-full"
                        onClick={handleConfirm}
                    >
                        Yes, that's me!
                    </button>
                    <button
                        className="btn btn-ghost btn-full"
                        onClick={() => navigate('/entry')}
                    >
                        This isn't me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MagicLinkLandingPage;
