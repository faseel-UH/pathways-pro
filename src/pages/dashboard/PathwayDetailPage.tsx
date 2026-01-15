import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
    ArrowLeftIcon,
    CheckIcon,
    StarIcon,
    BuildingIcon,
    TargetIcon,
    GlobeIcon,
    ClockIcon,
    BookIcon,
    SparklesIcon,
    GraduationCapIcon,
} from '../../components/common/Icons';
import './PathwayDetailPage.css';

// Pathway data with rich details
const PATHWAY_DATA: Record<string, {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    color: string;
    duration: string;
    difficulty: 'High' | 'Medium' | 'Low';
    outlook: string;
    salaryRange: string;
    keySkills: string[];
    requirements: string[];
    careers: string[];
    universities: Array<{
        name: string;
        location: string;
        ranking: number;
        matchScore: number;
        logo?: string;
    }>;
}> = {
    med: {
        id: 'med',
        title: 'Medicine',
        tagline: 'Heal the world, one patient at a time',
        description: 'Embark on a rigorous journey combining biology, chemistry, and clinical skills. Medicine offers the unique opportunity to make a direct impact on people\'s lives through diagnosis, treatment, and care.',
        image: '/images/careers/medicine.png',
        color: '#10b981',
        duration: '7-10 years',
        difficulty: 'High',
        outlook: 'Growing',
        salaryRange: '$80K - $400K+',
        keySkills: ['Critical Thinking', 'Communication', 'Empathy', 'Attention to Detail', 'Resilience'],
        requirements: ['A-Level: Biology, Chemistry + one more science/math', 'UCAT/BMAT Score', 'Work Experience', 'Personal Statement'],
        careers: ['General Practitioner', 'Surgeon', 'Psychiatrist', 'Pediatrician', 'Radiologist', 'Emergency Medicine'],
        universities: [
            { name: 'University of Oxford', location: 'UK', ranking: 1, matchScore: 92 },
            { name: 'University of Cambridge', location: 'UK', ranking: 2, matchScore: 89 },
            { name: 'Imperial College London', location: 'UK', ranking: 3, matchScore: 87 },
            { name: 'Johns Hopkins University', location: 'USA', ranking: 4, matchScore: 85 },
            { name: 'Harvard Medical School', location: 'USA', ranking: 5, matchScore: 82 },
        ]
    },
    eng: {
        id: 'eng',
        title: 'Engineering',
        tagline: 'Design and build the future',
        description: 'Engineering combines creativity with technical expertise to solve complex problems. From infrastructure to software, engineers shape the world we live in.',
        image: '/images/careers/engineering.png',
        color: '#f59e0b',
        duration: '4-6 years',
        difficulty: 'High',
        outlook: 'Stable',
        salaryRange: '$70K - $200K+',
        keySkills: ['Problem Solving', 'Mathematics', 'Technical Skills', 'Project Management', 'Innovation'],
        requirements: ['A-Level: Mathematics, Physics + optional third', 'Strong STEM foundation', 'Portfolio (for some specializations)'],
        careers: ['Civil Engineer', 'Mechanical Engineer', 'Software Engineer', 'Aerospace Engineer', 'Biomedical Engineer'],
        universities: [
            { name: 'MIT', location: 'USA', ranking: 1, matchScore: 94 },
            { name: 'Stanford University', location: 'USA', ranking: 2, matchScore: 91 },
            { name: 'Imperial College London', location: 'UK', ranking: 3, matchScore: 88 },
            { name: 'ETH Zurich', location: 'Switzerland', ranking: 4, matchScore: 86 },
            { name: 'University of Cambridge', location: 'UK', ranking: 5, matchScore: 84 },
        ]
    },
    law: {
        id: 'law',
        title: 'Law',
        tagline: 'Champion justice and shape society',
        description: 'Law is the backbone of civilization. Legal professionals advocate for rights, structure businesses, and ensure justice prevails in society.',
        image: '/images/careers/law.png',
        color: '#8b5cf6',
        duration: '5-7 years',
        difficulty: 'High',
        outlook: 'Competitive',
        salaryRange: '$60K - $300K+',
        keySkills: ['Analytical Thinking', 'Public Speaking', 'Research', 'Negotiation', 'Writing'],
        requirements: ['A-Level: Essay-based subjects preferred', 'LSAT (for US)', 'Strong academics', 'Extracurricular leadership'],
        careers: ['Corporate Lawyer', 'Criminal Defense', 'Human Rights Advocate', 'Judge', 'Legal Consultant'],
        universities: [
            { name: 'Harvard Law School', location: 'USA', ranking: 1, matchScore: 88 },
            { name: 'University of Oxford', location: 'UK', ranking: 2, matchScore: 90 },
            { name: 'Yale Law School', location: 'USA', ranking: 3, matchScore: 85 },
            { name: 'University of Cambridge', location: 'UK', ranking: 4, matchScore: 87 },
            { name: 'LSE', location: 'UK', ranking: 5, matchScore: 83 },
        ]
    },
    art: {
        id: 'art',
        title: 'Art & Design',
        tagline: 'Express creativity and shape experiences',
        description: 'From fine arts to UX design, creative careers allow you to express ideas visually and shape how people experience products, spaces, and media.',
        image: '/images/careers/art-design.png',
        color: '#ec4899',
        duration: '3-4 years',
        difficulty: 'Medium',
        outlook: 'Dynamic',
        salaryRange: '$40K - $150K+',
        keySkills: ['Creativity', 'Visual Communication', 'Software Skills', 'Adaptability', 'Collaboration'],
        requirements: ['Portfolio Required', 'A-Level: Art/Design preferred', 'Creative thinking', 'Technical software skills'],
        careers: ['Graphic Designer', 'UX/UI Designer', 'Art Director', 'Animator', 'Industrial Designer', 'Fashion Designer'],
        universities: [
            { name: 'Royal College of Art', location: 'UK', ranking: 1, matchScore: 91 },
            { name: 'Parsons School of Design', location: 'USA', ranking: 2, matchScore: 88 },
            { name: 'Rhode Island School of Design', location: 'USA', ranking: 3, matchScore: 86 },
            { name: 'Central Saint Martins', location: 'UK', ranking: 4, matchScore: 89 },
            { name: 'Pratt Institute', location: 'USA', ranking: 5, matchScore: 84 },
        ]
    },
    cs: {
        id: 'cs',
        title: 'Computer Science',
        tagline: 'Code the future of technology',
        description: 'Computer Science is the language of the modern world. Build algorithms, create platforms, and solve problems that impact billions of users globally.',
        image: '/images/careers/computer-science.png',
        color: '#06b6d4',
        duration: '4 years',
        difficulty: 'High',
        outlook: 'Very High',
        salaryRange: '$80K - $500K+',
        keySkills: ['Programming', 'Logical Thinking', 'Mathematics', 'Problem Solving', 'Continuous Learning'],
        requirements: ['A-Level: Mathematics required', 'Programming experience', 'Strong problem-solving', 'Personal projects'],
        careers: ['Software Engineer', 'Data Scientist', 'AI Researcher', 'Cybersecurity Analyst', 'Product Manager', 'Tech Entrepreneur'],
        universities: [
            { name: 'MIT', location: 'USA', ranking: 1, matchScore: 96 },
            { name: 'Stanford University', location: 'USA', ranking: 2, matchScore: 93 },
            { name: 'Carnegie Mellon', location: 'USA', ranking: 3, matchScore: 90 },
            { name: 'University of Cambridge', location: 'UK', ranking: 4, matchScore: 88 },
            { name: 'ETH Zurich', location: 'Switzerland', ranking: 5, matchScore: 86 },
        ]
    },
    bus: {
        id: 'bus',
        title: 'Business',
        tagline: 'Lead organizations and drive growth',
        description: 'Business combines strategy, finance, and leadership to create value. Whether in startups or Fortune 500 companies, business skills open doors worldwide.',
        image: '/images/careers/business.png',
        color: '#d4a847',
        duration: '4-6 years',
        difficulty: 'Medium',
        outlook: 'High',
        salaryRange: '$60K - $300K+',
        keySkills: ['Leadership', 'Financial Literacy', 'Communication', 'Strategic Thinking', 'Networking'],
        requirements: ['A-Level: Mathematics helpful', 'Business acumen', 'Internship experience', 'Extracurricular leadership'],
        careers: ['Management Consultant', 'Investment Banker', 'Entrepreneur', 'Marketing Director', 'Operations Manager', 'CFO'],
        universities: [
            { name: 'Harvard Business School', location: 'USA', ranking: 1, matchScore: 89 },
            { name: 'London Business School', location: 'UK', ranking: 2, matchScore: 91 },
            { name: 'Wharton School', location: 'USA', ranking: 3, matchScore: 87 },
            { name: 'INSEAD', location: 'France', ranking: 4, matchScore: 85 },
            { name: 'Stanford GSB', location: 'USA', ranking: 5, matchScore: 84 },
        ]
    }
};

const PathwayDetailPage = () => {
    const { pathwayId } = useParams<{ pathwayId: string }>();
    const navigate = useNavigate();
    const { state } = useApp();

    const pathway = pathwayId ? PATHWAY_DATA[pathwayId] : null;

    if (!pathway) {
        return (
            <div className="pathway-detail-not-found">
                <h2>Pathway not found</h2>
                <button onClick={() => navigate('/dashboard/explore')}>
                    Back to Explore
                </button>
            </div>
        );
    }

    // Mock profile alignment calculation
    const profileAlignment = Math.floor(Math.random() * 20) + 75; // 75-95%

    const handleStartPathway = () => {
        // Navigate to personalized roadmap creation
        navigate(`/dashboard/pathway/${pathwayId}/start`);
    };

    return (
        <div className="pathway-detail-page">
            {/* Hero Section */}
            <div className="pathway-hero" style={{ '--pathway-color': pathway.color } as React.CSSProperties}>
                <button className="pathway-back-btn" onClick={() => navigate('/dashboard/explore')}>
                    <ArrowLeftIcon size={20} />
                    <span>Back to Explore</span>
                </button>

                <div className="pathway-hero-content">
                    <div className="pathway-hero-text">
                        <div className="pathway-badge">
                            <SparklesIcon size={14} />
                            <span>{pathway.outlook} Outlook</span>
                        </div>
                        <h1 className="pathway-title">{pathway.title}</h1>
                        <p className="pathway-tagline">{pathway.tagline}</p>
                        <p className="pathway-description">{pathway.description}</p>

                        <div className="pathway-meta">
                            <div className="pathway-meta-item">
                                <ClockIcon size={18} />
                                <span>{pathway.duration}</span>
                            </div>
                            <div className="pathway-meta-item">
                                <TargetIcon size={18} />
                                <span>{pathway.difficulty} Difficulty</span>
                            </div>
                            <div className="pathway-meta-item">
                                <GlobeIcon size={18} />
                                <span>{pathway.salaryRange}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pathway-hero-image">
                        <img src={pathway.image} alt={pathway.title} />
                        <div className="pathway-hero-glow" />
                    </div>
                </div>
            </div>

            {/* Profile Alignment Section */}
            <section className="pathway-section">
                <div className="section-header">
                    <TargetIcon size={24} />
                    <h2>Your Profile Alignment</h2>
                </div>

                <div className="alignment-card">
                    <div className="alignment-score-container">
                        <div className="alignment-ring" style={{ '--progress': profileAlignment } as React.CSSProperties}>
                            <svg viewBox="0 0 100 100">
                                <circle className="alignment-ring-bg" cx="50" cy="50" r="45" />
                                <circle className="alignment-ring-progress" cx="50" cy="50" r="45" />
                            </svg>
                            <div className="alignment-score-text">
                                <span className="alignment-score-number">{profileAlignment}%</span>
                                <span className="alignment-score-label">Match</span>
                            </div>
                        </div>
                    </div>

                    <div className="alignment-details">
                        <h3>Great Match for {state.userProfile?.name || 'You'}!</h3>
                        <p>Based on your academic interests, skills, and goals, {pathway.title} aligns well with your profile.</p>

                        <div className="alignment-factors">
                            <div className="alignment-factor good">
                                <CheckIcon size={16} />
                                <span>Strong academic foundation</span>
                            </div>
                            <div className="alignment-factor good">
                                <CheckIcon size={16} />
                                <span>Relevant subject interests</span>
                            </div>
                            <div className="alignment-factor good">
                                <CheckIcon size={16} />
                                <span>Career goals aligned</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Skills & Requirements */}
            <section className="pathway-section">
                <div className="section-header">
                    <BookIcon size={24} />
                    <h2>What You'll Need</h2>
                </div>

                <div className="skills-requirements-grid">
                    <div className="skills-card">
                        <h3>Key Skills</h3>
                        <div className="skills-list">
                            {pathway.keySkills.map((skill, index) => (
                                <div key={index} className="skill-tag">
                                    <StarIcon size={14} />
                                    <span>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="requirements-card">
                        <h3>Requirements</h3>
                        <ul className="requirements-list">
                            {pathway.requirements.map((req, index) => (
                                <li key={index}>
                                    <CheckIcon size={16} />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Top Universities */}
            <section className="pathway-section">
                <div className="section-header">
                    <GraduationCapIcon size={24} />
                    <h2>Top Universities for You</h2>
                    <span className="section-subtitle">Based on your profile</span>
                </div>

                <div className="universities-list">
                    {pathway.universities.map((uni, index) => (
                        <div key={index} className="university-card">
                            <div className="university-rank">#{uni.ranking}</div>
                            <div className="university-info">
                                <h4 className="university-name">{uni.name}</h4>
                                <div className="university-location">
                                    <GlobeIcon size={14} />
                                    <span>{uni.location}</span>
                                </div>
                            </div>
                            <div className="university-match">
                                <div className="match-bar">
                                    <div
                                        className="match-bar-fill"
                                        style={{ width: `${uni.matchScore}%` }}
                                    />
                                </div>
                                <span className="match-score">{uni.matchScore}% match</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Career Paths */}
            <section className="pathway-section">
                <div className="section-header">
                    <BuildingIcon size={24} />
                    <h2>Career Paths</h2>
                </div>

                <div className="careers-grid">
                    {pathway.careers.map((career, index) => (
                        <div key={index} className="career-chip">
                            {career}
                        </div>
                    ))}
                </div>
            </section>

            {/* Start Pathway CTA */}
            <section className="pathway-cta-section">
                <div className="pathway-cta-card" style={{ '--pathway-color': pathway.color } as React.CSSProperties}>
                    <div className="cta-content">
                        <h2>Ready to Start Your {pathway.title} Journey?</h2>
                        <p>Get a personalized roadmap with tasks, milestones, and deadlines tailored to your goals.</p>
                    </div>
                    <button className="start-pathway-btn" onClick={handleStartPathway}>
                        <SparklesIcon size={20} />
                        <span>Start This Pathway</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PathwayDetailPage;
