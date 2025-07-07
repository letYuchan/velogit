import { useState } from 'react';

const WritePage = () => {
  const [markdown, setMarkdown] = useState('');

  return (
    <main className='flex h-screen w-full flex-row overflow-hidden'>
      {/* Left: Markdown Editor */}
      <section className='w-1/2 border-r border-border p-4'>
        <h1 className='mb-2 text-xl font-bold text-foreground'>📝 Write</h1>
        <textarea
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
          placeholder='Write your markdown here...'
          className='h-full w-full resize-none border-none bg-background font-mono text-sm text-foreground focus:outline-none'
        />
      </section>

      {/* Right: Preview */}
      <section className='w-1/2 p-4'>
        <h1 className='mb-2 text-xl font-bold text-foreground'>👀 Preview</h1>
        <div className='prose max-w-none overflow-y-auto text-foreground'>
          {/* Todo: Replace with markdown renderer */}
          <pre className='whitespace-pre-wrap break-words text-sm text-muted'>
            {markdown || 'Markdown preview will appear here.'}
          </pre>
        </div>
      </section>
    </main>
  );
};

export default WritePage;
