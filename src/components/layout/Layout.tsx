import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from './Banner';

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Banner />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
