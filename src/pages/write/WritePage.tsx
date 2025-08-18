import PostComposer from '@/components/write/PostComposer';
import { useConfirmOnBack } from '@/hooks/useConfirmOnBack';

const WritePage = () => {
    useConfirmOnBack({
        when: true,
        message: 'You will lose your current work. Are you sure you want to leave?',
        askOnce: false,
        guardBeforeUnload: true,
    });
    return <PostComposer mode={'write'} />;
};

export default WritePage;
