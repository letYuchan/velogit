import Layout from '@/components/common/Layout';
import PostPage from '@/pages/post/PostPage';
import AboutPage from '@/pages/about/AboutPage';
import HomePage from '@/pages/home/HomePage';
import WritePage from '@/pages/write/WritePage';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import EditPage from '@/pages/edit/EditPage';

function App() {
    const router = createHashRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <HomePage /> },
                { path: 'about', element: <AboutPage /> },
                { path: 'write', element: <WritePage /> },
                { path: 'edit/:slug', element: <EditPage /> },
                { path: 'post/:slug', element: <PostPage /> },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
