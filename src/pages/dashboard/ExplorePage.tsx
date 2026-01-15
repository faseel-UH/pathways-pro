import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import '../../styles/explore.css';

interface Pathway {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    difficulty: 'High' | 'Medium' | 'Low';
    careerOutlook: string;
    category: string;
}

const pathwaysMock: Pathway[] = [
    {
        id: 'med',
        title: 'Medicine',
        description: 'A rigorous journey combining biology, chemistry, and clinical skills to save lives.',
        icon: '🩺',
        image: '/images/careers/medicine.png',
        difficulty: 'High',
        careerOutlook: 'Growing',
        category: 'STEM'
    },
    {
        id: 'eng',
        title: 'Engineering',
        description: 'Design and build the future. From civil infrastructure to software systems.',
        icon: '⚙️',
        image: '/images/careers/engineering.png',
        difficulty: 'High',
        careerOutlook: 'Stable',
        category: 'STEM'
    },
    {
        id: 'law',
        title: 'Law',
        description: 'Master the legal system, advocate for justice, and structure society.',
        icon: '⚖️',
        image: '/images/careers/law.png',
        difficulty: 'High',
        careerOutlook: 'Competitive',
        category: 'Humanities'
    },
    {
        id: 'art',
        title: 'Art & Design',
        description: 'Express creativity through visual mediums and shape user experiences.',
        icon: '🎨',
        image: '/images/careers/art-design.png',
        difficulty: 'Medium',
        careerOutlook: 'Dynamic',
        category: 'Arts'
    },
    {
        id: 'cs',
        title: 'Computer Science',
        description: 'The language of the modern world. Code algorithms and build platforms.',
        icon: '💻',
        image: '/images/careers/computer-science.png',
        difficulty: 'High',
        careerOutlook: 'Very High',
        category: 'STEM'
    },
    {
        id: 'bus',
        title: 'Business',
        description: 'Lead organizations, manage finances, and drive economic growth.',
        icon: '💼',
        image: '/images/careers/business.png',
        difficulty: 'Medium',
        careerOutlook: 'High',
        category: 'Business'
    }
];

const ExplorePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'STEM', 'Humanities', 'Arts', 'Business'];

    const filteredPathways = pathwaysMock.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const handleCardClick = (pathwayId: string) => {
        navigate(`/dashboard/pathway/${pathwayId}`);
    };

    return (
        <div className="explore-page animate-fadeIn">
            <div className="explore-hero">
                <h1 className="explore-title animate-fadeInUp">Find Your Path</h1>
                <p className="explore-subtitle animate-fadeInUp stagger-1">
                    Explore deeper into the careers that shape our world. Discover what it takes to become a professional.
                </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--space-6)' }}>
                <SearchFilterBar
                    onSearch={setSearchQuery}
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    placeholder="Search pathways (e.g. Medicine)..."
                />
            </div>

            <div className="pathway-grid animate-fadeInUp stagger-2">
                {filteredPathways.map((pathway) => (
                    <div
                        key={pathway.id}
                        className="pathway-card"
                        onClick={() => handleCardClick(pathway.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleCardClick(pathway.id)}
                    >
                        <div className="pathway-image-container">
                            <img
                                src={pathway.image}
                                alt={pathway.title}
                                className="pathway-image"
                                loading="lazy"
                            />
                            <div className="pathway-image-overlay" />
                        </div>
                        <div className="pathway-content">
                            <h3 className="pathway-title">{pathway.title}</h3>
                            <p className="pathway-desc">{pathway.description}</p>
                            <div className="pathway-tags">
                                <span className={`tag-pill tag-difficulty ${pathway.difficulty.toLowerCase()}`}>
                                    {pathway.difficulty} Difficulty
                                </span>
                                <span className="tag-pill tag-career">
                                    {pathway.careerOutlook} Outlook
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;

