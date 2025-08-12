import IconOctocat from '@/components/icons/IconOctocat';
import PostPageHeader from '@/components/post/PostPageHeader';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { MdArrowForwardIos } from 'react-icons/md';

const FrontMatterPreview = () => {
    const { category, summary, tags, date, title, thumbnail } = usePostWriteStore();

    return (
        <section className='flex w-full flex-1 flex-col items-center justify-start gap-10 bg-background-second p-4 sm:w-1/2'>
            {/* post meta&postHeader */}
            <div className='flex w-full flex-col gap-2'>
                <h2 className='font-title text-3xl font-bold text-foreground'>Post Card</h2>
                <article className='flex h-[27rem] w-full flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md'>
                    <div className='flex flex-1 flex-col gap-2'>
                        {title && title != '' ? (
                            <h2 className='line-clamp-1 font-title text-2xl font-bold text-foreground'>
                                {title}
                            </h2>
                        ) : (
                            <h2 className='line-clamp-1 font-title text-2xl font-bold text-error'>
                                Title is required
                            </h2>
                        )}
                        {summary && summary != '' ? (
                            <p className='line-clamp-3 w-full text-lg text-muted'>{summary}</p>
                        ) : (
                            <p className='w-full text-lg text-muted'>No summary info</p>
                        )}
                        <div className='flex flex-wrap gap-2 pt-1'>
                            {tags.length > 0 && tags.some(tag => tag.trim() !== '') ? (
                                tags.map((tag, idx) => (
                                    <span
                                        key={`${tag}-${idx}`}
                                        className='rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'
                                    >
                                        #{tag}
                                    </span>
                                ))
                            ) : (
                                <span className='rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'>
                                    #No #tag
                                </span>
                            )}
                        </div>
                        {date && date != '' ? (
                            <p className='text-sm text-muted'>{date}</p>
                        ) : (
                            <p className='text-sm text-error'>Date is required</p>
                        )}
                    </div>
                    {thumbnail ? (
                        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md bg-background'>
                            <img
                                src={thumbnail}
                                alt={title}
                                className='absolute inset-0 h-full w-full object-cover object-center'
                            />
                        </div>
                    ) : (
                        <div className='relative flex aspect-[16/9] w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-background'>
                            <h1 className='cursor-pointer font-title text-4xl font-bold text-foreground'>
                                velo<span className='text-primary'>git</span>
                            </h1>

                            <IconOctocat />
                        </div>
                    )}
                    <div className='mt-4 border-t border-border pt-2 text-right'>
                        <div className='inline-flex items-center gap-1 text-sm font-semibold text-primary'>
                            Read more
                            <MdArrowForwardIos className='text-sm' />
                        </div>
                    </div>
                </article>
            </div>
            {/* contour */}
            <div className='h-[1px] w-full bg-primary'></div>
            {/* post header */}
            <div className='flex w-full flex-col gap-2'>
                <h2 className='font-title text-3xl font-bold text-foreground'>Post Header</h2>
                <PostPageHeader title={title} date={date} tags={tags} category={category} />
            </div>
        </section>
    );
};

export default FrontMatterPreview;

/**
 * FrontMatterPreview
 * ------------------
 * 기능:
 * - 작성/수정 중인 포스트의 frontmatter 데이터를 실시간 카드 미리보기(Post Card)와
 *   상세 페이지 헤더(Post Header) 형태로 렌더링
 * - 사용자가 입력한 title, date, tags, summary, thumbnail, category를 반영
 * - 필수 값 누락 시 경고 스타일로 표시
 *
 * 전역 상태 (usePostWriteStore):
 * - title: string → 포스트 제목
 * - date: string → 작성일
 * - tags: string[] → 태그 목록
 * - summary: string → 요약문
 * - thumbnail: string → 썸네일 이미지 경로
 * - category: string → 카테고리명
 *
 * UI 구성:
 * 1) **Post Card 미리보기**
 *    - 제목:
 *      - 값이 있으면 text-foreground
 *      - 없으면 text-error + "Title is required"
 *    - 요약:
 *      - 값이 있으면 최대 3줄 표시(line-clamp-3)
 *      - 없으면 "No summary info"
 *    - 태그:
 *      - 유효한 태그가 있으면 전부 표시
 *      - 없으면 "#No #tag" 표시
 *    - 작성일:
 *      - 값이 있으면 text-muted
 *      - 없으면 text-error + "Date is required"
 *    - 썸네일:
 *      - 값이 있으면 이미지 출력(object-cover)
 *      - 없으면 기본 로고 + IconOctocat 표시
 *    - Footer:
 *      - "Read more" 텍스트 + 화살표 아이콘
 *
 * 2) **구분선(contour)**: 회색 1px 라인
 *
 * 3) **Post Header 미리보기**
 *    - <PostPageHeader /> 컴포넌트 호출
 *    - props:
 *      - title, date, tags, category 전역 상태값 전달
 *
 * 스타일:
 * - 섹션 전체: flex 레이아웃, sm:w-1/2, 배경 background-second, 내부 패딩 p-4
 * - Post Card:
 *   - 높이 고정(h-[27rem]), border, 그림자 shadow-md
 *   - flex-col 레이아웃으로 상단 정보/썸네일/푸터 분리
 *
 * 동작 흐름:
 * 1) 전역 상태에서 frontmatter 필드값 읽어와 Post Card와 Post Header에 반영
 * 2) 필수 값(title/date) 누락 시 경고 스타일로 표시
 * 3) 미리보기는 입력과 동시에 즉시 반영
 */
