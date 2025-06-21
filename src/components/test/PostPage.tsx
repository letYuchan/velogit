import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/test/MarkdownRenderer';

export default function PostPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/posts/hello.md')
      .then(res => res.text())
      .then(setContent);
  }, []);

  return (
    <div className='mx-auto max-w-3xl px-4 py-10'>
      <MarkdownRenderer content={content} />
    </div>
  );
}
