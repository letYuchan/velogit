import BackgroundMusicController from '@/components/common/layout/footer/BackgroundMusicController';
import DarkmodeToggleButton from '@/components/common/layout/footer/DarkmodeToggleButton';
import HelpModal from '@/components/common/layout/footer/HelpModal';
import StretchingReminderSettingModal from '@/components/common/layout/footer/StretchingReminderSettingModal';
import ThemeSelectorModal from '@/components/common/layout/footer/ThemeSelectorModal';
import { getAudioFileUrls } from '@/utils';

import { Palette } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdHelp } from 'react-icons/md';

const Footer = () => {
    const [isThemeSelectorModalOpen, setIsThemeSelectorModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpMdoalOpen] = useState(false);
    const [isStretchingReminderSettingModalopen, setIsStretchingReminderSettingModalOpen] =
        useState(false);

    const musicList = getAudioFileUrls();

    return (
        <footer className='flex w-full justify-between gap-4 bg-background p-5'>
            {/* copyright, license */}
            <div className='text-md flex flex-col gap-1'>
                <p className='text-sm font-bold text-foreground'>
                    © 2025 velogit — Created&nbsp;
                    <a
                        href='https://github.com/letYuchan/'
                        className='text-primary underline decoration-dotted hover:decoration-solid active:decoration-solid'
                    >
                        letYuchan
                    </a>
                    . Licensed under CC BY-NC 4.0 &#40;Personal and non-commercial use only&#41;.
                </p>
                <p className='text-xs font-semibold text-muted'>
                    Fonts: SUIT and Pretendard are used under the SIL Open Font License.
                </p>
                <p className='text-xs font-semibold text-muted'>
                    Only royalty-free or Creative Commons licensed music is allowed. <br /> Do not
                    use copyrighted songs &#40;e.g. pop music, OSTs&#41; without permission — even
                    if found on YouTube. <br />
                    Violations may result in copyright claims or takedowns.
                </p>
                <p className='text-xs font-semibold text-muted'>
                    This application uses the "gec_kr" model by Soyoung97, available on Hugging
                    Face, licensed under the MIT License. <br /> Source:&nbsp;
                    <a
                        href='https://huggingface.co/Soyoung97/gec_kr'
                        className='text-primary underline decoration-dotted hover:decoration-solid active:decoration-solid'
                    >
                        Soyoung97
                    </a>
                </p>
                <p className='text-xs font-semibold text-muted'>
                    This application uses LanguageTool, an open-source proofreading software,
                    licensed under the GNU Lesser General Public License v2.1. <br />
                    Source:&nbsp;
                    <a
                        href='https://languagetool.org/'
                        className='text-primary underline decoration-dotted hover:decoration-solid active:decoration-solid'
                    >
                        languagetool
                    </a>
                </p>
                {/* features/setting */}
                <div className='flex flex-wrap justify-start gap-5'>
                    <DarkmodeToggleButton />
                    <button
                        onClick={() => setIsThemeSelectorModalOpen(true)}
                        className='flex flex-nowrap items-center justify-center gap-2 rounded-md border border-primary bg-primary px-3 py-1 text-sm font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep'
                    >
                        <Palette size={18} />
                        <span className='hidden sm:inline'>Theme</span>
                    </button>
                    <button
                        onClick={() => setIsStretchingReminderSettingModalOpen(true)}
                        className='flex flex-nowrap items-center justify-center gap-2 rounded-md border border-primary bg-primary px-3 py-1 text-sm font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep'
                    >
                        <GiMeditation size={18} />
                        <span className='hidden sm:inline'>Stretching</span>
                    </button>
                </div>
                {!(musicList.length <= 0) && <BackgroundMusicController musicList={musicList} />}
            </div>
            {/* links */}
            <div className='col: flex flex-col justify-start gap-4 sm:flex-row sm:justify-around'>
                <a
                    target='_blank'
                    href='https://github.com/letYuchan/velogit'
                    className='flex flex-col flex-nowrap items-center justify-start'
                >
                    <FaGithub className='text-2xl text-primary transition-transform ease-in-out hover:scale-110 active:scale-110 sm:text-3xl'></FaGithub>
                    <p className='text-md font-title text-muted sm:text-xl'>velogit</p>
                </a>
                <a
                    target='_blank'
                    href='mailto:velogit.letyuchan@gmail.com'
                    className='flex flex-col flex-nowrap items-center justify-start'
                >
                    <HiOutlineMail className='text-2xl text-primary transition-transform ease-in-out hover:scale-110 active:scale-110 sm:text-3xl' />
                    <p className='text-md font-title text-muted sm:text-xl'>contact</p>
                </a>
                <button
                    className='flex flex-col flex-nowrap items-center justify-start'
                    onClick={() => setIsHelpMdoalOpen(true)}
                >
                    <MdHelp className='text-2xl text-primary transition-transform ease-in-out hover:scale-110 active:scale-110 sm:text-3xl' />
                    <p className='text-md font-title text-muted sm:text-xl'>Help</p>
                </button>
            </div>
            {/* Modals */}
            {isThemeSelectorModalOpen && (
                <ThemeSelectorModal setIsThemeSelectorModalOpen={setIsThemeSelectorModalOpen} />
            )}
            {isHelpModalOpen && <HelpModal setIsHelpModalOpen={setIsHelpMdoalOpen} />}
            {isStretchingReminderSettingModalopen && (
                <StretchingReminderSettingModal
                    setIsStretchingReminderSettingModalOpen={
                        setIsStretchingReminderSettingModalOpen
                    }
                />
            )}
        </footer>
    );
};

export default Footer;

/**
 * Footer
 *
 * 기능:
 * - 사이트 하단 영역(UI 푸터)
 * - 저작권/라이선스 안내, 외부 링크, 유틸리티 컨트롤(다크모드, 테마 선택, 스트레칭 리마인더, BGM) 제공
 *
 * 동작 방식:
 * 1. 모달 관리
 *    - ThemeSelectorModal: 테마 선택 모달
 *    - StretchingReminderSettingModal: 스트레칭 알림 설정 모달
 *    - 각 모달은 상태로 열림/닫힘 제어
 * 2. 배경 음악
 *    - getAudioFileUrls()로 로컬/퍼블릭 경로의 BGM 목록을 가져와 BackgroundMusicController에 전달
 *    - 목록이 비어있으면 컨트롤러는 렌더링하지 않음
 * 3. 링크/버튼
 *    - GitHub 레포, 메일 링크, Help 버튼(추후 HelpModal 연동)
 *    - 다크모드 토글 버튼, 테마 선택 버튼, 스트레칭 설정 버튼 제공
 *
 * UI 특징:
 * - 좌측: 저작권/라이선스 문구, 폰트/모델/툴 출처 고지, 유틸리티 버튼들
 * - 우측: 외부 링크(깃허브/메일/헬프)
 * - 반응형 클래스와 시각적 피드백(hover/active) 적용
 */
