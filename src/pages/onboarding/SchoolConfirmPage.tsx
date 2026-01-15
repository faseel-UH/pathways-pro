import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const GRADES = [
    'Grade 9 / Year 10',
    'Grade 10 / Year 11',
    'Grade 11 / Year 12',
    'Grade 12 / Year 13',
];

const SchoolConfirmPage = () => {
    const navigate = useNavigate();
    const { state, updateUserProfile, setAuthenticated } = useApp();
    const { userProfile } = state;

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [parentEmail, setParentEmail] = useState('');

    const handleSubmit = () => {
        updateUserProfile({
            name,
            grade,
            parentEmail,
        });
        setAuthenticated(true);
        navigate('/gate-zero');
    };

    const isValid = name.length >= 2 && grade;

    return (
        <div className="page-centered">
            <div className="page-header">
                <h1 className="page-title animate-fadeInUp">Complete your profile</h1>
                <p className="page-subtitle animate-fadeInUp stagger-1">
                    Just a few more details to get you started
                </p>
            </div>

            <div className="page-content animate-fadeInUp stagger-2">
                {/* Pre-filled school info */}
                <div className="school-info-card">
                    <div className="school-info-row">
                        <span className="school-info-label">School</span>
                        <span className="school-info-value">{userProfile.school || 'Demo School'}</span>
                    </div>
                    <div className="school-info-row">
                        <span className="school-info-label">Curriculum</span>
                        <span className="school-info-value">{userProfile.curriculum || 'British'}</span>
                    </div>
                    <div className="school-info-row">
                        <span className="school-info-label">Location</span>
                        <span className="school-info-value">{userProfile.location || 'Dubai, UAE'}</span>
                    </div>
                </div>

                {/* Manual input fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <div className="input-group">
                        <label className="input-label">Your Full Name *</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Grade Level *</label>
                        <select
                            className="input"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="">Select your grade</option>
                            {GRADES.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Parent/Guardian Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="parent@email.com"
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                        />
                        <span className="input-hint">We'll invite them to track your progress</span>
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-lg btn-full"
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    Continue to Pathways
                </button>
            </div>
        </div>
    );
};

export default SchoolConfirmPage;
