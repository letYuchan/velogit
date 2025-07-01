import ArrowUpButton from '@/components/common/ArrowUpButton';
import ShareButton from '@/components/common/home/ShareButton';
import MarkdownRenderer from '@/components/test/MarkdownRenderer';
import { posts } from '@/utils/postList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1150);
  const { slug } = useParams();

  const post = posts.find(p => p.slug === slug);

  const mainContent = post!.content.replace(/^---\n[\s\S]*?\n---/, '').trim();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className='flex w-full flex-col items-center justify-start'>
      {isDesktop && (
        <aside className='fixed left-8 top-1/2 flex size-20 translate-y-1/2 transform items-center justify-center rounded-full border border-gray-400 bg-background p-4 hover:opacity-80'>
          <ShareButton />
        </aside>
      )}
      <MarkdownRenderer content={mainContent} />
      {!isDesktop && (
        <aside className='flex w-[80%] flex-nowrap items-center justify-center gap-2 border-t border-border py-2'>
          <p className='text-3xl text-muted'>Share this post</p>
          <ShareButton />
        </aside>
      )}
      {/* ArrowUP button */}
      <ArrowUpButton />
    </main>
  );
};

export default PostPage;
