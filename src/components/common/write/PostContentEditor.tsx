import CommonLoading from '@/components/common/CommonLoading';
import ContentEditor from '@/components/common/write/ContentEditor';
import ContentPreview from '@/components/common/write/ContentPreview';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { title } from 'process';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostContentEditor = () => {
    const { category, content, date, reset, setField, summary, tags, thumbnail, title } =
        usePostWriteStore();
    // const [isLoading, setIsLoading] = useState(false);

    // const navigate = useNavigate();
    // if (title.trim() === '' || date.trim() === '' || category.trim() === '') {
    //     alert('Title, date, and category are required fields, so please fill them all out.');
    //     setIsLoading(true);
    //     reset();
    //     navigate('/write');
    //     setTimeout(() => setIsLoading(false), 1500);
    //     return;
    // }

    // if (isLoading) return <CommonLoading />;
    return (
        <div className='flex min-h-screen w-full flex-col sm:flex-row'>
            <ContentEditor />
            <ContentPreview />
        </div>
    );
};

export default PostContentEditor;
