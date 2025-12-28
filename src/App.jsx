import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Post from './pages/Post';
import Categories from './pages/Categories';
import CategoryPosts from './pages/CategoryPosts';
import Tags from './pages/Tags';
import TagPosts from './pages/TagPosts';
import Search from './pages/Search';
import About from './pages/About';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post/:slug" element={<Post />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/:category" element={<CategoryPosts />} />
            <Route path="tags" element={<Tags />} />
            <Route path="tag/:tag" element={<TagPosts />} />
            <Route path="search" element={<Search />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
