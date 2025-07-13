const CommonLoading = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center bg-background'>
            <div className='flex flex-col items-center gap-4'>
                <div className='h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent' />
                <p className='text-muted-foreground text-sm font-medium'>
                    Write your imagine with velogit!
                </p>
            </div>
        </div>
    );
};

export default CommonLoading;
