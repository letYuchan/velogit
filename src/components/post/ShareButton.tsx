import { useIsDesktop } from '@/hooks/useIsDesktop';
import clsx from 'clsx';
import { FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ShareButton = () => {
    const isDesktop = useIsDesktop();

    const copyCurrentUrlToClipboard = async () => {
        const url = window.location.href;

        try {
            await navigator.clipboard.writeText(url);
            toast.success('Success to copy link!');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error('Failed to copy link. Please try again later.');
        }
    };

    return (
        <button onClick={copyCurrentUrlToClipboard}>
            <FiShare2 className={clsx('size-5 text-foreground', isDesktop && 'size-4')} />
        </button>
    );
};

export default ShareButton;

/**
 * ShareButton
 * -----------
 * 기능:
 * - 현재 페이지의 URL을 클립보드에 복사
 * - 복사 성공/실패 시 toast 알림 표시
 * - 데스크톱/모바일 환경에 따라 아이콘 크기 조절
 *
 * 훅:
 * - useIsDesktop(): boolean
 *   → 현재 뷰포트가 데스크톱 환경인지 여부 반환
 *
 * 동작 함수:
 * - copyCurrentUrlToClipboard:
 *   1) window.location.href로 현재 페이지 URL 가져오기
 *   2) navigator.clipboard.writeText(url)로 클립보드에 복사
 *   3) 성공 시 toast.success('Success to copy link!')
 *   4) 실패 시 toast.error('Failed to copy link. Please try again later.')
 *
 * UI 구성:
 * - 버튼(<button>):
 *   - 클릭 시 copyCurrentUrlToClipboard 실행
 *   - 내부에 FiShare2 아이콘 표시
 *   - 아이콘 스타일:
 *     - 기본 크기: size-5
 *     - 데스크톱 환경: size-4
 *     - 색상: text-foreground
 *     - clsx로 조건부 클래스 적용
 *
 * 동작 흐름:
 * 1) 버튼 클릭 → 현재 URL 클립보드 복사 시도
 * 2) 성공/실패 여부에 따라 toast로 사용자 알림
 */
