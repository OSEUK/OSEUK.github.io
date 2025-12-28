import { useState, useEffect } from 'react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const extractHeadings = () => {
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      const extracted = [];
      let match;

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');

        extracted.push({
          level,
          text,
          id
        });
      }

      setHeadings(extracted);
    };

    if (content) {
      extractHeadings();
    }
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map(({ level, text, id }) => (
          <li key={id} className={level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${id}`}
              className={`block text-sm transition-colors ${
                activeId === id
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
