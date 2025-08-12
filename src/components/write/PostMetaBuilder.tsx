import FrontMatterEditor from '@/components/write/FrontMatterEditor';
import FrontMatterPreview from '@/components/write/FrontMatterPreview';

interface PostMetaBuilderProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const PostMetaBuilder = ({ setStep, mode, editablePost }: PostMetaBuilderProps) => {
    return (
        <div className='flex min-h-screen w-full flex-col sm:flex-row'>
            <FrontMatterEditor setStep={setStep} mode={mode} editablePost={editablePost} />
            <FrontMatterPreview />
        </div>
    );
};

export default PostMetaBuilder;

/**
 * PostMetaBuilder
 * -----------------
 * 기능:
 * - 포스트 작성/수정 시 '메타데이터 입력' 단계를 담당하는 레이아웃 컴포넌트
 * - 좌측(또는 상단)에는 메타데이터 입력 UI, 우측(또는 하단)에는 메타데이터 미리보기 UI 구성
 *
 * props (PostMetaBuilderProps):
 * - setStep: 'meta' | 'content' 단계 전환 함수
 * - mode: 'write' | 'edit' → 작성 모드 또는 수정 모드
 * - editablePost: 기존 포스트 데이터 (edit 모드에서만 사용)
 *
 * UI 구성:
 * - 부모 div:
 *   - flex 레이아웃, 최소 높이 min-h-screen
 *   - 모바일: 세로 배치(flex-col), 데스크톱: 가로 배치(flex-row)
 * - <FrontMatterEditor />:
 *   - 제목, 날짜, 태그, 카테고리 등 포스트 메타데이터 입력
 *   - setStep, mode, editablePost 전달
 * - <FrontMatterPreview />:
 *   - 현재 입력된 메타데이터 실시간 미리보기
 *
 * 동작 흐름:
 * 1) 사용자가 메타데이터 입력 → FrontMatterEditor에서 상태 업데이트
 * 2) FrontMatterPreview가 해당 상태를 즉시 반영하여 표시
 * 3) setStep을 호출해 'content' 단계로 전환 가능
 */
