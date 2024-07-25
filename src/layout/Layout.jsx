import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import Appbar from '../shared/Navbar/appbar';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="w-full">
        {!(pathname === '/login' || pathname === '/sign-up') && <Appbar />}
        {pathname === '/' ? (
          <Outlet />
        ) : (
          <div className="max-w-[1440px] mx-auto mt-10 px-3 lg:px-[20px]">
            <Outlet />
          </div>
        )}
      </div>
      {!(pathname === '/login' || pathname === '/sign-up') && <Footer />}
    </>
  );
};

export default Layout;
