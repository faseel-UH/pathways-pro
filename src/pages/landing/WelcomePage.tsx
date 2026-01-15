import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-centered welcome-page">
            <div className="welcome-logo">
                🚀
            </div>

            <h1 className="welcome-title animate-fadeInUp">
                Pathways Pro
            </h1>

            <p className="welcome-tagline animate-fadeInUp stagger-1">
                Your path to success starts here
            </p>

            <div className="welcome-actions animate-fadeInUp stagger-2">
                <button
                    className="btn btn-primary btn-xl btn-full"
                    onClick={() => navigate('/signup')}
                >
                    Get Started
                </button>

                <button
                    className="btn btn-ghost btn-full"
                    onClick={() => navigate('/signup')}
                >
                    I already have an account
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
