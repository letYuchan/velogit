import PostComposer from '@/components/write/PostComposer';
import { useConfirmOnBack } from '@/hooks/useConfirmOnBack';
import { useParams } from 'react-router-dom';

const EditPage = () => {
    const { slug } = useParams();

    useConfirmOnBack({
        when: true,
        message: 'You will lose your current work. Are you sure you want to leave?',
        askOnce: false,
        guardBeforeUnload: true,
    });

    return <PostComposer mode={'edit'} slug={slug} />;
};

export default EditPage;
