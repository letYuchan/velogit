import DarkmodeToggleButton from '@/components/common/DarkmodeToggleButton';
import ThemeSelectorModal from '@/components/common/ThemeSelectorModal';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <footer className='flex w-full justify-between gap-4 bg-background p-5'>
            {/* copyright, license */}
            <div className='text-md flex flex-col gap-1'>
                <p className='font-bold text-muted'>
                    © 2025 Velogit — Created
                    <a
                        href='https://github.com/letYuchan/'
                        className='text-primary underline decoration-dotted hover:decoration-solid active:decoration-solid'
                    >
                        letYuchan
                    </a>
                    . Licensed under CC BY-NC 4.0 &#40;Personal and non-commercial use only&#41;.
                </p>
                <p className='font-bold text-muted'>
                    Fonts: SUIT and Pretendard are used under the SIL Open Font License.
                </p>
                <div className='flex flex-wrap justify-start gap-5'>
                    <DarkmodeToggleButton />
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex flex-nowrap items-center justify-center gap-2 rounded-md border border-primary bg-primary px-3 py-1 text-sm font-semibold text-foreground text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep'
                    >
                        <Palette size={18} />
                        <span className='hidden sm:inline'>Theme</span>
                    </button>
                </div>
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
            </div>
            {showModal && <ThemeSelectorModal setShowModal={setShowModal} />}
        </footer>
    );
};

export default Footer;
