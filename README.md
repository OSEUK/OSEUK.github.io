# MyBlog - Personal Blog Platform

A modern, feature-rich blog platform built with React, Vite, and Tailwind CSS. Write posts in Markdown and enjoy a beautiful, responsive reading experience.

## Features

- **Markdown Support** - Write posts in Markdown with front-matter metadata
- **Dark Mode** - Automatic dark mode with manual toggle
- **Responsive Design** - Works beautifully on all devices
- **Code Highlighting** - Syntax highlighting for code blocks
- **Table of Contents** - Auto-generated TOC for easy navigation
- **Search** - Full-text search across all posts
- **Categories & Tags** - Organize posts with categories and tags
- **Social Sharing** - Share buttons for popular social platforms
- **Comments** - GitHub-based comments using Utterances
- **Reading Time** - Estimated reading time for each post

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **Highlight.js** - Code syntax highlighting
- **Gray Matter** - Front-matter parser
- **React Share** - Social sharing buttons

## Getting Started

### Prerequisites

- Node.js 16+ (Vite 5 requires Node.js 16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd myBlog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Writing Posts

Posts are written in Markdown and stored in the `public/posts` directory.

### Post Format

Create a new `.md` file in `public/posts` with the following front-matter:

```markdown
---
title: "Your Post Title"
date: "2025-01-28"
author: "Your Name"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
excerpt: "A brief description of your post"
---

# Your Post Content

Write your content here in Markdown...
```

### Front-Matter Fields

- `title` (required) - Post title
- `date` (required) - Publication date (YYYY-MM-DD)
- `author` (optional) - Author name
- `category` (optional) - Single category
- `tags` (optional) - Array of tags
- `excerpt` (optional) - Short description for post listings

## Project Structure

```
myBlog/
├── public/
│   └── posts/              # Markdown blog posts
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── PostCard.jsx
│   │   ├── ShareButtons.jsx
│   │   ├── Comments.jsx
│   │   └── TableOfContents.jsx
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Post.jsx
│   │   ├── Categories.jsx
│   │   ├── CategoryPosts.jsx
│   │   ├── Tags.jsx
│   │   ├── TagPosts.jsx
│   │   ├── Search.jsx
│   │   └── About.jsx
│   ├── utils/              # Utility functions
│   │   └── posts.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── package.json
```

## Customization

### Branding

Update the following in [src/components/Header.jsx](src/components/Header.jsx):
- Blog name/logo
- Navigation links

Update [src/components/Footer.jsx](src/components/Footer.jsx):
- Social media links
- Contact information

### About Page

Edit [src/pages/About.jsx](src/pages/About.jsx) to add your personal information.

### Comments

To enable comments, update the `repo` prop in [src/components/Comments.jsx](src/components/Comments.jsx):

```jsx
<Comments repo="your-username/your-repo" />
```

You'll need to:
1. Create a public GitHub repository
2. Install the [Utterances app](https://github.com/apps/utterances)
3. Update the repo name in the Comments component

### Styling

- Global styles: [src/index.css](src/index.css)
- Tailwind config: [tailwind.config.js](tailwind.config.js)
- Theme colors are defined in the Tailwind config

### Dark Mode

Dark mode is automatically detected based on system preferences and can be toggled manually. The theme preference is saved in localStorage.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will auto-detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.js` to set the correct base:
```js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

4. Deploy:
```bash
npm run deploy
```

## Performance

- Lazy loading of routes
- Optimized images
- Code splitting
- Minimal dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and pull requests!

## License

MIT

## Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Powered by [Vite](https://vitejs.dev)
