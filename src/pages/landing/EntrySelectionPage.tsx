import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const EntrySelectionPage = () => {
    const navigate = useNavigate();
    const { setOnboardingVector } = useApp();

    const handleEntrySelect = (vector: 'school-code' | 'b2c') => {
        setOnboardingVector(vector);

        switch (vector) {
            case 'school-code':
                navigate('/onboarding/school-code');
                break;
            case 'b2c':
                navigate('/signup'); // Direct to the creating account page we made
                break;
        }
    };

    return (
        <div className="page-centered">
            <div className="page-header">
                <h1 className="page-title animate-fadeInUp">How would you like to join?</h1>
                <p className="page-subtitle animate-fadeInUp stagger-1">
                    Select the option that best describes your situation
                </p>
            </div>

            <div className="entry-cards animate-fadeInUp stagger-2" style={{ maxWidth: '800px' }}>
                <button
                    className="entry-card"
                    onClick={() => handleEntrySelect('school-code')}
                >
                    <div className="entry-card-icon">🏫</div>
                    <div className="entry-card-content">
                        <div className="entry-card-title">I have a School Code</div>
                        <div className="entry-card-desc">Enter the unique code provided by your school administrator</div>
                    </div>
                    <span className="entry-card-arrow">→</span>
                </button>

                <div className="entry-divider">
                    <span className="entry-divider-text">or</span>
                </div>

                <button
                    className="entry-card"
                    onClick={() => handleEntrySelect('b2c')}
                >
                    <div className="entry-card-icon">👤</div>
                    <div className="entry-card-content">
                        <div className="entry-card-title">Individual Sign Up</div>
                        <div className="entry-card-desc">Create a personal account to start your journey independently</div>
                    </div>
                    <span className="entry-card-arrow">→</span>
                </button>
            </div>

            <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--color-text-secondary)', animation: 'fadeIn 0.5s ease 0.5s backwards' }}>
                Already have an account? <Link to="/login" style={{ color: '#8b5cf6', fontWeight: 600 }}>Log in</Link>
            </div>
        </div>
    );
};

export default EntrySelectionPage;
