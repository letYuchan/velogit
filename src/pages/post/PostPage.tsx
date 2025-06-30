import MarkdownRenderer from '@/components/test/MarkdownRenderer';
import { posts } from '@/utils/postList';
import { FiShare2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  const body = post.content.replace(/^---\n[\s\S]*?\n---/, '').trim();

  return (
    <div className='flex w-full'>
      <aside>
        <button className='fixed left-10 top-1/2 z-50 hidden size-20 -translate-y-1/2 transform items-center justify-center rounded-full border border-gray-400 bg-background p-4 opacity-70 shadow-md lg:flex'>
          <FiShare2 className='text-3xl' />
        </button>
      </aside>
      <MarkdownRenderer content={body} />
    </div>
  );
};

export default PostPage;
