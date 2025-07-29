import IconOctocat from '@/components/common/icons/IconOctocat';
import PostPageHeader from '@/components/common/post/PostPageHeader';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { MdArrowForwardIos } from 'react-icons/md';

const FrontMatterPreview = () => {
    const { category, summary, tags, date, title, thumbnail } = usePostWriteStore();

    return (
        <section className='flex w-full flex-1 flex-col items-center justify-start gap-10 bg-background-second p-4 sm:w-1/2'>
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
                                        className='rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'
                                    >
                                        #{tag}
                                    </span>
                                ))
                            ) : (
                                <span className='rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'>
                                    #No #tag
                                </span>
                            )}
                        </div>
                        {date && date != '' ? (
                            <p className='text-sm text-muted'>{date}</p>
                        ) : (
                            <p className='text-sm text-error'>Date is required</p>
                        )}
                    </div>
                    {thumbnail ? (
                        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md bg-background'>
                            <img
                                src={thumbnail}
                                alt={title}
                                className='absolute inset-0 h-full w-full object-cover object-center'
                            />
                        </div>
                    ) : (
                        <div className='relative flex aspect-[16/9] w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-background'>
                            <h1 className='cursor-pointer font-title text-4xl font-bold text-foreground'>
                                velo<span className='text-primary'>git</span>
                            </h1>

                            <IconOctocat />
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
