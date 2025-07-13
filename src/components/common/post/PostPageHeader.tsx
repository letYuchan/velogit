interface PostPageProps {
    title: string;
    date: string;
    tags: string[];
    category: string;
}

const PostPageHeader = ({ title, date, tags, category }: PostPageProps) => {
    return (
        <header className='mb-10 w-full border-x-2 border-y-4 border-x-border border-y-primary bg-background p-6'>
            {/* Title */}
            <h1
                id='headerTag'
                className='mb-4 line-clamp-2 text-center font-title text-[50px] font-extrabold leading-tight text-foreground md:text-5xl'
            >
                {title}
            </h1>

            {/* Metadata: Category & Date */}
            <div className='mb-4 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                    {category && category != '' ? (
                        <span className='rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white'>
                            {category}
                        </span>
                    ) : (
                        <span className='rounded-full px-3 py-1 text-sm font-semibold text-error'>
                            Category is required
                        </span>
                    )}
                    {date && date != '' ? <span className='text-sm text-muted'>{date}</span> : null}
                </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
                {tags && tags[0] != ''
                    ? tags.map(tag => (
                          <span
                              key={tag}
                              className='font-semibol rounded-md bg-primary-bg px-2 py-1 text-sm font-medium text-primary shadow-sm transition'
                          >
                              #{tag}
                          </span>
                      ))
                    : null}
            </div>
        </header>
    );
};

export default PostPageHeader;
