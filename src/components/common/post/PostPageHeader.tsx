interface PostPageProps {
    title: string;
    date: string;
    tags: string[];
    category: string;
}

const PostPageHeader = ({ title, date, tags, category }: PostPageProps) => {
    return (
        <header className='mb-10 w-full rounded-md border border-border bg-background p-6 shadow-md'>
            {/* Title */}
            <h1
                id='headerTag'
                className='mb-6 break-words text-center font-title text-[40px] font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl'
            >
                {title}
            </h1>

            {/* Metadata: Category & Date */}
            <div className='mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
                <div className='flex items-center gap-3'>
                    {category ? (
                        <span className='rounded-full bg-primary px-3 py-1 font-title text-lg font-bold text-white'>
                            {category}
                        </span>
                    ) : (
                        <span className='rounded-full bg-error/20 px-3 py-1 font-title text-lg font-bold text-error'>
                            Category is required
                        </span>
                    )}
                    {date && <span className='text-sm text-muted'>{date}</span>}
                </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
                {tags && tags[0] !== '' ? (
                    tags.map(tag => (
                        <span
                            key={tag}
                            className='rounded-md bg-primary-bg px-2 py-1 text-sm font-semibold text-primary shadow-sm transition-all'
                        >
                            #{tag}
                        </span>
                    ))
                ) : (
                    <span className='text-sm text-muted'>No tags</span>
                )}
            </div>
        </header>
    );
};

export default PostPageHeader;
