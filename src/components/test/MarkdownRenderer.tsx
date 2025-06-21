import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className='prose max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: ({ ...props }) => (
            <img {...props} className='mx-auto my-4 w-full max-w-2xl rounded-md' />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
