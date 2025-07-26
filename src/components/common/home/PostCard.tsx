import IconOctocat from '@/components/common/icons/IconOctocat';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: PostData }) => {
    return (
        <article
            key={post.slug}
            className='flex h-[27rem] flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-primary hover:shadow-lg active:translate-y-[-5px] active:border-primary active:shadow-lg'
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
                                className='rounded-md bg-primary-light px-2 py-1 text-sm font-semibold text-primary'
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <span className='rounded-md bg-primary-light px-2 py-1 text-sm font-semibold text-primary'>
                            #No #tag
                        </span>
                    )}
                </div>

                <p className='text-sm text-muted'>{post.date}</p>
            </div>
            {/* thumbnail */}
            {post.thumbnail ? (
                <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md bg-background'>
                    <img
                        src={`${import.meta.env.BASE_URL + post.thumbnail}`}
                        alt={post.title}
                        className='absolute inset-0 h-full w-full object-cover object-center'
                    />
                </div>
            ) : (
                <div className='relative flex aspect-[4/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-background'>
                    <h1 className='cursor-pointer font-title text-4xl font-bold text-foreground'>
                        velo<span className='text-primary'>git</span>
                    </h1>

                    <IconOctocat />
                </div>
            )}
            {/* footer */}
            <div className='mt-4 border-t border-border pt-2 text-right'>
                <Link
                    to={`/post/${post.slug}`}
                    className='inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline active:underline'
                >
                    Read more
                    <MdArrowForwardIos className='text-sm' />
                </Link>
            </div>
        </article>
    );
};

export default PostCard;
