import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GiscusCommentsContainer = () => {
    const { slug } = useParams();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className='mx-auto w-full max-w-3xl px-4'>
            <Giscus
                id='comments'
                repo='letYuchan/velogit'
                repoId='R_kgDOO_WURQ'
                category='General'
                categoryId='DIC_kwDOO_WURc4CtPJ_'
                mapping='specific'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='top'
                lang='en'
                loading='lazy'
                theme='light'
                term={slug}
            />
        </div>
    );
};

export default GiscusCommentsContainer;
