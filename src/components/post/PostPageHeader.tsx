interface PostPageProps {
    title: string;
    date: string;
    tags: string[];
    category: string;
}

const PostPageHeader = ({ title, date, tags, category }: PostPageProps) => {
    return (
        <header className='mb-10 w-full rounded-md border border-border bg-background p-6 shadow-md'>
            {/* Title */}
            <h1
                id='headerTag'
                className='mb-6 break-words text-center font-title text-[40px] font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl'
            >
                {title}
            </h1>

            {/* Metadata: Category & Date */}
            <div className='mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
                <div className='flex items-center gap-3'>
                    {category ? (
                        <span className='flex h-10 items-center justify-center rounded-full bg-primary px-3 py-1 font-title text-lg font-bold text-main'>
                            {category}
                        </span>
                    ) : (
                        <span className='flex h-10 items-center justify-center rounded-full bg-error/20 px-3 py-1 font-title text-lg font-bold text-error'>
                            Category is required
                        </span>
                    )}
                    {date && <span className='text-sm text-muted'>{date}</span>}
                </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
                {tags && tags[0] !== '' ? (
                    tags.map(tag => (
                        <span
                            key={tag}
                            className='flex h-6 items-center justify-center rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'
                        >
                            #{tag}
                        </span>
                    ))
                ) : (
                    <span className='flex h-6 items-center justify-center rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'>
                        #No #tag
                    </span>
                )}
            </div>
        </header>
    );
};

export default PostPageHeader;

/**
 * PostPageHeader
 * --------------
 * 기능:
 * - 블로그 포스트 상세 페이지의 헤더 영역 표시
 * - 제목, 카테고리, 작성일, 태그 정보 렌더링
 *
 * props (PostPageProps):
 * - title: string → 포스트 제목
 * - date: string → 작성일
 * - tags: string[] → 태그 목록 (없거나 첫 요소가 빈 문자열이면 '#No #tag' 표시)
 * - category: string → 카테고리명 (없으면 'Category is required' 경고 스타일 표시)
 *
 * UI 구성:
 * 1) 제목(Title):
 *    - 중앙 정렬, 굵은 폰트, 반응형 폰트 크기(sm: text-4xl, md: text-5xl)
 *    - break-words 처리로 긴 제목 줄바꿈
 * 2) 메타데이터(Metadata):
 *    - 왼쪽: 카테고리(배경색 primary, 글자색 main)
 *    - 카테고리 없을 시: 배경색 error/20, 글자색 error
 *    - 오른쪽: 작성일(date, text-muted)
 *    - sm 이상에서는 flex-row로 배치
 * 3) 태그 목록(Tags):
 *    - 태그 배열이 유효하면 모두 출력
 *    - 태그 없거나 첫 요소가 빈 문자열이면 '#No #tag' 표시
 *    - 스타일: 배경색 primary, 글자색 main, 둥근 모서리
 *
 * 스타일:
 * - 헤더 전체: 둥근 모서리, border, 배경색 background, 내부 패딩 p-6, 그림자 shadow-md
 * - 제목: 폰트 패밀리 font-title, tracking-tight, leading-tight
 * - 카테고리/태그: 배경색과 폰트 스타일로 구분 강조
 *
 * 동작 흐름:
 * 1) props로 전달받은 데이터 기반 UI 렌더링
 * 2) 카테고리, 태그, 작성일 유무에 따라 조건부 스타일 및 기본값 표시
 */
