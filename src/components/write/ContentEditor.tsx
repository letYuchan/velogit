import { usePostWriteStore } from '@/store/usePostWriteStore';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ContentEditorToolbar from '@/components/write/ContentEditorToolbar';
import UserViewPreview from '@/components/write/UserViewPreview';
import { toast } from 'react-toastify';
import CommonLoading from '@/components/common/CommonLoading';
import { POST_KEY } from '@/constants/write';

interface ContentEditorProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const ContentEditor = ({ setStep, mode, editablePost }: ContentEditorProps) => {
    const { content, setField, buildMarkdown, title, date, category, reset } = usePostWriteStore();

    const [isContentInvalid, setIsContentInvalid] = useState(false);
    const [isUserViewPreviewModalOpen, setIsUserViewPreviewModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setField('content', e.target.value);
    };

    const handleTextareaTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Tab') return;

        e.preventDefault();
        const tab = '  ';
        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd, value } = textarea;

        const newValue = value.slice(0, selectionStart) + tab + value.slice(selectionEnd);
        textarea.value = newValue;

        textarea.selectionStart = textarea.selectionEnd = selectionStart + tab.length;

        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
    };

    const exportPostAsJson = async () => {
        if (!confirm('Do you want to export the post for publishing?')) return;

        if (!title || !date || !category) {
            toast.error('Invalid frontmatter (title/date/category)');
            reset();
            setStep('meta');
            if (mode === 'write') {
                navigate('/write');
            }

            if (mode === 'edit') {
                navigate('/edit');
            }
            return;
        }

        const contentInvalid = content.trim() === '';
        setIsContentInvalid(contentInvalid);
        if (contentInvalid) {
            toast.info('Content is required.');
            return;
        }

        const markdown = buildMarkdown();

        const defaultFileName = mode === 'edit' && editablePost ? editablePost.slug : 'post-sample';

        const inputFileName = prompt('Enter filename to export (without .json):', defaultFileName);
        if (!inputFileName || !inputFileName.trim()) {
            toast.error('Invalid file name. Export cancelled.');
            return;
        }

        const sanitizedName = inputFileName.trim().replace(/\s+/g, '-');
        const fileName = `${sanitizedName}.json`;

        const blob = new Blob([JSON.stringify({ [POST_KEY]: markdown }, null, 2)], {
            type: 'application/json',
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);

        const isEdit = mode === 'edit';
        const scriptToRun = isEdit ? 'autoEdit.ts' : 'autoPublish.ts';
        const cmd = isEdit
            ? `npx tsx scripts/${scriptToRun} ${sanitizedName} ${editablePost?.slug}`
            : `npx tsx scripts/${scriptToRun} ${sanitizedName}`;

        try {
            await navigator.clipboard.writeText(cmd);

            alert(
                `Post JSON exported as "${fileName}"\nTerminal command copied!\n\nNow open your terminal and run:\n${cmd}`,
            );
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 3000);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error(
                `Post JSON exported as "${fileName}"\nCould not copy command. Please run manually:\n${cmd}`,
            );
        }
    };

    useEffect(() => {
        if (mode === 'edit' && editablePost) {
            const parsedContent = editablePost.content.replace(/^---\n[\s\S]*?\n---/, '').trim();
            setField('content', parsedContent);
        }
    }, [mode, editablePost]);

    if (isLoading) return <CommonLoading />;

    return (
        <section className='flex w-full flex-1 flex-col justify-start gap-4 bg-background p-4 sm:w-1/2'>
            <div className='flex flex-col gap-2'>
                <ContentEditorToolbar textareaRef={textareaRef} />
                {/* User write here */}
                <textarea
                    ref={textareaRef}
                    id='markdown-content'
                    name='content'
                    placeholder='Write content here...'
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleTextareaTabKey}
                    className={clsx(
                        'min-h-[400px] w-full resize-y rounded-md border-l-8 bg-background-second p-4 text-base leading-relaxed text-foreground transition-colors duration-200 ease-in-out focus:outline-none',
                        isContentInvalid ? 'border-error placeholder:text-error' : 'border-primary',
                    )}
                />
            </div>
            {/* Buttons container */}
            <div className='flex w-full flex-nowrap justify-between gap-1'>
                <button
                    onClick={() => setIsUserViewPreviewModalOpen(true)}
                    className='flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
                >
                    User Preview
                </button>
                <button
                    onClick={exportPostAsJson}
                    className='flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
                >
                    {mode === 'edit' ? 'Edit' : 'Publish'}
                </button>
            </div>
            {/* Preview modal */}
            {isUserViewPreviewModalOpen && (
                <UserViewPreview
                    isUserViewPreviewModalOpen={isUserViewPreviewModalOpen}
                    setIsUserViewPreviewModalOpen={setIsUserViewPreviewModalOpen}
                />
            )}
        </section>
    );
};

export default ContentEditor;

/**
 * ContentEditor
 * -------------
 * 기능:
 * - 마크다운 기반 포스트 작성/수정 UI 제공
 * - 내용 입력, 사용자 미리보기, JSON 파일 내보내기(퍼블리시/수정용) 기능 지원
 * - 로컬 상태 및 전역 상태(usePostWriteStore) 연동
 *
 * props (ContentEditorProps):
 * - setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>> → 작성 단계 전환 함수
 * - mode: 'write' | 'edit' → 작성 모드 또는 수정 모드
 * - editablePost: PostData | undefined → 수정 모드일 경우 편집할 포스트 데이터
 *
 * 전역 상태 (usePostWriteStore):
 * - content: string → 현재 작성 중인 포스트 내용
 * - title: string → 포스트 제목
 * - date: string → 포스트 작성일
 * - category: string → 카테고리명
 * - setField(key, value): 상태 필드 업데이트
 * - buildMarkdown(): frontmatter + content 조합으로 마크다운 문자열 생성
 * - reset(): 작성 상태 초기화
 *
 * 로컬 상태:
 * - isContentInvalid: boolean → 내용 유효성 플래그
 * - isUserViewPreviewModalOpen: boolean → 사용자 미리보기 모달 열림 여부
 * - isLoading: boolean → 퍼블리시/수정 처리 중 로딩 여부
 *
 * refs:
 * - textareaRef: HTMLTextAreaElement → 마크다운 입력 textarea DOM 참조
 *
 * 주요 함수:
 * - handleContentChange(e): textarea 변경 시 content 상태 업데이트
 * - handleTextareaTabKey(e): Tab 키 입력 시 공백 2칸 삽입 (기본 포커스 이동 방지)
 * - exportPostAsJson():
 *   1) 퍼블리시/수정 확인(confirm)
 *   2) frontmatter 유효성 검사 (title/date/category)
 *   3) content 유효성 검사
 *   4) buildMarkdown()으로 마크다운 생성
 *   5) JSON 파일(blob) 생성 및 다운로드
 *   6) 자동 실행 명령어(npx tsx scripts/...) 클립보드 복사
 *   7) 성공 시 로딩 화면 → 홈 이동
 *
 * useEffect:
 * - mode === 'edit' && editablePost 존재 시:
 *   - 기존 content에서 frontmatter 제거 후 textarea에 세팅
 *
 * 조건부 렌더링:
 * - isLoading이 true면 <CommonLoading /> 표시
 * - isUserViewPreviewModalOpen이 true면 <UserViewPreview /> 모달 표시
 *
 * UI 구성:
 * 1) 툴바(ContentEditorToolbar)
 * 2) 마크다운 입력 textarea:
 *    - 최소 높이 400px, border-l-8
 *    - content 유효성 여부에 따라 border 색상(error 또는 primary)
 *    - Tab 입력 시 공백 삽입 가능
 * 3) 하단 버튼:
 *    - "User Preview": 사용자 미리보기 모달 열기
 *    - "Publish" 또는 "Edit": exportPostAsJson 실행
 *
 * 동작 흐름:
 * 1) 작성 모드(write) 또는 수정 모드(edit)에 따라 UI와 로직 분기
 * 2) 유효성 검증 후 JSON 파일 다운로드 및 자동 실행 명령어 클립보드 복사
 * 3) 성공 시 로딩 표시 후 홈으로 이동
 */
