import BackgroundMusicController from '@/components/BackgroundMusicController';
import DarkmodeToggleButton from '@/components/DarkmodeToggleButton';
import ThemeSelectorModal from '@/components/ThemeSelectorModal';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { MdHelp } from 'react-icons/md';

const Footer = () => {
    const [isThemeSelectorModalOpen, setIsThemeSelectorModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpMdoalOpen] = useState(false);

    return (
        <footer className='flex w-full justify-between gap-4 bg-background p-5'>
            {/* copyright, license */}
            <div className='text-md flex flex-col gap-1'>
                <p className='text-sm font-bold text-foreground'>
                    © 2025 Velogit — Created
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
                    Face, licensed under the MIT License. <br /> Source:
                    https://huggingface.co/Soyoung97/gec_kr
                </p>
                <p className='text-xs font-semibold text-muted'>
                    This application uses LanguageTool, an open-source proofreading software,
                    licensed under the GNU Lesser General Public License v2.1. <br />
                    Source: https://languagetool.org/
                </p>
                <div className='flex flex-wrap justify-start gap-5'>
                    <DarkmodeToggleButton />
                    <button
                        onClick={() => setIsThemeSelectorModalOpen(true)}
                        className='flex flex-nowrap items-center justify-center gap-2 rounded-md border border-primary bg-primary px-3 py-1 text-sm font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep'
                    >
                        <Palette size={18} />
                        <span className='hidden sm:inline'>Theme</span>
                    </button>
                </div>
                <BackgroundMusicController />
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
                    href='mailto:yuchancho174@gmail.com'
                    className='flex flex-col flex-nowrap items-center justify-start'
                >
                    <HiOutlineMail className='text-2xl text-primary transition-transform ease-in-out hover:scale-110 active:scale-100 sm:text-3xl' />
                    <p className='text-md font-title text-muted sm:text-xl'>contact</p>
                </a>
                <button
                    className='flex flex-col flex-nowrap items-center justify-start'
                    onClick={() => setIsHelpMdoalOpen(true)}
                >
                    <MdHelp className='text-2xl text-primary transition-transform ease-in-out hover:scale-110 active:scale-100 sm:text-3xl' />
                    <p className='text-md font-title text-muted sm:text-xl'>Help</p>
                </button>
            </div>
            {isThemeSelectorModalOpen && (
                <ThemeSelectorModal setIsThemeSelectorModalOpen={setIsThemeSelectorModalOpen} />
            )}
            {/* {isHelpModalOpen && <HelpModal setIsHelpModalOpen={setIsHelpMdoalOpen} />} */}
        </footer>
    );
};

export default Footer;
