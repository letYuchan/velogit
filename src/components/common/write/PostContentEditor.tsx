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

    return (
        <div className='flex min-h-screen w-full flex-col sm:flex-row'>
            <ContentEditor />
            <ContentPreview />
        </div>
    );
};

export default PostContentEditor;
