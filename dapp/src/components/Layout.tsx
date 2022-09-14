import { FC } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from 'src/components/Navbar';

const Layout: FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-slate-700">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;