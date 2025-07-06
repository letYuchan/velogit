import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface TableOfContentsBarProps {
  tableOfContentsTree: TableOfContentsItemType[];
}

const TableOfContentsBar = ({ tableOfContentsTree }: TableOfContentsBarProps) => {
  const [hasValidItems, setHasValidItems] = useState(false);
  const [activeId, setActiveId] = useState('');

  // 1. 유효한 아이템 있는지 검사
  useEffect(() => {
    const isValid = tableOfContentsTree.some(item => item.id.trim() && item.text.trim());
    setHasValidItems(isValid);
  }, [tableOfContentsTree]);

  // 2. activeId 추적 (props 기반)
  useEffect(() => {
    const flatList = tableOfContentsTree.flatMap(h1 => [h1, ...(h1.children || [])]);

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
          }));

        if (visible.length > 0) {
          const nearest = visible.reduce((a, b) => (Math.abs(a.top) < Math.abs(b.top) ? a : b));
          setActiveId(nearest.id);
        }
      },
      {
        rootMargin: '0px 0px -30% 0px', // 하단을 너무 빨리 무시하지 않게
        threshold: 0.1,
      },
    );

    flatList.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tableOfContentsTree]);

  useEffect(() => {
    const handleScrollToBottom = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

      if (atBottom && tableOfContentsTree.length > 0) {
        const flat = tableOfContentsTree.flatMap(h1 => [h1, ...(h1.children || [])]);
        const lastItem = flat[flat.length - 1];
        if (lastItem?.id) {
          setActiveId(lastItem.id);
        }
      }
    };

    window.addEventListener('scroll', handleScrollToBottom);
    return () => window.removeEventListener('scroll', handleScrollToBottom);
  }, [tableOfContentsTree]);
  console.log(tableOfContentsTree);
  if (!hasValidItems) return null;

  return (
    <aside className='fixed right-8 top-0 hidden w-60 translate-y-1/2 transform flex-col items-start justify-between overflow-hidden rounded-xl bg-background px-2 py-4 shadow-md xl:flex'>
      <h1 className='mb-4 self-center font-title text-xl font-bold text-foreground'>
        On this page
      </h1>
      <ul className='ml-4 flex w-full flex-col flex-nowrap items-start justify-around gap-2 border-l border-border pl-4 font-semibold text-muted'>
        {tableOfContentsTree.map(h1 => (
          <li key={h1.id} className='w-full'>
            <a
              href={`#${h1.id}`}
              className={clsx(
                'inline-block w-full transform text-left text-sm transition-all duration-300 hover:scale-110 hover:text-primary',
                activeId === h1.id && 'text-md scale-110 font-bold text-primary',
              )}
            >
              {h1.text}
            </a>
            {h1.children && (
              <ul>
                {h1.children.map(h2 => (
                  <li key={h2.id} className='w-full'>
                    <a
                      href={`#${h2.id}`}
                      className={clsx(
                        'relative left-2 inline-block w-full transform text-left text-xs transition-all duration-300 hover:scale-110 hover:text-primary',
                        activeId === h2.id && 'scale-110 text-sm font-bold text-primary',
                      )}
                    >
                      • {h2.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TableOfContentsBar;
