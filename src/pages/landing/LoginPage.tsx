import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/auth.css';

import { useApp } from '../../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useApp();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock authentication success
        login({
            name: 'Student', // In real app, get from backend
            email: formData.email,
            school: null,
            grade: null,
            curriculum: null,
            location: null,
            parentEmail: null,
        });

        // Redirect to Gate Zero to start the flow
        navigate('/gate-zero');
    };

    return (
        <div className="auth-page animate-fadeIn">
            {/* Visual Hero Section (Left) */}
            <div className="auth-hero">
                <div className="auth-hero-content animate-fadeInUp">
                    <h1 className="auth-title">Welcome<br />Back.</h1>
                    <p className="auth-subtitle">
                        Continue your journey to success. Your personalized pathway awaits.
                    </p>
                </div>
            </div>

            {/* Form Section (Right) */}
            <div className="auth-form-container">
                <div className="auth-form-wrapper animate-fadeInUp stagger-1">
                    <div className="auth-header">
                        <h2 className="auth-heading">Sign In</h2>
                        <p className="auth-subheading">Access your account</p>
                    </div>

                    <form onSubmit={handleLogin}>
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
                            Log In
                        </button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#8b5cf6', fontWeight: 600 }}>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
