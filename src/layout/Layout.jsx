import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className='w-full lg:px-[20px]'>
        {!(pathname === '/login' || pathname === '/sign-up') && <Navbar />}
        <div className='max-w-[1440px] mx-auto px-3 lg:px-0'>
          <Outlet />
        </div>
      </div>
      {!(pathname === '/login' || pathname === '/sign-up') && <Footer />}
    </>
  );
};

export default Layout;
