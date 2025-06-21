import Header from '@/components/test/Header';
import PostPage from '@/components/test/PostPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
