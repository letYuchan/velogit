import clsx from 'clsx';
import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';

const ShareButton = () => {
    const [, setCopied] = useState(false);
    const [isDesktop] = useState(window.innerWidth > 1150);

    const handleShare = async () => {
        const url = window.location.href;

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            alert('Success to copy link.');
            setTimeout(() => setCopied(false), 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            alert('Failed to copy link.');
        }
    };

    return (
        <button onClick={handleShare}>
            <FiShare2 className={clsx('size-5', isDesktop && 'size-4')} />
        </button>
    );
};

export default ShareButton;
