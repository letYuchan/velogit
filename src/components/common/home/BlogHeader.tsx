import ShareButton from '@/components/common/home/ShareButton';

const BlogHeader = () => {
  return (
    <div className="flex h-96 w-full flex-col flex-nowrap items-center justify-around gap-1 bg-[url('/images/blogBgTestImg.jpeg')] bg-cover bg-center py-1">
      <div className='flex flex-col flex-nowrap items-center justify-start'>
        <h1 className='font-title text-3xl font-bold text-foreground'>letYuchan's Velog</h1>
        <img
          src='/images/test.jpg'
          alt='profile'
          className='h-[150px] w-[150px] rounded-full bg-cover bg-center'
        />
      </div>
      <p className='text-xl font-semibold text-foreground'>frontend 공부하는 velog</p>
      <ShareButton />
    </div>
  );
};

export default BlogHeader;
