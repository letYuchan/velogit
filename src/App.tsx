import Layout from '@/components/common/Layout';
import About from '@/pages/about/About';
import Home from '@/pages/home/Home';
import Post from '@/pages/post/Post';
import Write from '@/pages/write/Write';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'write', element: <Write /> },
        { path: 'post/:slug', element: <Post /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
