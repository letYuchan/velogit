import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

const GiscusCommentsContainer = () => {
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
                mapping='pathname'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='top'
                lang='en'
                loading='lazy'
                theme='light'
            />
        </div>
    );
};

export default GiscusCommentsContainer;
