import { useState } from 'react';
import { searchPosts } from '../utils/posts';
import PostCard from '../components/PostCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setHasSearched(true);

    try {
      const searchResults = await searchPosts(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Search Posts
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for posts..."
            className="w-full px-6 py-4 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={searching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {searching ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </div>
            )}
          </button>
        </div>
      </form>

      {/* Search Results */}
      {hasSearched && (
        <div>
          {results.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Found {results.length} {results.length === 1 ? 'post' : 'posts'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
