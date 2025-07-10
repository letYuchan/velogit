interface PostPageProps {
  title: string;
  date: string;
  tags: string[];
  category: string;
}

const PostPageHeader = ({ title, date, tags, category }: PostPageProps) => {
  return (
    <header className='mb-10 w-full rounded-lg border border-primary bg-background p-6 shadow-md'>
      {/* Title */}
      <h1
        id='headerTag'
        className='mb-4 line-clamp-2 font-title text-[50px] font-extrabold leading-tight text-foreground md:text-5xl'
      >
        {title}
      </h1>

      {/* Metadata: Category & Date */}
      <div className='mb-4 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white'>
            {category}
          </span>
          {date && date != '' ? <span className='text-sm text-muted'>{date}</span> : null}
        </div>
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-2'>
        {tags && tags[0] != ''
          ? tags.map(tag => (
              <span
                key={tag}
                className='rounded-md bg-muted px-3 py-1 text-xs font-medium text-foreground shadow-sm transition hover:bg-primary-bg hover:text-primary'
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
