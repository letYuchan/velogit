import { useIsDesktop } from '@/hooks/useIsDesktop';
import clsx from 'clsx';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface EditButtonProps {
    slug: string;
}

const EditButton = ({ slug }: EditButtonProps) => {
    const isDesktop = useIsDesktop();

    return (
        <Link to={`/edit/${slug}`}>
            <MdOutlineEditNote className={clsx('size-5 text-foreground', isDesktop && 'size-4')} />
        </Link>
    );
};

export default EditButton;

/**
 * EditButton
 * ----------
 * 기능:
 * - 특정 포스트의 수정 페이지로 이동하는 버튼
 * - 데스크톱/모바일 환경에 따라 아이콘 크기 조절
 *
 * props:
 * - slug: string → 수정할 포스트의 고유 식별자(경로에 사용)
 *
 * 훅:
 * - useIsDesktop(): boolean
 *   → 현재 뷰포트가 데스크톱 환경인지 여부 반환
 *
 * UI 구성:
 * - Link 컴포넌트:
 *   - 경로: `/edit/{slug}`
 *   - 내부에 MdOutlineEditNote 아이콘 표시
 * - 아이콘 스타일:
 *   - 기본 크기: size-5
 *   - 데스크톱 환경: size-4로 축소
 *   - 색상: text-foreground
 *   - clsx로 조건부 클래스 적용
 *
 * 동작 흐름:
 * 1) slug를 받아 `/edit/{slug}` 링크 생성
 * 2) 현재 기기가 데스크톱이면 아이콘 크기를 줄여 렌더링
 * 3) 아이콘 클릭 시 수정 페이지로 이동
 */
