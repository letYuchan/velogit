import ContentEditor from '@/components/write/ContentEditor';
import ContentPreview from '@/components/write/ContentPreview';

interface PostContentEditorProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const PostContentEditor = ({ setStep, mode, editablePost }: PostContentEditorProps) => {
    return (
        <div className='flex min-h-screen w-full flex-col sm:flex-row'>
            <ContentEditor setStep={setStep} mode={mode} editablePost={editablePost} />
            <ContentPreview mode={mode} />
        </div>
    );
};

export default PostContentEditor;

/**
 * PostContentEditor
 * -----------------
 * 기능:
 * - 포스트 작성/수정 화면에서 '본문 작성' 단계를 담당하는 레이아웃 컴포넌트
 * - 좌측(또는 상단)에는 에디터, 우측(또는 하단)에는 미리보기 구성
 *
 * props (PostContentEditorProps):
 * - setStep: 'meta' | 'content' 단계를 전환하는 상태 변경 함수
 * - mode: 'write' | 'edit' → 작성 모드 또는 수정 모드
 * - editablePost: 기존 포스트 데이터 (edit 모드에서만 사용)
 *
 * UI 구성:
 * - 부모 div:
 *   - flex 레이아웃, 최소 높이 min-h-screen
 *   - 모바일에서는 세로 배치(flex-col), 데스크톱에서는 가로 배치(flex-row)
 * - <ContentEditor />:
 *   - 포스트 본문 작성 컴포넌트
 *   - setStep, mode, editablePost 전달
 * - <ContentPreview />:
 *   - 현재 작성 중인 포스트의 실시간 미리보기 컴포넌트
 *   - mode만 전달
 *
 * 동작 흐름:
 * 1) 사용자가 본문 작성 시 ContentEditor에서 상태 업데이트
 * 2) ContentPreview가 해당 상태를 실시간 반영하여 마크다운 렌더링
 * 3) setStep을 통해 다시 'meta' 단계로 전환 가능
 */
