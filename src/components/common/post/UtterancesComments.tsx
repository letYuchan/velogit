import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const UtterancesComments = () => {
    const commentRef = useRef<HTMLDivElement>(null);
    const { slug } = useParams();

    useEffect(() => {
        if (!commentRef.current) return;

        commentRef.current.innerHTML = '';

        const scriptEl = document.createElement('script');
        scriptEl.src = 'https://utteranc.es/client.js';
        scriptEl.async = true;
        scriptEl.crossOrigin = 'anonymous';

        scriptEl.setAttribute('repo', 'letYuchan/velogit');
        scriptEl.setAttribute('issue-term', slug || 'default');
        scriptEl.setAttribute('label', 'comment');
        scriptEl.setAttribute('theme', 'github-light');

        commentRef.current.appendChild(scriptEl);
    }, [slug]);

    return <div ref={commentRef} className='mx-auto w-full max-w-3xl px-4' />;
};

export default UtterancesComments;
