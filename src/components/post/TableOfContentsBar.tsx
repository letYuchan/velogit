import clsx from 'clsx';
import { useActiveTocId } from '@/hooks/useActiveTocId';

interface TableOfContentsBarProps {
    tableOfContentsTree: TableOfContentsItemType[];
}

const TableOfContentsBar = ({ tableOfContentsTree }: TableOfContentsBarProps) => {
    const activeId = useActiveTocId(tableOfContentsTree);

    const moveToTargetedHeading = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', `#${id}`);
        }
    };

    if (!tableOfContentsTree.length) return null;

    return (
        <aside className='fixed right-8 top-20 hidden w-60 translate-y-1/2 transform flex-col items-start justify-between overflow-hidden rounded-xl bg-background px-2 py-4 shadow-md xl:flex'>
            <h1 className='mb-4 self-center font-title text-xl font-bold text-foreground'>
                On this page
            </h1>
            <ul className='ml-4 flex w-full flex-col flex-nowrap items-start justify-around gap-2 border-l border-border pl-4 font-semibold text-muted'>
                {tableOfContentsTree.map(h1 => (
                    <li key={h1.id} className='w-full'>
                        <a
                            href='#'
                            onClick={e => {
                                e.preventDefault();
                                moveToTargetedHeading(h1.id);
                            }}
                            className={clsx(
                                'inline-block w-full transform text-left text-sm transition-all duration-300 hover:scale-110 hover:text-primary active:scale-110 active:text-primary',
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
                                            href='#'
                                            onClick={e => {
                                                e.preventDefault();
                                                moveToTargetedHeading(h2.id);
                                            }}
                                            className={clsx(
                                                'relative left-2 inline-block w-full transform text-left text-xs transition-all duration-300 hover:scale-110 hover:text-primary active:scale-110 active:text-primary',
                                                activeId === h2.id &&
                                                    'scale-110 text-sm font-bold text-primary',
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
