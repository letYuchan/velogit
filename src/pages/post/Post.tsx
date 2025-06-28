import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/test/MarkdownRenderer';

export default function Post() {
  const { slug } = useParams(); // ✅ 여기서 URL 파라미터 추출
  const [content, setContent] = useState('');

  useEffect(() => {
    if (slug) {
      fetch(`/posts/${slug}.md`)
        .then(res => res.text())
        .then(setContent);
    }
  }, [slug]);

  return (
    <div className='mx-auto max-w-3xl px-4 py-10'>
      <MarkdownRenderer content={content} />
    </div>
  );
}
