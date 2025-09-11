import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, MapPin, Star } from 'lucide-react';
import { Input, Button } from './index';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  rating?: number;
  location?: string;
  price?: string;
  image?: string;
}

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  loading?: boolean;
  className?: string;
  variant?: 'default' | 'hero' | 'minimal';
  showFilters?: boolean;
  categories?: Array<{ id: string; name: string; icon?: string }>;
  locations?: Array<{ id: string; name: string }>;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Ne yapmak istiyorsunuz?',
  onSearch,
  onResultSelect,
  results = [],
  loading = false,
  className = '',
  variant = 'default',
  showFilters = false,
  categories = [],
  locations = [],
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      const searchQuery = [query, selectedCategory, selectedLocation].filter(Boolean).join(' ');
      onSearch(searchQuery);
    }
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setIsOpen(false);
  };

  const variantClasses = {
    default: 'bg-white shadow-lg border border-gray-200',
    hero: 'bg-white/10 backdrop-blur-md border border-white/20',
    minimal: 'bg-gray-50 border border-gray-200',
  };

  const containerClasses = [
    'relative',
    variantClasses[variant],
    'rounded-2xl',
    className,
  ].join(' ');

  return (
    <div ref={searchRef} className={containerClasses}>
      <div className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4"

            />
          </div>

          {/* Filters */}
          {showFilters && (
            <>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Kategori Seçin</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">İlçe Seçin</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            icon={<SearchIcon className="w-4 h-4" />}
            sx={{ width: { lg: 'auto' } }}
          >
            Ara
          </Button>
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isOpen && (results.length > 0 || loading) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
            >
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  Aranıyor...
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result) => (
                    <motion.div
                      key={result.id}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-center gap-3">
                        {result.image && (
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{result.title}</div>
                          {result.subtitle && (
                            <div className="text-sm text-gray-600">{result.subtitle}</div>
                          )}
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            {result.category && (
                              <span className="flex items-center gap-1">
                                <span>{result.category}</span>
                              </span>
                            )}
                            {result.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {result.location}
                              </span>
                            )}
                            {result.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {result.rating}
                              </span>
                            )}
                            {result.price && (
                              <span className="text-green-600 font-medium">{result.price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { Search };
export default Search;
