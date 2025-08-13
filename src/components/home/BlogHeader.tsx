import GrowthStatusModal from '@/components/home/GrowthStatusModal';
import { SELECTED_THEME_STORAGE_KEY } from '@/constants/theme.constants';
import { profileImgPath, blogOwnerDesc, blogDesc } from '@/data/home.constants';
import { headerBackgroundMap, backgroundPositionMap } from '@/data/index.constans';

import { useEffect, useState } from 'react';
import { HiChartBar } from 'react-icons/hi';

const BlogHeader = () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [isGrowthStatusModalOpen, setIsGrowthStatusModalOpen] = useState(false);

    const bgImage = headerBackgroundMap[currentTheme] || headerBackgroundMap.default;
    const bgPosition = backgroundPositionMap[currentTheme] || 'center';

    useEffect(() => {
        const updateTheme = (e?: Event) => {
            const theme =
                (e instanceof CustomEvent && typeof e.detail === 'string' && e.detail) ||
                localStorage.getItem(SELECTED_THEME_STORAGE_KEY) ||
                'default';
            setCurrentTheme(theme);
        };

        updateTheme();

        window.addEventListener('theme-change', updateTheme);

        return () => {
            window.removeEventListener('theme-change', updateTheme);
        };
    }, []);

    return (
        <header
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: bgPosition,
                backgroundSize: '100%',
            }}
            className='relative flex w-full flex-col items-center justify-center bg-cover px-6 py-12 text-white'
        >
            <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
            <div className='relative z-10 flex flex-col items-center gap-4 text-center'>
                {/* Profile image */}
                <img
                    src={profileImgPath}
                    alt='profile'
                    className='h-[120px] w-[120px] rounded-full border-4 border-white shadow-lg'
                />
                {/* Owner description */}
                <h1 className='font-title text-4xl font-bold tracking-tight text-white'>
                    {blogOwnerDesc}
                </h1>
                {/* Blog description */}
                <p className='text-lg font-medium text-white/80'>{blogDesc}</p>
                <button onClick={() => setIsGrowthStatusModalOpen(true)}>
                    <HiChartBar size={32} className='hover:text-primary active:text-primary' />
                </button>
            </div>
            {/* Modal  */}
            {isGrowthStatusModalOpen && (
                <GrowthStatusModal setIsGrowthStatusModalOepn={setIsGrowthStatusModalOpen} />
            )}
        </header>
    );
};

export default BlogHeader;

/**
 * BlogHeader
 * ----------
 * 기능:
 * - 블로그 헤더 영역을 표시
 * - 현재 선택된 테마에 따라 헤더 배경 이미지 및 위치 변경
 * - 블로그 소유자 프로필, 소개 문구, 성장 상태 모달 버튼 표시
 *
 * props:
 * - 없음
 *
 * 상태(state):
 * - currentTheme: string → 현재 선택된 테마 키 (localStorage 또는 이벤트로 갱신)
 * - isGrowthStatusModalOpen: boolean → 성장 상태 모달 표시 여부
 *
 * 상수 데이터:
 * - headerBackgroundMap: { [theme: string]: string } → 테마별 헤더 배경 이미지 경로
 * - backgroundPositionMap: { [theme: string]: string } → 테마별 배경 이미지 위치
 * - SELECTED_THEME_STORAGE_KEY → localStorage에 저장된 현재 테마 키
 * - blogOwnerDesc, blogDesc → 블로그 소유자 설명 및 블로그 설명
 * - profileImgPath → 프로필 이미지 경로
 *
 * useEffect 동작:
 * 1) 컴포넌트 마운트 시 localStorage에서 테마 읽어 currentTheme 설정
 * 2) window의 'theme-change' 커스텀 이벤트 리스너 등록
 * 3) 이벤트 발생 시 e.detail 또는 localStorage 값으로 currentTheme 갱신
 * 4) 언마운트 시 이벤트 리스너 제거
 *
 * UI 구성:
 * - 전체 헤더 영역: 배경 이미지 + 반투명 오버레이 + 중앙 콘텐츠
 * - 프로필 이미지 (원형, 테두리, 그림자 포함)
 * - 블로그 소유자 이름 (대제목)
 * - 블로그 설명 (부제목)
 * - 성장 상태 보기 버튼 (HiChartBar 아이콘)
 *
 * 동작 흐름:
 * 1) 페이지 진입 시 현재 테마에 맞는 배경 이미지/위치 적용
 * 2) 테마 변경 이벤트 발생 시 즉시 반영
 * 3) 성장 상태 버튼 클릭 시 GrowthStatusModal 열림
 * 4) 모달 닫기 시 isGrowthStatusModalOpen을 false로 설정
 */
