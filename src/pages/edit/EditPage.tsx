import PostComposer from '@/components/write/PostComposer';
import { useParams } from 'react-router-dom';

const EditPage = () => {
    const { slug } = useParams();
    return <PostComposer mode={'edit'} slug={slug} />;
};

export default EditPage;
