import FloatingToolbar from '@/components/write/FloatingToolBar';
import KoreanSpellCheckModal from '@/components/write/KoreanSpellCheckModal';
import MultilingualSpellCheckModal from '@/components/write/MultilingualSpellCheckContainer';
import { TOOL_ITEMS } from '@/data/write.constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { insertMarkdownSyntax } from '@/utils/write';
import { useState } from 'react';
import { MdSpellcheck } from 'react-icons/md';

interface ContentEditorToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ContentEditorToolbar = ({ textareaRef }: ContentEditorToolbarProps) => {
    const { setField } = usePostWriteStore();

    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isFloatingToolBarOn, setIsFloatingToolBarOn] = useState(false);
    const [isMultilingualModalOpen, setIsMultilingualModalOpen] = useState(false);
    const [isKoreanModalOpen, setIsKoreanModalOpen] = useState(false);

    const isMobile = useIsMobile();

    const handleClearContent = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        if (confirm('Do you want to clear all content?')) {
            textarea.value = '';
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            setField('content', '');
        }
    };

    return (
        <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2'>
            {isFloatingToolBarOn && !isMobile && <FloatingToolbar textareaRef={textareaRef} />}
            {/* Tool items */}
            <div className='flex flex-wrap gap-2'>
                {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                    <button
                        key={name}
                        type='button'
                        title={label}
                        onClick={() => {
                            const textarea = textareaRef.current;
                            if (!textarea) return;
                            insertMarkdownSyntax(textarea, name, insert, marker, () => {
                                if (['h1', 'h2', 'h3', 'h4', 'quote', 'list'].includes(name)) {
                                    setActiveItem(prev => (prev === name ? null : name));
                                }
                            });
                        }}
                        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-sm transition-colors duration-200 hover:bg-primary-light active:bg-primary-light ${
                            activeItem === name
                                ? 'border-primary bg-primary text-main hover:border-border hover:text-muted active:border-border active:text-muted'
                                : 'border-border bg-background text-muted'
                        }`}
                    >
                        <Icon size={16} />
                    </button>
                ))}
            </div>
            {/* Buttons container */}
            <div className='flex w-full gap-2'>
                <button
                    onClick={handleClearContent}
                    className='flex-1 rounded-md border border-error bg-error px-3 py-1 text-xl font-semibold text-main hover:bg-error/70 active:bg-error/70'
                >
                    Init
                </button>
                {!isMobile && (
                    <button
                        onClick={() => setIsFloatingToolBarOn(prev => !prev)}
                        className='flex flex-1 justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
                    >
                        {isFloatingToolBarOn ? 'Floating Bar: on' : 'Floating Bar: off'}
                    </button>
                )}
            </div>
            <div className='flex w-full gap-2'>
                <button
                    onClick={() => setIsMultilingualModalOpen(true)}
                    className='flex flex-1 justify-center rounded-md border border-primary bg-gradient-to-r from-primary-deep via-primary to-primary-light px-3 py-1 text-xl font-semibold text-main hover:from-primary hover:to-primary-light active:from-primary-deep active:to-primary'
                >
                    {isMobile ? <MdSpellcheck className='text-main' /> : 'Spell Check'}
                </button>
                <button
                    onClick={() => setIsKoreanModalOpen(true)}
                    className='flex flex-1 justify-center rounded-md border border-primary bg-gradient-to-r from-primary-deep via-primary to-primary-light px-3 py-1 text-xl font-semibold text-main hover:from-primary hover:to-primary-light active:from-primary-deep active:to-primary'
                >
                    {isMobile ? '한국어' : '한국어 교정'}
                </button>
            </div>
            {/* Modals */}
            {isMultilingualModalOpen && (
                <MultilingualSpellCheckModal
                    setIsMultilingualModalOpen={setIsMultilingualModalOpen}
                />
            )}
            {isKoreanModalOpen && (
                <KoreanSpellCheckModal setIsKoreanModalOpen={setIsKoreanModalOpen} />
            )}
        </div>
    );
};

export default ContentEditorToolbar;

/**
 * ContentEditorToolbar
 * --------------------
 * 기능:
 * - 마크다운 콘텐츠 작성 시 사용할 툴바 UI 제공
 * - 미리 정의된 마크다운 구문 삽입, 내용 초기화, 플로팅 툴바 토글, 맞춤법 검사 기능 포함
 * - 모바일/데스크톱 환경에 따라 일부 버튼과 UI 동작 변경
 *
 * props (ContentEditorToolbarProps):
 * - textareaRef: React.RefObject<HTMLTextAreaElement | null>
 *   → 마크다운 내용을 입력하는 textarea DOM 참조
 *
 * 전역 상태 (usePostWriteStore):
 * - setField('content', value): 작성 중인 content 필드 값 변경
 *
 * 로컬 상태:
 * - activeItem: string | null → 현재 활성화된 툴바 버튼의 name
 * - isFloatingToolBarOn: boolean → 플로팅 툴바 활성화 여부
 * - isMultilingualModalOpen: boolean → 다국어 맞춤법 검사 모달 열림 여부
 * - isKoreanModalOpen: boolean → 한국어 맞춤법 검사 모달 열림 여부
 *
 * 훅:
 * - useIsMobile(): boolean → 현재 뷰포트가 모바일인지 여부
 *
 * 주요 함수:
 * - handleClearContent():
 *   1) textareaRef.current가 없으면 종료
 *   2) confirm 창에서 확인 시 textarea 값 초기화
 *   3) 'input' 이벤트 디스패치하여 React 상태 업데이트 트리거
 *   4) 전역 상태 content를 빈 문자열로 설정
 *
 * UI 구성:
 * 1) 마크다운 툴 버튼 그룹:
 *    - TOOL_ITEMS 배열을 map으로 렌더링
 *    - 클릭 시 insertMarkdownSyntax() 호출해 구문 삽입
 *    - 일부 타입(h1~h4, quote, list)은 activeItem 토글 적용
 *    - 활성 상태: border-primary + 배경 primary + text-main
 *    - 비활성 상태: border-border + 배경 background + text-muted
 *
 * 2) 하단 기능 버튼 그룹 #1:
 *    - "Init": 내용 초기화 버튼 (붉은색 error 스타일)
 *    - "Floating Bar": 데스크톱에서만 표시, 플로팅 툴바 토글
 *
 * 3) 하단 기능 버튼 그룹 #2:
 *    - "Spell Check": 다국어 맞춤법 검사 모달 열기
 *      - 모바일이면 아이콘(MdSpellcheck)로 대체
 *    - "한국어 교정": 한국어 맞춤법 검사 모달 열기
 *      - 모바일이면 텍스트 '한국어'
 *
 * 4) 조건부 모달 렌더링:
 *    - isMultilingualModalOpen: <MultilingualSpellCheckModal /> 표시
 *    - isKoreanModalOpen: <KoreanSpellCheckModal /> 표시
 *
 * 동작 흐름:
 * 1) 툴 버튼 클릭 시 해당 마크다운 구문을 textarea에 삽입
 * 2) "Init" 버튼으로 전체 내용 삭제 가능
 * 3) "Floating Bar" 버튼으로 화면 커서 근처 플로팅 툴바 표시 여부 전환
 * 4) 맞춤법 검사 버튼으로 언어별 모달 열기
 */
