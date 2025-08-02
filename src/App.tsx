import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import PostPage from '@/pages/post/PostPage';
import AboutPage from '@/pages/about/AboutPage';
import HomePage from '@/pages/home/HomePage';
import WritePage from '@/pages/write/WritePage';
import EditPage from '@/pages/edit/EditPage';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='about' element={<AboutPage />} />
                    <Route path='write' element={<WritePage />} />
                    <Route path='edit/:slug' element={<EditPage />} />
                    <Route path='post/:slug' element={<PostPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;
