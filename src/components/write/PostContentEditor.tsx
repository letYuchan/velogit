import ContentEditor from '@/components/write/ContentEditor';
import ContentPreview from '@/components/write/ContentPreview';

interface PostContentEditorProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const PostContentEditor = ({ setStep, mode, editablePost }: PostContentEditorProps) => {
    return (
        <div className='flex min-h-screen w-full flex-col sm:flex-row'>
            <ContentEditor setStep={setStep} mode={mode} editablePost={editablePost} />
            <ContentPreview mode={mode} />
        </div>
    );
};

export default PostContentEditor;
