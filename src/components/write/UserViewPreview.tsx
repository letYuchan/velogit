import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface UserViewPreviewProps {
    isUserViewPreviewModalOpen: boolean;
    setIsUserViewPreviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserViewPreview = ({
    isUserViewPreviewModalOpen,
    setIsUserViewPreviewModalOpen,
}: UserViewPreviewProps) => {
    const { category, content, date, tags, title } = usePostWriteStore();

    useEscapeToCloseModal(() => setIsUserViewPreviewModalOpen(false));

    const handleCloseModal = () => {
        setIsUserViewPreviewModalOpen(false);
    };

    useEffect(() => {
        if (isUserViewPreviewModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isUserViewPreviewModalOpen]);

    const parsedFrontMatter: ParsedFrontMatterType = {
        title: title,
        date: date,
        tags: tags,
        category: category,
    };

    return (
        <div className='fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 p-4'>
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='h-[90vh] w-full max-w-4xl overflow-y-auto bg-background-second shadow-xl'>
                <MarkdownRenderer parsedFrontMatter={parsedFrontMatter} content={content} />
            </div>
        </div>
    );
};

export default UserViewPreview;

/**
 * UserViewPreview
 * -----------------
 * 기능:
 * - 현재 작성 중인 포스트를 "사용자 시점"에서 미리보기 하는 모달
 * - MarkdownRenderer를 사용하여 실제 렌더링 화면을 표시
 *
 * props (UserViewPreviewProps):
 * - isUserViewPreviewModalOpen: 모달 열림 여부
 * - setIsUserViewPreviewModalOpen: 모달 열림/닫힘 상태 변경 함수
 *
 * 사용 훅:
 * - usePostWriteStore: 포스트 작성 전역 상태(Zustand)
 *   - category, content, date, tags, title 가져옴
 * - useEscapeToCloseModal: ESC 키 입력 시 모달 닫기
 * - useEffect:
 *   - 모달이 열릴 때 body 스크롤 비활성화 (overflow: hidden)
 *   - 닫힐 때 스크롤 다시 활성화
 *
 * 주요 변수:
 * - parsedFrontMatter:
 *   - MarkdownRenderer에 전달할 frontmatter 데이터 (제목, 날짜, 태그, 카테고리)
 *
 * 주요 함수:
 * - handleCloseModal():
 *   - 모달 닫기 (setIsUserViewPreviewModalOpen(false))
 *
 * 동작 흐름:
 * 1) 모달이 열리면 화면 중앙에 반투명 검정 배경과 함께 표시
 * 2) 왼쪽 상단에 닫기 버튼(X) 제공
 * 3) 내부 컨텐츠 영역은 90vh 높이의 스크롤 가능한 컨테이너
 * 4) MarkdownRenderer로 작성 중인 글을 렌더링
 *
 * 스타일:
 * - TailwindCSS 기반 레이아웃
 * - 모달 배경: `bg-black/50` 반투명 오버레이
 * - 컨텐츠 박스: `bg-background-second`, 그림자 적용
 */
