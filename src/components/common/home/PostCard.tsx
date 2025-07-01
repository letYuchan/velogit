import type { PostMeta } from '@/types/postType';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article
      key={post.slug}
      className='flex h-[27rem] flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-primary hover:shadow-lg'
    >
      {/* header */}
      <div className='flex flex-1 flex-col gap-2'>
        <h2 className='line-clamp-1 font-title text-2xl font-bold text-foreground'>{post.title}</h2>
        <h3 className='text-xl font-bold text-foreground'>category: {post.category}</h3>
        <p className='line-clamp-3 w-full text-base text-muted'>{post.summary}</p>
        <div className='flex flex-wrap gap-2 pt-1'>
          {post.tags.map((tag, idx) => (
            <span
              key={`${post.slug}-${tag}-${idx}`}
              className='rounded-md bg-primary-bg px-2 py-1 text-sm font-semibold text-primary'
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className='text-sm text-muted'>{post.date}</p>
      </div>
      {/* thumbnail */}
      {post.thumbnail && (
        <div className='relative aspect-[4/3] h-full w-full overflow-hidden rounded-md bg-border'>
          <img
            src={post.thumbnail}
            alt={post.title}
            className='absolute inset-0 h-full w-full object-contain object-center'
          />
        </div>
      )}
      {/* footer */}
      <div className='mt-4 border-t border-border pt-2 text-right'>
        <Link
          to={`/post/${post.slug}`}
          className='inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline'
        >
          Read more
          <MdArrowForwardIos className='text-sm' />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
