import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import { usePostWriteStore } from '@/store/usePostWriteStore';

interface ContentPreviewProps {
    mode: 'write' | 'edit';
}

const ContentPreview = ({ mode }: ContentPreviewProps) => {
    const { category, content, date, tags, title } = usePostWriteStore();

    const parsedFrontMatter: ParsedFrontMatterType = {
        title: title,
        date: date,
        tags: tags,
        category: category,
    };

    return (
        <section className='flex w-full flex-col justify-between gap-4 border-r border-border bg-background-second p-4 lg:w-auto lg:min-w-[801px]'>
            <MarkdownRenderer
                content={
                    mode === 'edit' ? content.replace(/^---\n[\s\S]*?\n---/, '').trim() : content
                }
                parsedFrontMatter={parsedFrontMatter}
            />
        </section>
    );
};

export default ContentPreview;

/**
 * ContentPreview
 * --------------
 * 기능:
 * - 포스트 작성/수정 화면에서 실시간 미리보기 제공
 * - 작성 중인 마크다운 콘텐츠를 HTML로 렌더링
 * - frontmatter 데이터(title, date, tags, category) 전달
 *
 * props (ContentPreviewProps):
 * - mode: 'write' | 'edit'
 *   → 'edit' 모드일 경우 기존 포스트의 frontmatter 제거 후 렌더링
 *
 * 전역 상태 (usePostWriteStore):
 * - title: string → 포스트 제목
 * - date: string → 작성일
 * - tags: string[] → 태그 목록
 * - category: string → 카테고리
 * - content: string → 마크다운 콘텐츠
 *
 * 내부 처리:
 * - parsedFrontMatter: ParsedFrontMatterType
 *   → MarkdownRenderer에 전달할 frontmatter 데이터 객체
 * - mode === 'edit'일 경우:
 *   - content에서 frontmatter(`---`로 감싸진 영역) 제거 후 trim() 적용
 * - mode === 'write'일 경우:
 *   - content 그대로 렌더링
 *
 * UI 구성:
 * - section:
 *   - 좌측 경계(border-r), 배경색 background-second
 *   - 내부 패딩 p-4, flex 레이아웃으로  MarkdownRenderer만큼의 폭(sm 이상)
 * - MarkdownRenderer:
 *   - props:
 *     - content: 변환할 마크다운 문자열
 *     - parsedFrontMatter: frontmatter 데이터
 *
 * 동작 흐름:
 * 1) 작성/수정 중인 content와 frontmatter 상태를 가져옴
 * 2) mode에 따라 frontmatter 제거 여부 결정
 * 3) MarkdownRenderer로 마크다운을 HTML로 변환하여 미리보기 표시
 */
