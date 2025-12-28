// 간단한 front-matter 파서 (브라우저 환경용)
const parseFrontMatter = (content) => {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { data: {}, content: content };
  }

  const frontMatter = match[1];
  const markdown = match[2];

  // YAML 파싱 (간단한 버전)
  const data = {};
  const lines = frontMatter.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // 따옴표 제거
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // 배열 파싱 (간단한 버전)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''));
    }

    data[key] = value;
  }

  return { data, content: markdown };
};

// 게시글 파일 목록 (수동으로 관리)
const POST_FILES = [
  'welcome-to-my-blog.md',
  'getting-started-with-react.md',
  'productivity-tips.md',
  'css-best-practices.md'
];

// Markdown 파일 가져오기
const fetchPost = async (filename) => {
  try {
    const response = await fetch(`/posts/${filename}`);
    if (!response.ok) {
      console.error(`Failed to fetch ${filename}: ${response.status}`);
      return null;
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return null;
  }
};

// 모든 게시글 메타데이터를 가져오는 함수
export const getAllPosts = async () => {
  const posts = [];

  for (const filename of POST_FILES) {
    const content = await fetchPost(filename);
    if (!content) continue;

    const { data, content: markdown } = parseFrontMatter(content);
    const slug = filename.replace('.md', '');

    posts.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      excerpt: data.excerpt || markdown.slice(0, 150) + '...',
      category: data.category || 'Uncategorized',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readTime: calculateReadTime(markdown),
      ...data
    });
  }

  // 날짜순으로 정렬 (최신순)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// 특정 게시글 가져오기
export const getPostBySlug = async (slug) => {
  try {
    const filename = `${slug}.md`;
    const content = await fetchPost(filename);

    if (!content) {
      return null;
    }

    const { data, content: markdown } = parseFrontMatter(content);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      category: data.category || 'Uncategorized',
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: markdown,
      readTime: calculateReadTime(markdown),
      ...data
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
};

// 카테고리별 게시글 가져오기
export const getPostsByCategory = async (category) => {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
};

// 태그별 게시글 가져오기
export const getPostsByTag = async (tag) => {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
};

// 모든 카테고리 가져오기
export const getAllCategories = async () => {
  const allPosts = await getAllPosts();
  const categories = [...new Set(allPosts.map(post => post.category))];
  return categories;
};

// 모든 태그 가져오기
export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const tags = [...new Set(allPosts.flatMap(post => post.tags))];
  return tags;
};

// 게시글 검색
export const searchPosts = async (query) => {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.category.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// 읽는 시간 계산 (분)
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};

// 목차 추출
export const extractTableOfContents = (content) => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');

    headings.push({
      level,
      text,
      id
    });
  }

  return headings;
};
