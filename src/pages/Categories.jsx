import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories, getAllPosts } from '../utils/posts';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        const allPosts = await getAllPosts();

        const counts = {};
        allPosts.forEach(post => {
          counts[post.category] = (counts[post.category] || 0) + 1;
        });

        setCategories(allCategories);
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Categories
      </h1>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {category}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {categoryCounts[category]} {categoryCounts[category] === 1 ? 'post' : 'posts'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
