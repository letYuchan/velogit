import { useIsDesktop } from '@/hooks/useIsDesktop';
import clsx from 'clsx';
import { FiShare2 } from 'react-icons/fi';

const ShareButton = () => {
    const isDesktop = useIsDesktop();

    const copyCurrentUrlToClipboard = async () => {
        const url = window.location.href;

        try {
            await navigator.clipboard.writeText(url);
            alert('Success to copy link.');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            alert('Failed to copy link. Please try again later.');
        }
    };

    return (
        <button onClick={copyCurrentUrlToClipboard}>
            <FiShare2 className={clsx('size-5 text-foreground', isDesktop && 'size-4')} />
        </button>
    );
};

export default ShareButton;
