import { HashRouter, Routes, Route } from 'react-router-dom';

import PostPage from '@/pages/post/PostPage';
import AboutPage from '@/pages/about/AboutPage';
import HomePage from '@/pages/home/HomePage';
import WritePage from '@/pages/write/WritePage';
import EditPage from '@/pages/edit/EditPage';
import { useEffect } from 'react';
import { SELECTED_THEME_STORAGE_KEY } from '@/constants/theme.constants';
import { applyThemeClass } from '@/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/common/layout/Layout';

const App = () => {
    useEffect(() => {
        const savedTheme = localStorage.getItem(SELECTED_THEME_STORAGE_KEY);
        if (savedTheme) {
            applyThemeClass(savedTheme);
        }
    }, []);

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
};

export default App;
