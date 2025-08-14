import IconOctocat from '@/components/icons/IconOctocat';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: PostData }) => {
    return (
        <article
            key={post.slug}
            className='flex h-[27rem] flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:border-primary hover:shadow-lg active:translate-y-[-5px] active:border-primary active:shadow-lg'
        >
            {/* header */}
            <div className='flex flex-1 flex-col gap-2'>
                <h2 className='line-clamp-1 whitespace-pre-wrap break-words font-title text-2xl font-bold text-foreground'>
                    {post.title}
                </h2>
                {post.summary && post.summary != '' ? (
                    <p className='line-clamp-3 w-full text-lg text-muted'>{post.summary}</p>
                ) : (
                    <p className='w-full text-lg text-muted'>No summary info</p>
                )}
                <div className='flex flex-wrap gap-2 pt-1'>
                    {post.tags && post.tags[0] != '' ? (
                        post.tags.map((tag, idx) => (
                            <span
                                key={`${post.slug}-${tag}-${idx}`}
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

                <p className='text-sm text-muted'>{post.date}</p>
            </div>
            {/* thumbnail */}
            {post.thumbnail ? (
                <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md bg-background'>
                    <img
                        src={`${import.meta.env.BASE_URL + post.thumbnail}`}
                        alt={post.title}
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
            {/* footer */}
            <div className='mt-4 border-t border-border pt-2 text-right'>
                <Link
                    to={`/post/${post.slug}`}
                    className='inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline active:underline'
                >
                    Read more
                    <MdArrowForwardIos className='text-sm' />
                </Link>
            </div>
        </article>
    );
};

export default PostCard;

/**
 * PostCard
 * --------
 * 기능:
 * - 개별 블로그 포스트 정보를 카드 형태로 표시
 * - 제목, 요약, 태그, 날짜, 썸네일(또는 기본 대체 UI) 제공
 * - 'Read more' 버튼을 통해 상세 페이지로 이동
 *
 * props:
 * - post: PostData → 포스트 데이터 객체
 *   - slug: string → 포스트 URL 경로
 *   - title: string → 포스트 제목
 *   - summary?: string → 포스트 요약 (없을 경우 'No summary info' 표시)
 *   - tags?: string[] → 태그 목록 (없거나 빈 경우 '#No #tag' 표시)
 *   - date: string → 작성일
 *   - thumbnail?: string → 썸네일 이미지 경로 (없으면 기본 UI 표시)
 *
 * UI 구성:
 * 1) Header 영역:
 *    - 제목: 한 줄 제한(line-clamp-1), 줄바꿈·단어단위 잘림 처리
 *    - 요약: 최대 3줄 제한(line-clamp-3), 없으면 기본 문구 표시
 *    - 태그: 배열 존재 시 모두 출력, 없으면 '#No #tag'
 *    - 작성일 표시
 *
 * 2) Thumbnail 영역:
 *    - thumbnail 존재 시: 16:9 비율의 이미지 렌더링 (object-cover)
 *    - thumbnail 없을 시: 기본 대체 UI (프로젝트 로고 텍스트 + IconOctocat)
 *
 * 3) Footer 영역:
 *    - 'Read more' 링크 버튼
 *    - 클릭 시 `/post/{slug}`로 이동
 *    - 오른쪽 화살표 아이콘(MdArrowForwardIos) 포함
 *
 * 스타일:
 * - 전체 카드: 라운드 처리, 그림자, 호버·액티브 시 살짝 위로 이동 및 강조(border-primary)
 * - 태그: 배경색 primary, 글자색 main, 둥근 모서리
 * - 썸네일: overflow-hidden, border-radius 적용
 *
 * 동작 흐름:
 * 1) PostData를 받아 카드 형태로 렌더링
 * 2) 데이터 유무에 따라 요약/태그/썸네일 대체 UI 처리
 * 3) 'Read more' 클릭 시 상세 페이지 이동
 */
