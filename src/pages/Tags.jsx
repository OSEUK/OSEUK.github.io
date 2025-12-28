import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTags, getAllPosts } from '../utils/posts';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [tagCounts, setTagCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const allTags = await getAllTags();
        const allPosts = await getAllPosts();

        const counts = {};
        allPosts.forEach(post => {
          post.tags.forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1;
          });
        });

        setTags(allTags);
        setTagCounts(counts);
      } catch (error) {
        console.error('Error loading tags:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tags...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Tags
      </h1>

      {tags.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No tags found.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/tag/${tag}`}
              className="inline-block px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              style={{ fontSize: `${Math.min(1 + tagCounts[tag] * 0.1, 2)}rem` }}
            >
              <span className="text-gray-700 dark:text-gray-300">
                #{tag}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({tagCounts[tag]})
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
