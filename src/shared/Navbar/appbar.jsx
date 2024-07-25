import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { Twirl as Hamburger } from 'hamburger-react';
import { useEffect, useRef, useState } from 'react';

const Appbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const user = localStorage?.getItem('user');
  const navBody = useRef(null);
  const hamburger = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [navOpen]);

  // closing the nav on outside click
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (
        !navBody.current.contains(event.target) &&
        !hamburger.current.contains(event.target)
      ) {
        setNavOpen(false);
        setIsHamburgerActive(false);
      }
    });
  }, []);

  const turnOffNav = () => {
    setNavOpen(false);
    setIsHamburgerActive(false);
  };

  return (
    <header
      className='sticky top-0 z-[100] w-full '
      style={{
        background: 'rgba(255, 235, 235, 1)',
      }}>
      <div className='flex items-center justify-between lg:justify-start gap-[30px] py-2 max-w-[1440px] mx-auto px-3 lg:px-0'>
        {/* logo */}
        <a
          href='/'
          className=' w-[80px] h-[60px] lg:w-[80px] lg:h-[60px]'>
          <img
            className='w-full h-full'
            src={logo}
            alt=''
          />
        </a>

        {/* menu area */}
        <div
          ref={navBody}
          className={`flex fixed top-0 flex-grow lg:justify-between lg:relative  lg:items-center lg:flex-row flex-col gap-8 lg:gap-[55px] z-20  lg:bg-none lg:h-auto lg:w-fit w-[80%] h-screen pt-[30px] px-3 lg:pt-0 lg:px-0 shadow-2xl lg:shadow-none duration-300 ease-in-out bg-white lg:bg-transparent  ${
            navOpen ? 'left-0' : '-left-full lg:left-auto'
          }`}>
          <div className=' w-[80px] h-[60px] lg:hidden'>
            <img
              className='w-full h-full'
              src={logo}
              alt=''
            />
          </div>
          {/* link wrapper */}
          <div className=' text-black leading-6  flex lg:items-center flex-col lg:flex-row gap-3  sm:gap-7'>
            <NavLink
              onClick={turnOffNav}
              to={'/'}>
              Home
            </NavLink>
            <NavLink
              onClick={turnOffNav}
              to={'/player-list'}>
              Player Search
            </NavLink>
            <NavLink
              onClick={turnOffNav}
              to={'/pricing'}>
              Plans & Pricing
            </NavLink>
            <NavLink
              onClick={turnOffNav}
              to={'/about'}>
              About
            </NavLink>
            <NavLink
              onClick={turnOffNav}
              to={'/contact'}>
              Contact us
            </NavLink>
            {localStorage.getItem('user') ? (
              <NavLink
                onClick={turnOffNav}
                to={
                  JSON.parse(user)?.role === 'coach'
                    ? '/create-coach-profile'
                    : '/create-player-profile'
                }>
                Create Profile
              </NavLink>
            ) : (
              ''
            )}
            <NavLink
              onClick={turnOffNav}
              to={'/available-players'}>
              Available Players
            </NavLink>
            {JSON.parse(user)?.role === 'coach' ? (
              <>
                <NavLink
                  onClick={turnOffNav}
                  to={'/favourite-players'}>
                  Favourite Players
                </NavLink>

                <NavLink
                  onClick={turnOffNav}
                  to={'/watch-list'}>
                  Watch list
                </NavLink>
              </>
            ) : null}

            <NavLink
              onClick={turnOffNav}
              to={'/newsFeed'}>
              NewsFeed
            </NavLink>
          </div>

          {/* button wrapper */}
          <div className='flex lg:items-center gap-4 flex-col lg:flex-row'>
            {/* login button */}
            {localStorage?.getItem('user') ? (
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload(true);
                }}
                className='text-sm leading-6 text-primaryColor py-2 px-6  rounded-[30px] hover:bg-gray-100  w-fit'>
                Log out
              </button>
            ) : (
              <div className='flex lg:items-center gap-2 flex-col lg:flex-row'>
                <button
                  onClick={() => navigate('/login')}
                  className='text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit'>
                  Login
                </button>
                <button
                  onClick={() => navigate('/sign-up')}
                  className='text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit'>
                  Join
                </button>
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className='text-sm leading-6 text-black uppercase p-2  rounded-[30px] hover:bg-gray-100 w-fit'>
              <svg
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M0 10.6875C0 5.1685 4.48 0.6875 10 0.6875C15.53 0.6875 20 5.1685 20 10.6875C20 16.2085 15.53 20.6875 10 20.6875C4.48 20.6875 0 16.2085 0 10.6875ZM9.12 6.8975C9.12 6.4185 9.52 6.0175 10 6.0175C10.48 6.0175 10.87 6.4185 10.87 6.8975V11.3175C10.87 11.7985 10.48 12.1875 10 12.1875C9.52 12.1875 9.12 11.7985 9.12 11.3175V6.8975ZM10.01 15.3685C9.52 15.3685 9.13 14.9685 9.13 14.4885C9.13 14.0085 9.52 13.6185 10 13.6185C10.49 13.6185 10.88 14.0085 10.88 14.4885C10.88 14.9685 10.49 15.3685 10.01 15.3685Z'
                  fill='#FF3333'
                />
              </svg>
            </button>
            <button
              onClick={() => navigate('/')}
              className='text-sm leading-6 text-black uppercase p-2  rounded-[30px] hover:bg-gray-100 w-fit'>
              <svg
                width='21'
                height='22'
                viewBox='0 0 21 22'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <circle
                  cx='9.7659'
                  cy='10.4534'
                  r='8.98856'
                  stroke='#130F26'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M16.0176 17.1719L19.5416 20.6867'
                  stroke='#130F26'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* hamburger icon */}
        <div
          ref={hamburger}
          onClick={() => setNavOpen(!navOpen)}
          className='w-fit lg:hidden'>
          <Hamburger
            toggle={setIsHamburgerActive}
            toggled={isHamburgerActive}
            size={24}
            direction='right'
          />
        </div>
      </div>
    </header>
  );
};

export default Appbar;
