import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface UserViewPreviewProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserViewPreview = ({ showModal, setShowModal }: UserViewPreviewProps) => {
    const { category, content, date, tags, title } = usePostWriteStore();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    const parsedFrontMatter: ParsedFrontMatterType = {
        title: title,
        date: date,
        tags: tags,
        category: category,
    };
    return (
        <div className='fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 p-4'>
            <button onClick={() => setShowModal(false)} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>

            {/* 스크롤 가능한 컨테이너 */}
            <div className='bg-background-second h-[90vh] w-full max-w-4xl overflow-y-auto shadow-xl'>
                <MarkdownRenderer parsedFrontMatter={parsedFrontMatter} content={content} />
            </div>
        </div>
    );
};

export default UserViewPreview;
