import FrontMatterEditor from '@/components/common/write/FrontMatterEditor';
import FrontMatterPreview from '@/components/common/write/FrontMatterPreview';

interface PostMetaBuilderProps {
  setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
}

const PostMetaBuilder = ({ setStep }: PostMetaBuilderProps) => {
  return (
    <div className='flex min-h-screen w-full flex-col sm:flex-row'>
      <FrontMatterEditor setStep={setStep} />
      <FrontMatterPreview />
    </div>
  );
};

export default PostMetaBuilder;
