import { categories } from '@/utils/home';

const CategoryListSideBar = () => {
    if (!categories || categories.length === 0) return null;

    return (
        <aside className='fixed left-8 top-20 hidden w-40 rounded-xl bg-background px-4 py-6 opacity-70 shadow-md xl:flex'>
            <div className='flex w-full flex-col gap-4'>
                <h2 className='text-center text-xl font-bold text-foreground'>Categories</h2>
                <ul className='flex flex-col gap-1 font-semibold text-muted'>
                    {categories.map(category => (
                        <li
                            key={category}
                            className='text-center text-sm transition-colors hover:text-primary active:text-primary'
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default CategoryListSideBar;

/**
 * CategoryListSideBar
 * -------------------
 * 기능:
 * - 블로그 전체 카테고리 목록을 사이드바 형태로 표시
 * - 화면 왼쪽 상단 고정 위치에 배치
 * - XL 이상 해상도에서만 표시
 *
 * 데이터:
 * - categories: string[] (import from '@/utils/home')
 *   → 블로그에 존재하는 모든 카테고리 목록
 *
 * 조건 처리:
 * - categories가 없거나 빈 배열일 경우(null 또는 length === 0) 렌더링하지 않음
 *
 * UI 구성:
 * - aside 요소:
 *   - 위치: fixed left-8 top-20
 *   - 크기: w-40
 *   - 스타일: 둥근 모서리, 배경색 background, 내부 패딩(px-4 py-6)
 *   - 불투명도: 70%, 그림자 shadow-md
 *   - 반응형: xl 이상 해상도에서만 flex로 표시, 그 외 hidden
 * - 내부 구조:
 *   1) 제목: "Categories" (중앙 정렬, 굵은 글씨, text-foreground)
 *   2) 카테고리 목록:
 *      - 세로 나열(flex-col), 간격 gap-1
 *      - 항목: 중앙 정렬, 글자 크기 text-sm, 색상 text-muted
 *      - hover/active 시 글자색 primary로 변경
 *
 * 동작 흐름:
 * 1) categories 배열을 받아 사이드바에 표시
 * 2) 사용자가 카테고리 hover 시 색상 변화
 * 3) XL 이상 해상도에서만 화면에 노출
 */
