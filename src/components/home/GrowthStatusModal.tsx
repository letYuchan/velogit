import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useArrowIndexNavigation } from '@/hooks/useArrowIndexNavigation';
import {
    getDragonEvolutionGifByLevel,
    getTopThreeCategories,
    getUserBlogLevel,
} from '@/utils/home';
import { posts } from '@/utils';
import { POSTS_PER_PAGE } from '@/constants/pagination.constants';

interface GrowthStatusModalProps {
    setIsGrowthStatusModalOepn: React.Dispatch<React.SetStateAction<boolean>>;
}

const GrowthStatusModal = ({ setIsGrowthStatusModalOepn }: GrowthStatusModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentEvolutionGifPath, setCurrentEvolutionGifPath] = useState('images/egg.gif');

    const sortedPosts = useMemo(
        () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [],
    );

    const total = Math.max(1, Math.ceil(sortedPosts.length / POSTS_PER_PAGE));
    const currentPagePosts = useMemo(() => {
        const start = currentIndex * POSTS_PER_PAGE;
        return sortedPosts.slice(start, start + POSTS_PER_PAGE);
    }, [sortedPosts, currentIndex]);

    useEscapeToCloseModal(() => setIsGrowthStatusModalOepn(false));
    useArrowIndexNavigation({
        enabled: true,
        total,
        currentIndex,
        setCurrentIndex,
        loop: false,
        ignoreWhenTyping: true,
    });

    const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1));
    const goNext = () => setCurrentIndex(i => Math.min(total - 1, i + 1));
    const handleCloseModal = () => {
        setIsGrowthStatusModalOepn(false);
    };

    useEffect(() => {
        const level = getUserBlogLevel(posts.length);
        const gifPath = getDragonEvolutionGifByLevel(level) ?? 'images/egg.gif';
        setCurrentEvolutionGifPath(gifPath);
    }, [posts.length]);

    return createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button
                onClick={handleCloseModal}
                className='absolute left-4 top-4'
                aria-label='Close growth status'
            >
                <X size={32} className='text-main hover:text-primary' />
            </button>

            <div className='w-full max-w-lg rounded-2xl border border-border bg-background p-5 shadow-2xl'>
                {/* Header */}
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        🚀 My Growth Status
                    </h2>
                    <span className='text-xs text-muted'>ESC to close</span>
                </div>

                {/* Level Info */}
                <section className='flex flex-col items-center justify-evenly rounded-xl border border-border bg-background p-4'>
                    <p className='text-sm text-muted'>Current Level</p>
                    <div className='mt-1 text-2xl font-bold text-primary'>
                        LV. {getUserBlogLevel(posts.length)}
                    </div>
                    <p className='mt-1 text-sm text-foreground'>
                        Total Posts: <span className='font-semibold'>{posts.length}</span>
                    </p>

                    <img
                        src={`${import.meta.env.BASE_URL + currentEvolutionGifPath}`}
                        alt='evolution character'
                        className='mt-3 h-20 w-20 rounded-full shadow ring-2 ring-primary-light'
                    />
                </section>

                {/* Top 3 Categories */}
                <section className='mt-4 rounded-xl border border-border bg-background-second p-4'>
                    <p className='mb-2 text-center text-base font-semibold text-foreground'>
                        🏷 Top 3 Categories
                    </p>
                    <ul className='space-y-1 text-center text-sm'>
                        {getTopThreeCategories(posts).map(([category, count], idx) => (
                            <li
                                key={category}
                                className={idx === 0 ? 'font-bold text-primary' : 'text-foreground'}
                            >
                                <span className={idx === 0 ? 'text-base' : 'text-muted'}>
                                    {idx + 1}.
                                </span>
                                <span className={idx === 0 ? 'ml-1 underline' : 'ml-1'}>
                                    {category}
                                </span>
                                <span className='ml-1 text-muted'>({count}회)</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Activity Grid */}
                <section className='mt-4 rounded-xl border border-border bg-background p-4'>
                    <div className='mb-2 flex items-center justify-between'>
                        <p className='self-center text-base font-semibold text-foreground'>
                            📊 Activity Grid
                        </p>
                        <span className='self-end text-xs text-muted'>
                            Page {currentIndex + 1} / {total}
                        </span>
                    </div>

                    <div className='mx-auto grid w-fit grid-cols-6 gap-1'>
                        {currentPagePosts.map(post => (
                            <div
                                key={post.slug}
                                className='h-3.5 w-3.5 rounded-sm bg-primary/70 transition hover:bg-primary/90'
                                title={post.title}
                            />
                        ))}
                        {Array.from({ length: POSTS_PER_PAGE - currentPagePosts.length }).map(
                            (_, idx) => (
                                <div
                                    key={`empty-${idx}`}
                                    className='h-3.5 w-3.5 rounded-sm bg-border'
                                />
                            ),
                        )}
                    </div>

                    {/* Pager */}
                    {total > 1 && (
                        <div className='mt-5 flex items-center justify-center gap-3 text-sm'>
                            <button
                                onClick={goPrev}
                                disabled={currentIndex === 0}
                                className='inline-flex items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-main transition hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50'
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </button>
                            <button
                                onClick={goNext}
                                disabled={currentIndex >= total - 1}
                                className='inline-flex items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-main transition hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50'
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <div className='mt-5 flex justify-center'>
                    <button
                        className='h-9 w-full rounded-md border border-border bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default GrowthStatusModal;

/**
 * GrowthStatusModal
 * -----------------
 * 기능:
 * - 블로그 성장 상태를 모달로 표시
 * - 전체 포스트 수 기반 레벨 및 진화 GIF 노출
 * - 카테고리 Top 3와 활동 그리드(페이지네이션) 제공
 * - ESC/방향키로 닫기·페이지 이동 지원 (접근성/키보드 내비게이션)
 *
 * props:
 * - setIsGrowthStatusModalOepn: React.Dispatch<React.SetStateAction<boolean>>
 *   → 모달 열림/닫힘 상태를 외부에서 제어하기 위한 setter
 *
 * 상태(state):
 * - currentIndex: number → 활동 그리드의 현재 페이지 인덱스(0-base)
 * - currentEvolutionGifPath: string → 현재 레벨에 대응하는 진화 GIF 경로
 *
 * 상수/유틸:
 * - posts: 전체 포스트 목록(import)
 * - POSTS_PER_PAGE: 페이지당 포스트 개수(import)
 * - getUserBlogLevel(totalPosts): 포스트 수로 레벨 계산
 * - getDragonEvolutionGifByLevel(level): 레벨→진화 GIF 경로 매핑
 * - getTopThreeCategories(posts): 카테고리별 상위 3개 [카테고리, 횟수] 반환
 *
 * 파생 값(useMemo):
 * - sortedPosts: 최신순으로 정렬된 포스트 배열
 * - total: 활동 그리드의 전체 페이지 수
 * - currentPagePosts: 현재 페이지에 표시할 포스트 목록
 *
 * 커스텀 훅:
 * - useEscapeToCloseModal: ESC 키로 모달 닫기
 * - useArrowIndexNavigation: 좌/우 방향키로 페이지 이동
 *
 * useEffect 동작:
 * 1) posts.length 변화 시 getUserBlogLevel 호출 → 현재 레벨 계산
 * 2) 레벨 기반 getDragonEvolutionGifByLevel 호출 → GIF 경로 설정
 *
 * UI 구성:
 * - 배경 오버레이 및 중앙 정렬된 모달 컨테이너
 * - 닫기 버튼(X 아이콘)
 * - Header: "🚀 My Growth Status" + ESC 안내 문구
 * - Level Info: 현재 레벨, 총 포스트 수, 진화 캐릭터 이미지
 * - Top 3 Categories: 카테고리명과 횟수, 1위는 강조 스타일
 * - Activity Grid: 6열 고정 그리드, 페이지네이션 지원
 * - Pager: Prev/Next 버튼 (Chevron 아이콘 포함)
 * - Footer: Close 버튼
 *
 * 동작 흐름:
 * 1) 모달이 열리면 posts 데이터 기반으로 레벨과 GIF 설정
 * 2) ESC 키나 닫기 버튼 클릭 시 모달 종료
 * 3) 방향키 또는 Prev/Next 버튼으로 활동 그리드 페이지 이동
 */
