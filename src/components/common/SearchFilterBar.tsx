import './SearchFilterBar.css';

interface SearchFilterBarProps {
    onSearch: (query: string) => void;
    filters: string[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    placeholder?: string;
}

const SearchFilterBar = ({
    onSearch,
    filters,
    activeFilter,
    onFilterChange,
    placeholder = 'Search...'
}: SearchFilterBarProps) => {
    return (
        <div className="search-filter-container animate-fadeInUp">
            {/* Search Input */}
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    onChange={(e) => onSearch(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>

            {/* Filter Pills */}
            <div className="filter-pills">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchFilterBar;
