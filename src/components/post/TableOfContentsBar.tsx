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
        <aside className='fixed right-8 top-8 hidden w-60 translate-y-1/2 transform flex-col items-start justify-between overflow-hidden rounded-xl bg-background px-2 py-4 shadow-md xl:flex'>
            <h1 className='mb-4 self-center font-title text-xl font-bold text-foreground'>
                On this page
            </h1>
            <ul className='ml-4 flex w-full flex-col flex-nowrap items-start justify-around gap-2 border-l border-border pl-4 font-semibold text-muted'>
                {/* start mapping */}
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
                        {/* 자식 node(하위 섹션) 존재 시 렌더링 부분 */}
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

/**
 * TableOfContentsBar
 * ------------------
 * 기능:
 * - 문서의 목차(TOC)를 오른쪽 사이드바에 표시
 * - 현재 스크롤 위치에 해당하는 목차 항목을 강조
 * - 클릭 시 해당 섹션으로 부드럽게 스크롤 이동
 *
 * props (TableOfContentsBarProps):
 * - tableOfContentsTree: TableOfContentsItemType[]
 *   → h1, h2 계층 구조의 목차 데이터
 *     - id: string → heading 요소의 DOM id
 *     - text: string → heading 표시 텍스트
 *     - children?: TableOfContentsItemType[] → 하위 heading(h2 등)
 *
 * 훅:
 * - useActiveTocId(tableOfContentsTree): string
 *   → 현재 뷰포트 내 활성화된 heading의 id 반환
 *
 * 내부 함수:
 * - moveToTargetedHeading(id: string):
 *   1) document.getElementById(id)로 해당 heading 요소 찾기
 *   2) scrollIntoView({ behavior: 'smooth' })로 부드럽게 스크롤 이동
 *   3) history.replaceState로 URL 해시를 해당 id로 변경
 *
 * 조건 처리:
 * - tableOfContentsTree.length === 0이면 null 반환(렌더링 안 함)
 *
 * UI 구성:
 * - aside(사이드바):
 *   - 위치: fixed right-8 top-8
 *   - 너비: w-60
 *   - 배경: bg-background
 *   - 라운드, 그림자 shadow-md, 내부 패딩 px-2 py-4
 *   - xl 이상 해상도에서만 표시(hidden → xl:flex)
 * - 제목: "On this page" (중앙 정렬, font-title, 굵게)
 * - ul(목차 리스트):
 *   - border-l, gap-2, font-semibold, text-muted
 *   - 각 h1 항목: 클릭 시 moveToTargetedHeading 호출
 *     - 활성화(activeId === h1.id) 시 scale-110, font-bold, text-primary 적용
 *   - 각 h2 항목: h1.children에서 렌더링
 *     - 왼쪽 들여쓰기(left-2), 글자 크기 text-xs
 *     - 활성화 시 scale-110, text-sm, font-bold, text-primary 적용
 *
 * 동작 흐름:
 * 1) tableOfContentsTree를 기반으로 h1/h2 계층 구조 렌더링
 * 2) 스크롤에 따라 useActiveTocId가 activeId 변경
 * 3) activeId와 일치하는 항목은 스타일로 강조
 * 4) 목차 클릭 시 해당 heading으로 스크롤 이동 및 URL 해시 변경
 */
