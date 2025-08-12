import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { posts } from '@/utils';

interface RelatedPostsByCategoryProps {
    currentSlug: string;
    category: string;
}

const RelatedPostsByCategory = ({ currentSlug, category }: RelatedPostsByCategoryProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const sortedRelatedPosts = posts
        .filter(post => post.category === category && post.slug !== currentSlug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const postsPerPage = 5;
    const totalPages = Math.ceil(sortedRelatedPosts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = sortedRelatedPosts.slice(indexOfFirst, indexOfLast);

    return (
        <section className='my-5 w-full max-w-3xl p-4'>
            {/* header */}
            <div
                className='mb-4 flex cursor-pointer items-center justify-between border-t border-t-primary py-4'
                onClick={() => setIsOpen(prev => !prev)}
            >
                <h2 className='text-xl font-bold text-foreground sm:text-2xl'>
                    More posts in
                    <span className='relative left-2 rounded-full bg-primary px-3 py-1 font-title font-bold text-main'>
                        {category}
                    </span>
                </h2>
                {isOpen ? (
                    <MdExpandLess className='text-2xl text-foreground sm:text-3xl' />
                ) : (
                    <MdExpandMore className='text-2xl text-foreground sm:text-3xl' />
                )}
            </div>

            {/* List */}
            {isOpen && (
                <>
                    {currentPosts.length > 0 ? (
                        <ul className='space-y-2'>
                            {currentPosts.map(post => (
                                <li
                                    key={post.slug}
                                    className='group flex items-center justify-between border-b border-border pb-2'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span className='mt-0.5 text-primary transition group-hover:translate-x-1 group-active:translate-x-1'>
                                            →
                                        </span>
                                        <Link
                                            to={`/post/${post.slug}`}
                                            className='text-base font-semibold text-foreground transition group-hover:text-primary group-active:text-primary'
                                        >
                                            {post.title}
                                        </Link>
                                    </div>
                                    <span className='whitespace-nowrap text-sm text-muted'>
                                        {post.date}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='mt-2 text-sm text-muted'>
                            No other posts in this category yet.
                        </p>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className='mb-6 mt-6 flex justify-center gap-3 text-sm text-muted'>
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className='flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary sm:text-xl'
                            >
                                ⬅ Prev
                            </button>
                            <span className='text-foreground'>
                                Page {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage(p => (p + 1 <= totalPages ? p + 1 : p))
                                }
                                disabled={currentPage === totalPages}
                                className='flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary sm:text-xl'
                            >
                                Next ➡
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default RelatedPostsByCategory;

/**
 * RelatedPostsByCategory
 * ----------------------
 * 기능:
 * - 현재 포스트와 동일한 카테고리 내의 다른 포스트 목록을 표시
 * - 최신순으로 정렬, 페이지네이션 지원 (페이지당 5개)
 * - 목록 접기/펼치기 토글 가능
 *
 * props (RelatedPostsByCategoryProps):
 * - currentSlug: string → 현재 보고 있는 포스트의 slug (자기 자신은 제외)
 * - category: string → 현재 포스트의 카테고리명
 *
 * 상태(state):
 * - isOpen: boolean → 목록 표시 여부 (기본값 true)
 * - currentPage: number → 현재 페이지 번호 (기본값 1)
 *
 * 내부 데이터 처리:
 * - sortedRelatedPosts:
 *   1) posts 배열에서 category가 동일하고 slug가 다른 포스트만 필터링
 *   2) date 기준 내림차순(최신순) 정렬
 * - postsPerPage: number = 5
 * - totalPages: 전체 페이지 수 (ceil(관련 포스트 수 / postsPerPage))
 * - currentPosts: 현재 페이지에 해당하는 포스트 목록(slice)
 *
 * UI 구성:
 * 1) Header:
 *    - 제목: "More posts in {category}" (카테고리명은 강조 스타일)
 *    - 토글 아이콘: isOpen이면 MdExpandLess, 닫혀있으면 MdExpandMore
 *    - 클릭 시 isOpen 상태 토글
 *
 * 2) List (isOpen이 true일 때만 표시):
 *    - currentPosts.length > 0이면:
 *      - 각 포스트를 li로 렌더링 (→ 아이콘, 제목, 작성일)
 *      - 제목 hover/active 시 색상 primary로 변경
 *    - 아니면 "No other posts in this category yet." 메시지 표시
 *
 * 3) Pagination (totalPages > 1일 때만 표시):
 *    - Prev 버튼: currentPage > 1일 때만 활성화
 *    - Next 버튼: currentPage < totalPages일 때만 활성화
 *    - 현재 페이지/전체 페이지 표시 ("Page X / Y")
 *
 * 스타일:
 * - 섹션: 최대 폭 3xl, 내부 패딩 p-4
 * - 목록 항목: hover 시 화살표와 제목에 이동/색상 변화
 * - 페이지네이션 버튼: primary 색상, hover/active 시 진한 색상
 *
 * 동작 흐름:
 * 1) 현재 카테고리 & slug 기반으로 관련 포스트 필터링 및 정렬
 * 2) isOpen에 따라 목록 영역 표시/숨김
 * 3) Prev/Next 클릭 시 currentPage 변경
 */
