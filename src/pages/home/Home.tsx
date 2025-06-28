import { Link } from 'react-router-dom';

const Home = () => {
  const posts = [
    {
      title: 'Welcome to Velogit',
      summary: '이 블로그는 Vite 기반 정적 블로그입니다.',
      slug: 'hello',
    },
  ];

  return (
    <main className='flex flex-col gap-10 px-6 py-10'>
      {/* Hero Section */}
      <section>
        <h1 className='text-foreground text-4xl font-bold'>Welcome to Velogit</h1>
        <p className='text-muted mt-2 text-lg'>당신만의 정적 블로그를 만들어보세요.</p>
      </section>

      {/* Posts Preview */}
      <section className='flex flex-col gap-6'>
        {posts.map(post => (
          <Link
            to={`/post/${post.slug}`}
            key={post.slug}
            className='border-border border-b pb-4 transition hover:bg-gray-50'
          >
            <h2 className='text-foreground text-2xl font-semibold'>{post.title}</h2>
            <p className='text-muted mt-1'>{post.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Home;
