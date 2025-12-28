import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Comments = ({ repo = 'your-username/myBlog' }) => {
  const commentsRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', isDark ? 'github-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
      commentsRef.current.appendChild(script);
    }
  }, [repo, isDark]);

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comments
      </h3>
      <div ref={commentsRef} />
    </div>
  );
};

export default Comments;
