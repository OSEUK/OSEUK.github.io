import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByTag } from '../utils/posts';
import PostCard from '../components/PostCard';

const TagPosts = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const tagPosts = await getPostsByTag(tag);
        setPosts(tagPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [tag]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        #{tag}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} with this tag
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No posts found with this tag.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagPosts;
