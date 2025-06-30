import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

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
      <FiShare2 className='text-3xl' />
    </button>
  );
};

export default ShareButton;
