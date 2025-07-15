import FrontMatterEditor from '@/components/common/write/FrontMatterEditor';
import FrontMatterPreview from '@/components/common/write/FrontMatterPreview';

interface PostMetaBuilderProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const PostMetaBuilder = ({ setStep, mode, editablePost }: PostMetaBuilderProps) => {
    return (
        <div className='flex min-h-screen w-full flex-col sm:flex-row'>
            <FrontMatterEditor setStep={setStep} mode={mode} editablePost={editablePost} />
            <FrontMatterPreview />
        </div>
    );
};

export default PostMetaBuilder;
