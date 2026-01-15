import { useState } from 'react';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import '../../styles/universities.css';

interface University {
    id: string;
    name: string;
    location: string;
    country: 'UK' | 'US' | 'Europe';
    ranking: number;
    acceptanceRate: string;
    coursesCount: number;
    initials: string;
}

const universitiesMock: University[] = [
    { id: 'ox', name: 'University of Oxford', location: 'Oxford, UK', country: 'UK', ranking: 1, acceptanceRate: '17.5%', coursesCount: 48, initials: 'Ox' },
    { id: 'cam', name: 'University of Cambridge', location: 'Cambridge, UK', country: 'UK', ranking: 2, acceptanceRate: '21%', coursesCount: 30, initials: 'Cam' },
    { id: 'imp', name: 'Imperial College London', location: 'London, UK', country: 'UK', ranking: 6, acceptanceRate: '14%', coursesCount: 110, initials: 'Imp' },
    { id: 'har', name: 'Harvard University', location: 'Cambridge, MA', country: 'US', ranking: 4, acceptanceRate: '4%', coursesCount: 90, initials: 'H' },
    { id: 'mit', name: 'MIT', location: 'Cambridge, MA', country: 'US', ranking: 3, acceptanceRate: '7%', coursesCount: 85, initials: 'MIT' },
    { id: 'stan', name: 'Stanford University', location: 'Stanford, CA', country: 'US', ranking: 5, acceptanceRate: '5%', coursesCount: 70, initials: 'S' },
];

const UniversitiesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'UK', 'US', 'Europe'];

    const filteredUnis = universitiesMock.filter((u) => {
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || u.country === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="universities-page animate-fadeIn">
            <div className="uni-hero">
                <h1 className="uni-title animate-fadeInUp">Global Universities</h1>
                <p className="explore-subtitle animate-fadeInUp stagger-1">
                    Discover top-tier institutions worldwide. Analyze acceptance rates, rankings, and pathway alignment.
                </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--space-6) var(--space-8)' }}>
                <SearchFilterBar
                    onSearch={setSearchQuery}
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    placeholder="Search universities..."
                />
            </div>

            <div className="uni-grid animate-fadeInUp stagger-2">
                {filteredUnis.map((uni) => (
                    <div key={uni.id} className="uni-card">
                        <div className="ranking-badge">#{uni.ranking} World</div>
                        <div className="uni-header">
                            <div className="uni-logo-placeholder">{uni.initials}</div>
                            <div className="uni-info">
                                <h3 className="uni-name">{uni.name}</h3>
                                <div className="uni-location">
                                    <span>📍</span> {uni.location}
                                </div>
                            </div>
                        </div>

                        <div className="uni-divider" />

                        <div className="uni-stats">
                            <div className="uni-stat-item">
                                <span className="uni-stat-label">Acceptance</span>
                                <span className="uni-stat-value" style={{ color: parseAcceptanceColor(uni.acceptanceRate) }}>
                                    {uni.acceptanceRate}
                                </span>
                            </div>
                            <div className="uni-stat-item">
                                <span className="uni-stat-label">Courses</span>
                                <span className="uni-stat-value">{uni.coursesCount}+</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper for dynamic coloring
const parseAcceptanceColor = (rate: string) => {
    const num = parseFloat(rate);
    if (num < 10) return '#ef4444'; // Red for very hard
    if (num < 20) return '#f59e0b'; // Orange for hard
    return '#10b981'; // Green for moderate
};

export default UniversitiesPage;
