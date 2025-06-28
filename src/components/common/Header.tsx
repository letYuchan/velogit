import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate('/');

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <header className='border-border bg-background fixed left-0 top-0 flex h-[70px] w-full flex-nowrap justify-between border-b p-5 shadow-sm'>
      <p
        onClick={goToHomePage}
        className='text-foreground font-title cursor-pointer items-stretch text-2xl font-bold'
      >
        your's Velogit
      </p>
      <div className='flex flex-nowrap items-stretch justify-around gap-4'>
        <Link
          to='/'
          className={`flex justify-center transition-all duration-300 ease-in-out ${isActive('/') ? 'border-b-2 border-black' : ''}`}
        >
          <button className='text-foreground font-title text-xl font-semibold transition-transform ease-in-out hover:scale-110'>
            HOME
          </button>
        </Link>
        <Link
          to='/about'
          className={`flex justify-center transition-all duration-300 ease-in-out ${isActive('/about') ? 'border-b-2 border-black' : ''}`}
        >
          <button className='text-foreground font-title text-xl font-semibold transition-transform ease-in-out hover:scale-110'>
            ABOUT
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
