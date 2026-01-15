import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

// Mock school data
const MOCK_SCHOOLS: Record<string, { name: string; curriculum: string; location: string }> = {
    'DUBGEMS2025': { name: 'GEMS Dubai American Academy', curriculum: 'American', location: 'Dubai, UAE' },
    'JESS2025': { name: 'Jumeirah English Speaking School', curriculum: 'British', location: 'Dubai, UAE' },
    'DIAC2025': { name: 'Dubai International Academy', curriculum: 'IB', location: 'Dubai, UAE' },
    'DEMO2025': { name: 'Demo International School', curriculum: 'British', location: 'London, UK' },
};

const SchoolCodePage = () => {
    const navigate = useNavigate();
    const { updateUserProfile } = useApp();
    const [code, setCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');
    const [validatedSchool, setValidatedSchool] = useState<typeof MOCK_SCHOOLS[string] | null>(null);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setCode(value);
        setError('');
        setValidatedSchool(null);
    };

    const handleValidate = async () => {
        if (code.length < 4) {
            setError('Please enter a valid school code');
            return;
        }

        setIsValidating(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const school = MOCK_SCHOOLS[code];

        if (school) {
            setValidatedSchool(school);
            updateUserProfile({
                school: school.name,
                curriculum: school.curriculum,
                location: school.location,
            });
        } else {
            setError('Invalid school code. Please check and try again.');
        }

        setIsValidating(false);
    };

    const handleContinue = () => {
        navigate('/onboarding/school-confirm');
    };

    return (
        <div className="page-centered">
            <div className="page-header">
                <h1 className="page-title animate-fadeInUp">Enter your School Code</h1>
                <p className="page-subtitle animate-fadeInUp stagger-1">
                    Your school code was provided by your school administrator
                </p>
            </div>

            <div className="page-content animate-fadeInUp stagger-2">
                {!validatedSchool ? (
                    <>
                        <div className="school-code-input-wrapper">
                            <input
                                type="text"
                                className={`input input-code ${error ? 'input-error' : ''}`}
                                placeholder="XXXX0000"
                                value={code}
                                onChange={handleCodeChange}
                                maxLength={12}
                                disabled={isValidating}
                            />
                            {error && <p className="input-error-message" style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}>{error}</p>}
                        </div>

                        <button
                            className="btn btn-primary btn-lg btn-full"
                            onClick={handleValidate}
                            disabled={isValidating || code.length < 4}
                        >
                            {isValidating ? (
                                <span className="loading-dots">
                                    <span className="loading-dot"></span>
                                    <span className="loading-dot"></span>
                                    <span className="loading-dot"></span>
                                </span>
                            ) : (
                                'Validate Code'
                            )}
                        </button>

                        <p className="input-hint" style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                            Try: DUBGEMS2025, JESS2025, DIAC2025, or DEMO2025
                        </p>
                    </>
                ) : (
                    <div className="school-code-success animate-scaleIn">
                        <span className="school-code-success-icon">✓</span>
                        <div>
                            <h3 style={{ marginBottom: 'var(--space-2)' }}>{validatedSchool.name}</h3>
                            <p className="text-secondary">{validatedSchool.curriculum} Curriculum • {validatedSchool.location}</p>
                        </div>
                        <button
                            className="btn btn-primary btn-lg btn-full"
                            onClick={handleContinue}
                            style={{ marginTop: 'var(--space-4)' }}
                        >
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchoolCodePage;
