import ShareButton from '@/components/common/post/ShareButton';

const BlogHeader = () => {
    return (
        <header
            style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}images/blogBgTestImg.jpeg)`,
            }}
            className='relative flex w-full flex-col items-center justify-center bg-cover bg-center px-6 py-12 text-white'
        >
            <div className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>

            <div className='relative z-10 flex flex-col items-center gap-4 text-center'>
                <img
                    src={`${import.meta.env.BASE_URL}images/test.jpg`}
                    alt='profile'
                    className='h-[120px] w-[120px] rounded-full border-4 border-white shadow-lg'
                />
                <h1 className='font-title text-4xl font-bold tracking-tight text-main'>
                    letYuchan's Velog
                </h1>
                <p className='text-lg font-medium text-main/80'>프론트엔드 성장 블로그</p>
                <ShareButton />
            </div>
        </header>
    );
};

export default BlogHeader;
