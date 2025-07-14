import Layout from '@/components/common/Layout';
import PostPage from '@/pages/post/PostPage';
import AboutPage from '@/pages/about/AboutPage';
import HomePage from '@/pages/home/HomePage';
import WritePage from '@/pages/write/WritePage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <HomePage /> },
                { path: 'about', element: <AboutPage /> },
                { path: 'write', element: <WritePage /> },
                { path: 'post/:slug', element: <PostPage /> },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
