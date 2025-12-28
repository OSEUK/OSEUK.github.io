const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        About
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Welcome to MyBlog</h2>

          <p>
            This is a personal blog built with React, Vite, and modern web technologies.
            Here I share my thoughts, experiences, and knowledge on various topics.
          </p>

          <h3>About Me</h3>

          <p>
            I'm a passionate developer and writer who loves creating and sharing content.
            This blog is a space where I can express my ideas and connect with others
            who share similar interests.
          </p>

          <h3>What You'll Find Here</h3>

          <ul>
            <li>Technical articles and tutorials</li>
            <li>Personal reflections and experiences</li>
            <li>Tips and tricks for developers</li>
            <li>Reviews and recommendations</li>
          </ul>

          <h3>Technologies Used</h3>

          <p>This blog is built with:</p>

          <ul>
            <li><strong>React</strong> - UI framework</li>
            <li><strong>Vite</strong> - Build tool and dev server</li>
            <li><strong>React Router</strong> - Client-side routing</li>
            <li><strong>Tailwind CSS</strong> - Styling</li>
            <li><strong>React Markdown</strong> - Markdown rendering</li>
            <li><strong>Highlight.js</strong> - Code syntax highlighting</li>
            <li><strong>Utterances</strong> - GitHub-based comments</li>
          </ul>

          <h3>Features</h3>

          <ul>
            <li>Dark mode support</li>
            <li>Responsive design</li>
            <li>Code syntax highlighting</li>
            <li>Table of contents for posts</li>
            <li>Category and tag filtering</li>
            <li>Search functionality</li>
            <li>Social sharing buttons</li>
            <li>Comments via GitHub Issues</li>
          </ul>

          <h3>Contact</h3>

          <p>
            Feel free to reach out to me through:
          </p>

          <ul>
            <li>Email: <a href="mailto:your@email.com">your@email.com</a></li>
            <li>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">@yourusername</a></li>
            <li>Twitter: <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">@yourusername</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
