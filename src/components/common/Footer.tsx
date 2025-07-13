import { FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className='flex max-h-[120px] w-full justify-between gap-4 bg-background p-5'>
            {/* copyright, license */}
            <div className='flex flex-col gap-1'>
                <p className='font-bold text-muted'>
                    © 2025 Velogit — Created{' '}
                    <a href='https://github.com/letYuchan/' className='text-primary underline'>
                        letYuchan
                    </a>
                    . Licensed under CC BY-NC 4.0 &#40;Personal and non-commercial use only&#41;.
                </p>
                <p className='font-bold text-muted'>
                    Fonts: SUIT and Pretendard are used under the SIL Open Font License.
                </p>
            </div>
            {/* links */}
            <div className='flex justify-around gap-4'>
                <a
                    href='https://github.com/letYuchan/velogit'
                    className='flex flex-col flex-nowrap items-center justify-start'
                >
                    <FaGithub className='text-5xl transition-transform ease-in-out hover:scale-110'></FaGithub>
                    <p className='font-title text-xl text-foreground sm:text-2xl'>velogit</p>
                </a>
                <a
                    href='mailto:yuchancho174@gmail.com'
                    className='flex flex-col flex-nowrap items-center justify-start'
                >
                    <HiOutlineMail className='text-5xl transition-transform ease-in-out hover:scale-110' />
                    <p className='font-title text-xl text-foreground sm:text-2xl'>contact</p>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
