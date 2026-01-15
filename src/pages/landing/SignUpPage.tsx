import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/auth.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would integrate with Supabase/Firebase
        console.log('Signing up with:', formData);

        // Mock success -> Redirect to Gate Zero
        navigate('/gate-zero');
    };

    return (
        <div className="auth-page animate-fadeIn">
            {/* Visual Hero Section (Left) */}
            <div className="auth-hero">
                <div className="auth-hero-content animate-fadeInUp">
                    <h1 className="auth-title">Begin Your<br />Legacy.</h1>
                    <p className="auth-subtitle">
                        Join the elite community of students mastering their future with AI-driven pathways.
                    </p>
                </div>
            </div>

            {/* Form Section (Right) */}
            <div className="auth-form-container">
                <div className="auth-form-wrapper animate-fadeInUp stagger-1">
                    <div className="auth-header">
                        <h2 className="auth-heading">Create Account</h2>
                        <p className="auth-subheading">Start your personalized career journey</p>
                    </div>

                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="fullName"
                                className="auth-input"
                                placeholder=" "
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                            <label htmlFor="fullName" className="auth-label">Full Name</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                className="auth-input"
                                placeholder=" "
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <label htmlFor="email" className="auth-label">Email Address</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                className="auth-input"
                                placeholder=" "
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <label htmlFor="password" className="auth-label">Password</label>
                        </div>

                        <button type="submit" className="auth-btn">
                            Sign Up
                        </button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: '#8b5cf6', fontWeight: 600 }}>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
