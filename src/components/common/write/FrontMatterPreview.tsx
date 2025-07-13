import PostPageHeader from '@/components/common/post/PostPageHeader';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { MdArrowForwardIos } from 'react-icons/md';

const FrontMatterPreview = () => {
    const { category, summary, tags, date, title, thumbnail } = usePostWriteStore();

    return (
        <section className='flex w-full flex-1 flex-col items-center justify-start gap-10 bg-gray-100 p-4 sm:w-1/2'>
            {/* post meta&postHeader */}
            <div className='flex w-full flex-col gap-2'>
                <h2 className='font-title text-3xl font-bold text-foreground'>Post Card</h2>
                <article className='flex h-[27rem] w-full flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md'>
                    <div className='flex flex-1 flex-col gap-2'>
                        {title && title != '' ? (
                            <h2 className='line-clamp-1 font-title text-2xl font-bold text-foreground'>
                                {title}
                            </h2>
                        ) : (
                            <h2 className='line-clamp-1 font-title text-2xl font-bold text-error'>
                                Title is required
                            </h2>
                        )}
                        {summary && summary != '' ? (
                            <p className='line-clamp-3 w-full text-lg text-muted'>{summary}</p>
                        ) : (
                            <p className='w-full text-lg text-muted'>No summary info</p>
                        )}
                        <div className='flex flex-wrap gap-2 pt-1'>
                            {tags.length > 0 && tags.some(tag => tag.trim() !== '') ? (
                                tags.map((tag, idx) => (
                                    <span
                                        key={`${tag}-${idx}`}
                                        className='rounded-md bg-primary-bg px-2 py-1 text-sm font-semibold text-primary'
                                    >
                                        #{tag}
                                    </span>
                                ))
                            ) : (
                                <div className='rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-primary'>
                                    This post doesn't have any tags
                                </div>
                            )}
                        </div>
                        {date && date != '' ? (
                            <p className='text-sm text-muted'>{date}</p>
                        ) : (
                            <p className='text-sm text-error'>Date is required</p>
                        )}
                    </div>
                    {thumbnail ? (
                        <div className='relative aspect-[4/3] w-full overflow-hidden rounded-md bg-background'>
                            <img
                                src={thumbnail}
                                alt={title}
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
                    <div className='mt-4 border-t border-border pt-2 text-right'>
                        <div className='inline-flex items-center gap-1 text-sm font-semibold text-primary'>
                            Read more
                            <MdArrowForwardIos className='text-sm' />
                        </div>
                    </div>
                </article>
            </div>
            {/* contour */}
            <div className='h-[1px] w-full bg-gray-300'></div>
            {/* post header */}
            <div className='flex w-full flex-col gap-2'>
                <h2 className='font-title text-3xl font-bold text-foreground'>Post Header</h2>
                <PostPageHeader title={title} date={date} tags={tags} category={category} />
            </div>
        </section>
    );
};

export default FrontMatterPreview;
