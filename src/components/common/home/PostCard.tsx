import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: PostData }) => {
    return (
        <article
            key={post.slug}
            className='flex h-[27rem] flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-primary hover:shadow-lg'
        >
            {/* header */}
            <div className='flex flex-1 flex-col gap-2'>
                <h2 className='line-clamp-1 font-title text-2xl font-bold text-foreground'>
                    {post.title}
                </h2>
                {post.summary && post.summary != '' ? (
                    <p className='line-clamp-3 w-full text-lg text-muted'>{post.summary}</p>
                ) : (
                    <p className='w-full text-lg text-muted'>No summary info</p>
                )}
                <div className='flex flex-wrap gap-2 pt-1'>
                    {post.tags && post.tags[0] != '' ? (
                        post.tags.map((tag, idx) => (
                            <span
                                key={`${post.slug}-${tag}-${idx}`}
                                className='rounded-md bg-primary-bg px-2 py-1 text-sm font-semibold text-primary'
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <p className='rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-primary'>
                            This post doesn't have any tags
                        </p>
                    )}
                </div>

                <p className='text-sm text-muted'>{post.date}</p>
            </div>
            {/* thumbnail */}
            {post.thumbnail ? (
                <div className='relative aspect-[4/3] w-full overflow-hidden rounded-md bg-background'>
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className='absolute inset-0 h-full w-full object-contain'
                    />
                </div>
            ) : (
                <div className='relative aspect-[4/3] w-full overflow-hidden rounded-md bg-background'>
                    <img
                        src='/images/watermark.png'
                        alt='watermark'
                        className='absolute inset-0 h-full w-full object-contain'
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
