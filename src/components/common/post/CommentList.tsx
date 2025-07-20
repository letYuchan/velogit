const CommentList = () => {
    return (
        <ul className='w-full flex-col justify-start gap-2'>
            <li className='flex w-full flex-col gap-1 border-l-2 border-l-primary bg-background pl-2'>
                <div className='flex flex-nowrap justify-between gap-1'>
                    <h3 className='text-sm font-semibold text-foreground'>User</h3>
                    <h3 className='text-sm text-muted'>2025-07-08</h3>
                </div>
                <p className='text-sm text-foreground'>This is text comments for publishing</p>
            </li>
        </ul>
    );
};

export default CommentList;
