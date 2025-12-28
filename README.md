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

### **중요**: 포스트 파일 등록

새 포스트를 추가한 후에는 **반드시** `src/utils/posts.js` 파일의 `POST_FILES` 배열에 파일명을 추가해야 합니다:

```javascript
const POST_FILES = [
  'welcome-to-my-blog.md',
  'getting-started-with-react.md',
  'productivity-tips.md',
  'css-best-practices.md',
  'your-new-post.md',  // 새 파일 추가
];
```

이 단계를 건너뛰면 새 포스트가 블로그에 표시되지 않습니다.

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

### GitHub Pages (현재 설정)

이 프로젝트는 GitHub Pages를 위해 최적화되어 있습니다.

#### Windows에서 배포
```bash
npm run deploy:win
# 또는
deploy.bat
```

#### Mac/Linux에서 배포
```bash
npm run deploy
# 또는
bash deploy.sh
```

#### 수동 배포
```bash
# 1. 빌드
npm run build

# 2. worktree 생성
git worktree add .deploy gh-pages

# 3. 배포 디렉토리로 이동
cd .deploy

# 4. 기존 파일 삭제
git rm -rf .
git clean -fxd

# 5. dist 폴더 내용 복사
cp -r ../dist/* .
cp ../dist/.nojekyll .

# 6. 커밋 및 푸시
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# 7. 정리
cd ..
git worktree remove .deploy
```

#### GitHub Pages 설정

1. GitHub repository 설정으로 이동: `Settings` → `Pages`
2. Source를 **gh-pages** 브랜치로 선택
3. Save 클릭
4. 1-3분 후 https://oseuk.github.io/ 에서 확인

### 기타 호스팅 옵션

#### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will auto-detect Vite and deploy

#### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

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
